import {expect as chaiExpect} from 'chai'
const loginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page.js');
describe('Inventory Page Tests',async()=>{
    it('Verify all products are displayed--Smoke, Regression',async()=>{
        await browser.url('/')
        await loginPage.login('standard_user','secret_sauce')
        const productText = await $('.title').getText()
        chaiExpect(await productText).to.equal('Products')
        const totalItems = await InventoryPage.ProductLength()
        console.log(await totalItems,'total')
        chaiExpect(await totalItems).to.eql(6)
    })
    it('Add a product to cart--Smoke, Regression',async()=>{
        await browser.url('/')
        await loginPage.login('standard_user','secret_sauce')
        const productText = await $('.title').getText()
        chaiExpect(await productText).to.equal('Products')
        await InventoryPage.FirstProduct.click()
        const removeText = await InventoryPage.FirstProduct.getText()
        chaiExpect(await removeText).to.eql('Remove')
        const cartTotal = await InventoryPage.CartBadge.getText()
        chaiExpect(await cartTotal).to.eql('1') 
    })
    it('Remove a product from cart--Regression',async()=>{
        await browser.url('/')
        await loginPage.login('standard_user','secret_sauce')
        const productText = await $('.title').getText()
        chaiExpect(await productText).to.equal('Products')
        await InventoryPage.FirstProduct.click()
        await InventoryPage.CartBadge.waitForExist()
        const removeText = await InventoryPage.FirstProduct.getText()
        chaiExpect(await removeText).to.eql('Remove')
        const cartTotal = await InventoryPage.CartBadge.getText()
        chaiExpect(await cartTotal).to.eql('1') 
        await InventoryPage.FirstProduct.click()
        const addToCartDisplyed = await InventoryPage.FirstProduct.getText()
        chaiExpect(await addToCartDisplyed).to.eql('Add to cart')
        await InventoryPage.CartBadge.waitForExist({reverse:true})
    })

    it('Verify product sorting (Name A to Z)--Regression',async()=>{
        await browser.url('/')
        await loginPage.login('standard_user','secret_sauce')
        const productText = await $('.title').getText()
        chaiExpect(await productText).to.equal('Products')
        const selectBox = await $('.select_container')
        await selectBox.click()
        const mainSelect = await $('.product_sort_container')
        await mainSelect.waitForDisplayed()
        await mainSelect.selectByAttribute('value','za')
        
        const ZtoA = await InventoryPage.notSortedProductNames()
        const sortedProducts = await InventoryPage.sortedProductNames()
        chaiExpect(ZtoA).to.eql(sortedProducts)


    })

    it('Logout from burger menu--Regression',async()=>{
        await browser.url('/')
        await loginPage.login('standard_user','secret_sauce')
        const productText = await $('.title').getText()
        chaiExpect(await productText).to.equal('Products')
        await $('#react-burger-menu-btn').click()
        await expect($('.bm-menu')).toBeDisplayed()
        await $('#logout_sidebar_link').click()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
    })
})