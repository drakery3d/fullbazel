import {isPlatformBrowser} from '@angular/common'
import {HttpClient} from '@angular/common/http'
import {Inject, Injectable, OnDestroy, PLATFORM_ID} from '@angular/core'
import {Router} from '@angular/router'
import {SwPush} from '@angular/service-worker'
import {first, takeWhile, tap} from 'rxjs/operators'

import {ClientEnvironment, ENVIRONMENT} from '@client/environment'

// TODO enabling notifications and clicking away dircectly asks for notifications again, but shouldn't

@Injectable()
export class PushNotificationService implements OnDestroy {
  private alive = true

  constructor(
    private swPush: SwPush,
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platform: string,
    @Inject(ENVIRONMENT) private environment: ClientEnvironment,
  ) {}

  initialize() {
    if (this.swPush.isEnabled) {
      this.handleNotificationClicks()
      this.handleNotificationMessages()
    }
  }

  get hasNotificationPermission() {
    if (isPlatformBrowser(this.platform)) return Notification.permission === 'granted'
    return false
  }

  get areNotificationsBlocked() {
    if (isPlatformBrowser(this.platform)) return Notification.permission === 'denied'
    return true
  }

  async ensurePushPermission() {
    if (this.swPush.isEnabled) {
      if (!this.hasNotificationPermission) {
        const status = await Notification.requestPermission()
        if (status === 'denied') return
        await this.sendSampleNotificationLocally()
      }
      return this.ensureSubscription()
    }
  }

  private async ensureSubscription(): Promise<PushSubscription> {
    const sw = await navigator.serviceWorker.getRegistration()
    if (!sw) throw 'Could not get ServiceWorkerRegistration'
    const existingSub = await sw.pushManager.getSubscription()
    if (existingSub) return existingSub

    const {key} = await this.http
      // FIXME dont hardcode api endpoints
      .get<{key: string}>(`${this.environment.api}/vapid-key`)
      .pipe(first())
      .toPromise()
    console.log('Fetched vapid key', key)

    return this.swPush.requestSubscription({serverPublicKey: key})
  }

  async sendSampleNotificationLocally() {
    const subscription = await this.ensurePushPermission()
    if (subscription) {
      const sw = await navigator.serviceWorker.getRegistration()
      if (!sw) throw 'Could not get ServiceWorkerRegistration'
      await sw.showNotification(`This is how you will be notified`, {
        icon: 'assets/icons/icon-72x72.png',
      })
      this.playNotificationSound()
    }
  }

  private playNotificationSound() {
    const audio = new Audio('/assets/drip.ogg')
    audio.load()
    audio.play()
  }

  private handleNotificationClicks() {
    this.swPush.notificationClicks
      .pipe(
        takeWhile(() => this.alive),
        tap(({action, notification}) => {
          console.log('user clicked on notification', {action, notification})
          const type = notification.data?.type
          if (type === 'new-message') {
            this.router.navigateByUrl('/discussions')
          }
        }),
      )
      .subscribe()
  }

  private handleNotificationMessages() {
    this.swPush.messages
      .pipe(
        takeWhile(() => this.alive),
        tap(message => {
          console.log('imcomming message', {message})
          this.playNotificationSound()
        }),
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.alive = false
  }
}
