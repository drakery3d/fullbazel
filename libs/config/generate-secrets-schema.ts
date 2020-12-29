import * as fs from 'fs'
import * as path from 'path'
import {compile} from 'json-schema-to-typescript'

const outfile = process.argv[2]

async function main() {
  const filepath = path.join(__dirname, 'secrets', 'secret.schema.json')
  const fileBuffer = await fs.promises.readFile(filepath)
  const schema = JSON.parse(fileBuffer.toString()) as any
  const ts = await compile(schema, 'Secrets')
  await fs.promises.writeFile(outfile, ts)
}

main()
