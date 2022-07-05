import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import { Button, Form, TextField } from "..";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import closeImg from "../../images/login-close.svg";
import logincart from "../../images/login-cart.svg";
import loginlogo from "../../images/login-logo.svg";
import ReactSVG from "react-svg";
import OrderTruck from "../../images/track.svg";
import leftArrow from '../../images/leftArrow.png'

interface IEMWModal {
  hide?: () => void;
  Mopen: boolean;
  children: any;
  userLoggedIn: boolean;
  leftButtonText: string,
  rightButtonText: string,
  showLeftButton: boolean,
  overlayContext: any,
  trackingButtonHandler: any,
  onAccountCreateClick: any,
}

const EMWOrderTrackingModal: React.FC<IEMWModal> = ({ hide, Mopen, children, userLoggedIn, leftButtonText, rightButtonText, showLeftButton, overlayContext, trackingButtonHandler, onAccountCreateClick }) => {

  const [open, setOpen] = React.useState(Mopen);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    setOpen(Mopen);
  }, [Mopen]);

  const handleClose = () => {
    hide();
  };


  return (<Dialog
    className={"emw-checkout-box"}
    fullScreen={fullScreen}
    open={open}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
  >

    <DialogTitle id="responsive-dialog-title">
      <p className="overlay__header-text"><ReactSVG
        path={OrderTruck}
        className="overlay__header__close-icon"
      /></p>
      <p className="overlay__header-text" onClick={handleClose}><ReactSVG
        path={closeImg}
        className="overlay__header__close-icon"
      /></p>
    </DialogTitle>

    <DialogContent>

      <span className="login-logo">
        <ReactSVG
          path={loginlogo}
          className="overlay__header__logo-icon"
        />
      </span>
      {children}
    </DialogContent>
    {
      (!userLoggedIn || showLeftButton) && (
        <DialogActions classes={{ root: ["orderTrackingFooter", !showLeftButton ? "centerTrackingFooter" : "" ].join(' ')  }}>
          {
            showLeftButton &&
            <Button className="orderConfirmBtn trackingBtn" onClick={trackingButtonHandler}>
              <img src={leftArrow} />
              {leftButtonText}
            </Button>
          }
          {
            !userLoggedIn &&
            <Button className="createAccountBtn" onClick={()=>onAccountCreateClick(overlayContext)}>
              {rightButtonText}
            </Button>
          }
        </DialogActions>
      )

    }
    
  </Dialog>
  );
};

export default EMWOrderTrackingModal;
