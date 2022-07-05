import "./scss/index.scss";
import React, { useState, useEffect } from "react";
import AddBillingAddressFormEMW from './AddBillingAddressFormEMW';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { blueGrey } from '@material-ui/core/colors/';
import { handleRadioButtonChange, addressChangeHandler, formValidateHandler, handleCheckboxChange } from './BillingHandlers';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { GetBillingAddressQuery, verifyEmailAddress } from '../../@sdk/queries/emwCheckoutBillingQueries';
import { AddBillingAddressMutation, UpdateBillingAddressMutation } from '../../@sdk/mutations/emwCheckoutBillingMutations';
import { setBillingAddress, pushNewBillingAddress, transformShippingAddress } from './TransformData';
import { useAlert } from "react-alert";
import plusIcon from '../../images/plus-icon.png';
import { Button } from "../../components";
import EditBillingAddress from '../../components/EMWShippingAddressForm/EditBillingAddress';
import { FormControl, Radio, RadioGroup } from "@material-ui/core";
import LoginForm from '../../components/LoginForm/index';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    palette: {
        primary: { main: blueGrey[700] }, // Purple and green play nicely together.
        secondary: { main: blueGrey[700] }, // This is just green.A700 as hex.
    },
});
interface BillingAddressProps {
    userDetails: any,
    data: any,
    nextStep: () => void,
    setInactiveNext: (status) => void;
    billingTrigger: boolean,
    isSupplimental: boolean,
}

const BillingAddress: React.FC<BillingAddressProps> = props => {
    const { userDetails, data, nextStep, setInactiveNext, billingTrigger, isSupplimental } = props;
    const alert = useAlert();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [billingAddressOptions, setBillingAddressOptions] = useState(null);
    const [inputValues, setInputValues] = useState({
        billingAddress: data && data.billingAddress && data.billingAddress.id ? data.billingAddress.id : null,
        shippingAddress: data && data.shippingAddress ? transformShippingAddress(data.shippingAddress) : "N/A",
        sameAsShipping: false,
        paymentButtonDisable: false,
        shippingAddressId: data && data.shippingAddress && data.shippingAddress.id ? data.shippingAddress.id : null,
        shippingObject: data && data.shippingAddress,
    })
    const [showAddressSelector, setAddressSelector] = useState(false)
    const [allAddress, setAllAddress] = useState([])
    const [editedAddress, setEditedAddress] = useState(data && data.shippingAddress);
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [anonymousBillingAddress, setAnonymousBillingAddress] = useState(null);
    const [isAnonymousAddress, setIsAnonymousAddress] = useState(false);
    const [newBillingAds, setNewBillingAds] = useState();
    const [defaultBillingAddress, setDefaultBillingAddress] = useState({})
    const impersonatedCustomerEmail = localStorage.getItem('ImpersonatedCustomerEmail');
    const [isUserVerified, setUserVerified] = useState(false);
    const [previousOrder, setpreviousOrder] = useState(false);
    const [userLoging, setUserLogin] = useState(false);
    const [emailValue, setEmailValue] = useState("");
    const [editBillingInputValues, setEditBillingInputValues] = useState({ firstname: '', lastname: '', password: '', companyName: '' })

    const [fetchBillingAddress] = useLazyQuery(GetBillingAddressQuery, {
        fetchPolicy: 'network-only',
        onCompleted({ emwAddresses }) {
            const address = setBillingAddress(emwAddresses.edges);
            setBillingAddressOptions(address);
            if (emwAddresses.edges.length !== 0) {
                setAllAddress(emwAddresses.edges)
                let defaultSelected = false;
                emwAddresses.edges.map((address) => {
                    if (address.node.isDefaultAddress) {
                        setDefaultBillingAddress(address.node)
                        defaultSelected = true
                    }
                })
                if (!defaultSelected)
                    setDefaultBillingAddress(emwAddresses.edges[0].node)
            }
            // const sameAsshippingBtn=isCheckboxChecked(data,loggedIn);
            // setInputValues({...inputValues,sameAsShipping: sameAsshippingBtn});
        },
        onError(error) {
            alert.show({ title: "Something went wrong!" }, { type: "error" });
        },
    });

    const [verifyEmail] = useLazyQuery(verifyEmailAddress, {
        fetchPolicy: 'network-only',
        onCompleted({ emwCustomerLevel }) {
            if (emwCustomerLevel === "registered_user") {
                setUserVerified(true)
                setpreviousOrder(false)
            } else if (emwCustomerLevel === 'previously_ordered') {
                setUserVerified(false)
                setpreviousOrder(true)
            } else {
                setUserVerified(false)
                setpreviousOrder(false)
            }
        },
        onError(error) {
            alert.show({ title: "Something went wrong!" }, { type: "error" });
        },
    });

    const [updateBillingAddress] = useMutation(UpdateBillingAddressMutation, {
        onCompleted({ emwCheckoutUpdateBilling }) {
            if (emwCheckoutUpdateBilling.errors.length === 0) {
                if (isAnonymousAddress) {
                    setAnonymousBillingAddress(emwCheckoutUpdateBilling.emwCheckout.billingAddress);
                    if (setInactiveNext) {
                        setInactiveNext(false);
                    }
                    nextStep();
                } else {
                    nextStep();
                }
            } else {
                if (setInactiveNext) {
                    setInactiveNext(false);
                }
                alert.show({ title: emwCheckoutUpdateBilling.errors[0].message }, { type: "error" });
            }
        },
        onError(error) {
            if (setInactiveNext) {
                setInactiveNext(false);
            }
            alert.show({ title: "Something went wrong!" }, { type: "error" });
        },
    });


    useEffect(() => {
        const userEmail = userDetails && userDetails.data && userDetails.data.email;
        if (isSupplimental) {
            setLoggedIn(false);
        } else {
            if (userEmail) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        }

    }, [userDetails.data]);

    useEffect(() => {
        if (inputValues.billingAddress && inputValues.billingAddress !== "addNew") {
            if (setInactiveNext) {
                setInactiveNext(false)
            }
        }
        if (impersonatedCustomerEmail && impersonatedCustomerEmail.length) {
            fetchBillingAddress({
                variables: {
                    first: 50,
                    email: impersonatedCustomerEmail,
                },
            })
        } else {
            fetchBillingAddress({
                variables: {
                    first: 50,
                    email: (!isSupplimental) ? "" : data.email,
                },
            })
        }

    }, []);

    useEffect(() => {
        if (billingTrigger && (inputValues.billingAddress && inputValues.billingAddress !== "addNew")) {
            changeStepHandler();
        }
    }, [billingTrigger]);

    const hideAddressModalHandler = () => {
        setInputValues({ ...inputValues, billingAddress: 1 });
        setOpenAddressModal(false);
    }

    const newAddressHandler = (values) => {
        const localData = JSON.parse(localStorage.getItem("EMWCart"));
        if (formValidateHandler(values.input)) {
            const firstName = values.input && values.input.firstName;
            const lastName = values.input && values.input.lastName;
            const paramStreetAddress1 = values.input.streetAddress1;
            const paramStreetAddress2 = values.input.streetAddress2;
            const paramCity = values.input.city;
            const paramPhone = values.input && values.input.phone;
            const paramCountryArea = values.input.countryArea;
            const paramPostalCode = values.input.postalCode;
            const paramCountry = values.input.country ? values.input.country : "US";
            if (!loggedIn) {
                setIsAnonymousAddress(true);
            }
            let requestBody = {
                checkoutId: localData && localData.id,
                newAddress: true,
                firstName,
                lastName,
                streetAddress1: paramStreetAddress1,
                streetAddress2: paramStreetAddress2,
                city: paramCity,
                countryArea: paramCountryArea,
                postalCode: paramPostalCode,
                country: paramCountry,
                isBillingAddress: true,
                useUnverified: true,
                phone: paramPhone,
                email: values.input.email,
                ccEmail: values.input.ccEmail,
                phoneExtension: values.input.phoneExtension,
                companyName: values.input.companyName ? values.input.companyName : "",
            }
            if (impersonatedCustomerEmail && impersonatedCustomerEmail.length) {
                updateBillingAddress({
                    variables: { ...requestBody, onbehalfEmail: impersonatedCustomerEmail }
                })
            } else {
                updateBillingAddress({
                    variables: requestBody
                })
            }
        } else {
            setInputValues({ ...inputValues, paymentButtonDisable: true });
        }

    }

    const changeStepHandler = () => {
        if (inputValues.sameAsShipping || (!inputValues.sameAsShipping && (!openAddressModal && loggedIn))) {
            if (newBillingAds && !inputValues.sameAsShipping) {
                return newAddressHandler(newBillingAds);
            }
            if (inputValues.billingAddress || inputValues.shippingAddressId) {
                const isSameAsShipping = inputValues.sameAsShipping;
                const addressId = isSameAsShipping ? inputValues.shippingAddressId : defaultBillingAddress.id;
                if (isSameAsShipping && !loggedIn && inputValues.shippingObject) {
                    const sendingValues = { "input": inputValues.shippingObject }
                    newAddressHandler(sendingValues);
                } else {
                    if (!isEdited) {
                        if (impersonatedCustomerEmail && impersonatedCustomerEmail.length) {
                            updateBillingAddress({
                                variables: {
                                    checkoutId: data && data.id,
                                    onbehalfEmail: impersonatedCustomerEmail,
                                    newAddress: false,
                                    billingAddressId: addressId,
                                },
                            })
                        } else {
                            updateBillingAddress({
                                variables: {
                                    checkoutId: data && data.id,
                                    newAddress: false,
                                    billingAddressId: addressId,
                                },
                            })
                        }
                    }
                }

            }
            if (setInactiveNext) {
                setInactiveNext(false)
            }
            // nextStep();
        }
        else {
            if (!loggedIn) {
                newAddressHandler(newBillingAds);
            }
        }
    }

    const addressChange = (value) => {
        addressChangeHandler(value, inputValues, setInputValues, setOpenAddressModal);
        setIsAnonymousAddress(false);

    }

    return (
        showAddressSelector ? <>
            <MuiThemeProvider theme={theme}>

                {allAddress.map((address) => (
                    <>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            color="primary"
                            onChange={(e) => {
                                setDefaultBillingAddress(address.node);
                                setAddressSelector(false)
                            }}
                        >
                            <div className="show-address-container">
                                <FormControlLabel value="defaultAddress" control={<Radio />} />
                                <div className="show-billing-address">
                                    {address && address.node && address.node.id && <>
                                        {address.node.firstName + " "} {address.node.lastName + " "}<br />
                                        {address.node.streetAddress1 + " "} {address.node.streetAddress2 + " "}<br />
                                        {address.node.city + " "}, {address.node.postalCode + " "}<br />
                                        {address.node.countryArea + " "}, {address.node.country && address.node.country.code + " "} <br></br>
                                    </>}
                                </div>
                            </div>
                        </RadioGroup>
                    </>

                ))}
            </MuiThemeProvider>

        </> : <>
            {!userLoging ? <div className="items">
                <div>
                    {!openAddressModal && <>
                        <div className="billingCheckbox">
                            {!loggedIn ? <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={inputValues.sameAsShipping}
                                        onChange={(event) => {
                                            handleCheckboxChange(event, inputValues, setInputValues),
                                                setIsEdited(false), setUserVerified(false),
                                                setpreviousOrder(false), setUserLogin(false), setEditBillingInputValues({})
                                        }}
                                        name="sameAsShipping"
                                        classes={{ root: 'customcheckboxBorder' }}
                                        style={{
                                            color: "#9FAEC1",
                                        }}
                                    />
                                }
                                label="Same as shipping"
                            />
                                : <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="defaultAddress"
                                        name="radio-buttons-group"
                                        onChange={(e) => { handleRadioButtonChange(e, inputValues, setInputValues) }}
                                    >
                                        <div className="default-address-detail">
                                            <FormControlLabel value="defaultAddress" control={<Radio />} label="Default Billing Address" />
                                            <button type="button" className="backBtn edit-address-btn"
                                                onClick={() => addressChangeHandler("addNew", inputValues, setInputValues, setOpenAddressModal)}>
                                                EDIT ADDRESS
                                            </button>
                                        </div>
                                        <div className="inner-items left-justified address-detail">
                                            {newBillingAds && newBillingAds.input ?
                                                <div>
                                                    {newBillingAds.input.firstName + " "} {newBillingAds.input.lastName + " "}<br />
                                                    {newBillingAds.input.streetAddress1} {newBillingAds.input.streetAddress2}<br />
                                                    {newBillingAds.input.city}, {newBillingAds.input.postalCode} <br />
                                                    {newBillingAds.input.countryArea}, {newBillingAds.input.country} <br></br>
                                                </div>
                                                :
                                                <div
                                                //onClick={() => addressChange(defaultBillingAddress && defaultBillingAddress.id)}
                                                >
                                                    {defaultBillingAddress && defaultBillingAddress.id && <>
                                                        {defaultBillingAddress.firstName + " "} {defaultBillingAddress.lastName + " "}<br />
                                                        {defaultBillingAddress.streetAddress1 + " "} {defaultBillingAddress.streetAddress2 + " "}<br />
                                                        {defaultBillingAddress.city + " "}, {defaultBillingAddress.postalCode + " "}<br />
                                                        {defaultBillingAddress.countryArea + " "}, {defaultBillingAddress.country && defaultBillingAddress.country.code + " "} <br></br>
                                                    </>}
                                                </div>}
                                            <span className="change-address-button" onClick={() => setAddressSelector(true)}> Use another address </span>
                                        </div>
                                        <FormControlLabel value="sameAsShipping" control={<Radio />} label="Same as Shipping Address" />
                                    </RadioGroup>
                                </FormControl>}
                        </div></>}
                    <div>
                        {
                            inputValues.sameAsShipping === false ?
                                (isEdited) ? <><EditBillingAddress isUserVerified={isUserVerified}
                                    setUserLogin={setUserLogin}
                                    setUserVerified={setUserVerified} setpreviousOrder={setpreviousOrder}
                                    previousOrder={previousOrder} verifyEmailAddress={verifyEmail}
                                    isEdited={isEdited} setOpenAddressModal={setOpenAddressModal}
                                    editedAddress={editedAddress} handleAddressSubmit={newAddressHandler}
                                    setEditedAddress={setEditedAddress} setIsEdited={setIsEdited}
                                    sameAsShipping loggedIn={loggedIn} inputValues={inputValues}
                                    setInputValues={setInputValues} userData={data} /></>
                                    : loggedIn ?
                                        <>
                                            {
                                                (!openAddressModal) ?
                                                    <div className="items billing-items">
                                                    </div>
                                                    :
                                                    <>
                                                        <div className="payment-button-space billing-detail">
                                                            <span className="title enter-billing-title">Edit Billing Address</span>
                                                            <EditBillingAddress defaultBillingAddress={defaultBillingAddress} setOpenAddressModal={setOpenAddressModal} loggedIn={loggedIn} newBillingAds={newBillingAds} setNewBillingAds={setNewBillingAds} inputValues={inputValues} userData={data} />
                                                        </div>
                                                    </>
                                            }
                                        </>
                                        :
                                        <>
                                            <div>
                                                <AddBillingAddressFormEMW setUserLogin={setUserLogin} emailValue={emailValue} setEmailValue={setEmailValue}
                                                    LoggedIn={loggedIn} verifyEmailAddress={verifyEmail} inputValues={editBillingInputValues} setInputValues={setEditBillingInputValues}
                                                    isUserVerified={isUserVerified} setUserVerified={setUserVerified} setpreviousOrder={setpreviousOrder}
                                                    previousOrder={previousOrder} handleAddressSubmit={newAddressHandler}
                                                    showValidation={hideAddressModalHandler} isBillingForm={true} values={data} />
                                            </div>
                                        </>
                                :
                                <EditBillingAddress isUserVerified={isUserVerified}
                                    setUserLogin={setUserLogin} sameAsShippingAddress={true}
                                    setUserVerified={setUserVerified} setpreviousOrder={setpreviousOrder}
                                    previousOrder={previousOrder} verifyEmailAddress={verifyEmail}
                                    setOpenAddressModal={setOpenAddressModal}
                                    editedAddress={editedAddress}
                                    setEditedAddress={setEditedAddress}
                                    setIsEdited={setIsEdited}
                                    handleAddressSubmit={newAddressHandler}
                                    loggedIn={loggedIn} inputValues={inputValues}
                                    setInputValues={setInputValues} userData={data} />
                        }

                    </div>
                    {!openAddressModal && loggedIn && <div className="checkout-form__button payment-button-space paymentBtn active">
                        <Button type="submit" onClick={changeStepHandler}>
                            Proceed To Payment
                        </Button>
                    </div>}
                    {!openAddressModal && !loggedIn && inputValues.sameAsShipping && <div className="checkout-form__button payment-button-space paymentBtn active">
                        <Button type="submit" onClick={changeStepHandler}>
                            Proceed To Payment
                        </Button>
                    </div>}
                </div>
            </div> : <LoginForm setUserLogin={setUserLogin} emailValue={isEdited || inputValues.sameAsShipping ? editedAddress.email : emailValue}></LoginForm>}
        </>
    );

}
export default BillingAddress;	
