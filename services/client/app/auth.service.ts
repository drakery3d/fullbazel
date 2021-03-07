import {HttpClient} from '@angular/common/http'
import {Inject, Injectable} from '@angular/core'

import {ClientEnvironment, ENVIRONMENT} from '@client/environment'
import {User} from '@libs/schema'

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT) private environment: ClientEnvironment,
  ) {}

  signIn(code?: string) {
    return this.http.post<{accessToken: string; user: User}>(
      `${this.environment.api}/signin`,
      {code},
      {withCredentials: true},
    )
  }
}
