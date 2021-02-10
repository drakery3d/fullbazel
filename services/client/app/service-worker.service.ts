import {isPlatformBrowser} from '@angular/common'
import {ApplicationRef, Inject, Injectable, PLATFORM_ID} from '@angular/core'
import {SwUpdate, UpdateAvailableEvent} from '@angular/service-worker'
import {concat, interval} from 'rxjs'
import {first} from 'rxjs/operators'

@Injectable()
export class ServiceWorkerService {
  private readonly updateDiscoveredAtKey = '@fullstack-bazel/sw_update_discovered_at'

  constructor(
    private appRef: ApplicationRef,
    private swUpdate: SwUpdate,
    @Inject(PLATFORM_ID) private platform: string,
  ) {}

  launchUpdateCheckingRoutine(
    checkIntervaSeconds: number = 10 * 60,
    forceUpdateAfterSeconds: number = 2 * 60 * 60,
  ) {
    if (!this.isAvailable) return
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true))
    const timeInterval$ = interval(checkIntervaSeconds * 1000)
    const repeatOnceAppIsStable$ = concat(appIsStable$, timeInterval$)
    repeatOnceAppIsStable$.subscribe(() => {
      this.swUpdate.checkForUpdate()
      const updateFoundAt = localStorage.getItem(this.updateDiscoveredAtKey)
      if (updateFoundAt && Date.now() - Number(updateFoundAt) > forceUpdateAfterSeconds * 1000) {
        this.forceUpdateNow()
      }
    })
  }

  launchUpdateHandler(callback: (event: UpdateAvailableEvent) => void) {
    if (!this.isAvailable) return
    this.swUpdate.available.subscribe(event => {
      callback(event)
      localStorage.setItem(this.updateDiscoveredAtKey, Date.now().toString())
    })
  }

  checkUpdateNow() {
    if (!this.isAvailable) return
    this.swUpdate.checkForUpdate().then(() => console.log('checked for updates'))
  }

  forceUpdateNow() {
    if (!this.isAvailable) return
    this.swUpdate.activateUpdate().then(() => {
      localStorage.setItem(this.updateDiscoveredAtKey, '')
      document.location.reload()
    })
  }

  private get isAvailable() {
    return isPlatformBrowser(this.platform) && this.swUpdate.isEnabled
  }
}
