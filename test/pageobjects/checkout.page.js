class Checkout {
    get CheckoutBtn(){
        return $('#checkout')
    }
    get CheckoutInformationPageTitle() {
        return $('.title')
    }
    get CheckoutOverviewPageTitle() {
        return $('.title')
    }
    get CheckoutCompletePageTitle() {
        return $('.title')
    }

    get CheckoutErrorContainer(){
        return $('.error-message-container')
    }

    get CheckoutConfirmMessage(){
        return $('.complete-header')
    }

    get CheckoutFinishButton() {
        return $('#finish')
    }

    get CheckoutUserFirstName() {
        return $('#first-name')
    }
     get CheckoutUserLastName() {
        return $('#last-name')
    }
     get CheckoutZipCode() {
        return $('#postal-code')
    }

    get CheckoutContinueBtn() {
        return $('#continue')
    }
    get CheckoutAmountCards() {
        return $$('.inventory_item_price')
    }
    
   

    async CheckoutAmountValues() {
        const AmountValues = [] 
        const CardItems = await this.CheckoutAmountCards
        for(const Items of CardItems) {
            const dataValues = await Items.getText()
            const cleaned = dataValues.replace(/[^\d.]/g, "");
            const numericValue = parseFloat(cleaned, 10);
            AmountValues.push(numericValue)
        } 
        return AmountValues
    }

    async CheckoutFullDetailsCheckout(firstName,lastName,zipCode){
         await this.CheckoutUserFirstName.setValue(firstName)
         await this.CheckoutUserLastName.setValue(lastName)
         await this.CheckoutZipCode.setValue(zipCode)
         await this.CheckoutContinueBtn.click()
    }
    
    async CheckoutMissingDetailsCheckout(firstName,lastName){
         await this.CheckoutUserFirstName.setValue(firstName)
         await this.CheckoutUserLastName.setValue(lastName)
         await this.CheckoutContinueBtn.click()
    }

}

module.exports = new Checkout();