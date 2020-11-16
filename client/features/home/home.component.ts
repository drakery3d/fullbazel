import {Component} from '@angular/core'

import {Tags} from '@libs/enums'

@Component({
  selector: 'abs-home',
  template: `
    <div class="container">
      <h1>Angular Bazel Starter</h1>
      <p>Let's build something great!</p>
      <span class="line"></span>
      <div class="tags">
        <span *ngFor="let tag of tags">{{ tag }}</span>
      </div>
    </div>
  `,
  styleUrls: ['home.component.sass'],
})
export class HomeComponent {
  tags = Object.keys(Tags).map(key => Tags[key])
}
