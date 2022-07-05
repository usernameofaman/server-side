export const initCategories = (data) => {
    const catArray = [];
    if (data.edges && data.edges.length > 0) {
        data.edges.map(item => {
            const setData = {
                id: item.node && item.node.id,
                name: item.node && item.node.name,
                image: item.node && item.node.emwCatImageUrl,
            }
            catArray.push(setData);
        })
    }
    
    return catArray;
}

export const initVendors = (data) => {
    if (data.edges && data.edges.length > 0) {
        return data.edges.map(item => ({
            name: item.node && item.node.emwVendorName,
            image: item.node && item.node.emwVendorImageUrl
        }))
    }

    return []
}


export const initProducts = (data) => {
    const prodArray = [];
    if (data.edges && data.edges.length > 0) {
        data.edges.map(item => {
            const setData = {
                id: item.node && item.node.id,
                name: item.node && item.node.name,
                image: imgUrl(item),
                aggregateSellPrice: item.node.aggregateSellPrice,
                listPrice: item.node.listPrice,
            }
            prodArray.push(setData);
        })
    }
    
    return prodArray;
}

const imgUrl = (item) => {
    return {
        thumbnail: {
            url: item.node.emwProdImages && item.node.emwProdImages.edges.length ? process.env.REACT_APP_CLOUDFRONT_URL + item.node.emwProdImages.edges[0].node.emwImageUrlPrfix + item.node.emwProdImages.edges[0].node.emwImageName : "",
        },
    }

}