import {AppPage} from './app.po'
// import {browser, logging} from 'protractor'

describe('Angular Client', () => {
  let page: AppPage

  beforeEach(() => {
    page = new AppPage()
  })

  it('displays title message', async () => {
    await page.navigateTo()
    const title = await page.getTitleText()
    expect(title).toEqual('Fullstack Bazel')
  })

  // TODO fix error in browser console
  /* afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER)
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry),
    )
  }) */
})
