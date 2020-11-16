import {Component, Inject} from '@angular/core'

import {ENVIRONMENT, ClientEnvironment} from '@client/environment'

@Component({
  selector: 'abs-home',
  template: `
    <div class="container">
      <h1>Angular Bazel Starter</h1>
      <p>Let's build something great!</p>
      <span class="line"></span>
      <a routerLink="/about"><button>About</button></a>
      <div class="env">
        <pre>{{ environment | json }}</pre>
      </div>
    </div>
  `,
  styleUrls: ['home.component.sass'],
})
export class HomeComponent {
  constructor(@Inject(ENVIRONMENT) public environment: ClientEnvironment) {}
}
