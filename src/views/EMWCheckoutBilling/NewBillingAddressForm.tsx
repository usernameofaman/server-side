import "./scss/index.scss";
import React, { useState, useEffect } from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import TextField from '@material-ui/core/TextField';
import TextField from '../../components/TextField';
import Form from '../../components/Form';
import Button from '@material-ui/core/Button';

const NewBillingAddressForm: React.FC = () => {

    const formValidate=(data)=>{
        const fields = data;
        let formIsValid = true;
        if(!fields.firstname)
        {
            formIsValid = false;
        }

        if(!fields.lastname)
        {
            formIsValid = false;
        }

        if(!fields.streetAddress1)
        {
            formIsValid = false;
        }

        if(!fields.streetAddress2)
        {
            formIsValid = false;
        }

        if(!fields.city)
        {
            formIsValid = false;
        }

        if(!fields.countryArea)
        {
            formIsValid = false;
        }

        if(!fields.postalCode)
        {
            formIsValid = false;
        }
        return formIsValid;
    }

    const handleAddressSubmit=(values)=>{
        if(formValidate(values))
        {
            // console.log('form is valid');
        }else{
            // console.log('form is invalid');
        }
    }
    return (
        <div className="address-form">
        <Form
        // errors={maybe(() => error.extraInfo.userInputErrors, [])}
        onSubmit={(evt, data) => {
            evt.preventDefault();
            handleAddressSubmit(data);
          }}
        >
            <div className="items">
                <label className="emw-label">First Name</label>
                <TextField
                    name="firstname"
                    autoComplete="given-name"
                    placeholder="First Name"
                    type="text"
                    required
                />
                <label className="emw-label">Last Name</label>
                <TextField
                    name="lastname"
                    autoComplete="family-name"
                    placeholder="Last Name"
                    type="text"
                    required
                />
                <label className="emw-label">Address Line 1</label>
                <TextField
                    name="streetAddress1"
                    autoComplete="address-line1"
                    placeholder="Address"
                    type="text"
                    required
                />
                <label className="emw-label">Address Line 2</label>
                <TextField
                    name="streetAddress2"
                    autoComplete="address-line2"
                    placeholder="Address"
                    type="text"
                    required
                />
                <label className="emw-label">City</label>
                <TextField
                    name="city"
                    autoComplete="address-level2"
                    placeholder="City"
                    type="text"
                    required
                />
                <label className="emw-label">State</label>
                <TextField
                    name="countryArea"
                    autoComplete="address-level1"
                    placeholder="ST"
                    type="text"
                    required
                />
                <label className="emw-label">Zip Code</label>
                <TextField
                    name="postalCode"
                    autoComplete="Zip Code"
                    placeholder="Zip Code"
                    type="text"
                    required
                />
                
            <FormControlLabel
                control={
                    <Checkbox
                        checked={true}
                        // onChange={(event) => handleCheckboxChange(event, inputValues, setInputValues)}
                        name="sameAsShipping"
                        color="primary"
                    />
                }
                label="Same as shipping"
            />
            <Button type="submit">Submit</Button>
            </div>
        </Form>
        </div>
    );
}
export default NewBillingAddressForm;