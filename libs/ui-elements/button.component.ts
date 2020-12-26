import {Component} from '@angular/core'

@Component({
  selector: 'app-button',
  template: ` <button><ng-content></ng-content></button> `,
  styleUrls: ['button.component.sass'],
})
export class ButtonComponent {}
