import "./scss/index.scss";

import React, { useEffect, useState } from "react";
// import { useAlert } from "react-alert";
// import { Link } from "react-router-dom";

// import { useUserDetails } from "@sdk/react";

// import { CheckoutContextInterface } from "../../checkout/context";
// import { baseUrl as checkoutUrl } from "../../checkout/routes";
import { Button, CartTable, EmptyCart, Loader } from "../../components";
// import { CartInterface } from "../../components/CartProvider/context";
// import {
//   extractCartLines,
//   extractCheckoutLines,
//   getTotal
// // } from "../../components/CartProvider/utils";
// import { OverlayContextInterface } from "../../components/Overlay/context";
// import { getShop_shop } from "../../components/ShopProvider/types/getShop";
// import { maybe } from "../../core/utils";
// import { checkoutLoginUrl } from "../../routes";
// import { TypedProductVariantsQuery } from "../Product/queries";
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { CartCheckoutDetailsQuery } from '@sdk/queries/emwAddToCartQueries';
import ProductDetails from './ProductDetails';
import CartHeader from "./CartHeader";
import Grid from '@material-ui/core/Grid';
import ShippingOptions from './ShippingOptions';
import OrderSummary from './OrderSummary';

const Page: React.FC = () => {

  const localData=JSON.parse(localStorage.getItem('EMWCart'));
  const [cartDetails,setCartDetails]=useState(false);
  const [startLoader,setStartLoader]=useState(false);
  const [fetchCartData] = useLazyQuery(CartCheckoutDetailsQuery, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      if(data && data.emwCheckout)
      {
        setStartLoader(false);
        setCartDetails(data.emwCheckout);
      }
  },
    onError(error) {
      setStartLoader(false);
      setCartDetails(localData);
    },
  });

  useEffect(() => {
      if(localData && localData.token)
      {  
        setStartLoader(true);
        fetchCartData({
          variables: {
            tokenId: localData.token,
            bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false,
            bypassShipping :  JSON.parse(localStorage.getItem('bypassShipping')) || false
          },
        });  
      }
  }, []);


  // const alert = useAlert();
  // const { data: user } = useUserDetails();
  // const hasErrors: boolean | null = maybe(() => !!errors.length);
  // const isLoading =
  //   (!checkout && checkoutLoading) || syncWithCart || syncUserCheckout;

  // React.useEffect(() => {
  //   if (hasErrors) {
  //     alert.show(
  //       {
  //         content: errors.map(err => err.message).join(", "),
  //         title: "Error",
  //       },
  //       { type: "error" }
  //     );
  //     clearErrors();
  //   }
  // }, [hasErrors]);
  
  // const productTableProps = {
  //   add,
  //   changeQuantity,
  //   invalid: maybe(() => !!errors.length, false),
  //   processing: cartLoading,
  //   remove,
  //   subtract,
  // };
  // const locale = maybe(() => geolocalization.country.code, defaultCountry.code);

  return (
    <>
      {

        startLoader ? 
        <div className="loader-height">
          <Loader full/>
        </div>
        :
        cartDetails &&  cartDetails.lines.length>0 ?
        <div>
          <div>
            <CartHeader />
          </div>
          <div>
            <Grid container spacing={3}>
             
                  <Grid item lg={9} sm={12} className="w-100">
                    <ProductDetails data={cartDetails} />
                  </Grid>
                  <Grid item lg={3} sm={12} className="w-100">
                    <ShippingOptions />
                    <OrderSummary />
                  </Grid>
              
            </Grid>
            
          </div>
        </div>
        :
        <EmptyCart />
      }
    </>
  );
};

export default Page;
