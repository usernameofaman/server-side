export const setInitOrderDetails = (data) => {
    const linesArray = [];
    if(data && data.lines) {
        data.lines.map((item) => {
            const setData = {
                quantity: item.quantity,
                name: item.product && item.product.name,
                // price: item.product && item.product.aggregateSellPrice && item.product.aggregateSellPrice.amount ? numberWithCommas(item.product.aggregateSellPrice.amount.toFixed(2)) : "N/A",
                price: item.unitPrice && item.unitPrice.amount ? numberWithCommas(item.unitPrice.amount.toFixed(2)) : "N/A",
                itemNo: item.product && item.product.emwProdVendorPartnumber,
                productOptions: setProductOptions(item.productOptions),
                emwProdIsFreeship: item.product && item.product.emwProdIsFreeship,
            }
            linesArray.push(setData);
        })
    }

    const tax=setTaxArray(data);
    const shipping=setShipping(data);
    return { linesArray, tax, shipping};
}

const setProductOptions = (data) => {
    const productOption = [];
    if (data && data.length > 0) {
        data.map(optionsItem => {
            const setData = {
                optionGrpName: optionsItem.productOption.emwOptOptgrpid.emwOptgrpName,
                optionValue: optionsItem.productOption.emwOptName,
                optionStockNo: optionsItem.productOption.emwOptStocknumber,
            }
            return productOption.push(setData);
        })
    }
    return productOption;
}

export const setOrderSummaryTotalValues = (data) => {
    const itemsTotal = data && data.emwTotalPrice && data.emwTotalPrice.totalItemPrice && data.emwTotalPrice.totalItemPrice.amount ? data.emwTotalPrice.totalItemPrice.amount : 0;
    const taxTotal = data && data.emwTotalPrice && data.emwTotalPrice.totalTaxPrice && data.emwTotalPrice.totalTaxPrice.amount;
    const shippingTotal = data && data.emwTotalPrice && data.emwTotalPrice.totalShippingPrice && data.emwTotalPrice.totalShippingPrice.amount;
    const overAllTotal = data && data.emwTotalPrice && data.emwTotalPrice.grossTotalPrice && data.emwTotalPrice.grossTotalPrice.amount ? data.emwTotalPrice.grossTotalPrice.amount : 0;
    const dueTotal = data && data.totalDue && data.totalDue.amount ? data.totalDue.amount : 0;
    const amountTotal = data && data.totalPaidinAmount && data.totalPaidinAmount ? data.totalPaidinAmount : 0;
    const confirmPageDue = 0;
    const sendData={ 
        itemsTotal: numberWithCommas(itemsTotal.toFixed(2)),
        taxTotal: checkValidValues(taxTotal) ? numberWithCommas(taxTotal.toFixed(2)) : null, 
        shippingTotal: checkValidValues(shippingTotal) ?  numberWithCommas(shippingTotal.toFixed(2)): null,  
        overAllTotal: numberWithCommas(overAllTotal.toFixed(2)), 
        dueTotal: numberWithCommas(dueTotal.toFixed(2)),
        amountTotal: numberWithCommas(amountTotal.toFixed(2)),
        confirmPageDue: numberWithCommas(confirmPageDue.toFixed(2)),
    }
    return sendData;
}

export const setBillingAddress=(data)=>{
    const address=[];
    if (data && data.length>0) {
        data.map(item=>{
            const addressLine1=item.node && item.node.streetAddress1;
            const addressLine2=item.node && item.node.streetAddress2;
            const city=item.node && item.node.city;
            const id=item.node && item.node.id;
            const postalCode=item.node && item.node.postalCode;
            const countryArea=item.node && item.node.countryArea;
            if((addressLine1 || city || addressLine2) && id)
            {
                const setData={
                    label: `${addressLine1} ${addressLine2} ${countryArea}, ${city}, ${postalCode}`,
                    value: id,
                }
                return address.push(setData);
            }
        });
    }
    return address;
}

export const pushNewBillingAddress=(data)=>{
        let setData=null;
        if(data && data.address)
        {
            const addressLine1=data.address && data.address.streetAddress1;
            const addressLine2=data.address && data.address.streetAddress2;
            const city=data.address && data.address.city;
            const postalCode=data.address && data.address.postalCode;
            const countryArea=data.address && data.address.countryArea;
            const id=data.address && data.address.id;
            if((addressLine1 || city || addressLine2) && id)
            {
                setData={
                    label: `${addressLine1} ${addressLine2} ${countryArea}, ${city}, ${postalCode}`,
                    value: id,
                }
            }
        }
    return setData;
}

const numberWithCommas=(x)=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const transformShippingAddress=(data)=>{
    let setData=null;
    if(data)
    {
            const addressLine1=data && data.streetAddress1;
            const addressLine2=data && data.streetAddress2;
            const city=data && data.city;
            const postalCode=data && data.postalCode;
            const countryArea=data && data.countryArea;
            if((addressLine1 || city || addressLine2))
            {
                setData=`${addressLine1} ${addressLine2} ${countryArea}, ${city}, ${postalCode}`;
            }
    }
    return setData;
}

const setTaxArray=(data)=>{
    const taxArray=[];
    const taxName=data && data.shippingAddress && data.shippingAddress.countryArea ? `${data.shippingAddress.countryArea} State Sales Tax` : "N/A";
    const taxPrice = data && data.emwTotalPrice && data.emwTotalPrice.totalTaxPrice && data.emwTotalPrice.totalTaxPrice.amount;
    if(checkValidValues(taxPrice)){
        const setData={
            quantity: 1,
            name: taxName,
            price: checkValidValues(taxPrice) ? taxPrice.toFixed(2) : null,
        }
        if (setData) {
            taxArray.push(setData);
        }
    }
    return taxArray;
}

const setShipping=(data)=>{
    if(data && data.shippingType){
        const shippingArray=[];
        if(data.shippingType==="BY_ORDER")
        {
            let newQuant=0;
            const quantity=data.lines && data.lines.length>0 && data.lines.map(item=>{
                return newQuant=newQuant+item.quantity;
            })
            const shippingPrice=data.shipping && data.shipping[0] && data.shipping[0].price ? data.shipping[0].price.amount : null;
            const residentialPrice=data.shipping && data.shipping[0] && data.shipping[0].residentialSurcharge && data.shipping[0].residentialSurcharge.amount ? data.shipping[0].residentialSurcharge.amount : null;
            const setData={ 
                quantity: newQuant,
                name: data.shipping && data.shipping[0] ? data.shipping[0].name : "N/A",
                // price: (shippingPrice!==null && (typeof shippingPrice!=="undefined") ) ? shippingPrice.toFixed(2) : null,
                price: checkValidValues(shippingPrice) ? shippingPrice.toFixed(2)  : null,
                residentialSurcharge: checkValidValues(residentialPrice) ? residentialPrice.toFixed(2) : null,
            }
            shippingArray.push(setData);
        } 
        if(data.shippingType==="BY_ITEM"){

            if (data.lines && data.lines.length>0) {
                data.lines.map(item=>{
                    // let setPrice=item.lineshipping[0] && item.lineshipping[0].cost && item.lineshipping[0].cost*item.quantity;
                    const setPrice=item.lineshipping[0] && item.lineshipping[0].cost && item.lineshipping[0].cost;
                    // let residentialCost=item.lineshipping[0] && item.lineshipping[0].residentialSurcharge ? item.lineshipping[0].residentialSurcharge*item.quantity : null;
                    const residentialCost=item.lineshipping[0] && item.lineshipping[0].residentialSurcharge ? item.lineshipping[0].residentialSurcharge : null;
                    const setData={ 
                        quantity: item.quantity,
                        name: item.lineshipping[0] && item.lineshipping[0].name ? item.lineshipping[0].name : "N/A" ,
                        price: checkValidValues(setPrice) ? setPrice.toFixed(2)  : null,
                        residentialSurcharge: checkValidValues(residentialCost) ? residentialCost.toFixed(2) : null,
                    }
                    return shippingArray.push(setData);
                })
            }
        }
        return shippingArray;

    }
}

const checkValidValues=(data)=>{
    let valid=false;
    if(data!==null && (typeof data!=="undefined")){
        valid= true;
    }
    return valid;
}

export const returnErrorField=(shippingStateStatus,taxStateStatus)=>{
    let errorField=""
    if(shippingStateStatus!=="Ready" && taxStateStatus!=="Ready")
    {
        errorField="both";
    }else if(shippingStateStatus!=="Ready"){
        errorField="shipping";
    }else if(taxStateStatus!=="Ready"){
        errorField="tax";
    }
    return errorField;
}