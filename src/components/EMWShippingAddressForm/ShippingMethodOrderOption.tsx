import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import { GACheckoutAdditionalOptions } from "../../utils/Google-Analytics";
import classNames from "classnames";

interface IShippingMethodOrderOption {
  Lines: any;
  avlShippingMethods: any;
  LoggedIn: boolean;
  onMethodSelectByItem: (method) => void;
  itemindex:number;
}

const ShippingMethodOrderOption: React.FC<IShippingMethodOrderOption> = ({ avlShippingMethods, Lines, LoggedIn, onMethodSelectByItem, itemindex }) => {
const [selectedMethod, setselectedMethod] = useState();
const onSelectShippingMethod = (method,name) => {
  // set google analytics options for 2nd step
  GACheckoutAdditionalOptions(2,name);

  onMethodSelectByItem(method)
  setselectedMethod(method)
}

let ProductIsFreight = false
let ProductIsFreeship = true

Lines && Lines.map((line, index) => {
  if(line.product.emwProdIsFreight){
    ProductIsFreight = true
  }
})

Lines && Lines.map((line, index) => {
  if(line.product.emwProdIsFreeship === false){
    ProductIsFreeship = false
  }
})

  return (
      <div className="shipping-list-item">
        {Lines && Lines.map((line, index) => {
          return(
          <>
          <div 
            key={index}
            className={classNames("emw-product", {
              "emw-shipping-method-bottom-gap-order": (!line.product.emwProdIsFreeship),
            })}
          >
            <span className="first-item">{line.quantity} X </span>
            <span className="second-item">{line.product.name}</span>
          </div>
          { 
            (line.product.emwProdIsFreeship) &&
            <div className="emw-product">
              <span className="first-item"></span>
              <span className="second-item emw-free-ship-text-by-order">THIS ITEM SHIPS FREE</span>
            </div>
          }
          </>
          )
        })}
     

      {avlShippingMethods[0].residentialSurcharge && avlShippingMethods[0].residentialSurcharge.amount > 0 ?
      <div className="emw-friet-shipp">
        <span>* This item MUST ship ground freight.</span>
        {avlShippingMethods[0].residentialSurcharge && avlShippingMethods[0].residentialSurcharge.amount > 0 ? <span>* There is  an additional fee of upto ${avlShippingMethods[0].residentialSurcharge.amount} associated with delivery to a residential address.</span> : null }
      </div> : null }
  
      {ProductIsFreeship?
      <div className="emw-shipp-methods">
      <div className={ selectedMethod === "00" ? "shipp-item active" : "shipp-item"}  onClick={() => onSelectShippingMethod("00","Free No Rush Shipping")}>
        <span>Free No Rush Shipping</span>
        <span>$0.00</span>
      </div></div> : null }

        {avlShippingMethods.map((method, index) => {
          return  <div key={index} className="emw-shipp-methods"><div className={ selectedMethod === method.code ? "shipp-item active" : "shipp-item"}  onClick={() => onSelectShippingMethod(method.code,method.name)}>
                    {/* <span>{method.businessDaysInTransit != null ? method.businessDaysInTransit + " days" : method.code === "03" || method.code === "349" ? "5-7 days" :"N/A"}</span> */}
                    <span>{method.name}</span>
                    <span>${parseFloat(method.price.amount).toFixed(2)}</span>
                  </div></div>
        })}      
      
      
    </div>
  );
};

export default ShippingMethodOrderOption;
