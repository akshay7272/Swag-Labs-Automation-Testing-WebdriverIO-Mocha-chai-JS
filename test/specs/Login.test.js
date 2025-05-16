import {expect as chaiExpect} from 'chai'
import loginPage from '../pageobjects/login.page.js'
describe('Login Page E2E Test',async()=>{
   xit('Checking Login Page UI Elements Visibility--smoke',async()=>{
    await browser.url('/')
    const userNameField =  await loginPage.inputUsername
    const userPasswordField = await loginPage.inputPassword
    const userSubmitButton = await loginPage.btnLogin
    const siteLogo = await loginPage.siteLogo
    await expect(siteLogo).toBePresent()
    await expect(userNameField).toBePresent()
    await expect(userPasswordField).toBePresent()
    await expect(userSubmitButton).toBePresent()
   })

   xit('Login with valid credentials--regression',async()=>{
      await browser.url('/')
      await loginPage.login('standard_user','secret_sauce')
      await expect(browser).toHaveUrl(expect.stringContaining('inventory'))
      const productText = await $('.title').getText()
      chaiExpect(await productText).to.equal('Products')
   })

   xit('Login with invalid credentials',async()=>{
      await browser.url('/')
      await loginPage.login('dards_user','secrret_sauce')
      const errorMessageContainer = await $('.error-message-container')
      await expect(errorMessageContainer).toBeDisplayed()
      const errorText = await $("h3[data-test='error']").getText()
      chaiExpect(await errorText).to.eql('Epic sadface: Username and password do not match any user in this service')
   })
   xit('Login with locked out user',async()=>{
      await browser.url('/')
      await loginPage.login('locked_out_user','secret_sauce')
      const errorMessageContainer = await $('.error-message-container')
      await expect(errorMessageContainer).toBeDisplayed()
      const errorText = await $("h3[data-test='error']").getText()
      chaiExpect(await errorText).to.eql('Epic sadface: Sorry, this user has been locked out.')
   })
})