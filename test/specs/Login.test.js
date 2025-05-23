import {expect as chaiExpect} from 'chai'
const loginPage = require('../pageobjects/login.page');
describe('Login Page Test',async()=>{
   it('Checking Login Page UI Elements Visibility--Smoke, Regression',async()=>{
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

   it('Login with valid credentials--Smoke, Regression',async()=>{
      await browser.url('/')
      await loginPage.login('standard_user','secret_sauce')
      await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));
      const productText = await $('.title').getText()
      chaiExpect(await productText).to.equal('Products')
   })

   it('Login with invalid credentials--Regression',async()=>{
      await browser.url('/')
      await loginPage.login('dards_user','secrret_sauce')
      const errorMessageContainer = await $('.error-message-container')
      await expect(errorMessageContainer).toBeDisplayed()
      const errorText = await $("h3[data-test='error']").getText()
      chaiExpect(await errorText).to.eql('Epic sadface: Username and password do not match any user in this service')
   })
   it('Login with locked out user--Regression',async()=>{
      await browser.url('/')
      await loginPage.login('locked_out_user','secret_sauce')
      const errorMessageContainer = await $('.error-message-container')
      await expect(errorMessageContainer).toBeDisplayed()
      const errorText = await $("h3[data-test='error']").getText()
      chaiExpect(await errorText).to.eql('Epic sadface: Sorry, this user has been locked out.')
   })
})