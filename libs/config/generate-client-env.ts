import * as fs from 'fs'
import * as path from 'path'
import {Project, ts} from 'ts-morph'

import {readConfig} from './utils'

const ruleDir = process.argv[2]
const environment = process.argv[3]

async function main() {
  // TODO later use typed conig
  const config = await readConfig(environment)
  const project = new Project()
  const tsFile = project.createSourceFile('file.ts', `export const env = {};`)
  const objLiteral = tsFile
    .getVariableDeclarationOrThrow('env')
    .getInitializerIfKindOrThrow(ts.SyntaxKind.ObjectLiteralExpression)

  const env = {
    env: environment,
    api: config.api,
    vapidPublicKey: config.vapidPublicKey,
  }

  objLiteral.addPropertyAssignments(
    Object.keys(env).map(key => ({
      name: key,
      initializer: writer => writer.quote((env as any)[key]),
    })),
  )

  await fs.promises.writeFile(path.join(ruleDir, 'client.environment.ts'), tsFile.getFullText())
}

main()
