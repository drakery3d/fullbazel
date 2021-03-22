import {injectable, unmanaged} from 'inversify'

@injectable()
export class Config {
  constructor(@unmanaged() private config: Record<string, string> = {}) {}

  get(key: string, fallback?: string) {
    const value = this.getByKey(key, fallback)
    if (value === undefined) throw new Error(`No config value for key ${key} found`)
    return value
  }

  getArray(firstKey: string) {
    const first = this.getByKey(firstKey)
    if (first === undefined) throw new Error(`No config value for ${firstKey} found`)

    const array: string[] = []
    let index = 0
    const keyBase = firstKey.substring(0, firstKey.length - 2)
    let value = this.getByKey(`${keyBase}_${index}`)
    while (value) {
      array.push(value)
      index++
      value = this.getByKey(`${keyBase}_${index}`)
    }

    return array
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
