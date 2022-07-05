import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import { TextField, Button } from "..";

import addAddress from "../../images/add-address-white.svg";
import ReactSVG from "react-svg";
import { getShippingAddress, validateQuoteShippingAddQuery } from '../../@sdk/queries/emwShipping';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';

import {addNewShippingAddMutation } from '@sdk/mutations/emwShipping';

import { emwQuoteUpdateShippingMutation} from '@sdk/mutations/emwGetAQuoteMutations';


import AddAddressFormEMW from "./AddAddressFormEMW"
import AddressValidationEMW from "./AddressValidationEMW"
import { useAlert } from "react-alert";


interface IShippingAddress {
  setselectedShippingAdd: any;
  quoteShipping: any;
  LoggedIn: boolean;
  updateSelectedShippingAdd:any;
  setvalidateshipping:any;
}


const ShippingAddress: React.FC<IShippingAddress> = ({ updateSelectedShippingAdd, setselectedShippingAdd, quoteShipping, LoggedIn, setvalidateshipping }) => {

  const [selectedShipingId, setselectedShipingId] = useState("");
  const [stepNo, setstepNo] = useState(LoggedIn ? 1 : 2);
  const [enterData, setenterData] = useState({});
  const [suggestAdd, setsuggestAdd] = React.useState([]);
  const [verifiedAdd, setverifiedAdd] = React.useState(false);
  const impersonatedCustomerEmail = localStorage.getItem('ImpersonatedCustomerEmail');
  let requestData = {};
  
  if(impersonatedCustomerEmail && impersonatedCustomerEmail.length){
    requestData ={
      email : impersonatedCustomerEmail
    }
  }

  const { data, loading, refetch } = useQuery(getShippingAddress, {
    variables: requestData, fetchPolicy: "no-cache",
  });
  const alert = useAlert();

  React.useEffect(() => {
    if (quoteShipping && LoggedIn){
      setselectedShipingId(quoteShipping.id)
      setvalidateshipping(true)  
    }
      
    if(!LoggedIn && quoteShipping){
      setstepNo(1)
      setverifiedAdd(quoteShipping)
      setvalidateshipping(true)  
    }
     
  }, [quoteShipping]);

  const [updateCheckoutShipping] = useMutation(emwQuoteUpdateShippingMutation, {
    onCompleted({ emwQuoteUpdateShipping }) {
      if (emwQuoteUpdateShipping.errors.length === 0) {
        if(!LoggedIn){          
          updateSelectedShippingAdd(emwQuoteUpdateShipping.emwQuote.shippingAddress.id)
        }
        setvalidateshipping(true) 
      } else {
        alert.show({ title: emwQuoteUpdateShipping.errors[0].message }, { type: "error" });
      }
    },
    onError(errors) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });


  const handleAddressClick = (node) => {
    setselectedShippingAdd(node)
    setselectedShipingId(node.id)
    const isQuoteExist = JSON.parse(localStorage.getItem('EMWQuote'));
    const shippingAddress = {
      shippingType: "BY_ORDER",
      shippingAddressId: node.id,
      newAddress: false,
    }
    updateCheckoutShipping({
      variables: {
        quoteId: isQuoteExist.id,
        manualShipping: true,
        shipping: shippingAddress,
      },
    })
  }

  const [addNewShipping] = useMutation(addNewShippingAddMutation, {
    onCompleted({ emwAddressCreate }) {
      if (emwAddressCreate.errors.length === 0) {
        refetch()
        setstepNo(1)
      } else {
        if (emwAddressCreate.candidates !== null && emwAddressCreate.candidates.length > 0) {
          setstepNo(3)
          setsuggestAdd(emwAddressCreate.candidates)
        } else {
          setstepNo(3)
          setsuggestAdd([])
          alert.show({ title: emwAddressCreate.errors[0].message }, { type: "error" });
        }

      }
    },
    onError(errors) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });

  const [validateNewShipping] = useLazyQuery(validateQuoteShippingAddQuery, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      if (data) {
        if (data.validateQuoteAddressWithUps.candidates !== null && data.validateQuoteAddressWithUps.candidates.length > 0) {
          setsuggestAdd(data.validateQuoteAddressWithUps.candidates)
        } else {
          setsuggestAdd([])
          alert.show({ title: data.validateQuoteAddressWithUps.errors }, { type: "error" });
        }
        setstepNo(3)
      }
    },
    onError(error) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });


  const handleAddressValidate = (data) => {
    const temp = localStorage.getItem("EMWQuote")
    const cart = JSON.parse(temp)
    setenterData(data)
    validateNewShipping({
      variables: {
        address: data.input,
        quoteId: cart.id,
      },
    })
  }


  const handleAddressSubmit = (data) => {
    const customerEmail = localStorage.getItem('ImpersonatedCustomerEmail');
    if (LoggedIn) {
      setverifiedAdd(false)
      setenterData(data)
      if(customerEmail && customerEmail.length){
        addNewShipping({
          variables: {...data, userEmail : customerEmail},
        })
      }else{
        addNewShipping({
          variables: data,
        })
      }
    } else {
      const tempUser = data.input
      const shippingobj = {
        shippingType: "BY_ORDER",
        shippingAddressId: "",
        shippingMethod: "12",
        newAddress: true,
        shippingAddress: {
          firstName: tempUser.firstName,
          lastName: tempUser.lastName,
          email: tempUser.email,
          city: tempUser.city,
          countryArea: tempUser.countryArea,
          country: tempUser.country,
          postalCode: tempUser.postalCode,
          streetAddress1: tempUser.streetAddress1,
        },
      }
      setstepNo(1)
      setverifiedAdd(data.input)
      setselectedShippingAdd(data.input)
      const isQuoteExist = JSON.parse(localStorage.getItem('EMWQuote'));
      updateCheckoutShipping({
        variables: {
          quoteId: isQuoteExist.id,
          manualShipping: false,
          shipping: shippingobj,
        },
      })

    }
  }

  const cancelBtnHandler=()=>{
    setstepNo(1);
  }
  const renderStep = (step) => {
    switch (step) {
      case 1:
        return verifiedAdd ? <div>
          <p className="product-title">Shipping Address</p>
          <div className="items">
            <div className="inner-items">
              <div className={"add-list active"}>
                {verifiedAdd.firstName !== "" ? verifiedAdd.firstName + " " : ""}
                {verifiedAdd.lastName !== "" ? verifiedAdd.lastName : ""}
                {verifiedAdd.lastName !== "" ? <br></br> : null}
                {verifiedAdd.streetAddress1}, {verifiedAdd.streetAddress2 !== "" ? verifiedAdd.streetAddress2 + ", " : ""}
                {verifiedAdd.city}, {verifiedAdd.countryArea},  {verifiedAdd.postalCode}
              </div>
              <div className="add-new" onClick={() => setstepNo(2)} >CHANGE ADDRESS<ReactSVG
                path={addAddress}
                className="overlay__header__close-icon"
              /></div>
            </div>

          </div>
        </div> : <div>
            <p className="product-title">Choose Shipping Address</p>
            <div className="items">
              <div className="inner-items">
                {data && data.emwAddresses.edges.map((addrs, index) => {
                  return <div key={index} className={addrs.node.id === selectedShipingId ? "add-list active" : "add-list"} onClick={() => handleAddressClick(addrs.node)}>
                    {addrs.node.firstName !== "" ? addrs.node.firstName + " " : ""}
                    {addrs.node.lastName !== "" ? addrs.node.lastName : ""}
                    {addrs.node.lastName !== "" ? <br></br> : null}
                    {addrs.node.streetAddress1}, {addrs.node.streetAddress2 !== "" ? addrs.node.streetAddress2 + ", " : ""}
                    {addrs.node.city}, {addrs.node.countryArea},  {addrs.node.postalCode}
                  </div>
                })}

                <div className="add-new" onClick={() => setstepNo(2)} >ADD A NEW ADDRESS<ReactSVG
                  path={addAddress}
                  className="overlay__header__close-icon"
                /></div>
              </div>

            </div>
          </div>;
      case 2:
        return <AddAddressFormEMW LoggedIn={LoggedIn} handleAddressSubmit={handleAddressValidate} isBillingForm={false} cancelBtnHandler={cancelBtnHandler}/>;
      case 3:
        return <AddressValidationEMW handleValidSubmit={handleAddressSubmit} showShipping={() => setstepNo(1)} enterData={enterData} suggestAdd={suggestAdd} />;
      default:
        return 'Something Went Wrong';
    }
  }

  return (
    renderStep(stepNo)

  );
};

export default ShippingAddress;
