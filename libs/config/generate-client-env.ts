import * as fs from 'fs'
import * as path from 'path'
import {Project, ts} from 'ts-morph'

import {readConfig} from './utils'

const ruleDir = process.argv[2]
const environment = process.argv[3]

async function main() {
  const config = await readConfig(environment)
  const project = new Project()
  const tsFile = project.createSourceFile('file.ts', `export const environment = {};`)
  const objLiteral = tsFile
    .getVariableDeclarationOrThrow('environment')
    .getInitializerIfKindOrThrow(ts.SyntaxKind.ObjectLiteralExpression)
  objLiteral.addPropertyAssignments([
    {name: 'env', initializer: writer => writer.quote(environment)},
    {name: 'api', initializer: writer => writer.quote(config.api)},
  ])
  await fs.promises.writeFile(path.join(ruleDir, 'client.environment.ts'), tsFile.getFullText())
}

main()
