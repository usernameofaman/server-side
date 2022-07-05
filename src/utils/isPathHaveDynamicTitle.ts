export const checkIsPathHaveDynamicSeoTitle = (pathName) => {
    if(pathName=="/"){ return false; }
    else if(pathName.includes("search")){ return false; }
    else if(pathName.includes("site-search")){ return false; }
    else if(pathName.includes("category")){ return false; }
    else if(pathName.includes("collection")){ return false; }
    else if(pathName.includes("product")){ return false; }
    else if(pathName.includes("cart")){ return false; }
    else if(pathName.includes("login")){ return false; }
    else if(pathName.includes("page")){ return false; }
    else if(pathName.includes("order-confirmation")){ return false; }
    else if(pathName.includes("account")){ return false; }
    else if(pathName.includes("account-confirm")){ return false; }
    else if(pathName.includes("order-history")){ return false; }
    else if(pathName.includes("address-book")){ return false; }
    else if(pathName.includes("payment-options")){ return false; }
    else if(pathName.includes("reset-password")){ return false; }
    else if(pathName.includes("orders")){ return false; }
    else if(pathName.includes("review-order")){ return false; }
    else if(pathName.includes("terms-condition")){ return false; }
    else if(pathName.includes("refund-policy")){ return false; }
    else if(pathName.includes("invoice")){ return false; }
    else if(pathName.includes("/page/contact-us")){ return false; }
    else if(pathName.includes("quote")){ return false; }
    else{ return true; }
}