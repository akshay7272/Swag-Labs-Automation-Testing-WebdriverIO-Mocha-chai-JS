class InventoryPage {
  get Products() {
    return $$(".inventory_item");
  }

  async ProductLength() {
    let products = await this.Products;
    let total = await products.length;
    return total;
  }
//   async getAllProductNames() {
//     const products = await this.Products; // assuming this.Products returns array of elements
//     const productNames = [];

//     for (const product of products) {
//       const nameElement = await product.$(".inventory_item_name");
//       const nameText = await nameElement.getText();
//       productNames.push(nameText);
//     }

//     let sortedProducts = await [...productNames].sort()
//     console.log(sortedProducts, "All Product Names");
//     return sortedProducts;
//   }

async sortedProductNames() {
  const products = await this.Products;
  const productNames = [];

  for (const product of products) {
    const nameElement = await product.$(".inventory_item_name");
    const nameText = await nameElement.getText();
    productNames.push(nameText);
  }
  let sortedProducts = [...productNames].sort((a, b) => b.localeCompare(a));
  return sortedProducts;
}

async notSortedProductNames() {
  const products = await this.Products; 
  const productNames = [];

  for (const product of await products) {
    const nameElement = await product.$(".inventory_item_name");
    const nameText = await nameElement.getText();
    productNames.push(nameText);
  }
  return productNames;
}

//Getting Prices of products ---work on it
// async notSortedProductNames() {
//   const products = await this.Products; 
//   const productNames = [];

//   for (const product of products) {
//     const nameElement = await product.$(".inventory_item_price");
//     const nameText = await nameElement.getText();
//     const cleaned = await nameText.replace(/[^\d]/g, "");
//     const numericValue = parseFLoat(cleaned, 10);
//     console.log(numericValue,'numeric')
//     productNames.push(numericValue);
//   }
//   return productNames;
// }

  get FirstProduct() {
    return $(".inventory_list .inventory_item:nth-child(1) button");
  }
  get CartBadge() {
    return $(".shopping_cart_badge");
  }
}
module.exports = new InventoryPage();
