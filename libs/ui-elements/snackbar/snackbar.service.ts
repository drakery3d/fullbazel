import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'

import {SnackbarOptions} from './snackbar.state'

@Injectable()
export class SnackbarService {
  private subject = new Subject<SnackbarOptions>()
  public state = this.subject.asObservable()

  show(content: string, action = 'Ok', duration = 3000, icon?: string, onAction?: () => void) {
    this.subject.next({content, action, duration, icon, onAction})
  }
}
