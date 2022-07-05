import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import ShippingAddressFormEMW from "../EMWShippingAddressForm/ShippingAddressFormEMW";
import ShippingMethodFormEMW from "../EMWShippingAddressForm/ShippingMethodFormEMW";

import EMWCustomModal from "./EMWCustomModal";
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

interface IEMWModal {
  step: number;
  hide?: () => void;
  Mopen: boolean;
  overlayContext: any;
  isSupplimental: boolean;
  supplementalParams: any;
}

const EMWModal: React.FC<IEMWModal> = ({ hide, Mopen, step, overlayContext, isSupplimental, supplementalParams }) => {

  const [open, setOpen] = React.useState(Mopen);
  const [InactiveNext, setInactiveNext] = React.useState(true);
  const [triggerOne, settriggerOne] = React.useState(false);
  const [triggerTwo, settriggerTwo] = React.useState(false);
  const [billingTrigger, setBillingTrigger] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [finishStatus, setfinishStatus] = useState(false);

  const clearLocalData = () => {
    localStorage.setItem("EMWClearCart", "false");
    localStorage.removeItem("shippingtemp");
    localStorage.removeItem("contactInfoTemp");
    localStorage.removeItem("anonumousLoginIn");
    localStorage.removeItem("ValidAddressID")
  }
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
        clearLocalData()
        window.location.reload()
    }
}
  const [cartChange, setCartChange] = useState(0)
  const storageEventHandler = () => {
    if(localStorage.getItem("checkoutLocked")=== "False"){
      setstepNo(1)
      setCartChange(Math.random())
      localStorage.setItem("checkoutLocked", "True")
    }
  }
 
  React.useEffect(() => {
    setOpen(Mopen);
    window.addEventListener('storage', storageEventHandler, false);
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);  
    };
  }, [Mopen]);

  const handleClose = () => {
    hide();
    clearLocalData()
    overlayContext.hide()
    localStorage.removeItem("anonumousLoginIn");
    localStorage.removeItem("loggedInUserEmail");
    localStorage.removeItem("unverifiedShippingObject");
  };


  const [stepNo, setstepNo] = React.useState(step);

  const renderStep = (step) => {
    switch (step) {
      case 1:
        return <ShippingAddressFormEMW settriggerOne={settriggerOne} triggerOne={triggerOne} setInactiveNext={setInactiveNext} LoggedIn={true} changeActiveTab={() => nextStep()} hide={() => handleClose()} Mopen={stepNo} />;
      case 2:
        return <ShippingMethodFormEMW settriggerTwo={settriggerTwo} triggerTwo={triggerTwo} setInactiveNext={setInactiveNext} LoggedIn={true} changeActiveTab={() => nextStep()} hide={() => handleClose()} Mopen={stepNo} />;
      case 3:
        return <EMWCheckoutBillingPage nextStep={nextStep} setInactiveNext={setInactiveNext} billingTrigger={billingTrigger} isSupplimental={isSupplimental} supplementalParams={supplementalParams}/>;
      case 4:
        return <CheckoutPaymentStep nextStep={nextStep} isSupplimental={isSupplimental} supplementalParams={supplementalParams}/>;
      case 5:
        return <EMWCheckoutConfirmation isSupplimental={isSupplimental} supplementalParams={supplementalParams} hide={() => handleClose()}/>;
      default:
        return 'foo';
    }
  }


  const nextStep = () => {
    if (stepNo < 5) {
      setInactiveNext(true)
      setstepNo(stepNo + 1)
    }
  }

  const nextStepTrigger = () => {
    if (stepNo === 1) {
      settriggerOne(true)
    }
    if (stepNo === 2) {
      settriggerTwo(true)
    }
    if (stepNo === 3) {
      setBillingTrigger(true)
    }
  }

  const preStep = () => {

    settriggerOne(false)
    settriggerTwo(false)
    setBillingTrigger(false)
    if (stepNo > 1) {
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
          {
          (!isSupplimental) && 
          <div className="emw-stepper-div">
          {/*<ReactSVG
            path={stepNo === 1 ? Inactivepre : previous}
            onClick={() => preStep()}
            className="overlay__header__close-icon emw-prev"
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
        }
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
            <p className="headTitle">SHIPPING ADDRESS</p>
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
    <EMWCustomModal
    step={stepNo}
    />
  </Dialog>
  );
};

export default EMWModal;
