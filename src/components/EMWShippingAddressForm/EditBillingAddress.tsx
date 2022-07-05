import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import { maybe } from "@utils/misc";
import { useSignIn } from "@sdk/react";

import { Button, Form, TextField } from "..";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GetStatesQuery } from '../../@sdk/queries/states';
import Select from 'react-select';
import EMWPhoneNumber from '../../components/EMWPhoneNumber';
import { FormControl, NativeSelect } from '@material-ui/core';
import { StyledInput } from '../EMWModal/EMWAddressModal';
import { accountRegisterMutation } from '../../components/OverlayManager/Login/queries';
import { EMWCartContext } from '../../components/EMWCartProvider/context';
import { emwCheckoutUpdateShippingMutation } from '@sdk/mutations/emwShipping';
import ErrorIcon from '../../images/error-icon.svg';
import Box from '@material-ui/core/Box';

interface IEditAddressFormEMW {
  userData: any,
  inputValues: any,
  newBillingAds: any,
  defaultBillingAddress: any,
  setNewBillingAds: any,
  setOpenAddressModal: any,
  loggedIn: any,
  setInputValues: any,
  sameAsShipping: any,
  setIsEdited: any,
  editedAddress: any,
  setEditedAddress: any,
  handleAddressSubmit: any,
  verifyEmailAddress: any,
  isEdited: any,
  previousOrder: any,
  setpreviousOrder: any,
  isUserVerified: any,
  setUserVerified: any,
  setUserLogin: any,
  sameAsShippingAddress: any,
}

const EditBillingAddress: React.FC<IEditAddressFormEMW> = ({ sameAsShippingAddress, setUserLogin, isUserVerified, setUserVerified, setpreviousOrder, previousOrder, isEdited, verifyEmailAddress, handleAddressSubmit, editedAddress, setEditedAddress, setIsEdited, sameAsShipping, setInputValues, loggedIn, setOpenAddressModal, newBillingAds, setNewBillingAds, userData, inputValues, defaultBillingAddress }) => {

  const { data } = useQuery(GetStatesQuery, { fetchPolicy: "network-only" });
  const [phoneActive, setPhoneActive] = useState(false);
  const [stateActive, setStateActive] = useState(false);
  const [stateValue, setStateValue] = useState(null);
  const [phoneNum, setPhoneNum] = React.useState("");
  const [previousAction, setPreviousAction] = useState(true);
  const [passwordField, setCreatePasswordField] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordValue, setPasswordValue] = useState('')
  const [dataSaved, setDataSaved] = useState(false)
  const loggedInUser = JSON.parse(localStorage.getItem('anonumousLoginIn'))
  const loggedInUserId = JSON.parse(localStorage.getItem('loggedIn'))
  const loggedInUserEmail = localStorage.getItem('loggedInUserEmail')
  const [signIn, { loading, error }] = useSignIn();
  const emwCartContext = React.useContext(EMWCartContext);

  useEffect(() => {
    if (newBillingAds && newBillingAds.input) {
      if (newBillingAds.input.phone) {
        setPhoneActive(true);
      }
      if (newBillingAds.input.countryArea) {
        setStateActive(true);
      }
    } else if (defaultBillingAddress) {
      if (defaultBillingAddress.phone) {
        setPhoneActive(true);
      }
      if (defaultBillingAddress.countryArea) {
        setStateActive(true);
      }
    } else if (editedAddress) {
      if (editedAddress.phone) {
        setPhoneActive(true);
      }
      if (editedAddress.countryArea) {
        setStateActive(true);
      }
    }
  }, []);

  useEffect(() => {
    if (inputValues && !inputValues.sameAsShipping &&
      isEdited && !loggedIn && !previousOrder && !isUserVerified &&
      previousAction) {
      if (editedAddress && editedAddress.email) {
        verifyEmailAddress({
          variables: {
            customerEmail: editedAddress.email
          }
        })
      }
    }
  }, [isEdited]);

  useEffect(() => {
    if (inputValues && inputValues.sameAsShipping &&
      !loggedIn && !previousOrder && !isUserVerified &&
      previousAction) {
      if (editedAddress && editedAddress.email) {
        verifyEmailAddress({
          variables: {
            customerEmail: editedAddress.email
          }
        })
      }
    }
  }, [sameAsShippingAddress]);

  const handleOnChangeNum = (value) => {
    setPhoneNum(value);
    if(value && value.length > 1){
      setPhoneActive(true);
    }else{
      setPhoneActive(false);
    }
   
    if (inputValues && inputValues.sameAsShipping) {
      setInputValues({ ...inputValues, sameAsShipping: false });
      setEditedAddress({ ...editedAddress, phone: value });
      setIsEdited(true);
      setOpenAddressModal && setOpenAddressModal(true)
    }
  }

  const onStateChange = (value) => {
    if (inputValues && inputValues.sameAsShipping) {
      setInputValues({ ...inputValues, sameAsShipping: false });
      setEditedAddress({ ...editedAddress, countryArea: value.value });
      setIsEdited(true);
      setOpenAddressModal && setOpenAddressModal(true)
    }
    setStateValue(value.target.value);
    setStateActive(true);
  }

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    if (inputValues && inputValues.sameAsShipping) {
      setInputValues({ ...inputValues, sameAsShipping: false });
      setEditedAddress({ ...editedAddress, [name]: value });
      setIsEdited(true);
      setOpenAddressModal && setOpenAddressModal(true);
    } else if (sameAsShipping) {
      setEditedAddress({ ...editedAddress, [name]: value });
    }
  }

  const AddressSubmit = (evt, { ccemail, extension, email, companyName, firstName, lastName, streetAddress1, streetAddress2, city, countryName, postalCode }) => {
    evt.preventDefault();
    setDataSaved(true)
    if (phoneActive && stateActive) {
      const data = {
        input: {
          firstName: firstName ? firstName : sameAsShipping && editedAddress.firstName,
          lastName: lastName ? lastName : sameAsShipping && editedAddress.lastName,
          streetAddress1: streetAddress1 ? streetAddress1 : sameAsShipping && editedAddress.streetAddress1,
          streetAddress2: streetAddress2 ? streetAddress2 : sameAsShipping && editedAddress.streetAddress2,
          city: city ? city : sameAsShipping && editedAddress.city,
          ccEmail: ccemail,
          phoneExtension: extension,
          phone: phoneNum ? phoneNum : sameAsShipping ? editedAddress.phone : newBillingAds && newBillingAds.input ? newBillingAds.input.phone : defaultBillingAddress && defaultBillingAddress.phone,
          countryArea: stateValue ? stateValue : sameAsShipping ? editedAddress.countryArea : newBillingAds && newBillingAds.input ? newBillingAds.input.countryArea : defaultBillingAddress && defaultBillingAddress.countryArea,
          postalCode: postalCode ? postalCode : sameAsShipping && editedAddress.postalCode,
          country: "US",
          isBillingAddress: false,
          email,
          companyName: companyName ? companyName : sameAsShipping && editedAddress.companyName,
        }
      }
      if (sameAsShipping) {
        handleAddressSubmit(data);
      } else {
        setNewBillingAds && setNewBillingAds(data);
        setOpenAddressModal && setOpenAddressModal(false);
      }
    } 
    // else {
    //   setErrorMessage(true);
    // }

  };

  const [updateCheckoutShipping] = useMutation(emwCheckoutUpdateShippingMutation, {
    onCompleted({ emwCheckoutUpdateShipping }) {
      if (emwCheckoutUpdateShipping.errors.length === 0) {
        setUserLogin(false)
        localStorage.setItem('anonumousLoginIn', true);
        localStorage.setItem('loggedInUserEmail', editedAddress.email);
        localStorage.removeItem("unverifiedShippingObject");
        setpreviousOrder(false)
        setPreviousAction(false)
        setPasswordSaving(false);
      }
    },
    onError(errors) {
    },
  });

  const handleOnSubmit = async () => {
    const isLocalData = JSON.parse(localStorage.getItem('EMWCart'));
    const lines = [];
    if (isLocalData && isLocalData.lines) {
      isLocalData.lines.map(item => {
        const productOptions = [];
        if (item.productOptions && item.productOptions.length > 0) {
          item.productOptions.map(optionItem => {
            productOptions.push(optionItem.productOption.id);
          });
        }
        const createLineData = {
          quantity: item.quantity,
          productId: item.product.id,
          optionIds: productOptions,
        }
        return lines.push(createLineData);
      });
    }
    const authenticated = await signIn({ email: editedAddress.email, password: passwordValue, lines }, emwCartContext);

    if (authenticated) {
      const shippingobj = JSON.parse(localStorage.getItem('unverifiedShippingObject'));
      const checkoutId = JSON.parse(localStorage.getItem('EMWCart'));
      updateCheckoutShipping({
        variables: {
          checkoutId: checkoutId.id,
          manualShipping: shippingobj.manualShipping,
          shipping: shippingobj.shipping,
					bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false,
					bypassShipping :  JSON.parse(localStorage.getItem('bypassShipping')) || false

        },
      })
    }

  };

  const [registerCustomer] = useMutation(accountRegisterMutation, {
    onCompleted(data) {
      if (data.accountRegister && data.accountRegister.requiresConfirmation) {
        handleOnSubmit();
      }
    },
    onError(error) {
      console.log("error")
    }
  });

  const onSavePassword = () => {
    if (passwordValue.length) {
      setPasswordSaving(true)
      registerCustomer({
        variables: {
          firstName: editedAddress.firstName,
          lastName: editedAddress.lastName,
          email: editedAddress.email,
          password: passwordValue,
          organizationName: editedAddress.companyName,
          redirectUrl: window.location.origin,
          tier: 5,
          phoneNumber: editedAddress.phone,
          isTaxExempt: false,
        }
      })
    }
  }

  return (
    <React.Fragment>
      <div className="address-form add-new-address-form">
        <Form
          id="emw-address-form"
          errors={maybe(() => [], [])}
          onSubmit={AddressSubmit}
          data={newBillingAds && newBillingAds.input ? newBillingAds.input : defaultBillingAddress && defaultBillingAddress}
        >
          <label className="emw-label">First Name*</label>
          <TextField
            name="firstName"
            autoComplete="given-name"
            placeholder="First Name"
            type="text"
            required
            onChange={(e) => onHandleChange(e)}
            //readOnly={inputValues.sameAsShipping ? true : false }
            value={inputValues.sameAsShipping ? inputValues.shippingObject && inputValues.shippingObject.firstName : sameAsShipping ? editedAddress && editedAddress.firstName : null}
          />
          <label className="emw-label">Last Name*</label>
          <TextField
            name="lastName"
            autoComplete="family-name"
            placeholder="Last Name"
            type="text"
            onChange={(e) => onHandleChange(e)}
            //readOnly={inputValues.sameAsShipping ? true : false }
            value={inputValues.sameAsShipping ? inputValues.shippingObject && inputValues.shippingObject.lastName : sameAsShipping ? editedAddress && editedAddress.lastName : null}
            required
          />

          <label className="emw-label">Organization Name (Optional)</label>
          <TextField
            name="companyName"
            autoComplete="Organization"
            placeholder="Organization Name"
            type="text"
            onChange={(e) => onHandleChange(e)}
            //readOnly={inputValues.sameAsShipping ? true : false }
            value={inputValues.sameAsShipping ? inputValues.shippingObject && inputValues.shippingObject.companyName : sameAsShipping ? editedAddress && editedAddress.companyName : null}
          />

          <label className="emw-label">Email*</label>
          <div className={loggedIn ? "lockedEmail" : ''}>
            {loggedIn || inputValues.sameAsShipping ? <TextField
              name="email"
              autoComplete="Email"
              placeholder="Email"
              type="email"
              readOnly={true}
              value={userData.user ? userData.user.email : userData.email}
              required
              onBlur={() => {
                verifyEmailAddress({
                  variables: {
                    customerEmail: editedAddress.email
                  }
                })
              }}
            /> :
              <TextField
                name="email"
                autoComplete="Email"
                placeholder="Email"
                type="email"
                readOnly={loggedInUser ? true : false}
                value={loggedInUser ? loggedInUserEmail : editedAddress.email}
                required
                onChange={(e) => onHandleChange(e)}
                onBlur={() => {
                  verifyEmailAddress({
                    variables: {
                      customerEmail: editedAddress.email
                    }
                  })
                }}
              />}
          </div>
          {loggedInUser && loggedInUserId && !loggedIn && <p className="lockedEmailLabel" style={{ color: 'green', fontSize: '12px' }}>LoggedIn</p>}
          {!loggedInUser && !loggedInUserId && <>{previousOrder && <div><p style={{ color: 'red' }}>
            Previous orders are assocaiated with this email. You can create an account now by entering a password to enable Order History view in your account.
          </p>
            {!passwordField ? <div>
              <Button type="button" className="button-yellow" onClick={() => setCreatePasswordField(true)}>
                CREATE PASSWORD
              </Button>
              <Button type="button" style={{ marginTop: '10px' }} className="button-grey" onClick={() => { setpreviousOrder(false), setPreviousAction(false) }}>
                CONTINUE WITHOUT ACCOUNT CREATION
              </Button>
            </div> : <div>
              <label className="emw-label">Password</label>
              <TextField
                name="password"
                autoComplete="password"
                placeholder="Password"
                type="password"
                onChange={(e) => setPasswordValue(e.target.value)}
                required
              />
              {passwordSaving ? <Button type="button" className="button-yellow" disabled={true}>
                SAVEING...
              </Button> :
                <Button type="button" className="button-yellow" onClick={() => { onSavePassword() }}>
                  SAVE PASSWORD
                </Button>}
            </div>}</div>}
            {isUserVerified && <div>
              <p style={{ color: 'red' }}>
                An account is already associated with this email. Please login to continue with this email.
              </p>
              <Button type="button" className="button-yellow" onClick={() => {
                setUserVerified(false), setPreviousAction(false), setUserLogin(true)
              }}>
                LOGIN TO ACCOUNT
              </Button>
            </div>}</>}
          {loggedIn && <p className="lockedEmailLabel">
            <a href="#">This email can only be edited in your Account Settings </a> </p>}
          <label className="emw-label">CC Email</label>
          <TextField
            name="ccemail"
            autoComplete="Email"
            placeholder="CC Email"
            onChange={(e) => onHandleChange(e)}
            //readOnly={inputValues.sameAsShipping ? true : false }
            type="email"
          />
          <div className="emw-address-city-state">
            <div className="emw-address-city">
              <label className="emw-label">Phone*</label>
              <EMWPhoneNumber
                className={`${dataSaved && !phoneActive ? 'input__select--error' : ''}`}
                defaultCountry="us"
                name="phone"
                //readOnly={inputValues.sameAsShipping ? true : false}
                required={true}
                phoneNum={inputValues.sameAsShipping ? inputValues.shippingObject && inputValues.shippingObject.phone : sameAsShipping ? editedAddress && editedAddress.phone : newBillingAds && newBillingAds.input ? newBillingAds.input.phone : defaultBillingAddress ? defaultBillingAddress.phone : phoneNum && phoneNum}
                handleOnChangeNum={handleOnChangeNum}
              />
            </div>
            <div className="emw-address-state">
              <label className="emw-label">Extension</label>
              <TextField
                name="extension"
                autoComplete="extension"
                placeholder="Ext #"
                onChange={(e) => onHandleChange(e)}
                //readOnly={inputValues.sameAsShipping ? true : false }
                type="text"
              />
            </div>
          </div>

          <label className="emw-label">Address Line 1*</label>
          <TextField
            name="streetAddress1"
            autoComplete="address-line1"
            placeholder="Address"
            type="text"
            onChange={(e) => onHandleChange(e)}
            //readOnly={inputValues.sameAsShipping ? true : false }
            value={inputValues.sameAsShipping ? inputValues.shippingObject && inputValues.shippingObject.streetAddress1 : sameAsShipping ? editedAddress && editedAddress.streetAddress1 : null}
            required
          />
          <label className="emw-label">Address Line 2</label>
          <TextField
            name="streetAddress2"
            autoComplete="address-line2"
            placeholder="Address"
            onChange={(e) => onHandleChange(e)}
            //readOnly={inputValues.sameAsShipping ? true : false }
            value={inputValues.sameAsShipping ? inputValues.shippingObject && inputValues.shippingObject.streetAddress2 : sameAsShipping ? editedAddress && editedAddress.streetAddress2 : null}
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
                onChange={(e) => onHandleChange(e)}
                //readOnly={inputValues.sameAsShipping ? true : false }
                value={inputValues.sameAsShipping ? inputValues.shippingObject && inputValues.shippingObject.city : sameAsShipping ? editedAddress && editedAddress.city : null}
                required
              />
            </div>
            <div className="emw-address-state customError">
              <label className="emw-label">State*</label>
              <FormControl fullWidth>
                <NativeSelect
                  className={`basic-single ${dataSaved && !stateActive ? 'input__select--error' : ''}`}
                  value={inputValues.sameAsShipping ? inputValues.shippingObject && inputValues.shippingObject.countryArea :
                    stateValue ? stateValue : sameAsShipping ? editedAddress.countryArea : newBillingAds && newBillingAds.input ? newBillingAds.input.countryArea : defaultBillingAddress.country && defaultBillingAddress.countryArea}
                  input={<StyledInput />}
                  onChange={(event) => onStateChange(event)}
                  placeholder="State">
                  <option value={null} />
                  {data && data.states && data.states.length > 0 ? data.states.map(state => {
                    return <option value={state.code}>{state.code}</option>
                  }) : []}
                </NativeSelect>
                {dataSaved && !stateActive && <span className="input__error">This field is required to continue</span>}
              </FormControl>

            </div>
          </div>
          <label className="emw-label">Zip Code*</label>
          <TextField
            name="postalCode"
            autoComplete="Zip Code"
            placeholder="Zip Code"
            type="number"
            onChange={(e) => onHandleChange(e)}
            //readOnly={inputValues.sameAsShipping ? true : false }
            value={inputValues.sameAsShipping ? inputValues.shippingObject && inputValues.shippingObject.postalCode : sameAsShipping ? editedAddress && editedAddress.postalCode : null}
            required
          />
          <div className="checkout-form__button active">
            {!inputValues.sameAsShipping && !sameAsShipping && <Button type="submit">
              Save Address
            </Button>}
            {sameAsShipping && <Button type="submit" disabled={previousOrder}>
              Save Address
            </Button>}
            {setOpenAddressModal && !inputValues.sameAsShipping && <Button className="button  btn-cancel" type="button" onClick={() => { setOpenAddressModal && setOpenAddressModal(false), setIsEdited(false), setUserVerified(false), setpreviousOrder(false) }}>
              Cancel
            </Button>}
          </div>
        </Form>
      </div>

    </React.Fragment>
  );
};

export default EditBillingAddress;
