import {Component} from '@angular/core'
import {Store} from '@ngrx/store'

import {PushNotificationService} from '@client/shared'
import {AuthActions, AuthSelectors} from '@client/store'
import {SnackbarService} from '@libs/ui-elements/snackbar/snackbar.service'

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="logo">
        <path style="fill:#76D275;" d="M144 32 l112 112 -112 112 l-112 -112z" />
        <path style="fill:#43A047;" d="M32 144 v112 l112 112 v-112z" />
        <path style="fill:#76D275;" d="M368 32  l112 112 -112 112 -112 -112z" />
        <path style="fill:#43A047;" d="M480 144 v112 l-112 112 v-112z" />
        <path style="fill:#43A047;" d="M256 144 l112 112 -112 112 -112 -112z" />
        <path style="fill:#00701A;" d="M256 368 v112 l-112 -112  v-112z" />
        <path style="fill:#004300;" d="M256 368 l112 -112 v112 l-112 112z" />
      </svg>

      <h1>Fullstack Bazel</h1>
      <p>Let's build something great!</p>
      <span class="line"></span>

      <div class="tags">
        <span *ngFor="let tag of tags">{{ tag }}</span>
      </div>

      <button (click)="testSnackbar()">Test Snackbar</button>

      <!-- TODO global button design -->
      <ng-container *ngIf="user$ | async as user">
        <button (click)="signOut()" class="signout">Sign out</button>
        <button
          *ngIf="!notificationService.hasNotificationPermission"
          (click)="enablePushNotifications()"
        >
          Enable Push Notifications
        </button>
        <ng-container *ngIf="notificationService.hasNotificationPermission">
          <p>Push Notifications are enabled</p>
          <button (click)="notificationService.sendSampleNotificationLocally()">
            Test notification
          </button>
        </ng-container>
        <button></button>
      </ng-container>
    </div>
  `,
  styleUrls: ['home.component.sass'],
})
export class HomeComponent {
  tags = [
    'nodejs',
    'mysql',
    'docker',
    'kubernetes',
    'angular',
    'typescript',
    'kafka',
    'progressive-web-app',
    'websockets',
    'google-cloud',
    'bazel',
    'monorepo',
    'server-side-rendering',
    'docker-comopse',
  ]
  user$ = this.store.select(AuthSelectors.user)

  constructor(
    private store: Store,
    public notificationService: PushNotificationService,
    private snackbarService: SnackbarService,
  ) {}

  signOut() {
    this.store.dispatch(AuthActions.signOut())
  }

  testSnackbar() {
    this.snackbarService.show('This is a sample snackbar', 'Close', 3000, 'local_fire_department')
  }

  async enablePushNotifications() {
    const sub = await this.notificationService.ensurePushPermission()
    if (sub) this.store.dispatch(AuthActions.storePushSubscription({sub}))
  }
}
