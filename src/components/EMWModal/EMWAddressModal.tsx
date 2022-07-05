import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import { Button, Form, TextField } from "..";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Checkbox, FormControlLabel, Box} from '@material-ui/core';
import closeImg from "../../images/login-close.svg";
import logo from "../../images/logo.svg";
import ErrorIcon from '../../images/error-icon.svg';

import ReactSVG from "react-svg";
//import Select from 'react-select';
import { maybe } from "@utils/misc";
import { useQuery } from '@apollo/react-hooks';
import EMWPhoneNumber from '../EMWPhoneNumber';
import { defaultBillingAddressMessage } from '../../constants';
import { FormControl, NativeSelect, styled, InputBase } from '@material-ui/core';



import { GetStatesQuery } from '../../@sdk/queries/states';

export const StyledInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '0.5px solid #CCCED0 !important',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    height: 29,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
     boxShadow: '0 0 0 1px #21125e',
     color: '#21125e',
     transition: 'all 0.3s ease',
    },
    '&:hover': {
     boxShadow: '0 0 0 1px #21125e',
     color: '#21125e',
     transition: 'all 0.3s ease',
    },
  },
}));

interface IEMWAddressModal {
  hide?: () => void;
  Mopen: boolean;
  handleAddressSubmit: (data) => void;
  handleAddressEditSubmit: (data, id) => void;
  addressData;
}

const EMWAddressModal: React.FC<IEMWAddressModal> = ({ hide, Mopen, handleAddressSubmit, addressData, handleAddressEditSubmit}) => {

  const [open, setOpen] = React.useState(Mopen);
  const [newFormValues, setNewFormValues] = useState(addressData);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [btnActive, setbtnActive] = useState(false);
  const [phoneNum, setPhoneNum] = React.useState("");
  const [isDefaultBilling, setIsDefaultBilling] = React.useState(false);

  const { data } = useQuery(GetStatesQuery, { fetchPolicy: "network-only" });

  const [stateValue, setStateValue] = useState(null);

  React.useEffect(() => {
    setOpen(Mopen);
  }, [Mopen]);

  React.useEffect(() => {
    if(addressData !== null){
      setNewFormValues(addressData);
      setStateValue(addressData.countryArea);
    }
    
  }, [addressData]);

  const handleClose = () => {
    hide();
  };

  const setOptionValues = (event) => {
    setbtnActive(true);
    setStateValue(event.target.value);
  }

  const AddressSubmit = async (evt, { firstName, lastName, companyName, streetAddress1, streetAddress2, city, email, ccemail, extension, countryName, postalCode, ChkNew }) => {
    evt.preventDefault();
    const data = {
      input: {
        firstName,
        lastName,
        streetAddress1,
        streetAddress2,
        city,
        companyName,
        countryArea: stateValue && stateValue,
        postalCode,
        country: "US",
        email,
        phone:phoneNum,
        isBillingAddress: false,
        useUnverified: true,
        isDefaultAddress : isDefaultBilling
      },
    }
    setbtnActive(false)
    if(addressData !== null){
      handleAddressEditSubmit(data, addressData.id)
    } else {
      handleAddressSubmit(data)
    }
     
  };

  const handleOnChangeNum = (value) => {
    setPhoneNum(value);
  }

  return (<Dialog
    className={"emw-checkout-box add-shipping-form"}
    fullScreen={fullScreen}
    open={open}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
  >

    <DialogTitle id="responsive-dialog-title">
      <p className="overlay__header-text"><ReactSVG
        path={logo}
        className="overlay__header__close-icon"
      /></p>
      <p className="overlay__header-text" onClick={handleClose}><ReactSVG
        path={closeImg}
        className="overlay__header__close-icon"
      /></p>
    </DialogTitle>

    <DialogContent>

      <React.Fragment>
        <div className="address-form add-new-address-form">
          <Form
            id="emw-address-form"
            errors={maybe(() => [], [])}
            onSubmit={AddressSubmit}
            data={newFormValues}
          >
            <div className={"items"}>
              <div><span className="title">{addressData ? <>EDIT ADDRESS</> : <>ENTER NEW ADDRESS</>}</span></div>

              <label className="emw-label">First Name*</label>
              <TextField
                name="firstName"
                autoComplete="given-name"
                placeholder="First Name"
                type="text"
                onBlur={() => { setbtnActive(true); }}
                required
              />
              <label className="emw-label">Last Name*</label>
              <TextField
                name="lastName"
                autoComplete="family-name"
                placeholder="Last Name"
                type="text"
                onBlur={() => { setbtnActive(true); }}
                required
              />

              <label className="emw-label">Organization Name(Optional)</label>
              <TextField
                name="companyName"
                autoComplete="Organization Name"
                placeholder="Organization"
                type="text"
                onBlur={() => { setbtnActive(true); }}
              />

              <label className="emw-label">Email*</label>
              <div className={addressData && addressData.email  ? "lockedEmail" : ''}>
              <TextField
                name="email"
                autoComplete="Email"
                placeholder="Email"
                type="email"
                readOnly={addressData && addressData.email ? true : false}
                onBlur={() => { setbtnActive(true); }}
              />
              </div>
              {addressData && addressData.email && <p className="lockedEmailLabel">
          <a href="#">This email can only be edited in your Account Settings </a> </p>}

              <label className="emw-label">CC Email</label>
              <TextField
                name="ccemail"
                autoComplete="Email"
                placeholder="Email"
                type="email"
                onBlur={() => { setbtnActive(true); }}
              />

              <div className="emw-address-city-state">
                <div className="emw-address-city">
                  <label className="emw-label">Phone*</label>
                  <EMWPhoneNumber
                    defaultCountry="us"
                    name="phone"
                    required={true}
                    phoneNum={phoneNum && phoneNum}
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
                  />
                </div>
              </div>

              <label className="emw-label">Address Line 1*</label>
              <TextField
                name="streetAddress1"
                autoComplete="address-line1"
                placeholder="Address"
                type="text"
                onBlur={() => { setbtnActive(true); }}
                required
              />
              <label className="emw-label">Address Line 2</label>
              <TextField
                name="streetAddress2"
                autoComplete="address-line2"
                placeholder="Address"
                type="text"
                onBlur={() => { setbtnActive(true); }}
              />
              <div className="emw-address-city-state">
                <div className="emw-address-city">
                  <label className="emw-label">City*</label>
                  <TextField
                    name="city"
                    autoComplete="address-level2"
                    placeholder="City"
                    type="text"
                    onBlur={() => { setbtnActive(true); }}
                    required
                  />
                </div>
                <div className="emw-address-state">
                  <label className="emw-label">State*</label>
                  {/*<Select
                    required
                    name="countryArea"
                    className="basic-single"
                    minMenuHeight={49}
                    defaultInputValue={addressData !== null ? addressData.countryArea : ""}
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
                        input={<StyledInput />}
                        value={stateValue}
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
              <label className="emw-label">Zip Code*</label>
              <TextField
                name="postalCode"
                autoComplete="Zip Code"
                placeholder="Zip Code"
                type="number"
                onBlur={() => { setbtnActive(true); }}
                required
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isDefaultBilling}
                    onChange={(e)=>{
                      setIsDefaultBilling(e.target.checked);
                      setbtnActive(true);
                    }}
                    name="taxExempt"
                    color="primary"
                  />
                }
                label="Make this my default billing address"
              />
              <br/>
              {isDefaultBilling && <Box display="flex" className="default-billing-msg">
                              <Box className="default-billing-msg-icon" pr="10px" pt="5px">
                              <img src={ErrorIcon} />
                              </Box>
                              <Box className="default-billing-msg-text">
                              <p>{defaultBillingAddressMessage}</p>
                              </Box>
                          </Box>}
              <div className={btnActive ? "checkout-form__button active" : "checkout-form__button"}>
                <Button disabled={btnActive ? false : true} type="submit">
                  CONFIRM
                        </Button>
              </div>

            </div>
          </Form>
        </div>

      </React.Fragment>
    </DialogContent>
  </Dialog>
  );
};

export default EMWAddressModal;
