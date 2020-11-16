import {Component} from '@angular/core'

import {Tags} from '@libs/enums'

@Component({
  selector: 'abs-about',
  template: `
    <div class="container">
      <h1>About</h1>
      <p>
        This project will help you to get started building modern web apps with Angular and Bazel.
      </p>
      <span class="line"></span>
      <div class="tags">
        <span *ngFor="let tag of tags">{{ tag }}</span>
      </div>
    </div>
  `,
  styleUrls: ['about.component.sass'],
})
export class AboutComponent {
  tags = Object.keys(Tags).map(key => Tags[key])
}
