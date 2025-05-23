class Cart {
  get ProductCards() {
    return $$(".inventory_item");
  }
  get CartPage() {
    return $('.shopping_cart_link')
  }
  get CartItems() {
    return $$('.cart_item')
  }

  async ClearCart() {
  const cartBadge = await $('.shopping_cart_badge');
  if (await cartBadge.isExisting()) {
    await this.CartPage.click();
    const removeButtons = await $$("button[id^='remove']");
    for (const btn of removeButtons) {
      await btn.click();
    }
    await $("#continue-shopping").click(); // Back to inventory
  }
}

  async MatchAddedCartItems() {
    let VisibleItems = [];
    const Items = await this.CartItems
    for(const item of await Items) {
      let itemName = await item.$('.inventory_item_name').getText()
       VisibleItems.push(await itemName)
    }
    return VisibleItems
  }

// async test() {
//   const visibleItems = await this.MatchAddedCartItems();

//   const processedItems = await Promise.all(
//     visibleItems.map(async (item) => {
//       return item;
//     })
//   );

//   return processedItems;
// }


  async SortAddedCartItems() {
    const cartItems = await this.MatchAddedCartItems()
    const updatedValues = cartItems.sort()
    return updatedValues
  }

  async AddProductsToCart(products) {
    await this.ClearCart()
    const cardsM = await this.ProductCards;
    for (const productCard of cardsM) {
      const productNameElement = await productCard.$(".inventory_item_name");
      const productName = await productNameElement.getText();
      console.log(`Found product: ${productName}`);

      if (products.includes(productName)) {
        const buttonAddTo = await productCard.$(".btn_inventory");
        await buttonAddTo.waitForClickable({ timeout: 5000 });
        console.log(productName, 't5t5');
        await buttonAddTo.click();
        await browser.pause(3000)
      }
    }
  }
}

module.exports = new Cart(); // ✅ Fix here
