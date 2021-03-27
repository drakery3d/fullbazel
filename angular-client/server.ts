import 'zone.js/dist/zone-node'

import {enableProdMode} from '@angular/core'
import {ngExpressEngine} from '@nguniversal/express-engine'
import * as express from 'express'
import {join} from 'path'

import {AppServerModule} from './app/app.server.module'

enableProdMode()

const app = express()
const PORT = Number(process.argv[3]) || process.env.PORT || 8080
const DIST_FOLDER = join(process.cwd(), 'angular-client/pwa')

app.engine('html', ngExpressEngine({bootstrap: AppServerModule}))
app.set('view engine', 'html')
app.set('views', DIST_FOLDER)

app.get('*.*', express.static(DIST_FOLDER, {maxAge: '1y'}))
app.get('*', (req, res) => res.render('index', {req, res}))

app.listen(PORT, () => console.log(`🚀 Client server listening on http://localhost:${PORT}`))
