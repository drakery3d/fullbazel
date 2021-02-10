import * as fs from 'fs'
import {compile} from 'json-schema-to-typescript'
import * as path from 'path'

const outfile = process.argv[2]

async function main() {
  const filepath = path.join(__dirname, 'secrets', 'secret.schema.json')
  const fileBuffer = await fs.promises.readFile(filepath)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schema = JSON.parse(fileBuffer.toString()) as any
  const ts = await compile(schema, 'Secrets')
  await fs.promises.writeFile(outfile, ts)
}

main()
