import {animate, style, transition, trigger} from '@angular/animations'
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core'
import {Subscription, timer} from 'rxjs'
import {first} from 'rxjs/operators'

import {SnackbarService} from './snackbar.service'

@Component({
  selector: 'app-snackbar',
  template: `
    <div *ngIf="show" @state class="wrappper">
      <span class="material-icons icon" *ngIf="icon">{{ icon }}</span>
      <span class="snackbar-text">{{ message }}</span>
      <button *ngIf="action" (click)="onAction()">{{ action }}</button>
    </div>
  `,
  styleUrls: ['snackbar.component.sass'],
  animations: [
    trigger('state', [
      transition(':enter', [
        style({bottom: '-100px', transform: 'translate(-50%, 0%) scale(0.3)'}),
        animate(
          '150ms cubic-bezier(0, 0, 0.2, 1)',
          style({
            transform: 'translate(-50%, 0%) scale(1)',
            opacity: 1,
            bottom: '20px',
          }),
        ),
      ]),
      transition(':leave', [
        animate(
          '150ms cubic-bezier(0.4, 0.0, 1, 1)',
          style({
            transform: 'translate(-50%, 0%) scale(0.3)',
            opacity: 0,
            bottom: '-100px',
          }),
        ),
      ]),
    ]),
  ],
})
export class SnackbarComponent implements OnDestroy {
  public show = false
  public message?: string
  public action?: string
  public icon?: string
  private actionHandler?: () => void
  private subscription: Subscription
  private timerSubscription?: Subscription

  constructor(private service: SnackbarService, private cd: ChangeDetectorRef) {
    this.subscription = this.service.state.subscribe(state => {
      this.cancelCurrent()

      const {content, action, icon, duration, onAction} = state
      this.show = true
      this.message = content
      this.action = action
      this.icon = icon
      if (onAction) this.actionHandler = onAction
      this.timerSubscription = timer(duration)
        .pipe(first())
        .subscribe(() => (this.show = false))
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onAction() {
    if (this.actionHandler) this.actionHandler()
    this.cancelCurrent()
  }

  private cancelCurrent() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe()
      this.timerSubscription = undefined
      this.show = false
      this.cd.detectChanges()
    }
  }
}
