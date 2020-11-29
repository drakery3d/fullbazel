import * as faker from 'faker'
import {Server, Socket} from 'socket.io'
import {interval} from 'rxjs'
import {takeWhile, tap} from 'rxjs/operators'
import {v4 as uuidv4} from 'uuid'

import {Quote} from '@libs/schema'
import {Config} from '@libs/config'

const config = new Config()
const io = new Server(3000, {cors: {origin: config.get('client')}})
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
