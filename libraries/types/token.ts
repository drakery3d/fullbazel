import * as jwt from 'jsonwebtoken'

export abstract class Token<T> {
  protected constructor(private readonly expiresInSeconds: number) {}

  static decode<T>(token: string, secret: string) {
    try {
      return (jwt.verify(token, secret) as unknown) as T
    } catch (error) {
      if (error.message === 'invalid signature') throw new Error('Invalid token secret')
      throw new Error('Invalid token')
    }
  }

  sign(secret: string, expiresInSeconds = this.expiresInSeconds) {
    return jwt.sign(Object(this.serializedPayload), secret, {expiresIn: expiresInSeconds})
  }

  protected abstract serializedPayload: T
}
