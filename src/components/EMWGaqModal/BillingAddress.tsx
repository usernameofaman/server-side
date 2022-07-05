import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import addAddress from "../../images/add-address-white.svg";
import ReactSVG from "react-svg";
import { useQuery, useMutation  } from '@apollo/react-hooks';
import { useAlert } from "react-alert";

import { UpdateQuoteBillingAddressMutation } from '../../@sdk/mutations/emwGetAQuoteMutations';
import { getBillingAddress } from '../../@sdk/queries/emwShipping';
import { addNewShippingAddMutation } from '@sdk/mutations/emwShipping';

import AddAddressFormEMW from "./AddAddressFormEMW"

interface IBillingAddress {
  selectedShippingAdd: any;
  quoteBilling: any;
  quoteShipping: any;
  LoggedIn: boolean;
  setvalidatebilling: any;
}


const BillingAddress: React.FC<IBillingAddress> = ({ selectedShippingAdd, quoteBilling, quoteShipping, LoggedIn, setvalidatebilling }) => {

  const [billingAdd, setbillingAdd] = useState({})
  const [selectedBillingId, setselectedBillingId] = useState("");
  const [enterData, setenterData] = useState({});
  const [stepNo, setstepNo] = useState(1);
  React.useEffect(() => {
    if (inputValues.sameAsShipping && Object.keys(selectedShippingAdd).length) {
      setbillingAdd(selectedShippingAdd)
      const isQuoteExist = JSON.parse(localStorage.getItem('EMWQuote'));
      if (LoggedIn) {
        updateBillingAddress({
          variables: {
            quoteId: isQuoteExist.id,
            newAddress: false,
            billingAddressId: selectedShippingAdd.id,
          },
        })
      } else {
        updateBillingAddress({
          variables: {
            quoteId: isQuoteExist.id,
            newAddress: true,
            firstName: selectedShippingAdd.firstName,
            lastName: selectedShippingAdd.lastName,
            streetAddress1: selectedShippingAdd.streetAddress1,
            streetAddress2: selectedShippingAdd.streetAddress2,
            city: selectedShippingAdd.city,
            countryArea: selectedShippingAdd.countryArea,
            postalCode: selectedShippingAdd.postalCode,
            country: selectedShippingAdd.country,
            isBillingAddress: true,
            useUnverified: true,
          },
        })
      }

    }
  }, [selectedShippingAdd]);
  const impersonatedCustomerEmail = localStorage.getItem('ImpersonatedCustomerEmail');
  let requestData ={}

  if(impersonatedCustomerEmail && impersonatedCustomerEmail.length){
    requestData={
      email:impersonatedCustomerEmail
    }
  }

  const { data, loading, refetch } = useQuery(getBillingAddress, {
    variables: requestData, fetchPolicy: "no-cache",
  });


  const alert = useAlert();
  React.useEffect(() => {
    if (quoteBilling && LoggedIn) {
      setvalidatebilling(true)
      if (quoteBilling && quoteShipping && quoteShipping.id === quoteBilling.id) {
        setbillingAdd(quoteBilling)
        setInputValues({
          sameAsShipping: true,
        })
      } else {
        setselectedBillingId(quoteBilling.id)
        setInputValues({
          sameAsShipping: false,
        })
      }

    } else if (quoteBilling && !LoggedIn) {
      setbillingAdd(quoteBilling)
      setvalidatebilling(true)
      if (quoteBilling && quoteShipping && (quoteShipping.streetAddress1 === quoteBilling.streetAddress1 && quoteShipping.firstName === quoteBilling.firstName && quoteShipping.lastName === quoteBilling.lastName)) {
        setInputValues({
          sameAsShipping: true,
        })
      } else {
        setInputValues({
          sameAsShipping: false,
        })
      }

    }

  }, [quoteBilling, quoteShipping]);

  const [inputValues, setInputValues] = useState({
    sameAsShipping: true,
  })

  const handleCheckboxChange = (event, inputValues, setInputValues) => {
    const { name, checked } = event.target;
    setInputValues({ ...inputValues, [name]: checked });
    if (selectedShippingAdd && checked && selectedShippingAdd.id) {
      setbillingAdd(selectedShippingAdd)
      const isQuoteExist = JSON.parse(localStorage.getItem('EMWQuote'));
      updateBillingAddress({
        variables: {
          quoteId: isQuoteExist.id,
          newAddress: false,
          billingAddressId: selectedShippingAdd.id,
        },
      })
    } else if (quoteShipping && checked && quoteShipping.id) {
      setvalidatebilling(true)
      setbillingAdd(quoteShipping)
      const isQuoteExist = JSON.parse(localStorage.getItem('EMWQuote'));
      updateBillingAddress({
        variables: {
          quoteId: isQuoteExist.id,
          newAddress: false,
          billingAddressId: quoteShipping.id,
        },
      })
    } else {
      setvalidatebilling(false)
    }

  }

  const [updateBillingAddress] = useMutation(UpdateQuoteBillingAddressMutation, {
    onCompleted({ emwQuoteUpdateBilling }) {
      if (emwQuoteUpdateBilling.errors.length === 0) {
        setvalidatebilling(true)
      }
    },
    onError(error) {
      alert.show({title: "Something went wrong!"},{ type: "error" });
    },
  });

  const [addNewShipping] = useMutation(addNewShippingAddMutation, {
    onCompleted({ emwAddressCreate }) {
      if (emwAddressCreate.errors.length === 0) {
        refetch()
        setstepNo(1)
      } else {
        refetch()
        setstepNo(1)
      }
    },
    onError(errors) {
      alert.show({title: "Something went wrong!"},{ type: "error" });
    },
  });

  const handleAddressClick = (node) => {
    setbillingAdd(node)
    setselectedBillingId(node.id)
    setInputValues({
      sameAsShipping: false,
    })
    const isQuoteExist = JSON.parse(localStorage.getItem('EMWQuote'));
    updateBillingAddress({
      variables: {
        quoteId: isQuoteExist.id,
        newAddress: false,
        billingAddressId: node.id,
      },
    })
  }

  const handleAddressSubmit = (data) => {
    const customerEmail = localStorage.getItem('ImpersonatedCustomerEmail');
    setenterData(data)
    if (LoggedIn) {
      data.input.useUnverified = true
      if(customerEmail && customerEmail.length){
        addNewShipping({
          variables: { ...data, userEmail: customerEmail},
        })
      }else{
        addNewShipping({
          variables: data,
        })
      }
    } else {
      const isQuoteExist = JSON.parse(localStorage.getItem('EMWQuote'));
      const selectedShippingAdd = data.input
      if (selectedShippingAdd) {
        setbillingAdd(selectedShippingAdd)
        setstepNo(1)
        updateBillingAddress({
          variables: {
            quoteId: isQuoteExist.id,
            newAddress: true,
            firstName: selectedShippingAdd.firstName,
            lastName: selectedShippingAdd.lastName,
            streetAddress1: selectedShippingAdd.streetAddress1,
            streetAddress2: selectedShippingAdd.streetAddress2,
            city: selectedShippingAdd.city,
            countryArea: selectedShippingAdd.countryArea,
            postalCode: selectedShippingAdd.postalCode,
            country: selectedShippingAdd.country,
            isBillingAddress: true,
            useUnverified: true,
          },
        })
      }
    }

  }

  const cancelBtnHandler=()=>{
    setstepNo(1);
  }
  const renderStep = (step) => {
    switch (step) {
      case 1:
        return <div>
          <p className="product-title">Choose billing Address</p>
          <div className="items">
            <div className="inner-items">
              <div className="billingCheckbox">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inputValues.sameAsShipping}
                      onChange={(event) => handleCheckboxChange(event, inputValues, setInputValues)}
                      name="sameAsShipping"
                      classes={{ root: 'customcheckboxBorder' }}
                      style={{
                        color: "#F3A738",
                      }}
                    />
                  }
                  label="Same as shipping"
                />
                {inputValues.sameAsShipping ? billingAdd && Object.keys(billingAdd).length !== 0 ? <p className="">
                  {billingAdd.firstName !== "" ? billingAdd.firstName + " " : ""}
                  {billingAdd.lastName !== "" ? billingAdd.lastName : ""}
                  {billingAdd.lastName !== "" ? <br></br> : null}
                  {billingAdd.streetAddress1}, {billingAdd.streetAddress2 !== "" ? billingAdd.streetAddress2 + ", " : ""}
                  {billingAdd.city}, {billingAdd.countryArea},  {billingAdd.postalCode}
                </p> : <p className="">{"N/A"}</p> : LoggedIn ? <p className="">{"N/A"}</p> : null}

              </div>

            </div>

          </div>
          {!inputValues.sameAsShipping ?
            <div>
              <div className="items">
                <div className="inner-items">
                  {LoggedIn && data && data.emwAddresses.edges.map((addrs, index) => {
                    return <div key={index} className={addrs.node.id === selectedBillingId ? "add-list active" : "add-list"} onClick={() => handleAddressClick(addrs.node)}>
                      {addrs.node.firstName !== "" ? addrs.node.firstName + " " : ""}
                      {addrs.node.lastName !== "" ? addrs.node.lastName : ""}
                      {addrs.node.lastName !== "" ? <br></br> : null}
                      {addrs.node.streetAddress1}, {addrs.node.streetAddress2 !== "" ? addrs.node.streetAddress2 + ", " : ""}
                      {addrs.node.city}, {addrs.node.countryArea},  {addrs.node.postalCode}
                    </div>
                  })}

                  {!LoggedIn && billingAdd && Object.keys(billingAdd).length !== 0 ? <p className="">
                    {billingAdd.firstName !== "" ? billingAdd.firstName + " " : ""}
                    {billingAdd.lastName !== "" ? billingAdd.lastName : ""}
                    {billingAdd.lastName !== "" ? <br></br> : null}
                    {billingAdd.streetAddress1}, {billingAdd.streetAddress2 !== "" ? billingAdd.streetAddress2 + ", " : ""}
                    {billingAdd.city}, {billingAdd.countryArea},  {billingAdd.postalCode}
                  </p> : null}

                  <div className="add-new" onClick={() => setstepNo(2)} >ADD A NEW ADDRESS<ReactSVG
                    path={addAddress}
                    className="overlay__header__close-icon"
                  /></div>
                </div>

              </div>
            </div> : null}
        </div>;
      case 2:
        return <AddAddressFormEMW handleAddressSubmit={handleAddressSubmit} isBillingForm={true} LoggedIn={true} cancelBtnHandler={cancelBtnHandler}/>;
      default:
        return 'Something Went Wrong';
    }
  }
  return (
    renderStep(stepNo)
  );
};

export default BillingAddress;
