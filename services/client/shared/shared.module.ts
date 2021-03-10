import {NgModule} from '@angular/core'

import {PushNotificationService} from './push-notification.service'

@NgModule({
  providers: [PushNotificationService],
})
export class SharedModule {}
