import {expect as chaiExpect} from 'chai'
const loginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page.js');
describe('Inventory Page Tests',async()=>{
    xit('Verify all products are displayed',async()=>{
        await browser.url('/')
        await loginPage.login('standard_user','secret_sauce')
        const productText = await $('.title').getText()
        chaiExpect(await productText).to.equal('Products')
        const totalItems = await InventoryPage.ProductLength()
        console.log(await totalItems,'total')
        chaiExpect(await totalItems).to.eql(6)
    })
    xit('Add first product to cart',async()=>{
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
    xit('Remove a product from cart',async()=>{
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

    xit('Verify product sorting (Name A to Z)',async()=>{
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

    xit('Logout from burger menu',async()=>{
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