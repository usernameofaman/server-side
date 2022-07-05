import React from "react";
// import Grid from '@material-ui/core/Grid';
import "./scss/index.scss";
import { TextField } from "../../components";

const ShippingOptions: React.FC = () => {
	return(
		<div className="shipping-options-wrapper">
      <p className='shipping-options-header'> CALCULATE SHIPPING OPTIONS </p>
      <div>
        <TextField
            type="text"
            label="Email Address"
        />
      </div>
      <div>
        <TextField
          type="text"
          label="Zip Code"
        />
      </div>
      <div className="shipping-rate-box">
        <p className='shipping-rate-text'>CHOOSE SHIPPING RATE</p>
        <p className='shipping-dialog-text'>Confirmation Dialog to Choose</p>
      </div>
    </div>
	);

}
export default ShippingOptions;