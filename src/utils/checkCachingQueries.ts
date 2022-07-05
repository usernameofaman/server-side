export const checkCachingQueries=(operationName)=>{

    switch (operationName) {
        case "MainMenu":
        case "SecondaryMenu":
        case "SecondaryMenu":   
        case "CategoryOrProductBySeoUrl": 
        case "EMWCategory":
        case "EMWElasticCategoryProductsQuery":
        case "MultipleProductTypeMetaQuery":
        case "MultipleVendorMetaQuery":
        case "MultipleProductAttributeMetaQuery": 
        case "EMWProductDetails":
        case "GetAllCategories":
          return true;
    
        default:
          return false;
    }
}