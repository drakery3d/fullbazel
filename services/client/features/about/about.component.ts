import {Component, Inject} from '@angular/core'

import {ENVIRONMENT, ClientEnvironment} from '@client/environment'

@Component({
  selector: 'abs-about',
  template: `
    <div class="container">
      <h1>About</h1>
      <p>
        This project will help you to get started building modern web apps with Angular and Bazel.
      </p>
      <span class="line"></span>
      <div class="env">
        <pre>{{ environment | json }}</pre>
      </div>
      <a routerLink="/"><abs-button>Home</abs-button></a>
    </div>
  `,
  styleUrls: ['about.component.sass'],
})
export class AboutComponent {
  constructor(@Inject(ENVIRONMENT) public environment: ClientEnvironment) {}
}
