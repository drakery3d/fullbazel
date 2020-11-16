import {Component, Inject} from '@angular/core'
import * as socketIO from 'socket.io-client'

import {ENVIRONMENT, ClientEnvironment} from '@client/environment'

@Component({
  selector: 'abs-realtime',
  template: `
    <div class="container">
      <h1>Realtime</h1>
      <p>lorem ipsum</p>
      <span class="line"></span>
    </div>
  `,
  styleUrls: ['realtime.component.sass'],
})
export class RealtimeComponent {
  io = socketIO.io('http://localhost:3000')

  constructor(@Inject(ENVIRONMENT) public environment: ClientEnvironment) {}
}
