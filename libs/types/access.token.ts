import {TokenExpiration} from '@libs/enums'

import {Token} from './token'

interface AccessTokenPayload {
  userId: string
}

export class AccessToken extends Token<AccessTokenPayload> {
  constructor(public readonly userId: string) {
    super(TokenExpiration.Access)
  }

  static fromString(token: string, secret: string) {
    const decoded = Token.decode<AccessTokenPayload>(token, secret)
    return new AccessToken(decoded.userId)
  }

  protected get serializedPayload() {
    return {userId: this.userId}
  }
}
