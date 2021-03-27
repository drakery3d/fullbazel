import {Component} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'

import {AuthSelectors, MessagesActions, MessagesSeletors, UserssSeletors} from '@client/store'

@Component({
  selector: 'app-discussions',
  template: `
    <form [formGroup]="form" *ngIf="user$ | async">
      <textarea
        formControlName="input"
        placeholder="Say something"
        (keyup.enter)="send()"
      ></textarea>
      <div class="submission" [class.disabled]="!form.valid">
        <button (click)="genLorem()">Lorem</button>
        <button [disabled]="!form.valid" (click)="send()">Send</button>
        <span class="enter">press Enter ↵</span>
      </div>
    </form>

    <div class="messages" *ngIf="userEntities$ | async as userEntities">
      <div *ngFor="let message of messages$ | async" class="message">
        <div class="meta" *ngIf="userEntities[message.userId] as user">
          <img [attr.src]="user.picture" />
          <div class="publishing">
            <span class="author">{{ user.name }}</span>
            <span class="date">{{ message.createdAt | date: 'MMM d, y, h:mm a' }}</span>
          </div>
          <div class="tags">
            <span class="unread" *ngIf="(unreadIds$ | async)?.includes(message.id)">Unread</span>
          </div>
        </div>
        <div class="content">{{ message.content }}</div>
        <div class="divider"></div>
      </div>
    </div>
  `,
  styleUrls: ['discussions.component.sass'],
})
export class DiscussionsComponent {
  user$ = this.store.select(AuthSelectors.user)
  userEntities$ = this.store.select(UserssSeletors.entities)
  messages$ = this.store.select(MessagesSeletors.messagesReverse)
  unreadIds$ = this.store.select(MessagesSeletors.unreadIds)
  form = new FormGroup({
    input: new FormControl('', Validators.required),
  })
  lorem = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.`

  constructor(private store: Store) {
    this.store.dispatch(MessagesActions.clearUnread())
  }

  send() {
    this.store.dispatch(MessagesActions.send({content: this.form.value.input}))
    this.form.patchValue({input: ''})
  }

  genLorem() {
    this.form.patchValue({input: this.lorem})
  }
}
