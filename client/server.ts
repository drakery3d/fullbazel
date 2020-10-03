import 'zone.js/dist/zone-node'

import {ngExpressEngine} from '@nguniversal/express-engine'
import {enableProdMode} from '@angular/core'
import * as express from 'express'
import {join} from 'path'

import {AppServerModule} from './app/app.server.module'

enableProdMode()

const app = express()
const PORT = process.env.PORT || 4000
const DIST_FOLDER = join(process.cwd(), 'client/web_pwa')

app.engine('html', ngExpressEngine({bootstrap: AppServerModule}) as any)
app.set('view engine', 'html')
app.set('views', DIST_FOLDER)

app.get('*.*', express.static(DIST_FOLDER, {maxAge: '1y'}))
app.get('*', (req, res) => res.render('index', {req, res}))

app.listen(PORT, () => console.log(`🚀 Client server listening on http://localhost:${PORT}`))
