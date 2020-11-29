import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'yaml'

import {flattenObject} from './flatten-object'
import {configsDir, readConfig} from './utils'

const ruleDir = process.argv[2]
const configSuffix = '.config.yaml'

async function main() {
  const files = await fs.promises.readdir(path.join(__dirname, configsDir))
  await Promise.all(
    files.map(async file => {
      const environment = file.split('.')[0]
      const config = await readConfig(environment)
      const flat = flattenObject(config)
      const content = yaml.stringify(k8sConfig(flat))
      const outFile = `${environment}${configSuffix}`
      await fs.promises.writeFile(path.join(ruleDir, outFile), content)
    }),
  )
}

function k8sConfig(data: object) {
  return {
    apiVersion: 1,
    kind: 'ConfigMap',
    metadata: {
      name: 'config',
    },
    data,
  }
}

main()
