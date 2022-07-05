import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import AddContactFormEMW from "../EMWShippingAddressForm/AddContactFormEMW";
import ShippingMethodFormEMW from "../EMWShippingAddressForm/ShippingMethodFormEMW";
import ShippingAddressEMW from "../EMWShippingAddressForm/ShippingAddressEMW";
import ShippingValidationEMW from "../EMWShippingAddressForm/ShippingValidationEMW";

import { Button, Form, TextField } from "..";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import closeImg from "../../images/login-close.svg";
import logincart from "../../images/Cart.svg";
import loginlogo from "../../images/logo.svg";
import emwLogo from "../../images/emw-confirm-logo.svg";
import previous from "../../images/previous.svg";
import arrowBack from "../../images/leftArrow.png";
import next from "../../images/next.svg";
import Inactivenext from "../../images/Inactivenext.svg";
import Inactivepre from "../../images/Inactivepre.svg";
import ReactSVG from "react-svg";
import { EMWCheckoutBillingPage } from '../../views/EMWCheckoutBilling';
import CheckoutPaymentStep from '../../views/EMWCheckoutBilling/CheckoutPaymentStep';
import { EMWCheckoutConfirmation } from '../../views/EMWCheckoutConfirmation';
import EMWOrderSummary from './EMWOrderSummary';
import { Grid, Container } from "@material-ui/core";

interface IEMWModalSignOut {
  step: number;
  hide?: () => void;
  Mopen: boolean;
  overlayContext: any;
}

const EMWModalSignOut: React.FC<IEMWModalSignOut> = ({ hide, Mopen, step, overlayContext}) => {

  const [open, setOpen] = React.useState(Mopen);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [triggerOne, settriggerOne] = React.useState(false);
  const [triggerTwo, settriggerTwo] = React.useState(false);
  const [triggerThree, settriggerThree] = React.useState(false);
  const [InactiveNext, setInactiveNext] = React.useState(true);
  const [billingTrigger, setBillingTrigger] = React.useState(false);

  React.useEffect(() => {
    setOpen(Mopen);
  }, [Mopen]);

  const [stepNo, setstepNo] = React.useState(step);

  const handleClose = () => {
    hide();
    overlayContext.hide();
    localStorage.removeItem("anonumousLoginIn");
    localStorage.removeItem("loggedInUserEmail");
    localStorage.removeItem("unverifiedShippingObject");
  };

  const renderStep = (step) => {
    switch (step) {
      // case 1:
      //   return <AddContactFormEMW settriggerOne={settriggerTwo} triggerOne={triggerOne} setInactiveNext={setInactiveNext}  changeActiveTab={()=> nextStep()}  Mopen={stepNo} />;
      case 1:
        return <ShippingAddressEMW LoggedIn={false} settriggerTwo={settriggerTwo} triggerTwo={triggerTwo} setInactiveNext={setInactiveNext} changeActiveTab={()=> nextStep()} hide={()=> handleClose()} Mopen={stepNo} />;
      case 2:
        return <ShippingMethodFormEMW LoggedIn={false} settriggerTwo={settriggerThree} triggerTwo={triggerThree} setInactiveNext={setInactiveNext} changeActiveTab={()=> nextStep()} hide={()=> handleClose()} Mopen={stepNo} />;
      case 3:
        return <EMWCheckoutBillingPage nextStep={nextStep} setInactiveNext={setInactiveNext} billingTrigger={billingTrigger} isSupplimental={false} supplementalParams={null}/>; 
      case 4:
        return <CheckoutPaymentStep nextStep={nextStep} isSupplimental={false} supplementalParams={null}/>;
      case 5:
        return <EMWCheckoutConfirmation isSupplimental={false} supplementalParams={null} hide={() => handleClose()}/>; 
      default:
        return 'foo';
    }
  }

  const nextStep = () => {
    if(stepNo < 5) {
    setInactiveNext(true)
    setstepNo(stepNo + 1)
    }
  }

  const nextStepTrigger = () => {
    if(stepNo === 1){
      settriggerTwo(true)
    }
    if(stepNo === 2){
      settriggerThree(true)
    }
    if(stepNo === 3){
      setBillingTrigger(true)
    }
    if(stepNo === 4){
      // setBillingTrigger(true)
    }
  }

  const preStep = () => {
    
    settriggerOne(false)
    settriggerTwo(false)
    settriggerThree(false)
    setBillingTrigger(false)
    if(stepNo > 1) {
      setstepNo(stepNo - 1)
    }else{
      hide();
    }    
  }

  return (<Dialog
    className={"emw-checkout-box emw-checkout-box-layout"}
    fullScreen={fullScreen}
    open={open}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
  >
    {
      stepNo !== 5 &&
      <DialogTitle id="responsive-dialog-title">
        <span className="overlay__header-text emw-overlay-header-first-item-margin"><ReactSVG
          path={logincart}
          className="overlay__header__close-icon"
        /></span>
        <span className="overlay__header-text"><ReactSVG
          path={loginlogo}
          className="overlay__header__close-icon"
        /></span>
        <span className="overlay__header-text" onClick={handleClose}><ReactSVG
          path={closeImg}
          className="overlay__header__close-icon"
        /></span>
      </DialogTitle>
    }
    <DialogContent>
    {stepNo !== 5 ?        
      <div className="items">
        <div className="inner-items">
          <div className="emw-stepper-div">
          {/*<ReactSVG
            //path={stepNo === 1 ? Inactivepre : previous}
            className="overlay__header__close-icon emw-prev"
            onClick={() => preStep()}
          />*/}
          <button className="backbutton" onClick={() => preStep()}>
            <img src={arrowBack} alt="" />
            Back
          </button>
         <div className="emw-stepper">
            <div className="modal-step">
            <span className={stepNo === 1 ? "checkout-step active" : "checkout-step"}>1</span>
            <span className="step-label">SHIPPING</span>
            </div>
            <div className="modal-step">
            <span className={stepNo === 2 ? "checkout-step active" : "checkout-step"}>2</span>
            <span className="step-label">SHIP METHOD</span>
            </div>
            <div className="modal-step">
            <span className={stepNo === 3 ? "checkout-step active" : "checkout-step"}>3</span>
            <span className="step-label">BILLING</span>
            </div>
            <div className="modal-step">
            <span className={stepNo === 4 ? "checkout-step active" : "checkout-step"}>4</span>
            <span className="step-label">COMPLETE</span>
            </div>
          </div>

          {/*<ReactSVG
            path={InactiveNext ? Inactivenext : next}
            onClick={InactiveNext ? null : () => nextStepTrigger()}
            className="overlay__header__close-icon emw-next"
          />*/}
          </div>
        </div>
      </div> :null}
      {stepNo === 5 &&<div>
          <span className="login-logo">
            <ReactSVG path={emwLogo} className="overlay__header__logo-icon" />
          </span>
        </div>}
        <Container maxWidth="md" className="customeContainerWidth">
        <Grid container spacing={3} className="pt-30">
         {stepNo === 1 &&
          <Grid item sm={12}>
            <p className="headTitle">ENTER SHIPPING INFO</p>
          </Grid> 
        }
        {stepNo === 2 &&
          <Grid item sm={12}>
            <p className="headTitle">CHOOSE A SHIPPING METHOD</p>
          </Grid> 
        }
        {stepNo === 3 &&
          <Grid item sm={12}>
            <p className="headTitle">BILLING ADDRESS</p>
          </Grid> 
        }
          <Grid item sm={6} className="order-content-left border-right">
            <EMWOrderSummary stepNo={stepNo} hide={hide}/>
          </Grid>
          <Grid item sm={6} className="order-content-right">
            {renderStep(stepNo)}
          </Grid>
        </Grid>
        </Container>
    </DialogContent>
  </Dialog>
  );
};

export default EMWModalSignOut;
