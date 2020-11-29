import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'yaml'

import {flattenObject} from './flatten-object'
import {readSecrets, secretsDir} from './utils'

const ruleDir = process.argv[2]
const secretsSuffix = '.secrets.yaml'

async function main() {
  const files = await fs.promises.readdir(path.join(__dirname, secretsDir))
  await Promise.all(
    files.map(async file => {
      const environment = file.split('.')[0]
      const secrets = await readSecrets(environment)
      const flat = flattenObject(secrets)
      const content = yaml.stringify(k8sSecrets(flat))
      const outFile = `${environment}${secretsSuffix}`
      await fs.promises.writeFile(path.join(ruleDir, outFile), content)
    }),
  )
}

function k8sSecrets(data: object) {
  return {
    apiVersion: 'v1',
    kind: 'Secret',
    type: 'Opaque',
    metadata: {
      name: 'secrets',
    },
    stringData: data,
  }
}

main()
