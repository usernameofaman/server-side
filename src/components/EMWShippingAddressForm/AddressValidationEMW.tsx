import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import { maybe } from "@utils/misc";
import Box from '@material-ui/core/Box';
import { Button, Form, TextField } from "..";
import { ShopContext } from "../ShopProvider/context";
import WarningIcon from '../../images/warning-icon.svg';
import { unverifiedAddressMsg } from '../../constants';


interface IAddressValidationEMW {
  handleValidSubmit: (data) => void;
  showShipping: () => void;
  suggestAdd: any;
  enterData: any;
  triggerTwo: boolean;
  setInactiveNext: (status) => void;
  LoggedIn: boolean;
  settriggerTwo: (status) => void;
  setaddOpen: () => void;
  userInfo: any;
}

const AddressValidationEMW: React.FC<IAddressValidationEMW> = ({ setaddOpen, userInfo, handleValidSubmit, showShipping, suggestAdd, enterData, triggerTwo, setInactiveNext, LoggedIn, settriggerTwo ,showErrorOnce}) => {
  const [selecedAdd, setselecedAdd] = useState({});
  const [selectedtype, setselectedtype] = useState("");
  const [btnActive, setbtnActive] = useState(false);
  let firstNameEMW = ""
  let lastNameEMW = ""
  let companyName = ""
  let ccemailEMW = ""
  let phoneEMW = ""
  let phoneExtensionEMW = ""

  const onChangeAddress = (data) => {
    setbtnActive(true)
    setInactiveNext(false)
    setselectedtype("Change")
  }

  if (LoggedIn) {
    firstNameEMW = enterData.input ? enterData.input.firstName : enterData.firstName
    lastNameEMW = enterData.input ? enterData.input.lastName : enterData.lastName
    companyName = enterData.input ? enterData.input.companyName : "";
    ccemailEMW = enterData.input ? enterData.input.ccEmail : '';
    phoneEMW = enterData.input ? enterData.input.phone : "";
    phoneExtensionEMW = enterData.input ? enterData.input.phoneExtension : "";
  } else {
    const temp = localStorage.getItem("contactInfoTemp")
    const tempUser = JSON.parse(temp)
    firstNameEMW = tempUser.firstname
    lastNameEMW = tempUser.lastname
    companyName = tempUser.companyName
  }

  const onSelectAddress = (data, type, event) => {
    setbtnActive(true)
    setInactiveNext(false)

    if (type === 0) {
      data.input.useUnverified = true
      setselectedtype("Default")
      setselecedAdd(data);
      handleAddressSubmit(event, data);
    } else {
      let temp = '';
      temp = data.AddressLine;
      if (Array.isArray(data.AddressLine)) {
        temp = data.AddressLine.join(' ');
      }
      setselectedtype(temp + data.Region)
      const newdata = {
        input: {
          firstName: firstNameEMW,
          lastName: lastNameEMW,
          streetAddress1: temp,
          city: data.PoliticalDivision2,
          countryArea: data.PoliticalDivision1,
          postalCode: data.PostcodePrimaryLow,
          country: data.CountryCode,
          isBillingAddress: false,
          companyName,
          ccEmail: ccemailEMW,
          phone: phoneEMW,
          phoneExtension: phoneExtensionEMW,
        },
      }
      setselecedAdd(newdata)
      handleAddressSubmit(event, newdata);
    }

  }

  const btnRf = React.useRef(null)
  useEffect(() => {
    if (triggerTwo === true) {
      btnRf.current.click()
    }
  }, [triggerTwo]);

  useEffect(() => {
    if (suggestAdd.length === 0) {
      setbtnActive(true);
      setselectedtype('Default');
      enterData.input.useUnverified = true;
      setselecedAdd(enterData);
    }
  })

  const handleAddressSubmit = async (evt, newdata) => {
    evt.preventDefault();
    setbtnActive(false)
    if (selectedtype === "Change") {
      // setInactiveNext(false)
      settriggerTwo(false)
      showShipping()
    } else {
      handleValidSubmit(newdata && newdata.input ? newdata : selecedAdd)
    }
  };

  return (
    <ShopContext.Consumer>
      {
        cartAction => {
          return (
            <React.Fragment>

              <div className="address-form">
                <Form
                  errors={maybe(() => [], [])}
                  onSubmit={handleAddressSubmit}
                >
                  <div className="items">
                    <div className="inner-items address-details">
                      {suggestAdd.length !== 0 && <span className="title no-bottom-margin">Use recommended address instead?</span>}
                      {suggestAdd.length === 0 && <span className="sub-title">You must make an address selection below in order to proceed. It is advised to select the carrier verified address.</span>}
                      {suggestAdd.length !== 0 && <span className="sub-title">The entered address could not be verifed, but we found a close match:</span>}
                      <br></br>

                      {suggestAdd.length !== 0 && <span className="sub-heading">Recommended:</span>}
                      {suggestAdd.length > 0 ?
                        <div className="add-list shippingAdd rec">
                          {firstNameEMW + " "}
                          {lastNameEMW}<br></br>
                          {Array.isArray(JSON.parse(suggestAdd)[0].AddressKeyFormat.AddressLine) ? JSON.parse(suggestAdd)[0].AddressKeyFormat.AddressLine.join(" ") : JSON.parse(suggestAdd)[0].AddressKeyFormat.AddressLine},<br></br>
                          {JSON.parse(suggestAdd)[0].AddressKeyFormat.PoliticalDivision2}, {JSON.parse(suggestAdd)[0].AddressKeyFormat.PoliticalDivision1}, {JSON.parse(suggestAdd)[0].AddressKeyFormat.PostcodePrimaryLow}-{JSON.parse(suggestAdd)[0].AddressKeyFormat.PostcodeExtendedLow}<br></br>
                          ({JSON.parse(suggestAdd)[0].AddressClassification.Description})
                        </div>
                        : null}



                      {/* {suggestAdd.length > 0 ? JSON.parse(suggestAdd).map((adrss, index) => {
                        return <div onClick={() => { onSelectAddress(adrss.AddressKeyFormat, 1) }} key={index} className={Array.isArray(adrss.AddressKeyFormat.AddressLine) ? (adrss.AddressKeyFormat.AddressLine.join(" ") + adrss.AddressKeyFormat.Region) === selectedtype ? "add-list active shippingAdd" : "add-list shippingAdd" : (adrss.AddressKeyFormat.AddressLine + adrss.AddressKeyFormat.Region) === selectedtype ? "add-list active shippingAdd" : "add-list shippingAdd"}>
                          {firstNameEMW + " "}
                          {lastNameEMW}<br></br>
                          {Array.isArray(adrss.AddressKeyFormat.AddressLine) ? adrss.AddressKeyFormat.AddressLine.join(" ") : adrss.AddressKeyFormat.AddressLine},<br></br>
                          {adrss.AddressKeyFormat.PoliticalDivision2}, {adrss.AddressKeyFormat.PoliticalDivision1}, {adrss.AddressKeyFormat.PostcodePrimaryLow}-{adrss.AddressKeyFormat.PostcodeExtendedLow}<br></br>
                          ({adrss.AddressClassification.Description})
                        </div>
                      }) : null} */}


                      <span className="sub-heading">You Entered:</span>

                      <div className={`shippingAdd ${selectedtype === "Default" ? "add-list active" : "add-list"}`}>
                        {setaddOpen && userInfo && <span className="backBtn edit-text" onClick={() => setaddOpen(2)}> Edit Address</span>}
                        {firstNameEMW + " "}
                        {lastNameEMW}<br></br>
                        {enterData.input.streetAddress1} {enterData.input.streetAddress2}<br></br>
                        {enterData.input.city}, {enterData.input.postalCode} <br></br>
                        {enterData.input.countryArea}, {enterData.input.country} <br></br>
                        (Unknown)
                      </div>

                      {suggestAdd.length === 0 &&
                        <Box display="flex" className="verification_address_warning-msg">
                          <Box className="verification_address_warning-icon">
                            <img src={WarningIcon} />
                          </Box>
                          <Box className="verification_address_warning">
                            <p>{process.env.REACT_APP_VERIFY_ADDRESS_TEXT}</p>
                          </Box>
                        </Box>
                      }

                      {suggestAdd.length !== 0 &&
                        <Box display="flex" className="verification_address_warning-msg">
                          <Box className="verification_address_warning-icon">
                            <img src={WarningIcon} />
                          </Box>
                          <Box className="verification_address_warning">
                            <p>{unverifiedAddressMsg}</p>
                          </Box>
                        </Box>
                      }


                      {suggestAdd.length === 0 && <div className={btnActive ? "checkout-form__button active" : "checkout-form__button"}>
                        <Button btnRef={btnRf} disabled={btnActive ? false : true} type="submit">
                          {showErrorOnce ? "PROCEED WITH UNVERIFIED ADDRESS" : "CONFIRM"}
                        </Button>
                      </div>}
                      {suggestAdd.length !== 0 && <>
                        <div className="checkout-form__button active">
                          <Button btnRef={btnRf} type="button" onClick={(e) => onSelectAddress(JSON.parse(suggestAdd)[0].AddressKeyFormat, 1, e)}>
                            Use Recommended
                          </Button>
                        </div>
                        <div className="checkout-form__button active">
                          <Button btnRef={btnRf} type="button" className="secondary_btn" onClick={(e) => onSelectAddress(enterData, 0, e)}>
                            Use Entered Address
                          </Button>
                        </div>
                      </>}
                    </div>


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

export default AddressValidationEMW;
