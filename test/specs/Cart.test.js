const cartPage = require('../pageobjects/cart.page');
const loginPage = require('../pageobjects/login.page');
const fs  = require('../testdata/cartproducts.json');
const assert = require('assert');
import {expect as chaiExpect} from 'chai'


describe("Cart Page Tests", () => {
    fs.forEach(({productsData}) => {
        xit("Add multiple items and verify in cart", async () => {
            await browser.url("/");
            await loginPage.login("standard_user", "secret_sauce");

            const productText = await $(".title").getText();
            expect(productText).toEqual("Products");

            await cartPage.AddProductsToCart(productsData);
            await cartPage.CartPage.click()
            const cartTitle = await $('.title').getText()
            chaiExpect(await cartTitle).to.eqls('Your Cart')
            const data = await cartPage.MatchAddedCartItems()
            console.log([...data],'first')
            console.log([...productsData],'first1')
            assert.deepStrictEqual([...data].sort(), [...productsData].sort());
        });
    });
    fs.forEach(({productsData}) => {
        xit("Remove item from cart", async () => {
            await browser.url("/");
            await loginPage.login("standard_user", "secret_sauce");
            const productText = await $(".title").getText();
            expect(productText).toEqual("Products");
            await cartPage.AddProductsToCart(productsData);
            await cartPage.CartPage.click()
            const cartTitle = await $('.title').getText()
            chaiExpect(await cartTitle).to.eqls('Your Cart')
            const data = await cartPage.MatchAddedCartItems()
            console.log([...data],'first')
            console.log([...productsData],'first1')
            assert.deepStrictEqual([...data].sort(), [...productsData].sort());
            const productApperance = await $("//div[@class='cart_item'])[1]")
            await $("//button[@id='remove-sauce-labs-backpack']").click()
            await expect(productApperance).waitForExistance({reverse:true})
        });
         });
        });
   

