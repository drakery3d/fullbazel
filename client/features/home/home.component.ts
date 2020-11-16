import {Component} from '@angular/core'

@Component({
  selector: 'abs-home',
  template: `
    <div class="container">
      <h1>Angular Bazel Starter</h1>
      <p>Let's build something great!</p>
      <span class="line"></span>
      <a routerLink="/about"><button>About</button></a>
    </div>
  `,
  styleUrls: ['home.component.sass'],
})
export class HomeComponent {}
