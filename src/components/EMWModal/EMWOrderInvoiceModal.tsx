import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import { Button, Form, TextField } from "..";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import closeImg from "../../images/login-close.svg";
import ReactSVG from "react-svg";
import OrderTruck from "../../images/track.svg";

interface IEMWModal {
  hide?: () => void;
  Mopen: boolean;
  children: any;
}

const EMWOrderInvoiceModal: React.FC<IEMWModal> = ({
  hide,
  Mopen,
  children,
}) => {
  const [open, setOpen] = React.useState(Mopen);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    setOpen(Mopen);
  }, [Mopen]);

  const handleClose = () => {
    hide();
  };

  return (
    <Dialog
      className={"emw-checkout-box"}
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <p className="overlay__header-text">
          <ReactSVG path={OrderTruck} className="overlay__header__close-icon" />
        </p>
        <p className="overlay__header-text" onClick={handleClose}>
          <ReactSVG path={closeImg} className="overlay__header__close-icon" />
        </p>
      </DialogTitle>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default EMWOrderInvoiceModal;
