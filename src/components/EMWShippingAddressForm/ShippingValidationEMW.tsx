import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import { useSignIn } from "@sdk/react";

import { ShopContext } from "../ShopProvider/context";




import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { addNewShippingAddMutation } from '@sdk/mutations/emwShipping';


import AddressValidationEMW  from './AddressValidationEMW'

interface IShippingValidationEMW {
  hide?: () => void;
  changeActiveTab: () => void;
  Mopen: boolean;
}

const ShippingValidationEMW: React.FC<IShippingValidationEMW> = ({ hide, changeActiveTab, Mopen }) => {
  const [signIn, { loading, error }] = useSignIn();
  const [cartFunction, setCartFunction] = useState(null);
  const [passError, setpassError] = useState(false);
  const [emailError, setemailError] = useState(false);

  const [addOpen, setaddOpen] = React.useState(1);


  // const [checkoutUpdate] = useMutation(addNewShippingAddMutation, {
  //   onCompleted({ checkoutCreate }) {
  //     if (checkoutCreate.errors.length === 0) {
  //       console.info('create mutation')
  //     } else {
  //       console.error('error mutation', checkoutCreate.errors[0].message)
  //     }
  //   },
  //   onError(errors) {
  //     console.error(errors)
  //   },
  // });

  const handleClose = () => {
    hide();
  };

  React.useEffect(() => {
    if (error && error.extraInfo && error.extraInfo.userInputErrors) {
      if (error.extraInfo.userInputErrors[0].message === "Please, enter valid credentials") {
        setpassError(true)
      }
    }
  }, [error]);

  const handleOnSubmit = async (evt, { email, password }) => {
    evt.preventDefault();

  };

  const handleAddressSubmit = async (evt, { firstname, lastname, streetAddress1, streetAddress2, city, countryArea, postalCode, ChkNew }) => {
    evt.preventDefault();
  };

  const handleValidSubmit  = async (evt, { firstname, lastname, streetAddress1, streetAddress2, city, countryArea, postalCode, ChkNew }) => {
    evt.preventDefault();
  };

  return (
    <ShopContext.Consumer>
      {
        cartAction => {
          return (
            <React.Fragment>
               <AddressValidationEMW suggestAdd={""} showShipping={() => setaddOpen(1)} handleValidSubmit={()=> handleValidSubmit}/>
            </React.Fragment>
          )
        }

      }
    </ShopContext.Consumer>
  );
};

export default ShippingValidationEMW;
