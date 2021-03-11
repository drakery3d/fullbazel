import {FlatConfigKeys} from '@generated/config/flat-config-keys'
import {injectable, unmanaged} from 'inversify'

@injectable()
export class Config<T extends string = FlatConfigKeys> {
  constructor(@unmanaged() private config: Record<string, string> = {}) {}

  get(key: T, fallback?: string) {
    const value = this.getByKey(key, fallback)
    if (value === undefined) throw new Error(`No config value for key ${key} found`)
    return value
  }

  getArray(firstKey: T) {
    const first = this.getByKey(firstKey)
    if (first === undefined) throw new Error(`No config value for ${firstKey} found`)

    const array: string[] = []
    let index = 0
    const keyBase = firstKey.substring(0, firstKey.length - 2)
    let value = this.getByKey(`${keyBase}_${index}` as T)
    while (value) {
      array.push(value)
      index++
      value = this.getByKey(`${keyBase}_${index}` as T)
    }

    return array
  }

  override(key: T, value: string) {
    this.config[key] = value
  }

  private getByKey(key: T, fallback?: string) {
    const value = this.config[key] === undefined ? process.env[key] : this.config[key]
    if (value === undefined) return fallback
    return value
  }
}
