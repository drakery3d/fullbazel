import {Component} from '@angular/core'

@Component({
  selector: 'abs-root',
  template: `
    <button [routerLink]="['']">Home</button>
    <button [routerLink]="['about']">About</button>
    <br />
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.sass'],
})
export class AppComponent {}
