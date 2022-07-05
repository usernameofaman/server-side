import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import { useSignIn } from "@sdk/react";
import { maybe } from "@utils/misc";

import { Button, Form, TextField } from "..";
import { ShopContext } from "../ShopProvider/context";


import addAddress from "../../images/add-address.svg";
import ReactSVG from "react-svg";


import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import { addNewShippingAddMutation, updateNewShippingAddMutation, emwCheckoutUpdateShippingMutation } from '@sdk/mutations/emwShipping';
import { getShippingAddress, validateNewShippingAddQuery } from '@sdk/queries/emwShipping';


import AddAddressFormEMW from './AddAddressFormEMW'
import SavedShippingAddress from './SavedShippingAddress';
import loader from '../../images/emw-loader.svg'
import Select from 'react-select';

import AddressValidationEMW from './AddressValidationEMW'
import { useAlert } from "react-alert";
import { GACheckoutStep } from "../../utils/Google-Analytics";

interface IShippingAddressFormEMW {
  hide?: () => void;
  changeActiveTab: () => void;
  setInactiveNext: (status) => void;
  Mopen: number;
  LoggedIn: boolean;
  triggerOne: boolean;
  settriggerOne: (status) => void;
}

const ShippingAddressFormEMW: React.FC<IShippingAddressFormEMW> = ({ hide, changeActiveTab, setInactiveNext, Mopen, triggerOne, LoggedIn, settriggerOne }) => {
  const alert = useAlert();
  const [signIn, { loading: Uloading, error }] = useSignIn();
  const [btnActive, setbtnActive] = useState(false);
  const [loading, setloading] = useState(true);
  const [addOpen, setaddOpen] = React.useState(1);
  const [suggestAdd, setsuggestAdd] = React.useState([]);
  const [Sdata, setSdata] = React.useState([]);
  const [shippingAddress, setshippingAddress] = React.useState("");
  const [networkError, setnetworkError] = useState(false);
  const [enterData, setenterData] = useState({});
  const [addvalidatation, setaddvalidatation] = useState(false);
  const [selectedShipingId, setselectedShipingId] = useState('');
  const [userInfo, setUserInfo] = useState();

  // const [emwProdIsFreight, setemwProdIsFreight] = React.useState(false);
  const linesTemp = localStorage.EMWCart === undefined ? { lines: [] } : JSON.parse(localStorage.EMWCart)
  const lines = linesTemp.lines
  let emwProdIsFreight = false;
  lines.map((line, index) => {
    if (line.product.emwProdIsFreight) {
      emwProdIsFreight = true;
    }
  })

  useEffect(() => {
    // set  google analytics checkout step-1 
    const linesTemp = localStorage.EMWCart === undefined ? { lines: [] } : JSON.parse(localStorage.EMWCart)
    const lines = linesTemp.lines;
    GACheckoutStep(lines, 1, "");

    if (window.performance) {
      const start = window.performance.getEntriesByName(`CHECKOUT_START`, "mark");
      if (start && start.length > 0) {
        performance.clearMarks();
        performance.clearMeasures();
      }
      window.performance.mark(`CHECKOUT_START`);
      window.performance.mark(`CHECKOUT-STEP-1-START`);
    }
  }, []);

  // const { loading:Sloading, error:Serror, data:Sdata, refetch:Srefech } = useQuery(getShippingAddress, {
  //   variables: {  }
  // });

  const [fetchShippingAdd] = useLazyQuery(getShippingAddress, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      if (data) {
        settriggerOne(false)
        setInactiveNext(true)
        setSdata(data.emwAddresses.edges)
        setloading(false)
      }
    },
    onError(error) {
      setloading(false)
    },
  });

  useEffect(() => {

    if (triggerOne === true && addOpen === 1) {
      handleNextSubmit();
    }
  }, [triggerOne]);

  useEffect(() => {
    const impersonatedCustomerEmail = localStorage.getItem('ImpersonatedCustomerEmail');
    if (Mopen || addOpen === 1) {
      if(impersonatedCustomerEmail && impersonatedCustomerEmail.length){
        fetchShippingAdd({
          variables: {
            email:impersonatedCustomerEmail
          },
        });
      }else{
        fetchShippingAdd({
          variables: {
          },
        });
      }
    }
  }, [Mopen, addOpen]);

  const [addNewShipping] = useMutation(addNewShippingAddMutation, {
    onCompleted({ emwAddressCreate }) {
      if (emwAddressCreate.errors.length === 0) {
        const tempAddId = localStorage.getItem("ValidAddressID")
        const temp = tempAddId === null ? [] : JSON.parse(tempAddId)
        temp.push(emwAddressCreate.address.id)
        localStorage.setItem("ValidAddressID", JSON.stringify(temp))
        //setaddOpen(1)
        const cartTemp = localStorage.getItem("EMWCart")
        const cart = JSON.parse(cartTemp)
        const shippingtemp = {
          checkoutId: cart.id,
          shippingAddressId: emwAddressCreate.address.id,
          shippingAddress: enterData.input,
        }
        localStorage.setItem("shippingtemp", JSON.stringify(shippingtemp))
        
        changeActiveTab();
      } else {
        const temp = localStorage.getItem("EMWCart")
        const cart = JSON.parse(temp)
        const shippingtemp = {
          checkoutId: cart.id,
          shippingAddressId: "",
          shippingAddress: enterData,
        }
        localStorage.setItem("shippingtemp", JSON.stringify(shippingtemp))
        if (emwAddressCreate.candidates !== null && emwAddressCreate.candidates.length > 0) {
          setaddOpen(3)
          settriggerOne(false)
          setsuggestAdd(emwAddressCreate.candidates)
        } else {
          setaddOpen(3)
          settriggerOne(false)
          setsuggestAdd([])
          alert.show({ title: emwAddressCreate.errors[0].message }, { type: "error" });
        }

      }
    },
    onError(errors) {
      setnetworkError(true)
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });


  const [validateNewShipping] = useLazyQuery(validateNewShippingAddQuery, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      if (data) {
        // if (data.validateAddressWithUps.valid && data.validateAddressWithUps.candidates !== null && data.validateAddressWithUps.candidates.length > 0) {
        //   setInactiveNext(true)
        //   changeActiveTab()
        // }
        if (data.validateAddressWithUps.candidates !== null && data.validateAddressWithUps.candidates.length > 0) {
          setaddOpen(3)
          settriggerOne(false)
          setsuggestAdd(data.validateAddressWithUps.candidates)
        } else {
          setaddOpen(3)
          settriggerOne(false)
          setsuggestAdd([])
        }
      } else {
        setaddOpen(3)
        settriggerOne(false)
        setsuggestAdd([])
      }
    },
    onError(error) {
      setloading(false)
    },
  });

  const handleClose = () => {
    hide();
  };

  const [updateNewShipping] = useMutation(updateNewShippingAddMutation, {
    onCompleted({ emwAddressUpdate }) {
      const tempshipping = JSON.parse(localStorage.getItem("shippingtemp"))
      const shippingtemp = {
        checkoutId: tempshipping.checkoutId,
        shippingAddressId: tempshipping.shippingAddressId,
        shippingAddress: emwAddressUpdate.address,
      };
      localStorage.setItem("shippingtemp", JSON.stringify(shippingtemp));
      setaddvalidatation(false)
      changeActiveTab()
    },
    onError(errors) {
      console.log(errors)
    },
  });

  const handleNextSubmit = () => {
    if (shippingAddress !== "") {
      setselectedShipingId("")
      const temp = localStorage.getItem("EMWCart")
      const tempAddId = localStorage.getItem("ValidAddressID")
      const cart = JSON.parse(temp)
      const shippingtemp = {
        checkoutId: cart.id,
        shippingAddressId: shippingAddress.id,
        shippingAddress,
      }
      localStorage.setItem("shippingtemp", JSON.stringify(shippingtemp))
      if (tempAddId && tempAddId.indexOf(shippingtemp.shippingAddressId) !== -1) {
        changeActiveTab()
      } else {
        const temp = tempAddId === null ? [] : JSON.parse(tempAddId)
        temp.push(shippingtemp.shippingAddressId)
        localStorage.setItem("ValidAddressID", JSON.stringify(temp))
        //delete shippingtemp.shippingAddress.id;
        delete shippingtemp.shippingAddress.__typename;
        if (shippingtemp.shippingAddress.country && shippingtemp.shippingAddress.country.code) {
          shippingtemp.shippingAddress.country = shippingtemp.shippingAddress.country.code
        } else {
          shippingtemp.shippingAddress.country = "US";
        }
        setaddvalidatation(true)
        handleAddressNewValidate(shippingtemp.shippingAddress)
      }
    }
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    if (shippingAddress !== "") {
      setselectedShipingId("")
      const temp = localStorage.getItem("EMWCart")
      const tempAddId = localStorage.getItem("ValidAddressID")
      const cart = JSON.parse(temp)
      const shippingtemp = {
        checkoutId: cart.id,
        shippingAddressId: shippingAddress.id,
        shippingAddress,
      }
      localStorage.setItem("shippingtemp", JSON.stringify(shippingtemp))
      if (tempAddId && tempAddId.indexOf(shippingtemp.shippingAddressId) !== -1) {
        changeActiveTab()
      } else {
        const temp = tempAddId === null ? [] : JSON.parse(tempAddId)
        temp.push(shippingtemp.shippingAddressId)
        localStorage.setItem("ValidAddressID", JSON.stringify(temp))
        setselectedShipingId(shippingtemp.shippingAddress.id)
        //delete shippingtemp.shippingAddress.id;
        delete shippingtemp.shippingAddress.__typename;
        if (shippingtemp.shippingAddress.country && shippingtemp.shippingAddress.country.code) {
          shippingtemp.shippingAddress.country = shippingtemp.shippingAddress.country.code
        } else {
          shippingtemp.shippingAddress.country = "US";
        }
        setaddvalidatation(true)
        handleAddressNewValidate(shippingtemp.shippingAddress)
      }
    }
  };
  const [showAddressErrorOnce, setShowAddressErrorOnce] = React.useState(false)
  const handleAddressSubmit = (data) => {
    const customerEmail = localStorage.getItem('ImpersonatedCustomerEmail');
    setenterData(data)
    const copyData = {
      input: {
        city: data.input.city,
        companyName: data.input.companyName,
        country: data.input.country,
        countryArea: data.input.countryArea,
        email: data.input.email ? data.input.email : "",
        firstName: data.input.firstName,
        lastName: data.input.lastName,
        postalCode: data.input.postalCode,
        streetAddress1: data.input.streetAddress1,
        streetAddress2: data.input.streetAddress2,
        ccEmail: data.input.ccEmail ? data.input.ccEmail : "",
        phone: data.input.phone ? data.input.phone : "",
        phoneExtension: data.input.phoneExtension ? data.input.phoneExtension : "",
        useUnverified: true
      }
    }
    if (addvalidatation) {
      let tempshipping = JSON.parse(localStorage.getItem("shippingtemp"))
      if(customerEmail && customerEmail.length){
        updateNewShipping({
          variables:{
            id: tempshipping.shippingAddressId,
            userEmail: customerEmail,
            input: copyData.input
          },
        })
      }else{
        updateNewShipping({
          variables:{
            id: tempshipping.shippingAddressId,
            input: copyData.input
          },
        })
      }
    } else {
      if(customerEmail && customerEmail.length){
        addNewShipping({
          variables: {...data,userEmail:customerEmail}
        })
      }else{
        data.input.useUnverified = showAddressErrorOnce;
        addNewShipping({
          variables: data,
        })
      }
    }
    if(showAddressErrorOnce===false)
      setShowAddressErrorOnce(true)
  }

  const handleAddressNewValidate = (data) => {
    const temp = localStorage.getItem("EMWCart")
    const cart = JSON.parse(temp)
    setenterData({ input: data })
    const copyData = { ...data }
    delete copyData.id;
    validateNewShipping({
      variables: {
        address: copyData,
        checkoutId: cart.id,
      },
    })
  }

  const handleAddressValidate = (data) => {
    const temp = localStorage.getItem("EMWCart")
    const cart = JSON.parse(temp)
    setenterData(data)
    validateNewShipping({
      variables: {
        address: data.input,
        checkoutId: cart.id,
      },
    })
  }

  const handleValidSubmit = async (evt, { firstname, lastname, streetAddress1, streetAddress2, city, countryArea, postalCode, ChkNew }) => {
    evt.preventDefault();
  };

  const handleAddressClick = (node) => {
    setshippingAddress(node.value)
    setInactiveNext(false)
    setbtnActive(true)
    setselectedShipingId(node.value.id)
  }
  const savedAddressOptions = Sdata && Sdata.map((addrs, index) => {
    return {
      value:addrs.node,
      label: <div>{addrs.node.streetAddress1}, 
      {addrs.node.streetAddress2 !== "" ? addrs.node.streetAddress2 + ", " : ""}
      {addrs.node.city}, 
      {addrs.node.countryArea},  
      {addrs.node.postalCode}
      <>({addrs.node.companyName ? addrs.node.companyName : addrs.node.firstName + ' ' + addrs.node.lastName})</>
      </div>,
    }
  })
  savedAddressOptions.splice(0, 0, {value:'',label:<div>Use a new address</div>});

  return (
    <ShopContext.Consumer>
      {
        cartAction => {
          return (
            <React.Fragment>
              {loading ?
                <div className="product-page-details_block loader-wrapper">
                  <ReactSVG path={loader} className="medium-size-loader" />
                </div>

                : addOpen === 2 ? <AddAddressFormEMW LoggedIn={LoggedIn} userInfo={userInfo} setUserInfo={setUserInfo} triggerTwo={triggerOne} setInactiveNext={setInactiveNext} isBillingForm={false} networkError={networkError} showValidation={() => setaddOpen(3)} showShipping={() => setaddOpen(1)} handleAddressSubmit={handleAddressValidate} /> : addOpen === 3 ? <AddressValidationEMW LoggedIn={LoggedIn} userInfo={userInfo} triggerTwo={triggerOne} suggestAdd={suggestAdd} setInactiveNext={setInactiveNext} showShipping={() => setaddOpen(2)} enterData={enterData} settriggerTwo={settriggerOne} handleValidSubmit={handleAddressSubmit} setaddOpen={setaddOpen} showErrorOnce={showAddressErrorOnce}/> : <div className="address-form">

                  <Form
                    errors={maybe(() => error.extraInfo.userInputErrors, [])}
                    onSubmit={handleOnSubmit}
                  >
                    <div>
                      <div className="items mbt-30">
                        <label>Saved Addresses</label>
                        <Select
                          className="basic-single"
                          minMenuHeight={49}
                          placeholder="Use a new address"
                          isSearchable={true}
                          required
                          onChange={(e)=>handleAddressClick(e)}
                          options={savedAddressOptions}
                        />
                      </div>
                      {shippingAddress.id ? <SavedShippingAddress handleOnSubmit={handleOnSubmit} savedShippingAddress={shippingAddress} networkError={networkError}/> :
                      <AddAddressFormEMW LoggedIn={LoggedIn} userInfo={userInfo} setUserInfo={setUserInfo} triggerTwo={triggerOne} setInactiveNext={setInactiveNext} isBillingForm={false} networkError={networkError} showValidation={() => setaddOpen(3)} showShipping={() => setaddOpen(1)} handleAddressSubmit={handleAddressValidate} />}
                    </div>

                    {/* <div className="items">
                      <div className="inner-items">
                        {emwProdIsFreight && <div className="info"> <span>One or more items in your cart MUST ship ground freight.</span>
                          <span>If you choose to ship these items to a residential address, then a residential delivery fee will apply.</span>
                        </div>}

                        {Sdata && Sdata.map((addrs, index) => {
                          return <div key={Math.random()} className={addrs.node.id === selectedShipingId ? "add-list active" : "add-list"} onClick={() => handleAddressClick(addrs.node)}>
                            {addrs.node.firstName !== "" ? addrs.node.firstName + " " : ""}
                            {addrs.node.lastName !== "" ? addrs.node.lastName : ""}
                            {addrs.node.lastName !== "" ? <br></br> : null}
                            {addrs.node.streetAddress1}, {addrs.node.streetAddress2 !== "" ? addrs.node.streetAddress2 + ", " : ""}
                            {addrs.node.city}, {addrs.node.countryArea},  {addrs.node.postalCode}
                          </div>
                        })}
                        <div onClick={() => { setaddOpen(2); setInactiveNext(true); setaddvalidatation(false); localStorage.setItem("shippingtemp", "") }} className="add-new" >ADD A NEW ADDRESS<ReactSVG
                          path={addAddress}
                          className="overlay__header__close-icon"
                        /></div>
                        <div className={btnActive ? "checkout-form__button active" : "checkout-form__button"}>
                          <Button disabled={btnActive ? false : true} type="submit">
                            {"CONFIRM"}
                          </Button>
                        </div>
                      </div>

                    </div> */}
                  </Form>
                </div>
              }
            </React.Fragment>
          )
        }

      }
    </ShopContext.Consumer>
  );
};

export default ShippingAddressFormEMW;
