import * as flatten from 'flat'
import * as fs from 'fs'
import * as yaml from 'yaml'

import {Environment} from '@libs/enums'

import {readConfig} from './utils'

const outfile = process.argv[2]
const environment = Environment.Production

async function main() {
  const config = await readConfig(environment)
  const content = yaml.stringify(k8sConfig(flatten(config, {delimiter: '_'})))
  await fs.promises.writeFile(outfile, content)
}

// eslint-disable-next-line @typescript-eslint/ban-types
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
