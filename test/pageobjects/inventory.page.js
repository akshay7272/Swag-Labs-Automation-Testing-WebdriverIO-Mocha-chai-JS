class InventoryPage {
   
    get Products(){
        return $$('.inventory_item')
    }

    async ProductLength(){
        let products = await this.Products
        let total = await products.length
        return total
    }
    get FirstProduct() {
       return $('.inventory_list .inventory_item:nth-child(1) button')
    }
    get CartBadge() {
        return $('.shopping_cart_badge')
    }

}
export default new InventoryPage();