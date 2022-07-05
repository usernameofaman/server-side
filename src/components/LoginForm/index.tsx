import "./scss/index.scss";

import React,{ useState, useEffect } from "react";

import { useSignIn } from "@sdk/react";
import { maybe } from "@utils/misc";
import { emwCheckoutUpdateShippingMutation } from '@sdk/mutations/emwShipping';

import { Button, Form, TextField } from "..";
import { EMWCartContext } from "../EMWCartProvider/context";
import { useMutation } from "react-apollo";
import {history} from '../../history'

interface ILoginForm {
  hide?: () => void;
  changeActiveTab: (tab) => void;
  forgotPass: () => void;
  children: any;
  setUserLogin: any;
  emailValue: string;
}

const LoginForm: React.FC<ILoginForm> = ({ setUserLogin, emailValue, hide, changeActiveTab, forgotPass, children }) => {
  const [signIn, { loading, error }] = useSignIn();
  const [cartFunction,setCartFunction]=useState(null);
  const [passError,setpassError]=useState(false);
  const [emailError,setemailError]=useState(false);
  const [InactiveError,setInactiveError]=useState(false);

  React.useEffect(() => {
    if(error && error.extraInfo && error.extraInfo.userInputErrors){
      if(error.extraInfo.userInputErrors[0].message === "Wrong Password"){
        setpassError(true)
        setemailError(false)
        setInactiveError(false)
      } else if(error.extraInfo.userInputErrors[0].message === "Email Not Found"){
        setemailError(true)
        setpassError(false)
        setInactiveError(false)
      } else if(error.extraInfo.userInputErrors[0].message === "Inactive User"){
        setInactiveError(true)
        setemailError(false)
        setpassError(false)
      }
    }
  }, [error]);

  if(localStorage.getItem("openLoginBar")){
    localStorage.removeItem("openLoginBar");
    localStorage.setItem("redirectToDocuments","true")
  }
  const [updateCheckoutShipping] = useMutation(emwCheckoutUpdateShippingMutation, {
    onCompleted({ emwCheckoutUpdateShipping }) {
      if (emwCheckoutUpdateShipping.errors.length === 0) {
        setUserLogin(false)
        localStorage.setItem('anonumousLoginIn',true);
        localStorage.removeItem('unverifiedShippingObject');
      }
    },
    onError(errors) {
      },
  });

  const handleOnSubmit = async (evt, { email, password }) => {
    evt.preventDefault();
    const isLocalData=JSON.parse(localStorage.getItem('EMWCart'));
    const lines=[];
    if(isLocalData && isLocalData.lines)
    {
      isLocalData.lines.map(item=>{
        const productOptions=[];
        if(item.productOptions && item.productOptions.length>0) {
          item.productOptions.map(optionItem=>{
            productOptions.push(optionItem.productOption.id);
          });
        } 
        const createLineData={
          quantity: item.quantity,
          productId: item.product.id,
          optionIds: productOptions,
        }
          return lines.push(createLineData);
        }); 
    }
    let userEmail = email ? email : emailValue;
    const authenticated = await signIn({ email: userEmail, password , lines},cartFunction);
    if(!setUserLogin){
      if (authenticated && hide) {
        hide();
      }
      if(authenticated && localStorage.getItem("redirectToDocuments")){
        localStorage.removeItem("redirectToDocuments")
        history.push("/document-tax")
      }else{
        history.push("/")
      }
    }else{
      if(authenticated){
        const shippingobj =JSON.parse(localStorage.getItem('unverifiedShippingObject'));
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
        localStorage.setItem('loggedInUserEmail',userEmail);
      }
    }
    if(authenticated.data && authenticated.data.user){
      localStorage.setItem("isStaff",authenticated.data.user.canImpersonate);
      localStorage.setItem("userEmailId",authenticated.data.user.email);
    }
  };

  return (
    <EMWCartContext.Consumer>
    {
      cartAction =>
      { 
        setCartFunction(cartAction);
        return(
          <div className="login-form">
            <Form
              errors={maybe(() => error.extraInfo.userInputErrors, [])}
              onSubmit={handleOnSubmit}
            >
              {passError ? <span className="emw-form-error">Your entered credentials do not match what we have in the system. Retry below  or <a onClick={()=> forgotPass()}>forgot password</a></span> : null }
              {emailError ? <span className="emw-form-error">Email address entered does not exist in our system. Please try another email address or <a onClick={() => changeActiveTab("register") }>create a new account</a></span> : null }
              {InactiveError ? <span className="emw-form-error">Your account is inactive, please check your email and activate your account.</span> : null }
              <label className="emw-label">Email</label>
              {emailValue ? <TextField
                name="email"
                autoComplete="email"
                placeholder="Email Address"
                type="email"
                value={emailValue}
                disabled={true}
                required
              />:<TextField
                name="email"
                autoComplete="email"
                placeholder="Email Address"
                type="email"
                required
              />}
              <label className="emw-label">Password</label>
              <TextField
                name="password"
                autoComplete="password"
                placeholder="Password"
                type="password"
                required
              />
              {children}
              <div className="login-form__button">
                <Button type="submit" {...(loading && { disabled: true })}>
                  {loading ? "Loading" : "Login to Account"}
                </Button>
              </div>
            </Form>
          </div>
        )
      }
      
    }
    </EMWCartContext.Consumer>
  );
};

export default LoginForm;
