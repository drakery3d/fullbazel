import {isPlatformBrowser} from '@angular/common'
import {Component, Inject, PLATFORM_ID, Renderer2} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {UpdateAvailableEvent} from '@angular/service-worker'
import {Store} from '@ngrx/store'
import {fromEvent, merge, Observable, of} from 'rxjs'
import {first, map, mapTo, skipWhile} from 'rxjs/operators'

import {AuthActions, AuthSelectors} from '@client/store'

import {PushNotificationService} from './push-notification.service'
import {ServiceWorkerService} from './service-worker.service'

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

@Component({
  selector: 'app-root',
  template: `
    <div class="header">
      <nav>
        <a routerLink="/home">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="logo">
            <path style="fill:#76D275;" d="M144 32 l112 112 -112 112 l-112 -112z" />
            <path style="fill:#43A047;" d="M32 144 v112 l112 112 v-112z" />
            <path style="fill:#76D275;" d="M368 32  l112 112 -112 112 -112 -112z" />
            <path style="fill:#43A047;" d="M480 144 v112 l-112 112 v-112z" />
            <path style="fill:#43A047;" d="M256 144 l112 112 -112 112 -112 -112z" />
            <path style="fill:#00701A;" d="M256 368 v112 l-112 -112  v-112z" />
            <path style="fill:#004300;" d="M256 368 l112 -112 v112 l-112 112z" />
          </svg>
        </a>

        <div class="menu">
          <div class="item"><a routerLink="/home" routerLinkActive="selected">Home</a></div>
          <div class="item">
            <a routerLink="/discussions" routerLinkActive="selected">Discussions</a>
          </div>
          <div class="item">
            <a routerLink="/architecture" routerLinkActive="selected">Architecture</a>
          </div>
        </div>

        <div class="misc">
          <div class="theme">
            <svg
              *ngIf="!isDarkTheme"
              (click)="toggleTheme()"
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
              class="icon"
            >
              <rect fill="none" height="24" width="24" />
              <path
                d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"
              />
            </svg>
            <svg
              *ngIf="isDarkTheme"
              (click)="toggleTheme()"
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
              class="icon"
            >
              <rect fill="none" height="24" width="24" />
              <path
                d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M11,1v4h2V1L11,1z M11,19v4h2v-4L11,19z M23,11l-4,0v2 l4,0V11z M5,11l-4,0l0,2l4,0L5,11z M16.24,17.66l2.47,2.47l1.41-1.41l-2.47-2.47L16.24,17.66z M3.87,5.28l2.47,2.47l1.41-1.41 L5.28,3.87L3.87,5.28z M6.34,16.24l-2.47,2.47l1.41,1.41l2.47-2.47L6.34,16.24z M18.72,3.87l-2.47,2.47l1.41,1.41l2.47-2.47 L18.72,3.87z"
              />
            </svg>
          </div>
          <div class="signin" *ngIf="!(user$ | async)"><a [attr.href]="signInUrl">Sign In</a></div>
          <div class="user" *ngIf="user$ | async as user">
            <img [attr.src]="user.picture" />
          </div>
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
  user$ = this.store.select(AuthSelectors.user)
  availableSwUpdate: UpdateAvailableEvent
  // TODO consider reading from env?
  signInUrl =
    'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?access_type=offline&client_id=98599563044-jj7e91t651ugd1cjs9ftrp5m5hc6mso7.apps.googleusercontent.com&prompt=consent&redirect_uri=http%3A%2F%2Flocalhost%3A4200&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&flowName=GeneralOAuthFlow'
  isDarkTheme = false

  constructor(
    private serviceWorkerService: ServiceWorkerService,
    private notificationService: PushNotificationService,
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platform: string,
  ) {
    if (isPlatformBrowser(this.platform)) {
      this.notificationService.initialize()
      this.handleConnectivity()
      this.handleSwUpdates()
      this.handleSignIn()
      this.setTheme()
    }
  }

  onUpdateServiceWorker() {
    this.serviceWorkerService.forceUpdateNow()
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme
    if (this.isDarkTheme) this.setDarkTheme()
    else this.setLightTheme()
  }

  private setTheme() {
    const theme = localStorage.getItem('theme')
    if (theme === Theme.Dark) this.setDarkTheme()
    else this.setLightTheme()
  }

  private setDarkTheme() {
    this.renderer.removeClass(document.body, Theme.Light)
    this.renderer.addClass(document.body, Theme.Dark)
    localStorage.setItem('theme', Theme.Dark)
    this.isDarkTheme = true
  }

  private setLightTheme() {
    this.renderer.removeClass(document.body, Theme.Dark)
    this.renderer.addClass(document.body, Theme.Light)
    localStorage.setItem('theme', Theme.Light)
    this.isDarkTheme = false
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
