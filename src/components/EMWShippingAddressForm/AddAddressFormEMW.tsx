import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import { maybe } from "@utils/misc";

import { Button, Form, TextField } from "..";
import { ShopContext } from "../ShopProvider/context";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormControl, InputLabel, NativeSelect } from '@material-ui/core';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { useQuery } from '@apollo/react-hooks';
import { GetStatesQuery } from '../../@sdk/queries/states';
import Select from 'react-select';
import EMWPhoneNumber from '../EMWPhoneNumber';
import { StyledInput } from '../EMWModal/EMWAddressModal';
//import Select from 'react-select';

interface IAddAddressFormEMW {
  handleAddressSubmit: (data) => void;
  showShipping: () => void;
  showValidation: () => void;
  isBillingForm: boolean,
  networkError: boolean,
  values: any,
  triggerTwo: boolean;
  formType: boolean;
  setInactiveNext: (status) => void;
  LoggedIn: boolean,
  userInfo: any,
  setUserInfo: any,
}

const AddAddressFormEMW: React.FC<IAddAddressFormEMW> = ({userInfo, setUserInfo, handleAddressSubmit, showShipping, showValidation, isBillingForm, networkError, values, triggerTwo, setInactiveNext, LoggedIn }) => {

  const [checked, setChecked] = React.useState(true);
  const { data } = useQuery(GetStatesQuery, { fetchPolicy: "network-only" });
  const [btnActive, setbtnActive] = useState(false);
  const [newFormValues, setNewFormValues] = useState(null);
  const [stateValue, setStateValue] = useState(null);
  const [phoneNum, setPhoneNum] = React.useState("");
  const [saveData, setSaveData] = useState(false);
  const [phoneActive, setPhoneActive] = React.useState(false);
  const [stateActive, setStateActive] = useState(false);
  const [isFocusedPhoneState, setIsFocusedPhoneState] = React.useState(false);
  // let temp = "";
  // if (!isBillingForm && !LoggedIn) {
  //   localStorage.setItem("shippingtemp", "");
  // } else {
  //   temp = localStorage.getItem("shippingtemp");
  // }
  //const tempshipping = temp === "" ? false : JSON.parse(temp)
  // if (tempshipping && tempshipping.shippingAddress !== null) {
  //   if (newFormValues === null && !isBillingForm) {
  //     setNewFormValues({
  //       streetAddress1: tempshipping.shippingAddress.input.streetAddress1,
  //       streetAddress2: tempshipping.shippingAddress.input.streetAddress2,
  //       city: tempshipping.shippingAddress.input.city,
  //       postalCode: tempshipping.shippingAddress.input.postalCode,
  //       countryName: tempshipping.shippingAddress.input.country,
  //     })
  //     setbtnActive(true)
  //     setInactiveNext(false)
  //   }

  // }
  const btnRf = React.useRef(null)

  let emwProdIsFreight = false;
  if (!isBillingForm) {
    const linesTemp = JSON.parse(localStorage.EMWCart)
    const lines = linesTemp.lines
    lines.map((line, index) => {
      if (line.product.emwProdIsFreight) {
        emwProdIsFreight = true
      }
    })
  }
  useEffect(() => {
    if (triggerTwo === true) {
      btnRf.current.click()
    }
  }, [triggerTwo]);

  useEffect(() => {
    if (values && values.billingAddress) {
      const formValues = values.billingAddress;
      const setData = {
        streetAddress1: formValues.streetAddress1,
        streetAddress2: formValues.streetAddress2,
        city: formValues.city,
        // country: { country: formValues.countryArea, code: formValues.countryArea },
        postalCode: formValues.postalCode,
        countryName: "US",
      }
      setNewFormValues({ ...setData });
    }
  }, [values]);

  useEffect(() => {
    if (userInfo && userInfo.phoneNum.length > 1) {
      setPhoneActive(true);
    }
    if (userInfo && userInfo.countryArea.length) {
      setStateActive(true);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const GreenCheckbox = withStyles({
    root: {
      color: "#49596b;",
      '&$checked': {
        color: "#49596b;",
      },
    },
    checked: {},
  })((props: CheckboxProps) => <Checkbox name="ChkNew" color="default" {...props} />);

  const AddressSubmit = async (evt, { ccemail, extension, email, companyName, firstname, lastname, streetAddress1, streetAddress2, city, countryName, postalCode }) => {
    // localStorage.setItem("checkoutLocked", "True")
    evt.preventDefault();
    setSaveData(true);
    if (!isBillingForm && !LoggedIn) {
      setIsFocusedPhoneState(true);
      if (stateActive && phoneActive) {
        const data = {
          input: {
            streetAddress1,
            streetAddress2,
            city,
            countryArea: stateValue ? stateValue : userInfo && userInfo.countryArea,
            postalCode,
            country: "US",
            isBillingAddress: false,
            companyName: companyName,
            email,
            phone: phoneNum ? phoneNum : userInfo && userInfo.phoneNum,
            ccEmail: ccemail ? ccemail : userInfo && userInfo.ccemail,
            phoneExtension: extension ? extension : userInfo && userInfo.extension,
          },
        }
        handleAddressSubmit(data);
        const contactInfoTemp = {
          firstname,
          lastname,
          email,
          companyName,
          ccEmail: ccemail,
          phoneExtension: extension,
          phone: phoneNum ? phoneNum : userInfo && userInfo.phoneNum,
        }
        setUserInfo({
          phoneNum: phoneNum ? phoneNum : userInfo && userInfo.phoneNum, email, ccemail, extension, companyName,
          firstname, lastname, streetAddress1, streetAddress2, city,
          countryArea: stateValue ? stateValue : userInfo && userInfo.countryArea, postalCode
        });
        localStorage.setItem("contactInfoTemp", JSON.stringify(contactInfoTemp))
        setIsFocusedPhoneState(false);
      }
    } else {
      setIsFocusedPhoneState(true);
      if (stateActive && phoneActive) {
        const data = {
          input: {
            firstName: firstname,
            lastName: lastname,
            streetAddress1,
            streetAddress2,
            city,
            email,
            countryArea: stateValue ? stateValue : userInfo && userInfo.countryArea,
            postalCode,
            country: "US",
            isBillingAddress: false,
            companyName,
            phone: phoneNum ? phoneNum : userInfo && userInfo.phoneNum,
            ccEmail: ccemail ? ccemail : userInfo && userInfo.ccemail,
            phoneExtension: extension ? extension : userInfo && userInfo.extension,
          },
        }
        if (setUserInfo) {
          setUserInfo({
            firstname, lastname,
            phoneNum: phoneNum ? phoneNum : userInfo && userInfo.phoneNum,
            streetAddress1,
            streetAddress2,
            city, ccemail, extension, email,
            countryArea: stateValue ? stateValue : userInfo && userInfo.countryArea,
            postalCode,
            country: "US",
            isBillingAddress: false,
            companyName,
          });
        }
        handleAddressSubmit(data);
      }
      setIsFocusedPhoneState(false);
    }
  };

  const setOptionValues = (event) => {
    setStateValue(event.target.value);
    setStateActive(true)
  }
  const handleOnChangeNum = (value) => {
    setIsFocusedPhoneState(true);
    setPhoneNum(value);
    if(value.length > 1){
      setPhoneActive(true)
    }else{
      setPhoneActive(false)
    }
  }

  return (
    <ShopContext.Consumer>
      {
        cartAction => {
          return (
            <React.Fragment>

              <div className="address-form add-new-address-form">
                <Form
                  id="emw-address-form"
                  errors={maybe(() => [], [])}
                  onSubmit={AddressSubmit}
                  data={newFormValues && newFormValues ? newFormValues : userInfo && userInfo}
                >
                  <div className={["items", isBillingForm ? "billing-items" : ""].join(" ")}>

                    {!isBillingForm && LoggedIn !== true ? <div className="info">
                      {emwProdIsFreight ? <span>One or more items in your cart MUST ship ground freight.</span> : null}
                      {emwProdIsFreight ? <span>If you choose to ship these items to a residential address, then a residential delivery fee will apply.</span> : null}
                    </div> : null}

                    {
                      isBillingForm ?

                        <React.Fragment>
                          <label className="emw-label">First Name*</label>
                          <TextField
                            name="firstname"
                            autoComplete="given-name"
                            placeholder="First Name"
                            type="text"
                            required
                          />
                          <label className="emw-label">Last Name*</label>
                          <TextField
                            name="lastname"
                            autoComplete="family-name"
                            placeholder="Last Name"
                            type="text"
                            required
                          />
                        </React.Fragment>

                        :
                        LoggedIn ?
                          <React.Fragment>
                            <label className="emw-label">First Name*</label>
                            <TextField
                              name="firstname"
                              autoComplete="given-name"
                              placeholder="First Name"
                              type="text"
                              onBlur={() => { setbtnActive(true); if (!isBillingForm) { setInactiveNext(false) } }}
                              required
                            />
                            <label className="emw-label">Last Name*</label>
                            <TextField
                              name="lastname"
                              autoComplete="family-name"
                              placeholder="Last Name"
                              type="text"
                              onBlur={() => { setbtnActive(true); if (!isBillingForm) { setInactiveNext(false) } }}
                              required
                            />
                          </React.Fragment>
                          : null
                    }
                    {
                      (isBillingForm || LoggedIn) &&
                      <>
                        <label className="emw-label">Organization Name</label>
                        <TextField
                          name="companyName"
                          autoComplete="Organization"
                          placeholder="Organization Name"
                          type="text"
                          onBlur={() => { setbtnActive(true); if (!isBillingForm) { setInactiveNext(false) } }}
                        />
                      </>
                    }
                    {!isBillingForm && !LoggedIn &&
                      <>
                        <label className="emw-label">First Name*</label>
                        <TextField
                          name="firstname"
                          //value={userInfo.firstname || ''}

                          autoComplete="given-name"
                          placeholder="First Name"
                          type="text"
                          onBlur={() => { setbtnActive(true); if (!isBillingForm) { setInactiveNext(false) } }}
                          required
                        />
                        <label className="emw-label">Last Name*</label>
                        <TextField
                          name="lastname"
                          autoComplete="family-name"
                          placeholder="Last Name"
                          type="text"
                          onBlur={() => { setbtnActive(true); if (!isBillingForm) { setInactiveNext(false) } }}
                          required
                        />
                        <label className="emw-label">Organization Name</label>
                        <TextField
                          name="companyName"
                          autoComplete="Organization"
                          placeholder="Organization Name"
                          type="text"
                        />
                        <label className="emw-label">Email*</label>
                        <TextField
                          name="email"
                          autoComplete="Email"
                          placeholder="Email"
                          type="email"
                          required
                        />
                        <label className="emw-label">CC Email</label>
                        <TextField
                          name="ccemail"
                          autoComplete="Email"
                          placeholder="CC Email"
                          type="email"
                        />
                        <div className="emw-address-city-state">
                          <div className="emw-address-city">
                            <label className="emw-label">Phone Number*</label>
                            <EMWPhoneNumber
                              className={`${saveData && !phoneActive ? 'input__select--error' : ''}`}
                              defaultCountry="us"
                              name="phone"
                              required={true}
                              phoneNum={userInfo ? userInfo.phoneNum : phoneNum}
                              handleOnChangeNum={handleOnChangeNum}
                            />
                          </div>
                          <div className="emw-address-state">
                            <label className="emw-label">Extension</label>
                            <TextField
                              name="extension"
                              autoComplete="extension"
                              placeholder="Ext #"
                              type="text"
                              onBlur={() => { setbtnActive(true); if (!isBillingForm) { setInactiveNext(false) } }}
                            />
                          </div>
                        </div>
                      </>}

                    {isBillingForm && !LoggedIn &&
                      <>
                        <label className="emw-label">Email*</label>
                        <TextField
                          name="email"
                          autoComplete="Email"
                          placeholder="Email"
                          type="email"
                          required
                        />
                        <label className="emw-label">CC Email</label>
                        <TextField
                          name="ccemail"
                          autoComplete="Email"
                          placeholder="CC Email"
                          type="email"
                        />
                        <div className="emw-address-city-state">
                          <div className="emw-address-city">
                            <label className="emw-label">Phone Number*</label>
                            <EMWPhoneNumber
                              className={`${saveData && !phoneActive ? 'input__select--error' : ''}`}
                              defaultCountry="us"
                              name="phone"
                              required={true}
                              phoneNum={userInfo ? userInfo.phoneNum : phoneNum}
                              handleOnChangeNum={handleOnChangeNum}
                            />
                          </div>
                          <div className="emw-address-state">
                            <label className="emw-label">Extension</label>
                            <TextField
                              name="extension"
                              autoComplete="extension"
                              placeholder="Ext #"
                              type="text"
                              onBlur={() => { setbtnActive(true); if (!isBillingForm) { setInactiveNext(false) } }}
                            />
                          </div>
                        </div>
                      </>}

                    {LoggedIn &&
                      <>
                        <label className="emw-label">Email*</label>
                        <TextField
                          name="email"
                          autoComplete="Email"
                          placeholder="Email"
                          type="email"
                          onBlur={() => { setbtnActive(true); if (!isBillingForm) { setInactiveNext(false) } }}
                          required
                        />
                        <label className="emw-label">CC Email</label>
                        <TextField
                          name="ccemail"
                          autoComplete="Email"
                          placeholder="CC Email"
                          type="email"
                        />
                        <div className="emw-address-city-state">
                          <div className="emw-address-city">
                            <label className="emw-label">Phone Number*</label>
                            <EMWPhoneNumber
                              className={`${saveData &&  !phoneActive ? 'input__select--error' : ''}`}
                              defaultCountry="us"
                              name="phone"
                              required={true}
                              phoneNum={userInfo ? userInfo.phoneNum : phoneNum}
                              handleOnChangeNum={handleOnChangeNum}
                            />
                          </div>
                          <div className="emw-address-state">
                            <label className="emw-label">Extension</label>
                            <TextField
                              name="extension"
                              autoComplete="extension"
                              placeholder="Ext #"
                              type="text"
                              onBlur={() => { setbtnActive(true); if (!isBillingForm) { setInactiveNext(false) } }}
                            />
                          </div>
                        </div>
                      </>}

                    <label className="emw-label">Address Line 1*</label>
                    <TextField
                      name="streetAddress1"
                      autoComplete="address-line1"
                      placeholder="Address"
                      type="text"
                      onBlur={() => { setbtnActive(true); if (!isBillingForm) { setInactiveNext(false) } }}
                      required
                    />
                    <label className="emw-label">Address Line 2</label>
                    <TextField
                      name="streetAddress2"
                      autoComplete="address-line2"
                      placeholder="Address"
                      type="text"
                    />
                    <div className="emw-address-city-state">
                      <div className="emw-address-city">
                        <label className="emw-label">City*</label>
                        <TextField
                          name="city"
                          autoComplete="address-level2"
                          placeholder="City"
                          type="text"
                          onBlur={() => { setbtnActive(true); if (!isBillingForm) { setInactiveNext(false) } }}
                          required
                        />
                      </div>
                      <div className="emw-address-state customError">
                        <label className="emw-label">State*</label>
                        <FormControl fullWidth>
                          <NativeSelect
                            input={<StyledInput />}
                            className={`basic-single ${saveData && !stateActive ? 'input__select--error' : ''}`}
                            onChange={(event) => setOptionValues(event)}
                            value={stateValue ? stateValue : userInfo && userInfo.countryArea}
                            placeholder="State">
                            <option value={null} />
                            {data && data.states && data.states.length > 0 ? data.states.map(state => {
                              return <option value={state.code}>{state.code}</option>
                            }) : []}
                          </NativeSelect>
                          {saveData && !stateActive && <span className="input__error">This field is required to continue</span>}
                        </FormControl>

                      </div>
                    </div>
                    <label className="emw-label">Zip Code*</label>
                    <TextField
                      name="postalCode"
                      autoComplete="Zip Code"
                      placeholder="Zip Code"
                      type="number"
                      onBlur={() => { setbtnActive(true); if (!isBillingForm) { setInactiveNext(false) } }}
                      required
                    />

                    {networkError ? <span className="emw-network-error">Some network issue, please check after some time.</span> : null}
                    {
                      !isBillingForm &&
                      <div className="checkout-form__button active">
                        <Button btnRef={btnRf} type="submit">
                          Proceed to Ship Method
                        </Button>
                      </div>
                    }
                    {
                      isBillingForm && !LoggedIn &&
                      <div className="checkout-form__button active">
                        <Button btnRef={btnRf} type="submit">
                          Proceed To Payment
                        </Button>
                      </div>
                    }
                    {!isBillingForm && userInfo && <div className="checkout-form__button active">
                      <Button type="button" className="btn-cancel" onClick={() => showValidation()}>
                        Cancel
                      </Button>
                    </div>}

                  </div>
                </Form>
              </div>

            </React.Fragment>
          )
        }

      }
    </ShopContext.Consumer>
  );
};

export default AddAddressFormEMW;
