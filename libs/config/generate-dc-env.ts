import * as fs from 'fs'
import * as path from 'path'

const outFile = process.argv[2]

// TODO dont hardcode docker compose env
const env = `
ENVIRONMENT=dev

API_URL=http://localhost:3000
WEBSOCKET_URL=ws://localhost:3000
CLIENT_URL=http://localhost:8080

AUTH_TOKEN_SECRET=change_me

WEB_PUSH_VAPID_PUBLIC_KEY=BME74zSeApXmd05j-p0Y9dmGUrzGIphqaPPjaMDuiA5f_Bez6IPmMU45_s7xmTRWIvzMFnf-y5qeT5jQlK1eUso
WEB_PUSH_VAPID_PRIVATE_KEY=3vMSOMYoxnGsnhZ48cLgUO5yOeCxlP3qe6XOlo63UkA

GOOGLE_SIGN_IN_CLIENT_ID=change_me
GOOGLE_SIGN_IN_CLIENT_SECRET=change_me

MYSQL_HOST=fullbazel_mysql
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_DATABASE=db
MYSQL_PASSWORD=password

KAFKA_SEED_BROKER=kafka:9092
`

async function main() {
  await fs.promises.writeFile(path.join(outFile), env)
}

main()
