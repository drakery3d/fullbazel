import * as fs from 'fs'
import * as path from 'path'

export const configsDir = 'configs'
export const secretsDir = 'secrets'

const configSuffix = '.config.json'
export const readConfig = async (env: string) => {
  const filepath = path.join(__dirname, configsDir, env + configSuffix)
  const str = await fs.promises.readFile(filepath)
  const {$schema, ...config} = JSON.parse(str.toString())
  return config
}

const secretsSuffix = '.secrets.json'
export const readSecrets = async (env: string) => {
  const filepath = path.join(__dirname, secretsDir, env + secretsSuffix)
  const str = await fs.promises.readFile(filepath)
  const {$schema, ...secrets} = JSON.parse(str.toString())
  return secrets
}
