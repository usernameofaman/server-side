import React from "react";
// import Grid from '@material-ui/core/Grid';
import "./scss/index.scss";
// import { TextField } from "../../components";


const OrderSummary: React.FC = () => {
	return(
		<div>
      <div className="product-page-login_block">
            <button className="product-page-loginButton">LOGIN FOR ADVANTAGE PRICING</button>
      </div>
      <div className="emw-add-bottom-space emw-cart-order-summary-block">
        <div className="product-page-details_block">
          <p className="shipping-options-header">ORDER SUMMARY</p>
          <div className="emw-order-summary-wrapper">
            <p>Subtotal</p>
            <p>$555</p>
          </div>
          <div className="emw-order-summary-wrapper">
            <p>Handling Charges</p>
            <p>$555</p>
          </div>
          <div className="emw-order-summary-wrapper">
            <p>Estimated Shipping</p>
            <p>$555</p>
          </div>
          <div className="emw-order-summary-wrapper">
            <p>Estimated Tax</p>
            <p>$555</p>
          </div>
          <div className="emw-order-summary-wrapper">
            <p>Estimated Total</p>
            <p>$555</p>
          </div>
        </div>
        <div className="shopping-button emw-order-summary-button emw-add-bottom-space"><button>Print Self Quote</button></div>
        <div className="checkout-button emw-order-summary-button"><button>SECURE CHECKOUT</button></div>
      </div>
    </div>
	);

}
export default OrderSummary;