import {Component} from '@angular/core'
import {Store} from '@ngrx/store'

import {AuthActions, AuthSelectors} from '@client/store'

@Component({
  selector: 'app-home',
  template: `
    <h1 style="height: 200vh;">Home</h1>
    <!-- <div class="container">
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

      <a routerLink="/realtime"><app-button>Realtime</app-button></a>

      <a [attr.href]="signInUrl" *ngIf="!(user$ | async)">
        <button class="google_button">
          <span class="icon">
            <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
                id="Shape"
                fill="#EA4335"
              />
              <path
                d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z"
                id="Shape"
                fill="#FBBC05"
              />
              <path
                d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z"
                id="Shape"
                fill="#4285F4"
              />
              <path
                d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z"
                fill="#34A853"
              />
            </svg>
          </span>
          <span class="text">Sign in with Google</span>
        </button>
      </a>

      <ng-container *ngIf="user$ | async as user">
        <p>Hi {{ user.name }}</p>
        <img [attr.src]="user.picture" />
        <app-button (click)="signOut()">Sign out</app-button>
      </ng-container>
    </div> -->
  `,
  styleUrls: ['home.component.sass'],
})
export class HomeComponent {
  // TODO consider reading from env?
  signInUrl =
    'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?access_type=offline&client_id=98599563044-jj7e91t651ugd1cjs9ftrp5m5hc6mso7.apps.googleusercontent.com&prompt=consent&redirect_uri=http%3A%2F%2Flocalhost%3A4200&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&flowName=GeneralOAuthFlow'
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

  constructor(private store: Store) {}

  signOut() {
    this.store.dispatch(AuthActions.signOut())
  }
}
