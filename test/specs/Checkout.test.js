const cartPage = require("../pageobjects/cart.page");
const loginPage = require("../pageobjects/login.page");
const Checkout = require("../pageobjects/checkout.page")
const fs = require("../testdata/cartproducts.json");
const assert = require("assert");
import { expect as chaiExpect } from "chai";

describe('Checkout Flow Tests',async()=>{
      fs.forEach(({ productsData }) => {
        it("Checkout with valid info--Smoke, Regression, Sanity, E2E", async () => {
          await browser.url("/");
          await loginPage.login("standard_user", "secret_sauce");
          const productText = await $(".title").getText();
          expect(productText).toEqual("Products");
          await cartPage.AddProductsToCart(productsData);
          await cartPage.CartPage.click();
          const cartTitle = await $(".title").getText();
          chaiExpect(await cartTitle).to.eqls("Your Cart");
          const data = await cartPage.MatchAddedCartItems();
        //   console.log([...data], "first");
        //   console.log([...productsData], "first1");
          assert.deepStrictEqual([...data].sort(), [...productsData].sort());         
          await Checkout.CheckoutBtn.click()
          const CheckoutInfoTitle = await Checkout.CheckoutInformationPageTitle.getText()
          await chaiExpect(CheckoutInfoTitle).to.eql('Checkout: Your Information')
          await Checkout.CheckoutFullDetailsCheckout('Akshay','Kumar','154356')
          const CheckoutOverviewPageTitle = await Checkout.CheckoutOverviewPageTitle.getText()
          chaiExpect(CheckoutOverviewPageTitle).to.eql('Checkout: Overview')
          const FinishBtn = await Checkout.CheckoutFinishButton
          await FinishBtn.scrollIntoView()
          await FinishBtn.click()
          const CheckoutCompletePageTitle = await Checkout.CheckoutCompletePageTitle.getText()
          const CheckoutConfirmMsg = await Checkout.CheckoutConfirmMessage.getText()
          chaiExpect(CheckoutCompletePageTitle).to.eql('Checkout: Complete!')
          chaiExpect(CheckoutConfirmMsg).to.be.eqls('Thank you for your order!')

        });
      });

        fs.forEach(({ productsData }) => {
        it("Checkout with missing info--Regression, Sanity, E2E", async () => {
          await browser.url("/");
          await loginPage.login("standard_user", "secret_sauce");
          const productText = await $(".title").getText();
          expect(productText).toEqual("Products");
          await cartPage.AddProductsToCart(productsData);
          await cartPage.CartPage.click();
          const cartTitle = await $(".title").getText();
          chaiExpect(await cartTitle).to.eqls("Your Cart");
          const data = await cartPage.MatchAddedCartItems();
          assert.deepStrictEqual([...data].sort(), [...productsData].sort());         
          await Checkout.CheckoutBtn.click()
          const CheckoutInfoTitle = await Checkout.CheckoutInformationPageTitle.getText()
          await chaiExpect(CheckoutInfoTitle).to.eql('Checkout: Your Information')
          await Checkout.CheckoutMissingDetailsCheckout('Akshay','154356')
          const ErrorContainer = await Checkout.CheckoutErrorContainer
          await expect(ErrorContainer.$("h3[data-test='error']")).toHaveText(expect.stringContaining('Error:'))
        });
      });
      fs.forEach(({ productsData }) => {
        it("Verify order summary and finish--Smoke, Regression, Sanity, E2E", async () => {
          await browser.url("/");
          await loginPage.login("standard_user", "secret_sauce");
          const productText = await $(".title").getText();
          expect(productText).toEqual("Products");
          await cartPage.AddProductsToCart(productsData);
          await cartPage.CartPage.click();
          const cartTitle = await $(".title").getText();
          chaiExpect(await cartTitle).to.eqls("Your Cart");
          const data = await cartPage.MatchAddedCartItems();
          await assert.deepStrictEqual([...data].sort(), [...productsData].sort());         
          await Checkout.CheckoutBtn.click()
          const CheckoutInfoTitle = await Checkout.CheckoutInformationPageTitle.getText()
           await chaiExpect(CheckoutInfoTitle).to.eql('Checkout: Your Information')
          await Checkout.CheckoutFullDetailsCheckout('Akshay','Kumar','154356')
          const CheckoutOverviewPageTitle = await Checkout.CheckoutOverviewPageTitle.getText()
          chaiExpect(CheckoutOverviewPageTitle).to.eql('Checkout: Overview')
          
         // Comparing products to verify
          const data2 = await cartPage.MatchAddedCartItems()
          await expect([...data2].sort()).toHaveText([...productsData].sort())
         // Comparing Price total to verify
          const CartPrices = await Checkout.CheckoutAmountValues() 
          // console.log(await CartPrices) 
          const CartPricesTotal = CartPrices.reduce((acc, curr) => acc + curr, 0);
          // console.log(await CartPricesTotal)
          const ActualUiDisplayedTotal = await $('.summary_subtotal_label').getText()
          const cleaned = await ActualUiDisplayedTotal.replace(/[^\d.]/g, "");
          const numericValue = await parseFloat(cleaned, 10);
          // console.log(await numericValue)
          chaiExpect(await CartPricesTotal).is.eqls(numericValue)
          const FinishBtn = await Checkout.CheckoutFinishButton
          await FinishBtn.scrollIntoView()
          await FinishBtn.click()
          const CheckoutCompletePageTitle = await Checkout.CheckoutCompletePageTitle.getText()
          const CheckoutConfirmMsg = await Checkout.CheckoutConfirmMessage.getText()
          chaiExpect(CheckoutCompletePageTitle).to.eql('Checkout: Complete!')
          chaiExpect(CheckoutConfirmMsg).to.be.eqls('Thank you for your order!')

          await $('#back-to-products').click()
          await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'))
         
        });
      });
})