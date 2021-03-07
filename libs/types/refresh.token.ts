import {TokenExpiration} from '@libs/enums'

import {Token} from './token'

interface RefreshTokenPayload {
  userId: string
  count: number
}

export class RefreshToken extends Token<RefreshTokenPayload> {
  constructor(public readonly userId: string, public readonly count: number) {
    super(TokenExpiration.Refresh)
  }

  static fromString(token: string, secret: string) {
    const decoded = Token.decode<RefreshTokenPayload>(token, secret)
    return new RefreshToken(decoded.userId, decoded.count)
  }

  protected get serializedPayload() {
    return {
      userId: this.userId,
      count: this.count,
    }
  }
}
