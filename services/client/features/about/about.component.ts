import {Component, Inject} from '@angular/core'

import {ClientEnvironment, ENVIRONMENT} from '@client/environment'

@Component({
  selector: 'app-about',
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
      <a routerLink="/"><app-button>Home</app-button></a>
    </div>
  `,
  styleUrls: ['about.component.sass'],
})
export class AboutComponent {
  constructor(@Inject(ENVIRONMENT) public environment: ClientEnvironment) {}
}
