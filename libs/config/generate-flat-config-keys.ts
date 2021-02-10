import * as flatten from 'flat'
import * as fs from 'fs'
import {Project} from 'ts-morph'

import {Environment} from '@libs/enums'

import {readConfig, readSecrets} from './utils'

const outfile = process.argv[2]
const environment = Environment.Production

async function main() {
  const [config, secrets] = await Promise.all([readConfig(environment), readSecrets(environment)])
  const merged = {...config, secrets}
  const flat: Record<string, string> = flatten(merged, {delimiter: '_'})

  const project = new Project()
  const tsFile = project.createSourceFile('file.ts', `export type FlatConfigKeys = '';`)

  tsFile.getTypeAliasOrThrow('FlatConfigKeys').setType(writer => {
    for (const key in flat) {
      writer.write('|')
      writer.space()
      writer.quote(key)
    }
  })

  await fs.promises.writeFile(outfile, tsFile.getFullText())
}

main()
