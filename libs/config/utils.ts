import * as fs from 'fs'
import * as path from 'path'

import {Config} from '@generated/config/config.schema'
import {Secrets} from '@generated/config/secret.schema'

const configsDir = 'configs'
const secretsDir = 'secrets'
const configSuffix = '.config.json'
const secretsSuffix = '.secrets.json'

const readConfig = async (env: string) => {
  const filepath = path.join(__dirname, configsDir, env + configSuffix)
  const {$schema, ...config}: Config = await readFileAsJson(filepath)
  return config
}

const readSecrets = async (env: string) => {
  const filepath = path.join(__dirname, secretsDir, env + secretsSuffix)
  const {$schema, ...secrets}: Secrets = await readFileAsJson(filepath)
  return secrets
}

const readFileAsJson = async (filepath: string) => {
  const fileBuffer = await fs.promises.readFile(filepath)
  return JSON.parse(fileBuffer.toString()) as any
}

export {configsDir, readConfig, readSecrets}
