import {expect as chaiExpect} from 'chai'
import loginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/Inventory.page.js'

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
    it('Remove a product from cart',async()=>{
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
})