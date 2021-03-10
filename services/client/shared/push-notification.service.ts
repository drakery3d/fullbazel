import {isPlatformBrowser} from '@angular/common'
import {Inject, Injectable, OnDestroy, PLATFORM_ID} from '@angular/core'
import {Router} from '@angular/router'
import {SwPush} from '@angular/service-worker'
import {takeWhile, tap} from 'rxjs/operators'

import {ClientEnvironment, ENVIRONMENT} from '@client/environment'

@Injectable()
export class PushNotificationService implements OnDestroy {
  private alive = true

  constructor(
    private swPush: SwPush,
    private router: Router,
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

  async ensurePushPermission(): Promise<PushSubscription | null> {
    if (this.swPush.isEnabled) {
      if (!this.hasNotificationPermission) {
        const status = await Notification.requestPermission()
        if (status === 'denied') return null
        await this.sendSampleNotificationLocally()
      }
      return this.ensureSubscription()
    } else {
      return null
    }
  }

  private async ensureSubscription(): Promise<PushSubscription> {
    const sw = await navigator.serviceWorker.getRegistration()
    if (!sw) throw 'Could not get ServiceWorkerRegistration'
    const existingSub = await sw.pushManager.getSubscription()
    if (existingSub) return existingSub

    return this.swPush.requestSubscription({
      serverPublicKey: this.environment.vapidPublicKey,
    })
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
        tap(({notification}) => {
          console.log('user clicked on notification', {notification})
          const type = notification.data?.type
          if (type === 'new-message') this.router.navigateByUrl('/discussions')
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
