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

      <div class="link">
        <a href="https://github.com/drakery3d/fullstack-bazel">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
        </a>
        <a href="https://github.com/flolu">
          <span class="material-icons icon">account_circle</span>
        </a>
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
