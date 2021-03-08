import {Component} from '@angular/core'

import {PushNotificationService} from './push-notification.service'
import {ServiceWorkerService} from './service-worker.service'

@Component({
  selector: 'app-nav',
  template: `
    <nav class="navbar">
      <ul>
        <li>
          <div class="link" routerLink="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z"
              />
              <path d="M7 10.19V18h2v-6h6v6h2v-7.81l-5-4.5z" opacity=".3" />
            </svg>
            <span>Home</span>
          </div>
        </li>

        <li>
          <div class="link" routerLink="/discussions">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M15 11V4H4v8.17L5.17 11H6z" opacity=".3" />
              <path
                d="M16 13c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10zm-12-.83V4h11v7H5.17L4 12.17zM22 7c0-.55-.45-1-1-1h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7z"
              />
            </svg>
            <span>Discussions</span>
          </div>
        </li>

        <li>
          <div class="link" routerLink="/realtime">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M8 7.5l4 4 4-4V4H8zm0 9V20h8v-3.5l-4-4z" opacity=".3" />
              <path
                d="M18 2H6v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2zm-2 14.5V20H8v-3.5l4-4 4 4zm0-9l-4 4-4-4V4h8v3.5z"
              />
            </svg>
            <span>Realtime</span>
          </div>
        </li>

        <li class="bottom secondary hide-small">
          <div class="link" (click)="checkUpdates()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
            >
              <g><rect fill="none" height="24" width="24" /></g>
              <g>
                <g>
                  <path
                    d="M11,8v5l4.25,2.52l0.77-1.28l-3.52-2.09V8H11z M21,10V3l-2.64,2.64C16.74,4.01,14.49,3,12,3c-4.97,0-9,4.03-9,9 s4.03,9,9,9s9-4.03,9-9h-2c0,3.86-3.14,7-7,7s-7-3.14-7-7s3.14-7,7-7c1.93,0,3.68,0.79,4.95,2.05L14,10H21z"
                  />
                </g>
              </g>
            </svg>
            <span>Check for SW updates</span>
          </div>
        </li>

        <li class="secondary hide-small">
          <div class="link" (click)="sendNotification()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M12 6.5c-2.49 0-4 2.02-4 4.5v6h8v-6c0-2.48-1.51-4.5-4-4.5z" opacity=".3" />
              <path
                d="M18 16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zm-4 5c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"
              />
            </svg>
            <span>Test Notification</span>
          </div>
        </li>

        <li class="secondary">
          <a
            class="link"
            href="https://github.com/drakery3d/fullstack-bazel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
              />
            </svg>
            <span>Source Code</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  styleUrls: ['navigation.component.sass'],
})
export class NavigationComopnent {
  constructor(
    private serviceWorkerService: ServiceWorkerService,
    private notificationService: PushNotificationService,
  ) {}

  checkUpdates() {
    this.serviceWorkerService.checkUpdateNow()
  }

  async sendNotification() {
    await this.notificationService.sendSampleNotificationLocally()
  }
}
