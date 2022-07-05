import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import { Thumbnail } from "@components/molecules";

import { BasicProductFields } from "../../views/Product/types/BasicProductFields";
import Card from '@material-ui/core/Card';

import { useUserDetails } from "@sdk/react";


interface ProductListItemProps {
  product: BasicProductFields;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  // const {
  //   pricing: {
  //     priceRange: {
  //       start: {
  //         gross: { localized },
  //       },
  //     },
  //   },
  //   // category,
  // } = product;

  const userDetails = useUserDetails();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const email = userDetails.data && userDetails.data.email;
      if (email) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
  }, [userDetails.data]);

const getDisplayPrice = (emwProdIsDiscontinued, emwProdIsInformational, disppricing) => {  
  if(!emwProdIsInformational && !emwProdIsDiscontinued && disppricing && disppricing.length){
    if(disppricing[0].disptierpricing && loggedIn){
      // let userTier = userDetails.data ? userDetails.data.tier.emwUsertierTierid.emwTierdefId : 0
      let userTier = (userDetails.data && userDetails.data.tier && userDetails.data.tier.emwUsertierTierid) ? userDetails.data.tier.emwUsertierTierid.emwTierdefId : 0
      for(let i = 0; i < disppricing[0].disptierpricing.length ; i ++){
        if(disppricing[0].disptierpricing[i].tier.emw_tierdef_id === userTier){
          return "$"+disppricing[0].disptierpricing[i].aggrsellprice_amount.toFixed(2);
        }
      }
      return "$"+disppricing[0].aggrsellprice_amount.toFixed(2)
    } else {
      return "$"+disppricing[0].aggrsellprice_amount.toFixed(2)
    }
  } else {
    return ""
  }
  
}


  const ImgUrl = {
    thumbnail:{
      url: product.emwProdImages && product.emwProdImages.edges.length ? process.env.REACT_APP_CLOUDFRONT_URL + product.emwProdImages.edges[0].node.emwImageUrlPrfix + product.emwProdImages.edges[0].node.emwImageName : "",
    },
  }
  return (

    <Card className="productListWrapper__product emw-product-card">
      <h4>{product.name}</h4>
      <div className="productListWrapper__product__image image-vertical-fix">
        {product.emwProdImages ? <Thumbnail source={ImgUrl}/>  : <Thumbnail source={product} /> }
      </div>
      <div className="productListWrapper__product__pricebx">
        <div className="productListWrapper__product__pricebx__cutPricebx">
          { <span>MSRP: <del>
            {/* ${product.listPrice ? product.listPrice.amount: 0} */}
            {product.listPrice ? "$" + product.listPrice.amount.toFixed(2) : 0}
            </del>
            </span>
          }
        </div>
        <div className="productListWrapper__product__pricebx__price">
          <h4>{product ? getDisplayPrice(product.emwProdIsDiscontinued, product.emwProdIsInformational, product.disppricing) : "Loading"}</h4> 
        </div>
      </div>
    </Card>
    //   {/* <div className="product-list-item">
    //   <div className="product-list-item__image">
    //     <Thumbnail source={product} />
    //   </div>
    //   <h4 className="product-list-item__title">{product.name}</h4>
    //   <p className="product-list-item__category">{category.name}</p>
    //   <p className="product-list-item__price">{localized}</p>
    // </div> */}
  );
};

export default ProductListItem;
