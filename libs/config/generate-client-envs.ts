import * as fs from 'fs'
import * as path from 'path'
import {Project, ts} from 'ts-morph'

import {Config} from '@generated/config/config.schema'

import {configsDir, readConfig} from './utils'

const ruleDir = process.argv[2]

function buildEnv(config: Config, environment: string) {
  return {
    env: environment,
    api: config.api,
    vapidPublicKey: config.vapidPublicKey,
  }
}

async function main() {
  const files = await fs.promises.readdir(path.join(__dirname, configsDir))

  await Promise.all(
    files.map(async file => {
      const environment = file.split('.')[0]
      const config = await readConfig(environment)

      const project = new Project()
      const tsFile = project.createSourceFile('file.ts', `const env = {};\nexport default env;`)
      const objLiteral = tsFile
        .getVariableDeclarationOrThrow('env')
        .getInitializerIfKindOrThrow(ts.SyntaxKind.ObjectLiteralExpression)

      const env = buildEnv(config, environment)

      objLiteral.addPropertyAssignments(
        Object.keys(env).map(key => ({
          name: key,
          initializer: writer => writer.quote((env as any)[key]),
        })),
      )

      await fs.promises.writeFile(
        path.join(ruleDir, `client.environment.${environment}.ts`),
        tsFile.getFullText(),
      )
    }),
  )
}

main()
