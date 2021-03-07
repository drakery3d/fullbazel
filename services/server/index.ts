import 'reflect-metadata'

import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as faker from 'faker'
import * as http from 'http'
import {Container} from 'inversify'
import {timer} from 'rxjs'
import {takeWhile, tap} from 'rxjs/operators'
import {v4 as uuidv4} from 'uuid'
import * as WebSocket from 'ws'

import {Config} from '@libs/config'
import {CookieNames, Environment, TokenExpiration} from '@libs/enums'
import {Quote, SocketMessage, User} from '@libs/schema'
import {AccessToken, RefreshToken} from '@libs/types'

import {GoogleAdapter} from './google.adapter'
import {UserRepository} from './user.repository'

const container = new Container()
container.bind(Config).toSelf().inSingletonScope()
container.bind(GoogleAdapter).toSelf().inSingletonScope()
container.bind(UserRepository).toSelf().inSingletonScope()

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({server})
const googleAdapter = container.get(GoogleAdapter)
const config = container.get(Config)
const userRepo = container.get(UserRepository)
const isProd = config.get('environment') === Environment.Production

const accessTokenSecret = config.get('secrets_tokens_access')
const refreshTokenSecret = config.get('secrets_tokens_refresh')

const refreshTokenCookieOptions: express.CookieOptions = {
  httpOnly: true,
  maxAge: TokenExpiration.Refresh * 1000,
  sameSite: isProd ? 'strict' : 'lax',
  secure: isProd ? true : false,
  path: '/',
}

wss.on('connection', (socket: WebSocket) => {
  let isConnected = true
  console.log(`client connected`)

  socket.on('close', () => {
    console.log(`client disconnected`)
    isConnected = false
  })

  timer(0, 3000)
    .pipe(
      takeWhile(() => isConnected),
      tap(() => {
        const quote: Quote = {
          content: faker.lorem.sentence(),
          author: faker.name.firstName(),
          id: uuidv4(),
        }
        const message: SocketMessage = {name: 'quote', payload: quote}
        socket.send(JSON.stringify(message))
      }),
    )
    .subscribe()
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

      const refreshToken = new RefreshToken(user.id, user.tokenRefreshCount)
      const accessToken = new AccessToken(user.id)

      res.cookie(
        CookieNames.RefreshToken,
        refreshToken.sign(refreshTokenSecret),
        refreshTokenCookieOptions,
      )
      res.json({user, accessToken: accessToken.sign(accessTokenSecret)})
      return
    }

    let currentRefreshToken: RefreshToken | undefined
    if (req.cookies[CookieNames.RefreshToken]) {
      try {
        currentRefreshToken = RefreshToken.fromString(
          req.cookies[CookieNames.RefreshToken],
          refreshTokenSecret,
        )
      } catch (err) {}
    }

    if (currentRefreshToken) {
      const user = await userRepo.getById(currentRefreshToken.userId)
      if (user) {
        if (user.tokenRefreshCount !== currentRefreshToken.count) {
          res.status(400).send('Token has been invalidated')
          return
        }
        const refreshToken = new RefreshToken(user.id, user.tokenRefreshCount)
        const accessToken = new AccessToken(user.id)

        res.cookie(
          CookieNames.RefreshToken,
          refreshToken.sign(refreshTokenSecret),
          refreshTokenCookieOptions,
        )
        res.json({user, accessToken: accessToken.sign(accessTokenSecret)})
        return
      }
    }

    res.status(400).send('Not authenticated')
  } catch (err) {
    res.cookie(CookieNames.RefreshToken, '')
    res.status(500).send('Something went wrong')
  }
})

server.listen(3000, () => console.log('server started on port 3000'))
