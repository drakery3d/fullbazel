import {injectable, unmanaged} from 'inversify'

@injectable()
export class Config {
  constructor(@unmanaged() private config: Record<string, string> = {}) {}

  get(key: string, fallback?: string) {
    const value = this.getByKey(key, fallback)
    if (value === undefined) throw new Error(`No config value for key ${key} found`)
    return value
  }

  override(key: string, value: string) {
    this.config[key] = value
  }

  private getByKey(key: string, fallback?: string) {
    const value = this.config[key] === undefined ? process.env[key] : this.config[key]
    if (value === undefined) return fallback
    return value
  }
}
