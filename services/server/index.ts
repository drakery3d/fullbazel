import 'reflect-metadata'

import * as bodyParser from 'body-parser'
import * as cookie from 'cookie'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as faker from 'faker'
import * as http from 'http'
import {Container} from 'inversify'
import {Socket} from 'net'
import {Subscription, timer} from 'rxjs'
import {takeWhile, tap} from 'rxjs/operators'
import {v4 as uuidv4} from 'uuid'
import * as WebSocket from 'ws'

import {Config} from '@libs/config'
import {
  CookieNames,
  DiscussionsMessagesIn,
  DiscussionsMessagesOut,
  Environment,
  QuoteMessagesIn,
  QuoteMessagesOut,
  TokenExpiration,
} from '@libs/enums'
import {Message, Quote, SocketMessage, User} from '@libs/schema'
import {AuthToken, Id, Timestamp} from '@libs/types'

import {GoogleAdapter} from './google.adapter'
import {UserRepository} from './user.repository'

const container = new Container()
container.bind(Config).toSelf().inSingletonScope()
container.bind(GoogleAdapter).toSelf().inSingletonScope()
container.bind(UserRepository).toSelf().inSingletonScope()

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({noServer: true})
const googleAdapter = container.get(GoogleAdapter)
const config = container.get(Config)
const userRepo = container.get(UserRepository)
const isProd = config.get('environment') === Environment.Production

const authTokenSecret = config.get('secrets_tokens_auth')

const authTokenCookieOptions: express.CookieOptions = {
  httpOnly: true,
  maxAge: TokenExpiration.Auth * 1000,
  sameSite: isProd ? 'strict' : 'lax',
  secure: isProd ? true : false,
  path: '/',
}

const broadcast = (message: SocketMessage) => {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(message))
  })
}

wss.on('connection', (socket: WebSocket, request: http.IncomingMessage, authToken?: AuthToken) => {
  let isConnected = true
  let timerSubscription: Subscription | undefined
  console.log(`client connected`, authToken?.userId)

  socket.on('close', () => {
    console.log(`client disconnected`)
    isConnected = false
  })

  socket.on('message', message => {
    const {name, payload} = JSON.parse(message.toString()) as SocketMessage

    if (name === DiscussionsMessagesIn.SendMessage) {
      if (!authToken) return
      // TODO persist to db
      const message: Message = {
        id: Id.generate().toString(),
        content: payload as string,
        userId: authToken.userId,
        createdAt: Timestamp.now().toString(),
      }
      broadcast({name: DiscussionsMessagesOut.ReceiveMessage, payload: message})
    }

    if (name === QuoteMessagesIn.StartStreaming) {
      timerSubscription?.unsubscribe()
      timerSubscription = timer(0, 3000)
        .pipe(
          takeWhile(() => isConnected),
          tap(() => {
            const quote: Quote = {
              content: faker.lorem.sentence(),
              author: faker.name.firstName(),
              id: uuidv4(),
            }
            const message: SocketMessage = {name: QuoteMessagesOut.Send, payload: quote}
            socket.send(JSON.stringify(message))
          }),
        )
        .subscribe()
    }

    if (name === QuoteMessagesIn.StopStreaming) {
      if (timerSubscription) timerSubscription.unsubscribe()
    }
  })
})

server.on('upgrade', async (request: http.IncomingMessage, socket: Socket, head: Buffer) => {
  let authToken: AuthToken | undefined
  try {
    if (request.headers.cookie) {
      const cookies = cookie.parse(request.headers.cookie)
      const authTokenStr = cookies[CookieNames.AuthToken]
      if (authTokenStr) {
        authToken = AuthToken.fromString(authTokenStr, authTokenSecret)
      }
    }
  } catch (err) {
  } finally {
    wss.handleUpgrade(request, socket, head, ws => {
      wss.emit('connection', ws, request, authToken)
    })
  }
})

app.get('*', (req, res) => res.status(200).send('Ok').end())

app.use(
  cors({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    origin: (origin: any, callback: (error: any, allow?: boolean) => void) => {
      if (origin === undefined) return callback(null, true)

      if (origin && config.get('client')) callback(null, true)
      else callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  }),
)
app.use(bodyParser.json())
app.use(cookieParser())

app.post('/signin', async (req, res) => {
  try {
    if (req.body.code) {
      const googleToken = await googleAdapter.getAccessToken(req.body.code)
      const {id, email, name, picture} = await googleAdapter.getUserInfo(googleToken)

      let user: User | undefined
      user = await userRepo.getById(id)
      if (!user) user = await userRepo.create(id, email, name, picture)

      const authToken = new AuthToken(user.id, user.tokenRefreshCount)

      res.cookie(CookieNames.AuthToken, authToken.sign(authTokenSecret), authTokenCookieOptions)
      res.json({user})
      return
    }

    let currentAuthToken: AuthToken | undefined
    if (req.cookies[CookieNames.AuthToken]) {
      try {
        currentAuthToken = AuthToken.fromString(req.cookies[CookieNames.AuthToken], authTokenSecret)
      } catch (err) {}
    }

    if (currentAuthToken) {
      const user = await userRepo.getById(currentAuthToken.userId)
      if (user) {
        if (user.tokenRefreshCount !== currentAuthToken.count) {
          res.status(400).send('Token has been invalidated')
          return
        }
        const authToken = new AuthToken(user.id, user.tokenRefreshCount)

        res.cookie(CookieNames.AuthToken, authToken.sign(authTokenSecret), authTokenCookieOptions)
        res.json({user})
        return
      }
    }

    res.status(400).send('Not authenticated')
  } catch (err) {
    res.cookie(CookieNames.AuthToken, '')
    res.status(500).send('Something went wrong')
  }
})

app.post('/signout', (req, res) => {
  res.cookie(CookieNames.AuthToken, '')
  res.send()
})

server.listen(3000, () => console.log('server started on port 3000'))
