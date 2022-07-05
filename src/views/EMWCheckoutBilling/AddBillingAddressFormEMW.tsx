import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import { maybe } from "@utils/misc";
import { useSignIn } from "@sdk/react";

import { Button, Form, TextField } from "../../components";
import { ShopContext } from '../../components/ShopProvider/context';

import { FormControl, NativeSelect } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { GetStatesQuery } from '../../@sdk/queries/states';
import EMWPhoneNumber from '../../components/EMWPhoneNumber'
import { StyledInput } from '../../components/EMWModal/EMWAddressModal'
import { useMutation } from '@apollo/react-hooks';
import { accountRegisterMutation } from '../../components/OverlayManager/Login/queries';
import { EMWCartContext } from '../../components/EMWCartProvider/context';
import { emwCheckoutUpdateShippingMutation } from '@sdk/mutations/emwShipping';

interface IAddAddressFormEMW {
    handleAddressSubmit: (data) => void;
    showValidation: () => void;
    isBillingForm: boolean,
    values: any,
    LoggedIn: boolean,
    isUserVerified: boolean,
    setUserVerified: (status) => void,
    setpreviousOrder: (status) => void,
    previousOrder: boolean,
    verifyEmailAddress: any,
    setUserLogin: any,
    emailValue: any,
    setEmailValue: any,
    inputValues: any,
    setInputValues: any,
}

const AddAddressFormEMW: React.FC<IAddAddressFormEMW> = ({ inputValues, setInputValues, emailValue, setEmailValue, verifyEmailAddress, isUserVerified, setUserVerified,
    previousOrder, setpreviousOrder, setUserLogin,
    handleAddressSubmit, showValidation, isBillingForm, LoggedIn }) => {

    const { data } = useQuery(GetStatesQuery, { fetchPolicy: "network-only" });
    const [isFocusedPhoneState, setIsFocusedPhoneState] = React.useState(false);
    const [previousAction, setPreviousAction] = useState(true);
    const [passwordField, setCreatePasswordField] = useState(false);
    const [passwordSaving, setPasswordSaving] = useState(false);
    const btnRf = React.useRef(null)
    const [saveData, setSaveData] = useState(false);
    const loggedInUser = JSON.parse(localStorage.getItem('anonumousLoginIn'))
    const loggedInUserId = JSON.parse(localStorage.getItem('loggedIn'))
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail')

    const [signIn, { loading, error }] = useSignIn();
    const emwCartContext = React.useContext(EMWCartContext);
    const AddressSubmit = async (evt) => {
        evt.preventDefault();
        setSaveData(true);
        if (isFocusedPhoneState && inputValues.state) {
            const data = {
                input: {
                    firstName: inputValues.firstname,
                    lastName: inputValues.lastname,
                    streetAddress1: inputValues.streetAddress1,
                    streetAddress2: inputValues.streetAddress2,
                    city: inputValues.city,
                    email: emailValue ? emailValue : loggedInUserEmail,
                    countryArea: inputValues.state,
                    postalCode: inputValues.postalCode,
                    country: "US",
                    isBillingAddress: false,
                    companyName: inputValues.companyName,
                    phone: inputValues.phone,
                    ccEmail: inputValues.ccemail,
                    phoneExtension: inputValues.extension,
                },
            }
            handleAddressSubmit(data);
        }
    };

    useEffect(() => {
        if (inputValues && inputValues.phone && inputValues.phone.length > 1) {
          setIsFocusedPhoneState(true);
        }
      }, []);

    const setOptionValues = (event) => {
        setInputValues({ ...inputValues, 'state': event.target.value })
    }
    const handleOnChangeNum = (value) => {
        if(value.length > 1){
            setIsFocusedPhoneState(true);
        }else{
            setIsFocusedPhoneState(false);
        }
        setInputValues({ ...inputValues, 'phone': value })
    }

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value })
    }

    const [updateCheckoutShipping] = useMutation(emwCheckoutUpdateShippingMutation, {
        onCompleted({ emwCheckoutUpdateShipping }) {
            if (emwCheckoutUpdateShipping.errors.length === 0) {
                setUserLogin(false)
                localStorage.setItem('anonumousLoginIn', true);
                localStorage.setItem('loggedInUserEmail', emailValue);
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
        const authenticated = await signIn({ email: emailValue, password: inputValues.password, lines }, emwCartContext);

        if (authenticated) {
            const shippingobj = JSON.parse(localStorage.getItem('unverifiedShippingObject'));
            const checkoutId = JSON.parse(localStorage.getItem('EMWCart'));
            updateCheckoutShipping({
                variables: {
                    checkoutId: checkoutId.id,
                    manualShipping: shippingobj.manualShipping,
                    shipping: shippingobj.shipping,
				    bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false,
				    bypassShipping :  JSON.parse(localStorage.getItem('bypassShipping')) || false,
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
        if (inputValues.password) {
            setPasswordSaving(true)
            registerCustomer({
                variables: {
                    firstName: inputValues.firstname,
                    lastName: inputValues.lastname,
                    email: emailValue,
                    password: inputValues.password,
                    organizationName: inputValues.companyName,
                    redirectUrl: window.location.origin,
                    tier: 5,
                    phoneNumber: inputValues.phone,
                    isTaxExempt: false,
                }
            })
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
                                >
                                    <div className={["items", isBillingForm ? "billing-items" : ""].join(" ")}>
                                        <React.Fragment>
                                            <label className="emw-label">First Name*</label>
                                            <TextField
                                                name="firstname"
                                                value={inputValues.firstname}
                                                autoComplete="given-name"
                                                placeholder="First Name"
                                                type="text"
                                                onChange={(e) => onHandleChange(e)}
                                                required
                                            />
                                            <label className="emw-label">Last Name*</label>
                                            <TextField
                                                name="lastname"
                                                value={inputValues.lastname}
                                                autoComplete="family-name"
                                                placeholder="Last Name"
                                                type="text"
                                                onChange={(e) => onHandleChange(e)}
                                                required
                                            />

                                            <label className="emw-label">Organization Name</label>
                                            <TextField
                                                name="companyName"
                                                value={inputValues.companyName}
                                                autoComplete="Organization"
                                                placeholder="Organization Name"
                                                onChange={(e) => onHandleChange(e)}
                                                type="text"
                                            />

                                            <label className="emw-label">Email*</label>
                                            <TextField
                                                name="email"
                                                autoComplete="Email"
                                                placeholder="Email"
                                                value={loggedInUser && loggedInUserId ? loggedInUserEmail : emailValue}
                                                readOnly={loggedInUser && loggedInUserId ? true : false}
                                                type="email"
                                                onChange={(e) => setEmailValue(e.target.value)}
                                                onBlur={() => {
                                                    verifyEmailAddress({
                                                        variables: {
                                                            customerEmail: emailValue
                                                        }
                                                    })
                                                }}
                                                required
                                            />
                                            {loggedInUser && loggedInUserId && <p className="lockedEmailLabel" style={{ color: 'green', fontSize: '12px' }}>LoggedIn</p>}
                                            {!loggedInUserId && !loggedInUser && <>{previousOrder && <div><p style={{ color: 'red' }}>
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
                                                        onChange={(e) => onHandleChange(e)}
                                                        required
                                                    />
                                                    {passwordSaving ? <Button type="button" className="button-yellow" disabled={true}>
                                                        SAVEING...
                                                    </Button> : <Button type="button" className="button-yellow" onClick={() => { onSavePassword() }}>
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
                                            <label className="emw-label">CC Email</label>
                                            <TextField
                                                name="ccemail"
                                                autoComplete="Email"
                                                placeholder="CC Email"
                                                value={inputValues.ccemail}
                                                onChange={(e) => onHandleChange(e)}
                                                type="email"
                                            />
                                            <div className="emw-address-city-state">
                                                <div className="emw-address-city">
                                                    <label className="emw-label">Phone Number*</label>
                                                    <EMWPhoneNumber
                                                        defaultCountry="us"
                                                        className={`${saveData && !isFocusedPhoneState ? 'input__select--error' : ''}`}
                                                        name="phone"
                                                        required={true}
                                                        phoneNum={inputValues.phone}
                                                        handleOnChangeNum={handleOnChangeNum}
                                                    />
                                                </div>
                                                <div className="emw-address-state">
                                                    <label className="emw-label">Extension</label>
                                                    <TextField
                                                        name="extension"
                                                        autoComplete="extension"
                                                        placeholder="Ext #"
                                                        value={inputValues.extension}
                                                        onChange={(e) => onHandleChange(e)}
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
                                                value={inputValues.streetAddress1}
                                                onChange={(e) => onHandleChange(e)}
                                                required
                                            />
                                            <label className="emw-label">Address Line 2</label>
                                            <TextField
                                                name="streetAddress2"
                                                autoComplete="address-line2"
                                                value={inputValues.streetAddress2}
                                                placeholder="Address"
                                                onChange={(e) => onHandleChange(e)}
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
                                                        value={inputValues.city}
                                                        onChange={(e) => onHandleChange(e)}
                                                        required
                                                    />
                                                </div>
                                                <div className="emw-address-state customError">
                                                    <label className="emw-label">State*</label>
                                                    <FormControl fullWidth>
                                                        <NativeSelect
                                                            input={<StyledInput />}
                                                            className={`basic-single ${saveData && !inputValues.state ? 'input__select--error' : ''}`}
                                                            onChange={(event) => setOptionValues(event)}
                                                            value={inputValues.state}
                                                            placeholder="State">
                                                            <option value={null} />
                                                            {data && data.states && data.states.length > 0 ? data.states.map(state => {
                                                                return <option value={state.code}>{state.code}</option>
                                                            }) : []}
                                                        </NativeSelect>
                                                        {saveData && !inputValues.state && <span className="input__error">This field is required to continue</span>}
                                                    </FormControl>

                                                </div>
                                            </div>
                                            <label className="emw-label">Zip Code*</label>
                                            <TextField
                                                name="postalCode"
                                                autoComplete="Zip Code"
                                                placeholder="Zip Code"
                                                type="number"
                                                value={inputValues.postalCode || ''}
                                                onChange={(e) => onHandleChange(e)}
                                                required
                                            />
                                            {
                                                isBillingForm && !LoggedIn &&
                                                <div className="checkout-form__button active">
                                                    <Button btnRef={btnRf} type="submit">
                                                        Proceed To Payment
                                                    </Button>
                                                </div>
                                            }
                                        </React.Fragment>
                                    </div>
                                </Form>
                            </div>

                        </React.Fragment >
                    )
                }

            }
        </ShopContext.Consumer >
    );
};

export default AddAddressFormEMW;
