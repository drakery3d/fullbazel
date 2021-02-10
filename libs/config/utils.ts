import {Config} from '@generated/config/config.schema'
import {Secrets} from '@generated/config/secret.schema'
import * as fs from 'fs'
import * as path from 'path'

const configsDir = 'configs'
const secretsDir = 'secrets'
const configSuffix = '.config.json'
const secretsSuffix = '.secrets.json'

const readConfig = async (env: string) => {
  const filepath = path.join(__dirname, configsDir, env + configSuffix)
  const config = (await readFileAsJson(filepath)) as Config
  delete config.$schema
  return config
}

const readSecrets = async (env: string) => {
  const filepath = path.join(__dirname, secretsDir, env + secretsSuffix)
  const secrets = (await readFileAsJson(filepath)) as Secrets
  delete secrets.$schema
  return secrets
}

const readFileAsJson = async (filepath: string) => {
  const fileBuffer = await fs.promises.readFile(filepath)
  return JSON.parse(fileBuffer.toString()) as unknown
}

export {configsDir, readConfig, readSecrets}
