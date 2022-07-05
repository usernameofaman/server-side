import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import { maybe } from "@utils/misc";

import { Button, Form, TextField } from "..";
import { ShopContext } from "../ShopProvider/context";


interface IAddressValidationEMW {
  handleValidSubmit: (data) => void;
  showShipping: () => void;
  suggestAdd: [];
  enterData: any;
  LoggedIn:boolean;

}

const AddressValidationEMW: React.FC<IAddressValidationEMW> = ({ handleValidSubmit, showShipping, suggestAdd, enterData,  LoggedIn}) => {

  const [selecedAdd, setselecedAdd] = useState({});
  const [selectedtype, setselectedtype] = useState("");
  const [btnActive, setbtnActive] = useState(false);
  let firstNameEMW = ""
  let lastNameEMW = ""
  let emailEMW = ""
  let phoneEMW = ""
  const onChangeAddress = (data) => {
    setbtnActive(true)    
    setselectedtype("Change")
  }

    firstNameEMW = enterData.input ? enterData.input.firstName : enterData.firstName
    lastNameEMW = enterData.input ? enterData.input.lastName : enterData.lastName
    emailEMW = enterData.input ? enterData.input.email : enterData.email
    phoneEMW = enterData.input ? enterData.input.phone : enterData.phone


  const onSelectAddress = (data, type) => {
    setbtnActive(true)    

    if(type === 0){
      data.input.useUnverified = true
      setselectedtype("Default")
      setselecedAdd(data)
    } else {
      let temp = '';
      temp = data.AddressLine;
      if(Array.isArray(data.AddressLine)) {
        temp = data.AddressLine.join(' ');
      }     
      setselectedtype(temp+data.Region)
      const newdata = {
        input: {
          firstName: firstNameEMW,
          lastName: lastNameEMW,
          email:emailEMW,
          phone:phoneEMW,
          streetAddress1: temp,
          city: data.PoliticalDivision2,
          countryArea: data.PoliticalDivision1,
          postalCode: data.PostcodePrimaryLow,
          country: data.CountryCode,
          isBillingAddress: false,
        },
      }
      setselecedAdd(newdata)
    }
    
  }

  const btnRf = React.useRef(null)

  const handleAddressSubmit = async (evt) => {
    evt.preventDefault();   
    setbtnActive(false) 
    if(selectedtype === "Change"){
      showShipping()
    } else {
      handleValidSubmit(selecedAdd)    
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
                  <div className="items ">
                    <div className="inner-items">
                      <span className="title no-bottom-margin">CHOOSE A VERIFIED ADDRESS</span>
                      <span className="sub-title">You must make an address selection below in order to proceed. It is advised to select the carrier verified address.</span>
                      <br></br>
                      <div className="gaq-user-enter-choice">
                      <span className="sub-heading">You Entered:</span>                      
                      <div onClick={() => {onSelectAddress(enterData, 0)}} className={selectedtype === "Default" ? "add-list active" : "add-list"}>
                      {firstNameEMW + " "}
                      {lastNameEMW}<br></br>
                      {enterData.input.streetAddress1} {enterData.input.streetAddress2}<br></br>                      
                      {enterData.input.city}, {enterData.input.postalCode} <br></br>                      
                      {enterData.input.countryArea}, {enterData.input.country} <br></br>
                      (Unknown)
                      </div>
                      </div>

                      <div className="gaq-user-enter-choice">
                      {suggestAdd.length > 0 ? <span className="sub-heading">Suggested Address:</span> : null }
                      {suggestAdd.length > 0 ? JSON.parse(suggestAdd).map((adrss, index) => {
                        return <div onClick={() => {onSelectAddress(adrss.AddressKeyFormat, 1)}} key={index} className={Array.isArray(adrss.AddressKeyFormat.AddressLine) ? (adrss.AddressKeyFormat.AddressLine.join(" ") + adrss.AddressKeyFormat.Region) === selectedtype ?"add-list active": "add-list" : (adrss.AddressKeyFormat.AddressLine + adrss.AddressKeyFormat.Region) === selectedtype ?"add-list addreshText active": "addreshText add-list" }>
                          {firstNameEMW + " "}
                          {lastNameEMW}<br></br>
                          {Array.isArray(adrss.AddressKeyFormat.AddressLine) ? adrss.AddressKeyFormat.AddressLine.join(" ") :adrss.AddressKeyFormat.AddressLine },<br></br>
                          {adrss.AddressKeyFormat.PoliticalDivision2}, {adrss.AddressKeyFormat.PoliticalDivision1}, {adrss.AddressKeyFormat.PostcodePrimaryLow}-{adrss.AddressKeyFormat.PostcodeExtendedLow}<br></br>
                          ({adrss.AddressClassification.Description})
                        </div>
                      }) : null}
                      {suggestAdd.length === 0 ? <div className="info"><span>The address you entered did not return any verified result.</span><span>Are you sure you want to proceed?</span></div>: null}

                      {suggestAdd.length === 0 ? <div onClick={() => {onChangeAddress(enterData)}} className={selectedtype === "Change" ? "add-list active" : "add-list"}>
                       Change Address<br></br>
                      (Recommended)
                      </div>: null}
                      </div>
                      <div className={btnActive ? "checkout-form__button active" : "checkout-form__button"}>
                      <Button btnRef={btnRf} disabled={btnActive ? false : true} type="submit">
                          CONFIRM
                        </Button>
                      </div>
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
