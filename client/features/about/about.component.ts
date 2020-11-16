import {Component} from '@angular/core'

@Component({
  selector: 'abs-about',
  template: `
    <div class="container">
      <h1>About</h1>
      <p>
        This project will help you to get started building modern web apps with Angular and Bazel.
      </p>
      <span class="line"></span>
    </div>
  `,
  styleUrls: ['about.component.sass'],
})
export class AboutComponent {}
