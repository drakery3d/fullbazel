import {Server, Socket} from 'socket.io'
import * as faker from 'faker'
import {interval} from 'rxjs'
import {takeWhile, tap} from 'rxjs/operators'

const arg = process.argv[2]
const isProd = arg ? arg === 'prod' : true
const io = new Server(3000, {
  cors: {origin: isProd ? 'http://localhost:8080' : 'http://localhost:4200'},
})

io.on('connect', (socket: Socket) => {
  console.log(`connect ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`disconnect ${socket.id}`)
  })

  interval(1000)
    .pipe(
      takeWhile(() => socket.connected),
      tap(() => socket.emit('quotes', makeQuote())),
    )
    .subscribe()
})

const makeQuote = () => ({content: faker.lorem.sentence(), author: faker.name.firstName()})
