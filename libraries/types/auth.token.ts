import {TokenExpiration} from '@libs/enums'

import {Token} from './token'

interface AuthTokenPayload {
  userId: string
  count: number
}

export class AuthToken extends Token<AuthTokenPayload> {
  constructor(public readonly userId: string, public readonly count: number) {
    super(TokenExpiration.Auth)
  }

  static fromString(token: string, secret: string) {
    const decoded = Token.decode<AuthTokenPayload>(token, secret)
    return new AuthToken(decoded.userId, decoded.count)
  }

  protected get serializedPayload() {
    return {
      userId: this.userId,
      count: this.count,
    }
  }
}
