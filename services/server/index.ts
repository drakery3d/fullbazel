import * as faker from 'faker'
import * as http from 'http'
import {interval} from 'rxjs'
import {takeWhile, tap} from 'rxjs/operators'
import {v4 as uuidv4} from 'uuid'
import * as WebSocket from 'ws'

import {Config} from '@libs/config'
import {Quote} from '@libs/schema'

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

  socket.emit('quotes', makeQuote())

  interval(2000)
    .pipe(
      takeWhile(() => isConnected),
      tap(() => {
        socket.send(JSON.stringify(makeQuote()))
      }),
    )
    .subscribe()
})

const makeQuote = (): Quote => ({
  content: faker.lorem.sentence(),
  author: faker.name.firstName(),
  id: uuidv4(),
})

// For k8s health checks
http
  .createServer((_req, res) => res.writeHead(200).end('Anagular Bazel Starter Server'))
  .listen(8080)
