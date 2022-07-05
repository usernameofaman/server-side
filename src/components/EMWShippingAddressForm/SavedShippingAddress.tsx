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
    networkError: boolean,
    savedShippingAddress: any,
    handleOnSubmit: any,
}

const SavedShippingAddress: React.FC<IAddAddressFormEMW> = ({ networkError, savedShippingAddress, handleOnSubmit }) => {
    const btnRf = React.useRef(null)
    const { data } = useQuery(GetStatesQuery, { fetchPolicy: "network-only" });

    return (
        <React.Fragment>
            <div className="address-form add-new-address-form">
                <div className="items">
                    <label className="emw-label">First Name*</label>
                    <TextField
                        readOnly
                        value={savedShippingAddress.firstName}
                        name="firstName"
                        autoComplete="given-name"
                        placeholder="First Name"
                        type="text"
                        required
                    />
                    <label className="emw-label">Last Name*</label>
                    <TextField
                        readOnly
                        value={savedShippingAddress.lastName}
                        name="lastName"
                        autoComplete="family-name"
                        placeholder="Last Name"
                        type="text"
                        required
                    />
                    <label className="emw-label">Organization Name</label>
                    <TextField
                        readOnly
                        value={savedShippingAddress.companyName}
                        name="organizationName"
                        autoComplete="Organization"
                        placeholder="Organization Name"
                        type="text"
                    />
                    <label className="emw-label">Email*</label>
                    <TextField
                        readOnly
                        value={savedShippingAddress.email}
                        name="email"
                        autoComplete="Email"
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <label className="emw-label">CC Email</label>
                    <TextField
                        readOnly
                        value={savedShippingAddress.ccEmail}
                        name="ccemail"
                        autoComplete="Email"
                        placeholder="CC Email"
                        type="email"
                    />
                    <div className="emw-address-city-state">
                        <div className="emw-address-city">
                            <label className="emw-label">Phone Number*</label>
                            <EMWPhoneNumber
                                readOnly
                                defaultCountry="us"
                                name="phone"
                                required={true}
                                phoneNum={savedShippingAddress.phone}
                            />
                        </div>
                        <div className="emw-address-state">
                            <label className="emw-label">Extension</label>
                            <TextField
                                readOnly
                                value={savedShippingAddress.phoneExtension}
                                name="extension"
                                autoComplete="extension"
                                placeholder="Ext #"
                                type="text"
                            />
                        </div>
                    </div>
                    <label className="emw-label">Address Line 1*</label>
                    <TextField
                        readOnly
                        value={savedShippingAddress.streetAddress1}
                        name="streetAddress1"
                        autoComplete="address-line1"
                        placeholder="Address"
                        type="text"
                        required
                    />
                    <label className="emw-label">Address Line 2</label>
                    <TextField
                        readOnly
                        value={savedShippingAddress.streetAddress2}
                        name="streetAddress2"
                        autoComplete="address-line2"
                        placeholder="Address"
                        type="text"
                    />
                    <div className="emw-address-city-state">
                        <div className="emw-address-city">
                            <label className="emw-label">City*</label>
                            <TextField
                                readOnly
                                value={savedShippingAddress.city}
                                name="city"
                                autoComplete="address-level2"
                                placeholder="City"
                                type="text"
                                required
                            />
                        </div>
                        <div className="emw-address-state">
                            <label className="emw-label">State*</label>
                            <FormControl fullWidth>
                                <NativeSelect
                                    readOnly
                                    input={<StyledInput />}
                                    className="basic-single"
                                    value={savedShippingAddress.countryArea}
                                    placeholder="State">
                                    <option value={null} />
                                    {data && data.states && data.states.length > 0 ? data.states.map(state => {
                                        return <option value={state.code}>{state.code}</option>
                                    }) : []}
                                </NativeSelect>
                            </FormControl>
                        </div>
                    </div>
                    <label className="emw-label">Zip Code*</label>
                    <TextField
                        readOnly
                        value={savedShippingAddress.postalCode}
                        name="postalCode"
                        autoComplete="Zip Code"
                        placeholder="Zip Code"
                        type="number"
                        required
                    />

                    {networkError ? <span className="emw-network-error">Some network issue, please check after some time.</span> : null}
                    <div className="checkout-form__button active">
                        <Button btnRef={btnRf} type="button" onClick={(e) => {
                            handleOnSubmit(e);
                            // localStorage.setItem("checkoutLocked", "True")
                        }}>

                            Proceed to Ship Method
                        </Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SavedShippingAddress;
