import * as fs from 'fs'
import {compile} from 'json-schema-to-typescript'
import * as path from 'path'

const outfile = process.argv[2]

async function main() {
  const filepath = path.join(__dirname, 'configs', 'config.schema.json')
  const fileBuffer = await fs.promises.readFile(filepath)
  const schema = JSON.parse(fileBuffer.toString()) as any
  const ts = await compile(schema, 'Config')
  await fs.promises.writeFile(outfile, ts)
}

main()
