import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import { Button, Form, TextField } from "..";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import closeImg from "../../images/login-close.svg";
import logo from "../../images/logo.svg";
import { PasswordTile } from "../../@next/components/molecules/AccountTabTiles/PasswordTile";
import ReactSVG from "react-svg";

interface IEMWAccountPasswordModal {
  hide?: () => void;
  Mopen: boolean;
}

const EMWAccountPasswordModal: React.FC<IEMWAccountPasswordModal> = ({ hide, Mopen }) => {

  const [open, setOpen] = useState(Mopen);
  const [submitQuote, setsubmitQuote] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const LoggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  const imgInputAnchor = React.createRef<HTMLInputElement>();

  React.useEffect(() => {
    setOpen(Mopen);
  }, [Mopen]);


  const handleClose = () => {
    hide();
  };


  return (<Dialog
    className={"emw-checkout-box add-shipping-form"}
    fullScreen={fullScreen}
    open={open}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
  >

    <DialogTitle id="responsive-dialog-title">
      <span className="overlay__header-text"><ReactSVG
        path={logo}
        className="overlay__header__close-icon"
      /></span>
      <span className="overlay__header-text" onClick={handleClose}><ReactSVG
        path={closeImg}
        className="overlay__header__close-icon"
      /></span>
    </DialogTitle>

    <DialogContent>
      <React.Fragment>
        <div className="address-form emw-password-form">
          <div className="items">
            <div className="inner-items">
              <span className="title">Change Password</span>
                <PasswordTile cancelClick={handleClose}/>
             </div>
          </div>
        </div>
      </React.Fragment>
    </DialogContent>
  </Dialog>
  );
};

export default EMWAccountPasswordModal;
