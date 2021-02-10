import * as flatten from 'flat'
import * as fs from 'fs'
import * as yaml from 'yaml'

import {Environment} from '@libs/enums'

import {readSecrets} from './utils'

const outfile = process.argv[2]
const environment = Environment.Production

async function main() {
  const secrets = await readSecrets(environment)
  const flat: Record<string, string> = flatten({secrets}, {delimiter: '_'})
  const content = yaml.stringify(k8sSecrets(flat))
  await fs.promises.writeFile(outfile, content)
}

// eslint-disable-next-line @typescript-eslint/ban-types
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
