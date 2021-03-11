import {Config} from '@generated/config/config.schema'
import * as fs from 'fs'
import * as path from 'path'
import * as queryString from 'query-string'
import {Project, ts} from 'ts-morph'

import {configsDir, readConfig} from './utils'

const ruleDir = process.argv[2]

enum GoogleApi {
  EmailScope = 'https://www.googleapis.com/auth/userinfo.email',
  ProfileScope = 'https://www.googleapis.com/auth/userinfo.profile',
  SignIn = 'https://accounts.google.com/o/oauth2/v2/auth',
}

function generateGoogleSignInUrl(config: Config) {
  const params = queryString.stringify({
    client_id: config.googleClientId,
    redirect_uri: config.client,
    scope: [GoogleApi.EmailScope, GoogleApi.ProfileScope].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  })
  return `${GoogleApi.SignIn}?${params}`
}

function buildEnv(config: Config, environment: string) {
  return {
    env: environment,
    api: config.api,
    websocket: config.websocket,
    vapidPublicKey: config.vapidPublicKey,
    googleSignInUrl: generateGoogleSignInUrl(config),
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
