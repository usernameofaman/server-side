import ReactGA from 'react-ga';

const track=process.env.REACT_APP_GOOGLE_ANALYTICS_KEY;

export const GADetails=(item,seoTitle)=>{
    ReactGA.ga('create', track);
    ReactGA.ga('ec:addProduct', item);
    ReactGA.ga('ec:setAction', 'detail');
    ReactGA.ga('send', 'pageview', {
        'page': location.pathname+location.search,
        'title': seoTitle
    });
}

export const GAaddToCart=(item)=>{
    ReactGA.ga('create', track);
    ReactGA.ga("ec:addProduct", item);
    ReactGA.ga("ec:setAction", "add");
    ReactGA.ga("send", "event", "Add To Cart", "click", "addToCart");
}

export const GARemoveToCart=(item)=>{
    ReactGA.ga('create', track);
    ReactGA.ga("ec:addProduct", item);
    ReactGA.ga("ec:setAction", "remove");
    ReactGA.ga("send", "event", "Remove From Cart", "click", "removeFromCart");
}

export const GACheckoutStep=(items,step,option)=>{
    ReactGA.ga('create', track);
    items && items.length>0 && items.map(item=>{
        let variant=[];
            item.productOptions && item.productOptions.length>0 && 
            item.productOptions.map(item=>{
                variant.push(item.productOption.emwOptOptgrpid.emwOptgrpName);
		})
        const price=item.product.aggregateSellPrice && item.product.aggregateSellPrice.amount;
        ReactGA.ga("ec:addProduct", {
            'id': item.id,
            "name":  item.product.name,
            "quantity": item.quantity,
            'price': price,
            'variant': (variant && variant.length>0) ? variant.toString() : "",
            "category": item.product.emwProdCatid && item.product.emwProdCatid.name,
            "dimension1": `$${price}`,
        });
    })
    ReactGA.ga('ec:setAction','checkout', {
        'step': step,
        'option': option
    });
    ReactGA.ga('send', 'pageview');
}

export const GAFinalCheckoutStep=(items,stepNum,option)=>{
    ReactGA.ga('create', track);
    items && items.length>0 && items.map(item=>{
        let variant=[];
            item.productOptions && item.productOptions.length>0 && 
            item.productOptions.map(item=>{
                variant.push(item.productOption.emwOptOptgrpid.emwOptgrpName);
		})
        const price=item.product.aggregateSellPrice && item.product.aggregateSellPrice.amount;
        ReactGA.ga("ec:addProduct", {
            'id': item.id,
            "name":  item.product.name,
            "quantity": item.quantity,
            'price': price,
            'variant': (variant && variant.length>0) ? variant.toString() : "",
            "category": item.product.emwProdCatid && item.product.emwProdCatid.name,
            "dimension1": `$${price}`,
        });
    })
    ReactGA.ga('ec:setAction','checkout', {
        'step': stepNum,
        'option': option
    });
    ReactGA.ga('send', 'pageview');
}

export const GATransaction=(items,transaction)=>{
    ReactGA.ga('create', track);
    items && items.length>0 && items.map(item=>{
        let variant=[];
            item.productOptions && item.productOptions.length>0 && 
            item.productOptions.map(item=>{
                variant.push(item.productOption.emwOptOptgrpid.emwOptgrpName);
        })
        const price=item.product.aggregateSellPrice && item.product.aggregateSellPrice.amount;
        ReactGA.ga("ec:addProduct", {
            'id': item.id,
            "name":  item.product.name,
            "quantity": item.quantity,
            'price': price,
            'variant': (variant && variant.length>0) ? variant.toString() : "",
            "category": item.product.emwProdCatid && item.product.emwProdCatid.name,
            "dimension1": `$${price}`,
        });
    })
    ReactGA.ga('ec:setAction', 'purchase', transaction);
    ReactGA.ga('send', 'pageview');
}

// measure page list view 
export const GAImpression=(items,categoryName,listName,isCategory)=>{
    ReactGA.ga('create', track);
    items && items.length>0 && items.map((item,index)=>{
        ReactGA.ga("ec:addImpression", {
            'id': item.node.id,
            "name":  item.node.name,
            'category': isCategory ? categoryName : item.node.emwProdCatid && item.node.emwProdCatid.name,
            'list': listName,   
            'position': index+1,   
            'price': item.node.aggregateSellPrice && item.node.aggregateSellPrice.amount,
        });
    })
    ReactGA.ga('send', 'pageview');
}

export const GAImpressionClickEvent=(item,listName)=>{

    const price=item.aggregateSellPrice;
    ReactGA.ga("ec:addProduct", {
        'id': item.id,
        "name":  item.name,
        'price': price,
        "dimension1": `$${price}`,
    });
    ReactGA.ga('ec:setAction', 'click', {list: listName});
}

export const GACheckoutAdditionalOptions=(stepNumber,shippingOption)=>{
    ReactGA.ga('ec:setAction', 'checkout_option', {
        'step': stepNumber,
        'option': shippingOption
    });

    ReactGA.ga('send', 'event', 'Checkout', 'Option', {
        hitCallback: function() {
            return null;
        }
    });
}

export const GATimings=(categoryName,variable,value)=>{
    ReactGA.timing({
    category: categoryName,
    variable: variable,  
    value: value,
  })
}

export const GACustomEvent=(eventCategory,eventAction,eventValue)=>{
    ReactGA.event({
        category: eventCategory,
        action: eventAction,
        label: eventValue,
    });
}