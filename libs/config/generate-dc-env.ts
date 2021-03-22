import * as fs from 'fs'
import * as path from 'path'

const outFile = process.argv[2]

// TODO dont hardcode docker compose env
const env = `
environment=dev
api=http://localhost:3000
websocket=ws://localhost:3000
client=http://localhost:8080
vapidPublicKey=BME74zSeApXmd05j-p0Y9dmGUrzGIphqaPPjaMDuiA5f_Bez6IPmMU45_s7xmTRWIvzMFnf-y5qeT5jQlK1eUso
googleClientId=change_me
mysqlDatabase_host=fullbazel_mysql
mysqlDatabase_port=3306
mysqlDatabase_user=root
mysqlDatabase_database=db
kafka_brokers_0=kafka:9092
secrets_tokens_auth=change_me
secrets_mysqlDatabase_password=password
secrets_googleClientSecret=change_me
secrets_vapidPrivateKey=3vMSOMYoxnGsnhZ48cLgUO5yOeCxlP3qe6XOlo63UkA
secrets_kafka_apiSecret=change_me
`

async function main() {
  await fs.promises.writeFile(path.join(outFile), env)
}

main()
