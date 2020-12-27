import * as fs from 'fs'
import * as path from 'path'

export const configsDir = 'configs'
export const secretsDir = 'secrets'

const configSuffix = '.config.json'
const secretsSuffix = '.secrets.json'

export const readConfig = async (env: string) => {
  const filepath = path.join(__dirname, configsDir, env + configSuffix)
  const {$schema, ...config} = await readFileAsJson(filepath)
  return config
}

export const readSecrets = async (env: string) => {
  const filepath = path.join(__dirname, secretsDir, env + secretsSuffix)
  const {$schema, ...secrets} = await readFileAsJson(filepath)
  return secrets
}

const readFileAsJson = async (filepath: string) => {
  const str = await fs.promises.readFile(filepath)
  return JSON.parse(str.toString()) as any
}
