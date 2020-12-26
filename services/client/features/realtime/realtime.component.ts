import {Store} from '@ngrx/store'
import {Component} from '@angular/core'

import {QuoteActions} from './quote.actions'
import {QuoteSeletors} from './quote.selectors'

@Component({
  selector: 'app-realtime',
  template: `
    <div class="container">
      <h1>Realtime</h1>
      <p>
        The server pushes random quotes to the client via Web Sockets. The qutoes are stored with
        NgRx.
      </p>
      <span class="line"></span>
      <app-button (click)="removeAll()">Remove All</app-button>
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

  constructor(private store: Store) {}

  remove(id: string) {
    this.store.dispatch(QuoteActions.removeOne({id}))
  }

  removeAll() {
    this.store.dispatch(QuoteActions.removeAll())
  }
}
