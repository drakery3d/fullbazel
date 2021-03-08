import {isPlatformBrowser} from '@angular/common'
import {Component, Inject, PLATFORM_ID} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {UpdateAvailableEvent} from '@angular/service-worker'
import {Store} from '@ngrx/store'
import {fromEvent, merge, Observable, of} from 'rxjs'
import {first, map, mapTo, skipWhile} from 'rxjs/operators'

import {AuthActions} from '@client/store'

import {PushNotificationService} from './push-notification.service'
import {ServiceWorkerService} from './service-worker.service'

@Component({
  selector: 'app-root',
  template: `
    <div class="header">
      <nav>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="logo">
          <path style="fill:#76D275;" d="M144 32 l112 112 -112 112 l-112 -112z" />
          <path style="fill:#43A047;" d="M32 144 v112 l112 112 v-112z" />
          <path style="fill:#76D275;" d="M368 32  l112 112 -112 112 -112 -112z" />
          <path style="fill:#43A047;" d="M480 144 v112 l-112 112 v-112z" />
          <path style="fill:#43A047;" d="M256 144 l112 112 -112 112 -112 -112z" />
          <path style="fill:#00701A;" d="M256 368 v112 l-112 -112  v-112z" />
          <path style="fill:#004300;" d="M256 368 l112 -112 v112 l-112 112z" />
        </svg>

        <div class="menu">
          <div class="item"><a routerLink="/home" routerLinkActive="selected">Home</a></div>
          <div class="item">
            <a routerLink="/discussions" routerLinkActive="selected">Discussions</a>
          </div>
          <div class="item">
            <a routerLink="/architecture" routerLinkActive="selected">Architecture</a>
          </div>
        </div>

        <div class="user">
          <div class="signin">Sign In</div>
        </div>
      </nav>
    </div>

    <div class="content">
      <router-outlet></router-outlet>
    </div>

    <!-- <div class="connectivity" *ngIf="offline$ | async">You are offline!</div>

    <app-nav></app-nav>

    <div *ngIf="availableSwUpdate" (click)="onUpdateServiceWorker()" id="update_banner">
      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24">
        <g><rect fill="none" height="24" width="24" /></g>
        <g>
          <g>
            <path
              d="M11,8v5l4.25,2.52l0.77-1.28l-3.52-2.09V8H11z M21,10V3l-2.64,2.64C16.74,4.01,14.49,3,12,3c-4.97,0-9,4.03-9,9 s4.03,9,9,9s9-4.03,9-9h-2c0,3.86-3.14,7-7,7s-7-3.14-7-7s3.14-7,7-7c1.93,0,3.68,0.79,4.95,2.05L14,10H21z"
            />
          </g>
        </g>
      </svg>
      <span class="unselectable">Update Available</span>
    </div>

    <div class="main">
      <router-outlet></router-outlet>
    </div> -->
  `,
  styleUrls: ['app.component.sass'],
})
export class AppComponent {
  offline$: Observable<boolean>
  availableSwUpdate: UpdateAvailableEvent

  constructor(
    private serviceWorkerService: ServiceWorkerService,
    private notificationService: PushNotificationService,
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    @Inject(PLATFORM_ID) private platform: string,
  ) {
    if (isPlatformBrowser(this.platform)) {
      this.notificationService.initialize()
      this.handleConnectivity()
      this.handleSwUpdates()
      this.handleSignIn()
    }
  }

  onUpdateServiceWorker() {
    this.serviceWorkerService.forceUpdateNow()
  }

  private handleSignIn() {
    this.route.queryParams
      .pipe(
        skipWhile(value => !value.code),
        map(value => value.code),
        first(),
      )
      .subscribe(code => {
        this.store.dispatch(AuthActions.signIn({code}))
        this.router.navigate([], {relativeTo: this.route, queryParams: {code: undefined}})
      })
  }

  private handleSwUpdates() {
    this.serviceWorkerService.launchUpdateCheckingRoutine()
    this.serviceWorkerService.launchUpdateHandler(event => {
      this.availableSwUpdate = event
    })
  }

  private handleConnectivity() {
    this.offline$ = merge(
      of(!navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(false)),
      fromEvent(window, 'offline').pipe(mapTo(true)),
    )
  }
}
