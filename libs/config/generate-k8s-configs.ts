import * as fs from 'fs'
import * as yaml from 'yaml'
import * as flatten from 'flat'

import {Environment} from '@libs/enums'
import {readConfig} from './utils'

const outfile = process.argv[2]
const environment = Environment.Production

async function main() {
  const config = await readConfig(environment)
  const content = yaml.stringify(k8sConfig(flatten(config)))
  await fs.promises.writeFile(outfile, content)
}

function k8sConfig(data: object) {
  return {
    apiVersion: 'v1',
    kind: 'ConfigMap',
    metadata: {
      name: 'config',
    },
    data,
  }
}

main()
