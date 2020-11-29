import * as fs from 'fs'
import * as path from 'path'

import {flattenObject} from './flatten-object'
import {readConfig, readSecrets} from './utils'

const outFile = process.argv[2]

const environment = 'dev'

async function main() {
  const [config, secrets] = await Promise.all([readConfig(environment), readSecrets(environment)])
  const merged = {...config, secrets}
  const flat: any = flattenObject(merged)
  let content = ''
  for (const key in flat) {
    content += key + '=' + flat[key] + '\n'
  }
  await fs.promises.writeFile(path.join(outFile), content)
}

main()
