import {Component, Inject} from '@angular/core'
import * as socketIO from 'socket.io-client'

import {ENVIRONMENT, ClientEnvironment} from '@client/environment'

@Component({
  selector: 'abs-realtime',
  template: `
    <div class="container">
      <h1>Realtime</h1>
      <p>
        The server pushes random quotes to the client via Web Sockets. The qutoes are stored with
        NgRx.
      </p>
      <span class="line"></span>
      <div *ngFor="let q of quotes" class="quote">
        <p class="content">{{ q.content }}</p>
        <p class="author">{{ q.author }}</p>
      </div>
    </div>
  `,
  styleUrls: ['realtime.component.sass'],
})
export class RealtimeComponent {
  quotes = []

  private io = socketIO.io('http://localhost:3000')

  constructor(@Inject(ENVIRONMENT) public environment: ClientEnvironment) {
    this.io.on('connect', () => {
      console.log('conntected with serer')
    })

    this.io.on('quotes', ({content, author}) => {
      this.quotes = [{content, author}, ...this.quotes]
    })
  }
}
