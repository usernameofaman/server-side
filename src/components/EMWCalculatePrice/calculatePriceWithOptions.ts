export const calculatePriceWithOptions=(productOptions,price)=>{
    const optionsArray=productOptions;
    let priceValue=price;
    optionsArray.map((item,index)=>{
        return item.pricing.map(optionIds=>{
            priceValue=priceValue+optionIds.price;
        })
        
    });
    return priceValue;
}