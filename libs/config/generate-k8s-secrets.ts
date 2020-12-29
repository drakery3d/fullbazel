import * as fs from 'fs'
import * as yaml from 'yaml'

import {Environment} from '@libs/enums'
import {flattenObject} from './flatten-object'
import {readSecrets} from './utils'

const outfile = process.argv[2]
const environment = Environment.Production

async function main() {
  const secrets = await readSecrets(environment)
  const flat = flattenObject({secrets})
  const content = yaml.stringify(k8sSecrets(flat))
  await fs.promises.writeFile(outfile, content)
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
