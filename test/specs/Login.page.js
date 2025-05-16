import loginPage from '../pageobjects/login.page.js'
describe('Login Page E2E Test',async()=>{
   xit('Checking Login Page UI Elements Visibility--smoke',async()=>{
    await browser.url('https://www.saucedemo.com/')
    const userNameField =  await loginPage.inputUsername
    const userPasswordField = await loginPage.inputPassword
    const userSubmitButton = await loginPage.btnLogin
    const siteLogo = await loginPage.siteLogo
    await expect(siteLogo).toBePresent()
    await expect(userNameField).toBePresent()
    await expect(userPasswordField).toBePresent()
    await expect(userSubmitButton).toBePresent()
   })

   it('Login with valid credentials--regression',async()=>{
      await browser.url('/')
      await loginPage.login('standard_user','secret_sauce')
      await expect(browser).toHaveUrl(expect.stringContaining('inventory'))
   })
})