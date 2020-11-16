import {Store} from '@ngrx/store'
import {Component, Inject} from '@angular/core'
import * as socketIO from 'socket.io-client'

import {ENVIRONMENT, ClientEnvironment} from '@client/environment'
import {QuoteActions} from './quote.actions'
import {QuoteSeletors} from './quote.selectors'

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
      <abs-button (click)="removeAll()">Remove All</abs-button>
      <div
        *ngFor="let q of (quotes$ | async).slice().reverse()"
        class="quote"
        (click)="remove(q.id)"
      >
        <p class="content">{{ q.content }}</p>
        <p class="author">{{ q.author }}</p>
      </div>
    </div>
  `,
  styleUrls: ['realtime.component.sass'],
})
export class RealtimeComponent {
  quotes$ = this.store.select(QuoteSeletors.quotes)

  private io = socketIO.io('http://localhost:3000')

  constructor(@Inject(ENVIRONMENT) public environment: ClientEnvironment, private store: Store) {
    this.io.on('connect', () => {
      console.log('conntected with server')
    })

    this.io.on('quotes', quote => {
      this.store.dispatch(QuoteActions.add({quote}))
    })
  }

  remove(id: string) {
    this.store.dispatch(QuoteActions.removeOne({id}))
  }

  removeAll() {
    this.store.dispatch(QuoteActions.removeAll())
  }
}
