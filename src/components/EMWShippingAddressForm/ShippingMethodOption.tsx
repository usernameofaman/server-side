import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import classNames from "classnames";

interface IShippingMethodOption {
  products: any;
  LoggedIn: boolean;
  onMethodSelectByItem: (method, id, index) => void;
  itemindex:number;
  lineWiseShippingValues: any;
}

const ShippingMethodOption: React.FC<IShippingMethodOption> = ({ products, LoggedIn, onMethodSelectByItem, itemindex, lineWiseShippingValues }) => {
// const [selectedMethod, setselectedMethod] = useState();

const onSelectShippingMethod = (method, id) => {
  onMethodSelectByItem(method, itemindex, id);
  // setselectedMethod(method)
}
const selectedMethod=(lineWiseShippingValues && lineWiseShippingValues[itemindex]) ? lineWiseShippingValues[itemindex].shippingMethod : null;
  return (
      <div className="shipping-list-item">

      <div className={classNames("emw-product", {
          "emw-shipping-method-bottom-gap": (!products.line.product.emwProdIsFreeship),
        })
      }>
        <span className="first-item">{products.line.quantity} X </span>
        <span className="second-item">{products.line.product.name}</span>
      </div>
      {
        products.line.product.emwProdIsFreeship &&
        <div className="emw-product">
          <span className="first-item"></span>
          <span className="second-item emw-free-ship-text">THIS ITEM SHIPS FREE</span>
        </div>
      }
      {products.shipping[0].residentialSurcharge && products.shipping[0].residentialSurcharge.amount > 0  ?
      <div className="emw-friet-shipp">
        <span>* This item MUST ship ground freight.</span>
        {products.shipping[0].residentialSurcharge && products.shipping[0].residentialSurcharge.amount > 0 ? <span>* There is  an additional fee of upto ${products.shipping[0].residentialSurcharge.amount} associated with ground freight delivery for each item to a residential delivery address.</span> : null }
      </div> : null }
  
      {products.line.product.emwProdIsFreeship ?
      <div className="emw-shipp-methods">
      <div className={ selectedMethod === "00" ? "shipp-item active" : "shipp-item"}  onClick={() => onSelectShippingMethod("00", products.line.id)}>
        <span>Free No Rush Shipping</span>
        <span>$0.00</span>
      </div></div> : null }
      
        {products.shipping.map((method, index) => {
          return  <div key={index} className="emw-shipp-methods"><div key={index} className={ selectedMethod === method.code ? "shipp-item active" : "shipp-item"}  onClick={() => onSelectShippingMethod(method.code, products.line.id)}>
                    {/* <span>{method.businessDaysInTransit != null ? method.businessDaysInTransit + " days" : method.code === "03" || method.code === "349" ? "5-7 days" :"N/A"}</span> */}
                    <span>{method.name}</span>
                    <span>${parseFloat(method.price.amount).toFixed(2)}</span>
                  </div> </div>
        })}      
     
      
    </div>
  );
};

export default ShippingMethodOption;
