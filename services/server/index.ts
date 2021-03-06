import * as faker from 'faker'
import * as http from 'http'
import {timer} from 'rxjs'
import {takeWhile, tap} from 'rxjs/operators'
import {v4 as uuidv4} from 'uuid'
import * as WebSocket from 'ws'

import {Config} from '@libs/config'
import {Quote, SocketMessage} from '@libs/schema'

const config = new Config()
const client = config.get('client')

const server = new WebSocket.Server({port: 3000})

console.log('Web socket server started on port 3000', {client})

server.on('connection', (socket: WebSocket) => {
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

// For k8s health checks
http.createServer((_req, res) => res.writeHead(200).end()).listen(8080)
