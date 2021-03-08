import {Component} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {Store} from '@ngrx/store'

import {DiscussionsActions} from './discussions.actions'
import {DiscussionsSeletors} from './discussions.selectors'

@Component({
  selector: 'app-discussions',
  template: `
    <div class="container">
      <h1>Discussions</h1>

      <form [formGroup]="form" (submit)="send()">
        <input formControlName="input" />
        <button>Send</button>
      </form>

      <div *ngFor="let message of messages$ | async">
        {{ message.content }} by {{ message.userId }}
      </div>
    </div>
  `,
  styleUrls: ['discussions.component.sass'],
})
export class DiscussionsComponent {
  messages$ = this.store.select(DiscussionsSeletors.messages)
  form = new FormGroup({
    input: new FormControl(''),
  })

  constructor(private store: Store) {}

  send() {
    this.store.dispatch(DiscussionsActions.sendMessage({content: this.form.value.input}))
    this.form.patchValue({input: ''})
  }
}
