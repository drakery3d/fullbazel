import {FlatConfigKeys} from '@generated/config/flat-config-keys'

/**
 * Only use this class in backend services
 * It depends on environment variables!
 */
export class Config {
  constructor(private config: Record<FlatConfigKeys | string, string> = {}) {}

  get(key: FlatConfigKeys, fallback?: string) {
    const value = this.config[key] || process.env[key] || fallback
    if (!value) throw `No config value for key ${key} found.`
    return value
  }

  override(key: FlatConfigKeys, value: string) {
    this.config[key] = value
  }
}
