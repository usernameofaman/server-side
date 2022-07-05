export const setInitOrderDetails=(data)=>{
    if(data)
    {
        const shippingDetails=setShippingDetails(data);
        const itemDetails=setItemDetails(data);
        const orderId=data.emwOrderId;
        return { shippingDetails, itemDetails, orderId};
    }
}

const setShippingDetails=(data)=>{
    if(data.orderCheckouts && data.orderCheckouts[0].shippingAddress){
        const firstName=data.orderCheckouts[0].shippingAddress && data.orderCheckouts[0].shippingAddress.firstName;
        const lastName=data.orderCheckouts[0].shippingAddress && data.orderCheckouts[0].shippingAddress.lastName;
        const streetAddress1=data.orderCheckouts[0].shippingAddress && data.orderCheckouts[0].shippingAddress.streetAddress1;
        const streetAddress2=data.orderCheckouts[0].shippingAddress && data.orderCheckouts[0].shippingAddress.streetAddress2;
        const city=data.orderCheckouts[0].shippingAddress && data.orderCheckouts[0].shippingAddress.city;
        const countryArea=data.orderCheckouts[0].shippingAddress && data.orderCheckouts[0].shippingAddress.countryArea;
        const postalCode=data.orderCheckouts[0].shippingAddress && data.orderCheckouts[0].shippingAddress.postalCode;
        const country=data.orderCheckouts[0].shippingAddress && data.orderCheckouts[0].shippingAddress.country && data.orderCheckouts[0].shippingAddress.country.code;
        const customerEmail=data.orderCheckouts[0].shippingAddress && data.orderCheckouts[0].shippingAddress.email;
        const details={
            name: `${firstName} ${lastName}`,
            email: customerEmail,
            addressLine1: streetAddress1,
            addressLine2: streetAddress2,
            city,
            countryArea,
            postalCode,
            country,
        }
        return details;
    }
}

export const setItemDetails=(data)=>{
    if(data.orderCheckouts && data.orderCheckouts[0] && data.orderCheckouts[0].lines){
        const lines=data.orderCheckouts[0].lines;
        const linesArray=[];
        const shippingType =data.orderCheckouts[0].shippingType;
        const orderTracking=data.orderCheckouts[0].orderTracking;
        if (lines && lines.length>0) {
            if(shippingType === "BY_ORDER"){
                lines.map(item=>{
                    const productName=item.product && item.product.name;
                    const orderTrack=orderTracking && orderTracking[0];
                    const arrivalDate=(orderTrack && orderTrack.pickupDate && orderTrack.pickupDate!=="Unknown" &&  orderTrack.pickupDate!==null) ? transformArrivalDate(orderTrack.pickupDate) : "N/A";
                    const setData={
                        name : productName,
                        status: (orderTrack && orderTrack.packageStatus && orderTrack.packageStatus!=="Unknown" &&  orderTrack.packageStatus!==null) ? orderTrack.packageStatus : "N/A",
                        tracking: orderTrack && orderTrack.trackingNumber  ? orderTrack.trackingNumber : null,
                        arrival: arrivalDate,
                        method: (orderTrack && orderTrack.service && orderTrack.service!=="Unknown" &&  orderTrack.service!==null)  ? orderTrack.service : "N/A",
                        upsStatus: (orderTrack && orderTrack.error==null)  ? orderTrack.error : "error",
                        trackingUrl: orderTrack && orderTrack.trackingUrl  ? orderTrack.trackingUrl : null,
                    }
                    return linesArray.push(setData);
                })
            }else{
                lines.map(item=>{
                    const productName=item.product && item.product.name;
                    const lineTracking=item.lineTracking && item.lineTracking[0];
                    const arrivalDate=(lineTracking && lineTracking.pickupDate && lineTracking.pickupDate!=="Unknown" &&  lineTracking.pickupDate!==null) ? transformArrivalDate(lineTracking.pickupDate) : "N/A";
                    const setData={
                        name : productName,
                        status: (lineTracking && lineTracking.packageStatus && lineTracking.packageStatus!=="Unknown" &&  lineTracking.packageStatus!==null) ? lineTracking.packageStatus : "N/A",
                        tracking: lineTracking && lineTracking.trackingNumber  ? lineTracking.trackingNumber : null,
                        arrival: arrivalDate,
                        method: (lineTracking && lineTracking.service && lineTracking.service!=="Unknown" &&  lineTracking.service!==null)  ? lineTracking.service :  "N/A",
                        upsStatus: (lineTracking && lineTracking.error==null)  ? lineTracking.error : "error",
                        trackingUrl: lineTracking && lineTracking.trackingUrl  ? lineTracking.trackingUrl : null,
                    }
                    return linesArray.push(setData);
                })
            }   
        }
        return linesArray;
    }
}

const transformArrivalDate=(data)=>{
    const year = data.substring(0, 4);
    const month = data.substring(4, 6);
    const day = data.substring(6, 8);
    // const returnDate=`${day}/${month}/${year}`;
    const returnDate=`${month}/${day}/${year}`;
    return returnDate;
}

export const reviewTrackingItems=(lines)=>{
    let isTrackingPresent=true;
    if(lines) {
        lines.map(item=>{
            if(item.upsStatus==null){
                isTrackingPresent=false;
            }else{
                isTrackingPresent=true;
            }
        })
    }
    return isTrackingPresent;
}