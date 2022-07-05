export const getItemValues=(data)=>{
    let item=[];
    let lines=data && data.orderCheckouts[0] && data.orderCheckouts[0].lines;
    if(lines && lines.length>0){
        lines.map(prod=>{
            let shippingMethod= prod.lineshipping[0] && prod.lineshipping[0].name;
            const shippingPrice= prod.lineshipping[0] && prod.lineshipping[0].cost;
            const residentialPrice=prod.lineshipping[0] && prod.lineshipping[0].residentialSurcharge;
            let trackNum=prod.lineTracking && prod.lineTracking[0] && prod.lineTracking[0].trackingNumber;
            const costPrice=prod.totalLineUnitPrice && prod.totalLineUnitPrice.amount;
            const totalLinePrice=prod.totalLinePrice && prod.totalLinePrice.amount;
            let setData={
                item: prod.product.emwProdVendorPartnumber,
                qty: prod.quantity,
                cost: costPrice ? `$ ${costPrice.toFixed(2)}` : "N/A",
                total: totalLinePrice ? `$ ${totalLinePrice.toFixed(2)}` : "N/A",
                description: {
                    prodName: prod.product.name,
                    options: setProductOptions(prod.productOptions),
                    shipping: { 
                        method: shippingMethod ? shippingMethod : "N/A",
                        trackingNum: trackNum ? trackNum : "N/A",
                        price: shippingPrice ? `$ ${shippingPrice.toFixed(2)}` : "N/A",
                        residentialPrice: residentialPrice,
                    },
                },
            }
            return item.push(setData);
        })
    }
    return item;
}

const setProductOptions = (data) => {
    const productOption = [];
    if (data && data.length > 0) {
        data.map(optionsItem => {
            let price=optionsItem.productOption.emwOptPrice.amount;
            const setData = {
                optionGrpName: optionsItem.productOption.emwOptOptgrpid.emwOptgrpName,
                optionName: optionsItem.productOption.emwOptName,
                value: (price) ? (price>0) ? `$ ${price}` : `-$ ${Math.abs(price)}` : "No charge",
            }
            return productOption.push(setData);
        })
    }
    return productOption;
}