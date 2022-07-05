import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import { useSignIn } from "@sdk/react";
import { maybe } from "@utils/misc";

import { Button, Form, TextField } from "..";
import { ShopContext } from "../ShopProvider/context";


import addAddress from "../../images/add-address.svg";
import ReactSVG from "react-svg";


import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import { emwCheckoutUpdateShippingMutation } from '@sdk/mutations/emwShipping';
import { validateNewShippingAddQuery } from '@sdk/queries/emwShipping';

import { useAlert } from "react-alert";
import AddAddressFormEMW from './AddAddressFormEMW'
import Loader from "../../components/Loader";
import AddressValidationEMW from './AddressValidationEMW'
import AddContactFormEMW from './AddContactFormEMW'

interface IShippingAddressEMW {
  hide?: () => void;
  changeActiveTab: () => void;
  Mopen: number;
  triggerTwo: boolean;
  LoggedIn: boolean;
  setInactiveNext: (status) => void;
  settriggerTwo: (status) => void;
}

const ShippingAddressEMW: React.FC<IShippingAddressEMW> = ({ hide, changeActiveTab, Mopen, triggerTwo, setInactiveNext, settriggerTwo, LoggedIn }) => {
  const alert = useAlert();
  const [signIn, { loading: Uloading, error }] = useSignIn();
  const [btnActive, setbtnActive] = useState(false);
  const [loading, setloading] = useState(false);
  const [addOpen, setaddOpen] = React.useState(2);
  const [suggestAdd, setsuggestAdd] = React.useState([]);
  const [Sdata, setSdata] = React.useState([]);
  const [shippingAddress, setshippingAddress] = React.useState({});
  const [networkError, setnetworkError] = useState(false);
  const [enterData, setenterData] = useState({});
  const [selectedShipingId, setselectedShipingId] = useState();
  const [userInfo, setUserInfo] = useState();

  const [addNewShipping] = useLazyQuery(validateNewShippingAddQuery, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      if (data) {
        const temp = localStorage.getItem("EMWCart")
        const cart = JSON.parse(temp)
        const shippingtemp = {
          checkoutId: cart.id,
          shippingAddressId: "",
          shippingAddress: enterData,
        }
        localStorage.setItem("shippingtemp", JSON.stringify(shippingtemp))

        // if (data.validateAddressWithUps.valid && data.validateAddressWithUps.candidates !== null && data.validateAddressWithUps.candidates.length > 0) {
        //   setInactiveNext(true)
        //   changeActiveTab()
        // }
        if (data.validateAddressWithUps.candidates !== null && data.validateAddressWithUps.candidates.length > 0) {
          setsuggestAdd(data.validateAddressWithUps.candidates)
          setInactiveNext(true)
          settriggerTwo(false)
          setaddOpen(3)
        } else {
          setsuggestAdd([])
          setInactiveNext(true)
          settriggerTwo(false)
          setaddOpen(3)
        }
      } else {
        setloading(false)
        setInactiveNext(true)
        setsuggestAdd([])
        settriggerTwo(false)
        setaddOpen(3)
      }
    },
    onError(error) {
      setloading(false)
      setInactiveNext(true)
      changeActiveTab()
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });

  const [updateCheckoutShipping] = useMutation(emwCheckoutUpdateShippingMutation, {
    onCompleted({ emwCheckoutUpdateShipping }) {
      if (emwCheckoutUpdateShipping.errors.length === 0) {
        changeActiveTab()
      } else {
        alert.show({ title: emwCheckoutUpdateShipping.errors[0].message }, { type: "error" });
      }
    },
    onError(errors) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });

  const checkForValidateAddress =(address)=>{
    let ship_type = "BY_ORDER";
    const temp = JSON.parse(localStorage.getItem("contactInfoTemp"))
    const shippingobj = {
      shippingType: ship_type,
      newAddress: true,
      shippingAddress: {
        firstName: temp.firstname,
        lastName: temp.lastname,
        email: temp.email,
        city: address.shippingAddress.input.city,
        countryArea: address.shippingAddress.input.countryArea,
        country: address.shippingAddress.input.country,
        postalCode: address.shippingAddress.input.postalCode,
        streetAddress1: address.shippingAddress.input.streetAddress1,
      },
    }
     const requestBody = {
        checkoutId: address.checkoutId,
        manualShipping: true,
        shipping: shippingobj,
				bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false,
				bypassShipping :  JSON.parse(localStorage.getItem('bypassShipping')) || false,
      }
      updateCheckoutShipping({
        variables: requestBody
      })
    }


  const handleValidAddressSubmit = (data) => {
    setenterData(data)
    const temp = localStorage.getItem("EMWCart")
    const cart = JSON.parse(temp)
    const shippingtemp = {
      checkoutId: cart.id,
      shippingAddressId: "",
      shippingAddress: data,
    }
    localStorage.setItem("shippingtemp", JSON.stringify(shippingtemp))
    checkForValidateAddress(shippingtemp)
    setInactiveNext(true)
  }

  const handleAddressSubmit = (data) => {
    setenterData(data)
    const temp = localStorage.getItem("EMWCart")
    const cart = temp === "" ? false : JSON.parse(temp);
    if(cart && cart.id){
    addNewShipping({
      variables: {
        address: data.input,
        checkoutId: cart.id,
      },
    })
  }
  }


  return (
    <ShopContext.Consumer>
      {
        cartAction => {
          return (
            <React.Fragment>
              {loading ? <Loader /> : addOpen === 2 ? <AddAddressFormEMW userInfo={userInfo} setUserInfo={setUserInfo} LoggedIn={LoggedIn} triggerTwo={triggerTwo} setInactiveNext={setInactiveNext} values={null} isBillingForm={false} networkError={networkError} showValidation={() => setaddOpen(3)} showShipping={() => setaddOpen(1)} handleAddressSubmit={handleAddressSubmit} />
                : addOpen === 3 ? <AddressValidationEMW userInfo={userInfo} setaddOpen={setaddOpen} LoggedIn={LoggedIn} settriggerTwo={settriggerTwo} triggerTwo={triggerTwo} setInactiveNext={setInactiveNext} suggestAdd={suggestAdd} showShipping={() => setaddOpen(2)} enterData={enterData} handleValidSubmit={handleValidAddressSubmit} /> :
                  <AddContactFormEMW settriggerOne={settriggerTwo} triggerOne={triggerTwo} setInactiveNext={setInactiveNext} showShippingform={() => setaddOpen(2)} />
              }
            </React.Fragment>
          )
        }

      }
    </ShopContext.Consumer>
  );
};

export default ShippingAddressEMW;
