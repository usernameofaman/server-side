export const transformSubtotalPrice=(data)=>{
    const price=data.emwCheckout.emwTotalPrice && data.emwCheckout.emwTotalPrice.totalItemPrice && data.emwCheckout.emwTotalPrice.totalItemPrice.amount
    return price;
}