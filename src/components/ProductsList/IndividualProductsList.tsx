import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { generateEMWProductSeoUrl } from "../../core/utils";
import Loader from "../Loader";

import { Product } from "../ProductListItem";

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import { Thumbnail } from "@components/molecules";

import plusIcon from '../../images/plus-icon.png'

import minusIcon from '../../images/minus-icon.png'
import { EMWProductDetails_emwproduct } from "../../views/Product/types/EMWProductDetails";

import { useUserDetails } from "@sdk/react";

interface IndividualProductsListProps {
  product: EMWProductDetails_emwproduct;
}


export const IndividualProductsList: React.FC<IndividualProductsListProps> = ({
  product
}) => {


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
          let userTier = userDetails.data ? userDetails.data.tier.emwUsertierTierid.emwTierdefId : 0
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
    
    const ImgUrl = process.env.REACT_APP_CLOUDFRONT_URL

    const attrbutesTemp = []
    const attrbutesDisplayTemp = []

    if (product.atrvalsinprod && product.atrvalsinprod.length) {
      product.atrvalsinprod.map((attr, index) => {
        if (attrbutesTemp.hasOwnProperty(attr.emw_prodatrval_value.emw_atrval_atrid.emw_atr_name)) {
          attrbutesTemp[attr.emw_prodatrval_value.emw_atrval_atrid.emw_atr_name].push(attr.emw_prodatrval_value.emw_atrval_value)
        } else {
          attrbutesTemp[attr.emw_prodatrval_value.emw_atrval_atrid.emw_atr_name] = [attr.emw_prodatrval_value.emw_atrval_value]
        }
      });

      product.prodoverrides.map((attr, index) => {
          attrbutesDisplayTemp[attr.emw_pao_atrid.emw_atr_name] = [attr.emw_pao_display_value]

      });


    }

    function getUnique(array) {
      const uniqueArray = [];

      // Loop through array values
      for (const value of array) {
        if (uniqueArray.indexOf(value) === -1) {
          uniqueArray.push(value);
        }
      }
      return uniqueArray;
    }
    let TempArr = []
    for (const property in attrbutesTemp) {
      if (attrbutesTemp[property]) {
        TempArr.push(property)
      }
    }
    TempArr = getUnique(TempArr)

        return (
            <div key={Math.random()}>


            
            <Card className="productListWrapper__product__listView mobileCategoryListProduct" key={Math.random()}>
                <h4 className="desktop-product-name">{product.name}</h4>
              <div className="productListWrapper__product__listView__outerProductbx">
                <div className="product-list-left-wrapper">
                  <div className="productListWrapper__product__listView__outerProductbx__product__image image-vertical-fix">
                    {product.emwProdImages && product.emwProdImages.edges.length ? <Thumbnail source={{thumbnail: {url : ImgUrl + product.emwProdImages.edges[0].node.emwImageUrlPrfix + product.emwProdImages.edges[0].node.emwImageName}}}/>  : <Thumbnail source={product} /> }
                  </div>
                  <div className="product-list-left-price-section">
                    <div className="productListWrapper__product__listView__paymentbx listView-centerPrice emw-mobile-only">
                        <div className="productListWrapper__product__listView__paymentbx__priceblock">
                          <div className="productListWrapper__product__listView__paymentbx__pricebx">
                          <h4>{product ? getDisplayPrice(product.emwProdIsDiscontinued, product.emwProdIsInformational, product.disppricing) : "Loading"}</h4> 
                          </div>
                          <div className="productListWrapper__product__listView__paymentbx__cutpricebx">
                            <span>MSRP: <del>{"$"+product.listPrice.amount}</del></span>
                          </div>
                        </div>
                        <button type="button" className="productListWrapper__product__listView__paymentbx__product-detailbtn">Product Detail</button>
                      </div>

                    <div className="productListWrapper__product__listView__paymentbx listView-centerPrice emw-desktop-only emw-product-list-price-box">
                      <div className="productListWrapper__product__listView__paymentbx__priceblock">
                        <div className="productListWrapper__product__listView__paymentbx__pricebx">
                        <h4>{product ? getDisplayPrice(product.emwProdIsDiscontinued, product.emwProdIsInformational, product.disppricing) : "Loading"}</h4> 
                        </div>
                        <div className="productListWrapper__product__listView__paymentbx__cutpricebx">
                          <span>MSRP: <del>{"$"+product.listPrice.amount}</del></span>
                        </div>
                      </div>
                    </div>

                    <button type="button" className="productListWrapper__product__listView__outerProductbx__product-detailbtn product-detail-btn">Product Detail</button>
                  </div>
                </div>

                <div className="productListWrapper__product__listView__outerProductbx__product__info listView-productDetails emw-mobile-product-info">
                <h4 className="mobile-product-name">{product.name}</h4>
                <div className="productListWrapper__product__listView__detail__detail-box">
                    {
                      (product.emwProdShowVendor) && 
                      <div className="productListWrapper__product__listView__detail__detail-box__catInfo">
                        <div className="productListWrapper__product__listView__detail__detail-box__catInfo__cat">
                          <span>Manufacturer</span>
                        </div>
                        <div className="productListWrapper__product__listView__detail__detail-box__catInfo__info">
                          <span>{product.emwProdVendorid === null ? "N/A" : product.emwProdVendorid.emwVendorName}</span>
                        </div>
                      </div>
                    }
                    {
                      (product.emwProdShowDispweight) && 
                      <div className="productListWrapper__product__listView__detail__detail-box__catInfo">
                        <div className="productListWrapper__product__listView__detail__detail-box__catInfo__cat">
                          <span>Weight</span>
                        </div>
                        <div className="productListWrapper__product__listView__detail__detail-box__catInfo__info">
                        <span>{(product.emwProdDisplayWeight=== null || product.emwProdDisplayWeight ==="") ? "N/A" : `${product.emwProdDisplayWeight} lbs`}</span>
                        </div>
                      </div>
                    }
                    {
                      (product.emwProdShowHscode) && 
                      <div className="productListWrapper__product__listView__detail__detail-box__catInfo">
                        <div className="productListWrapper__product__listView__detail__detail-box__catInfo__cat">
                          <span>HS Code</span>
                        </div>
                        <div className="productListWrapper__product__listView__detail__detail-box__catInfo__info">
                          <span>{(product.emwProdHsCode === null || product.emwProdHsCode ==="") ? "N/A" : product.emwProdHsCode} </span>
                        </div>
                      </div>
                    }

                    {
                      (product.emwProdShowUpc) && 
                      <div className="productListWrapper__product__listView__detail__detail-box__catInfo">
                        <div className="productListWrapper__product__listView__detail__detail-box__catInfo__cat">
                          <span>UPC Number</span>
                        </div>
                        <div className="productListWrapper__product__listView__detail__detail-box__catInfo__info">
                          <span>{(product.emwProdUpc === null || product.emwProdUpc ==="") ? "N/A" : product.emwProdUpc } </span>
                        </div>
                      </div>
                    }
                </div>
                {
                  ((product.emwProdShowUpc || product.emwProdShowHscode || product.emwProdShowDispweight || product.emwProdShowVendor) && TempArr.length>0) &&
                  <div className="product-page-attribute-gap-border"></div>
                }
                <div>
                    {TempArr.slice(0,(TempArr.length)).map((attr, index)=>{
                          return <div className="productListWrapper__product__listView__detail__detail-box__catInfo">
                          <div key={index} className="productListWrapper__product__listView__detail__detail-box__catInfo__cat">
                            <span>{attr}</span>
                          </div>
                          <div className="productListWrapper__product__listView__detail__detail-box__catInfo__info">
                            <span>{Object.keys(attrbutesDisplayTemp).length && attrbutesDisplayTemp[attr] && attrbutesDisplayTemp[attr].length > 0 ? attrbutesDisplayTemp[attr][0] : attrbutesTemp[attr].map((val, index)=>{
                            return attrbutesTemp[attr].length > 1 && index !== attrbutesTemp[attr].length - 1 ? val + ", " : val
                            })}
                            </span>
                          </div>
                        </div>
                        })
                    }  
                </div>
                </div>
                
              </div>
              
              <div className="productListWrapper__product__listView__detail  emw-product-list-detail-box">
                <h4>{product.name}</h4>
                <div className="productListWrapper__product__listView__detail__detail-box">
                    {
                      (product.emwProdShowVendor) && 
                      <div className="productListWrapper__product__listView__detail__detail-box__catInfo">
                        <div className="productListWrapper__product__listView__detail__detail-box__catInfo__cat">
                          <span>Manufacturer</span>
                        </div>
                        <div className="productListWrapper__product__listView__detail__detail-box__catInfo__info">
                          <span>{product.emwProdVendorid === null ? "N/A" : product.emwProdVendorid.emwVendorName}</span>
                        </div>
                      </div>
                    }
                    {
                      (product.emwProdShowDispweight) && 
                      <div className="productListWrapper__product__listView__detail__detail-box__catInfo">
                        <div className="productListWrapper__product__listView__detail__detail-box__catInfo__cat">
                          <span>Weight</span>
                        </div>
                        <div className="productListWrapper__product__listView__detail__detail-box__catInfo__info">
                        <span>{(product.emwProdDisplayWeight=== null || product.emwProdDisplayWeight ==="") ? "N/A" : `${product.emwProdDisplayWeight} lbs`}</span>
                        </div>
                      </div>
                    }
                    {
                      (product.emwProdShowHscode) && 
                      <div className="productListWrapper__product__listView__detail__detail-box__catInfo">
                        <div className="productListWrapper__product__listView__detail__detail-box__catInfo__cat">
                          <span>HS Code</span>
                        </div>
                        <div className="productListWrapper__product__listView__detail__detail-box__catInfo__info">
                          <span>{(product.emwProdHsCode === null || product.emwProdHsCode ==="") ? "N/A" : product.emwProdHsCode}</span>
                        </div>
                      </div>
                    }
                    {
                      (product.emwProdShowUpc) && 
                      <div className="productListWrapper__product__listView__detail__detail-box__catInfo">
                        <div className="productListWrapper__product__listView__detail__detail-box__catInfo__cat">
                          <span>UPC Number</span>
                        </div>
                        <div className="productListWrapper__product__listView__detail__detail-box__catInfo__info">
                          <span>{(product.emwProdUpc === null || product.emwProdUpc ==="") ? "N/A" : product.emwProdUpc }</span>
                        </div>
                      </div>
                    }
                </div>
                {
                  ((product.emwProdShowUpc || product.emwProdShowHscode || product.emwProdShowDispweight || product.emwProdShowVendor) && TempArr.length>0) &&
                  <div className="product-page-attribute-gap-border"></div>
                }
                <div>      
                    {TempArr.slice(0,(TempArr.length)).map((attr, index)=>{
                          return <div className="productListWrapper__product__listView__detail__detail-box__catInfo">
                          <div key={index} className="productListWrapper__product__listView__detail__detail-box__catInfo__cat">
                            <span>{attr}</span>
                          </div>
                          <div className="productListWrapper__product__listView__detail__detail-box__catInfo__info">
                            <span>{Object.keys(attrbutesDisplayTemp).length && attrbutesDisplayTemp[attr] && attrbutesDisplayTemp[attr].length > 0 ? attrbutesDisplayTemp[attr][0] : attrbutesTemp[attr].map((val, index)=>{
                            return attrbutesTemp[attr].length > 1 && index !== attrbutesTemp[attr].length - 1 ? val + ", " : val
                            })}
                            </span>
                          </div>
                        </div>
                        })
                    }  
                </div>
              </div>
              
              

            </Card>

            </div>
        )
}

export default IndividualProductsList
