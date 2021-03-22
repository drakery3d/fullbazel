import * as fs from 'fs'
import * as path from 'path'
import * as queryString from 'query-string'
import {Project, ts} from 'ts-morph'

const ruleDir = process.argv[2]

enum GoogleApi {
  EmailScope = 'https://www.googleapis.com/auth/userinfo.email',
  ProfileScope = 'https://www.googleapis.com/auth/userinfo.profile',
  SignIn = 'https://accounts.google.com/o/oauth2/v2/auth',
}

function generateGoogleSignInUrl(client: string, googleClientId: string) {
  const params = queryString.stringify({
    client_id: googleClientId,
    redirect_uri: client,
    scope: [GoogleApi.EmailScope, GoogleApi.ProfileScope].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  })
  return `${GoogleApi.SignIn}?${params}`
}

// TODO don't hardcode
function buildEnv(environment: string) {
  const googleClientId = '' // TODO googleClientId

  if (environment === 'dev') {
    const client = 'http://localhost:8080'
    return {
      env: environment,
      api: 'http://localhost:3000',
      websocket: 'ws://localhost:3000',
      vapidPublicKey: 'TODO',
      googleSignInUrl: generateGoogleSignInUrl(client, googleClientId),
    }
  }

  const client = 'https://fullbazel.drakery.com'
  return {
    env: environment,
    api: 'https://api.fullbazel.drakery.com',
    websocket: 'wss://fullbazel.drakery.com',
    vapidPublicKey: 'TODO',
    googleSignInUrl: generateGoogleSignInUrl(client, googleClientId),
  }
}

async function main() {
  const environments = ['dev', 'prod']

  await Promise.all(
    environments.map(async environment => {
      const project = new Project()
      const tsFile = project.createSourceFile('file.ts', `const env = {};\nexport default env;`)
      const objLiteral = tsFile
        .getVariableDeclarationOrThrow('env')
        .getInitializerIfKindOrThrow(ts.SyntaxKind.ObjectLiteralExpression)

      const env = buildEnv(environment)

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
