import React from "react";
import Grid from '@material-ui/core/Grid';
import "./scss/index.scss";

const CartHeader: React.FC = () => {
	return(
		<Grid container className="emw-cart-header-block" spacing={3}>
          
              <Grid item lg={6}>
                <h1 className="checkout__header cart-page__header emw-cart-header-text">CART CONTENTS</h1>
              </Grid>
              <Grid item lg={6}>
                <div className="emw-cart-header-button-wrapper">
                  <div className="shopping-button">
	                  <button>
	                       CONTINUE SHOPPING
	                  </button>
                  </div>
                  <div className="checkout-button">
	                  <button>
	                      SECURE CHECKOUT
	                  </button>
                  </div>
                </div>
              </Grid>
        </Grid>

	);

}
export default CartHeader;