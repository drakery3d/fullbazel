import {Component} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'

import {AuthSelectors} from '@client/store'

import {DiscussionsActions} from './discussions.actions'
import {DiscussionsSeletors} from './discussions.selectors'

@Component({
  selector: 'app-discussions',
  template: `
    <form [formGroup]="form" (submit)="send()" *ngIf="user$ | async">
      <input formControlName="input" placeholder="Say something" />
      <div class="submission" *ngIf="form.valid">
        <button>Send</button>
        <span>press Enter ↵</span>
      </div>
    </form>

    <div *ngFor="let message of messages$ | async">
      {{ message.content }} by {{ message.userId }}
    </div>
  `,
  styleUrls: ['discussions.component.sass'],
})
export class DiscussionsComponent {
  user$ = this.store.select(AuthSelectors.user)
  messages$ = this.store.select(DiscussionsSeletors.messages)
  form = new FormGroup({
    input: new FormControl('', Validators.required),
  })

  constructor(private store: Store) {}

  send() {
    this.store.dispatch(DiscussionsActions.sendMessage({content: this.form.value.input}))
    this.form.patchValue({input: ''})
  }
}
