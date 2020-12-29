import {runServer} from '@bazel/protractor/protractor-utils'
import {browser} from 'protractor'
import * as path from 'path'

module.exports = async function (config: any) {
  const bazelTargetName = path.basename(config.server, path.extname(config.server))
  let portFlag: string
  switch (bazelTargetName) {
    case 'pwa_server': {
      portFlag = '-p'
      break
    }
    case 'dev_server': {
      portFlag = '-port'
      break
    }
    default: {
      portFlag = ''
      break
    }
  }

  const serverSpec = await runServer(config.workspace, config.server, portFlag, [])
  const serverUrl = `http://localhost:${serverSpec.port}`
  browser.baseUrl = serverUrl
}
