import {Server, Socket} from 'socket.io'
import * as faker from 'faker'
import {interval} from 'rxjs'
import {takeWhile, tap} from 'rxjs/operators'
import {v4 as uuidv4} from 'uuid'

import {Quote} from '@libs/schema'

const arg = process.argv[2]
const isProd = arg ? arg === 'prod' : true
const io = new Server(3000, {
  cors: {origin: isProd ? 'http://localhost:8080' : 'http://localhost:4200'},
})

console.log('Web socket server started on port 3000')

io.on('connect', (socket: Socket) => {
  console.log(`connect ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`disconnect ${socket.id}`)
  })

  socket.emit('quotes', makeQuote())

  interval(2000)
    .pipe(
      takeWhile(() => socket.connected),
      tap(() => socket.emit('quotes', makeQuote())),
    )
    .subscribe()
})

const makeQuote = (): Quote => ({
  content: faker.lorem.sentence(),
  author: faker.name.firstName(),
  id: uuidv4(),
})
