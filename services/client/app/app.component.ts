import {isPlatformBrowser} from '@angular/common'
import {HttpClient} from '@angular/common/http'
import {Component, Inject, PLATFORM_ID} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {UpdateAvailableEvent} from '@angular/service-worker'
import {fromEvent, merge, Observable, of} from 'rxjs'
import {first, map, mapTo, skipWhile, take} from 'rxjs/operators'

import {ClientEnvironment, ENVIRONMENT} from '@client/environment'

import {PushNotificationService} from './push-notification.service'
import {ServiceWorkerService} from './service-worker.service'

@Component({
  selector: 'app-root',
  template: `
    <div class="connectivity" *ngIf="offline$ | async">You are offline!</div>

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
    </div>
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
    private http: HttpClient,
    private router: Router,
    @Inject(ENVIRONMENT) private environment: ClientEnvironment,
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
        // TODO implement this with ngrx
        this.http
          .post(`${this.environment.api}/signin`, {code})
          .pipe(take(1))
          .subscribe(response => {
            console.log(response)
            this.router.navigate([])
          })
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
