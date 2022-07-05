import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import { maybe } from "@utils/misc";

import { Button, Form, TextField } from "..";
import { ShopContext } from "../ShopProvider/context";
import EMWPhoneNumber from '../EMWPhoneNumber';


interface IAddAddressFormEMW {
  triggerOne: boolean;
  setInactiveNext: (status) => void;
  settriggerOne: (status) => void;
  showShippingform: () => void;
}


const AddAddressFormEMW: React.FC<IAddAddressFormEMW> = ({triggerOne, setInactiveNext, settriggerOne, showShippingform}) => {
  const [btnActive, setbtnActive] = useState(false);
  const [phoneNum,setPhoneNum]=React.useState("");
  const [isFocusedPhoneState,setIsFocusedPhoneState]=React.useState(false);

  
  const AddressSubmit = async (evt, { firstname, lastname, email, companyName }) => {
    evt.preventDefault();
    setIsFocusedPhoneState(true);
    if(phoneNum){
      if(btnActive){
        const contactInfoTemp = {
          firstname,
          lastname,
          email,
          companyName,
          phone: phoneNum,
        }
        localStorage.setItem("contactInfoTemp", JSON.stringify(contactInfoTemp))
        localStorage.setItem("shippingtemp", "")
        settriggerOne(false)
        showShippingform()
      }
    }
    
  };

  const btnRf = React.useRef(null)
  useEffect(() => {    
    if(triggerOne === true)
    {   
      btnRf.current.click()
    }
}, [triggerOne]);
  const handleOnChangeNum=(value)=>{
    setIsFocusedPhoneState(true);
    setPhoneNum(value);
  }
  return (
    <ShopContext.Consumer>
      {
        cartAction => {
          return (
            <React.Fragment>

              <div className="address-form">
                <Form
                  errors={maybe(() => [], [])}
                  onSubmit={AddressSubmit}
                >
                  <div className="items">
                    <span className="title">ENTER SHIPPING INFO</span>
                    <br></br>
                    <label className="emw-label">First Name</label>
                    <TextField
                      name="firstname"
                      autoComplete="given-name"
                      placeholder="First Name"
                      type="text"
                      onBlur={()=> {setbtnActive(true); setInactiveNext(false)}}
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
                    <label className="emw-label">Organization Name (Optional)</label>
                    <TextField
                      name="companyName"
                      autoComplete="Organization"
                      placeholder="Organization Name"
                      type="text"
                    />
                    <label className="emw-label">Email</label>
                    <TextField
                      name="email"
                      autoComplete="Email"
                      placeholder="Email"
                      type="email"
                      required
                    />
                    <label className="emw-label">Phone</label>
                      <EMWPhoneNumber
                        defaultCountry="us"
                        name="phone"
                        required={true}
                        phoneNum={phoneNum}
                        handleOnChangeNum={handleOnChangeNum}
                      />
                    <div className={btnActive ? "checkout-form__button active" : "checkout-form__button"}>
                    <Button btnRef={btnRf} disabled={(btnActive) ? false : true} type="submit">
                        CONFIRM
                    </Button>
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

export default AddAddressFormEMW;
