import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";

// import { CheckoutContext } from "../../checkout/context";
// import { CartContext } from "../../components/CartProvider/context";
// import { OverlayContext } from "../../components/Overlay/context";
// import { ShopContext } from "../../components/ShopProvider/context";
import Page from "./Page";
import { EMWCartContext } from "../../components/EMWCartProvider/context";
// import Grid from '@material-ui/core/Grid';

const View: React.SFC<RouteComponentProps<{ token?: string }>> = ({
  match: {
    params: { token },
  },
}) => {
  return (
    <div className="container cart-page emw-cart-font-size product-page">
      
      <div>   
        <EMWCartContext.Consumer>
        {
          cartAction=>(
            <Page
          />
          )
        }
        </EMWCartContext.Consumer>
      </div>
  
      
    </div>
  );
};

export default View;
