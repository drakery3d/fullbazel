import {promises as fsPromises} from 'fs'
import * as path from 'path'

// TODO use dev prod from enums lib
async function main() {
  const environment = process.argv.slice(2)[0] || 'dev'
  const environments = ['dev', 'prod']
  if (!environments.includes(environment))
    throw `Argument ${environment} is not a valid environment`

  const envTemplateFile = path.join(__dirname, `${environment}.environment.ts`)
  const envFile = path.join(__dirname, `environment.ts`)

  const content = await fsPromises.readFile(envTemplateFile)
  await fsPromises.writeFile(envFile, content)
}

main()
