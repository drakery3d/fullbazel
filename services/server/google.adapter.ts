import axios from 'axios'
import {injectable} from 'inversify'
import * as queryString from 'query-string'

import {Config} from '@libs/config'

interface UserInfo {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  picture: string
  locale: string
}

enum GoogleApi {
  EmailScope = 'https://www.googleapis.com/auth/userinfo.email',
  ProfileScope = 'https://www.googleapis.com/auth/userinfo.profile',
  SignIn = 'https://accounts.google.com/o/oauth2/v2/auth',
  Token = 'https://oauth2.googleapis.com/token',
  UserInfo = 'https://www.googleapis.com/oauth2/v2/userinfo',
}

@injectable()
export class GoogleAdapter {
  private readonly googleClientId = this.config.get('googleClientId')
  private readonly googleClientSecret = this.config.get('secrets_googleClientSecret')
  private readonly googleRedirectUrl = this.config.get('client')
  constructor(private config: Config) {}

  get signInUrl() {
    const params = queryString.stringify({
      client_id: this.googleClientId,
      redirect_uri: this.googleRedirectUrl,
      scope: [GoogleApi.EmailScope, GoogleApi.ProfileScope].join(' '),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    })
    return `${GoogleApi.SignIn}?${params}`
  }

  async getAccessToken(code: string) {
    const tokenResponse = await axios.post(GoogleApi.Token, {
      client_id: this.googleClientId,
      client_secret: this.googleClientSecret,
      redirect_uri: this.googleRedirectUrl,
      grant_type: 'authorization_code',
      code,
    })
    return tokenResponse.data.access_token as string
  }

  async getUserInfo(accessToken: string) {
    const {data} = await axios.get<UserInfo>(GoogleApi.UserInfo, {
      headers: {Authorization: `Bearer ${accessToken}`},
    })
    return data
  }
}
