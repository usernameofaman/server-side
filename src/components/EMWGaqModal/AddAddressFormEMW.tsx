import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import { maybe } from "@utils/misc";

import { Button, Form, TextField } from "..";
import { ShopContext } from "../ShopProvider/context";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { useQuery } from '@apollo/react-hooks';
import { GetStatesQuery } from '../../@sdk/queries/states';
import { FormControl, NativeSelect} from '@material-ui/core';
//import Select from 'react-select';
import EMWPhoneNumber from "../../components/EMWPhoneNumber";
import Box from '@material-ui/core/Box';
import { StyledInput } from '../EMWModal/EMWAddressModal';

interface IAddAddressFormEMW {
  isBillingForm: boolean;
  LoggedIn: boolean;
  handleAddressSubmit: (data) => void;
  cancelBtnHandler: any;
}

const AddAddressFormEMW: React.FC<IAddAddressFormEMW> = ({ isBillingForm, LoggedIn, handleAddressSubmit, cancelBtnHandler}) => {

  const [checked, setChecked] = React.useState(true);
  const { data } = useQuery(GetStatesQuery, { fetchPolicy: "network-only" });
  const [btnActive, setbtnActive] = useState(false);
  const [newFormValues, setNewFormValues] = useState(null);
  const [stateValue, setStateValue] = useState(null);
  const [phoneNum,setPhoneNum]=React.useState("");
  
  const AddressSubmit = async (evt, { email, phone, firstname, lastname, streetAddress1, streetAddress2, city, countryName, postalCode, ChkNew }) => {
    evt.preventDefault();
    const data = {
      input: {
        firstName: firstname,
        lastName: lastname,
        email: email ? email : "",
        phone: phoneNum ? phoneNum : "",
        streetAddress1,
        streetAddress2,
        city,
        countryArea: stateValue && stateValue,
        postalCode,
        country: "US",
        isBillingAddress: isBillingForm ? true :false,
      },
    }
    handleAddressSubmit(data)
  };

  const setOptionValues = (event) => {
    setStateValue(event.target.value);
  }
  
  const handleOnChangeNum=(value)=>{
    setPhoneNum(value);
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
                  data={newFormValues}
                >
                  <div className={["items", isBillingForm ? "billing-items" : ""].join(" ")}>
                    {!LoggedIn && !isBillingForm ? <React.Fragment>                      
                      <div><span className="title">ENTER CONTACT INFORMATION</span></div>
                      <div className="emw-gaq-input-row">
                      <div className="emw-gaq-input">
                      <label className="emw-label">Email</label>
                      <TextField
                        name="email"
                        autoComplete="email"
                        placeholder="Email"
                        type="email"
                        onBlur={() => { setbtnActive(true); }}
                        required
                      />
                      </div>
                      <div className="emw-gaq-input">
                      <label className="emw-label">Phone(Optional)</label>
                      {/* <TextField
                        name="phone"
                        autoComplete="phone"
                        placeholder="Phone"
                        type="text"
                        onBlur={() => { setbtnActive(true); }}                        
                      /> */}
                      <div className="gaq-phone-number-container">
                        <EMWPhoneNumber
                          defaultCountry="us"
                          name="phone"
                          required={false}
                          phoneNum={phoneNum}
                          handleOnChangeNum={handleOnChangeNum}
                          handleOnBlur={() => { setbtnActive(true); }}
                        />
                      </div>
                      </div>
                      </div>
                      </React.Fragment> : null}
                 

                    {
                      isBillingForm ?
                      <div><span className="title">ENTER BILLING ADDRESS</span></div> :
                      <div><span className="title">ENTER SHIPPING ADDRESS</span></div>
                    }
                     <div className="emw-gaq-input-row">
                     <div className="emw-gaq-input">
                    <label className="emw-label">First Name</label>
                    <TextField
                      name="firstname"
                      autoComplete="given-name"
                      placeholder="First Name"
                      type="text"
                      onBlur={() => { setbtnActive(true); }}
                      required
                    />
                    </div>
                    <div className="emw-gaq-input">
                    <label className="emw-label">Last Name</label>
                    <TextField
                      name="lastname"
                      autoComplete="family-name"
                      placeholder="Last Name"
                      type="text"
                      onBlur={() => { setbtnActive(true); }}
                      required
                    />
                    </div>

                    <div className="emw-gaq-input">
                    <label className="emw-label">Organization Name (Optional)</label>
                    <TextField
                      name="org"
                      autoComplete="Organization"
                      placeholder="Organization"
                      type="text"                      
                    />
                    </div>
                    
                    <div className="emw-gaq-input">
                    <label className="emw-label">Address Line 1</label>
                    <TextField
                      name="streetAddress1"
                      autoComplete="address-line1"
                      placeholder="Address"
                      type="text"
                      onBlur={() => { setbtnActive(true); }}
                      required
                    />
                    </div>  
                    <div className="emw-gaq-input">
                    <label className="emw-label">Address Line 2</label>
                    <TextField
                      name="streetAddress2"
                      autoComplete="address-line2"
                      placeholder="Address"
                      type="text"
                    />
                    </div>    

                      <div className="emw-gaq-input">
                    <label className="emw-label">Zip Code</label>
                    <TextField
                      name="postalCode"
                      autoComplete="Zip Code"
                      placeholder="Zip Code"
                      type="number"
                      onBlur={() => { setbtnActive(true); }}
                      required
                    />
                    </div>              
                    <div className="emw-address-city-state">
                      <div className="emw-address-city emw-gaq-input">
                        <label className="emw-label">City</label>
                        <TextField
                          name="city"
                          autoComplete="address-level2"
                          placeholder="City"
                          type="text"
                          onBlur={() => { setbtnActive(true); }}
                          required
                        />
                      </div>
                      <div className="emw-address-state emw-gaq-input">
                        <label className="emw-label">State*</label>
                        {/*<Select
                          className="basic-single"
                          minMenuHeight={49}
                          placeholder=""
                          onChange={(values) => setOptionValues(values)}
                          isSearchable={true}
                          options={data && data.states && data.states.length > 0 ? data.states.map(state => ({
                            label: state.code,
                            value: state.code,
                          })) : []}
                        />*/}
                        <FormControl fullWidth>
                        <NativeSelect
                        className="basic-single"
                        value={stateValue}
                        input={<StyledInput />}
                        onChange={(event) => setOptionValues(event)}
                        placeholder="State">
                        <option value={null}/>
                        {data && data.states && data.states.length > 0 ? data.states.map(state =>{
                          return <option value={state.code}>{state.code}</option>
                        }):[]}
                        </NativeSelect>
                        </FormControl>

                      </div>
                    </div>
                    
                  
                    
                  
                    </div>
                    {/* <label className="emw-label">Country</label>
                    <TextField                  
                      name="countryName"
                      autoComplete="Country"
                      placeholder="Country"
                      type="text"
                      required
                    /> */}
                    {
                      LoggedIn ?
                      <Box display="flex" alignItems="center">
                        <div className={"checkout-form__button active gaq-modal-address-form-btn"}>
                          <Button onClick={cancelBtnHandler}>
                            CANCEL
                          </Button>
                        </div>
                        <div className={btnActive ? "checkout-form__button active gaq-modal-address-form-btn" : "checkout-form__button gaq-modal-address-form-btn"}>
                          <Button disabled={btnActive ? false : true} type="submit">
                            CONFIRM
                          </Button>
                        </div>
                      </Box>
                      :
                      <div className={btnActive ? "checkout-form__button active" : "checkout-form__button"}>
                          <Button disabled={btnActive ? false : true} type="submit">
                            CONFIRM
                          </Button>
                      </div>
                    }
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
