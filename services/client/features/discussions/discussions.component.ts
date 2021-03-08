import {Component} from '@angular/core'
import {Store} from '@ngrx/store'

import {DiscussionsSeletors} from './discussions.selectors'

@Component({
  selector: 'app-discussions',
  template: `
    <div class="container">
      <h1>Discussions</h1>
      <div *ngFor="let message of messages$ | async">
        {{ message.content }} by {{ message.userId }}
      </div>
    </div>
  `,
  styleUrls: ['discussions.component.sass'],
})
export class DiscussionsComponent {
  messages$ = this.store.select(DiscussionsSeletors.messages)

  constructor(private store: Store) {}
}
