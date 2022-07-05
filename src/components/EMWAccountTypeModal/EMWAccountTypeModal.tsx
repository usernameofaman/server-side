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

import ReactSVG from "react-svg";
//import Select from 'react-select';
import { maybe } from "@utils/misc";
import { useQuery } from '@apollo/react-hooks';
import { Checkbox } from '@material-ui/core';

import { useAlert } from "react-alert";
import { useMutation, useLazyQuery } from '@apollo/react-hooks';

import UploadDocumentsMyAccount from "../../components/OverlayManager/Login/UploadDocumentsMyAccount";
import { getEMWTiers, TypedAccountRegisterMutation, TypedEMWTiers, TypedTierDocumentTypes } from "../../components/OverlayManager/Login/queries";

import { customerUpdateMutation, EMWchangeUserTier} from '../../../../@sdk/mutations/user';

interface IEMWAccountTypeModal {
  hide?: () => void;
  Mopen: boolean;
  TaxExempt:any;
  type:any;
  refetch:any;
}

const EMWAccountTypeModal: React.FC<IEMWAccountTypeModal> = ({ hide, Mopen, TaxExempt, type, refetch}) => {

  const [open, setOpen] = useState(Mopen);
  const [submitQuote, setsubmitQuote] = useState(false);

  const theme = useTheme();
  const alert = useAlert();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [btnActive, setbtnActive] = useState(false);
  const LoggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  const [userType, setuserType] = React.useState(type);
  const [isTaxExempt, setisTaxExempt] = React.useState(TaxExempt);
  const [stateValue, setStateValue] = useState(null);

  const { data } = useQuery(getEMWTiers, {
    variables: { first: 50 }, fetchPolicy: "no-cache"
  });

  let accountTypes = []

  if (data) {
    accountTypes = data.emwTierTypes.edges.map(edge => edge.node)
  }
  

  React.useEffect(() => {
    setOpen(Mopen);
    setuserType(type);
    setisTaxExempt(TaxExempt);
    setsubmitQuote(false);
  }, [Mopen]);

  const [updateCustomerAccount] = useMutation(customerUpdateMutation, {
    onCompleted({ customerUpdate }) {
      if (customerUpdate.errors.length === 0) {
        alert.show(
          {
            title: "Updated Successfully",
          },
          { type: "success", timeout: 2000 }
        );
        refetch()
        handleClose()
      } else {
        alert.show(
          {
            title: "Something Went Wrong.",
          },
          { type: "error", timeout: 2000 }
        );
      }
      
    },
    onError(error) {
      alert.show(
        {
          title: "Something Went Wrong.",
        },
        { type: "error", timeout: 2000 }
      );
    }
  });

  const [updateCustomerAccountType] = useMutation(EMWchangeUserTier, {
    onCompleted({ changeUserTier }) {
      if (changeUserTier.errors.length === 0) {
        alert.show(
          {
            title: "Updated Successfully",
          },
          { type: "success", timeout: 2000 }
        );
        refetch()
        handleClose()
      } else {
        alert.show(
          {
            title: "Something Went Wrong.",
          },
          { type: "error", timeout: 2000 }
        );
      }
      
    },
    onError(error) {
      alert.show(
        {
          title: "Something Went Wrong.",
        },
        { type: "error", timeout: 2000 }
      );
    }
  });

  const handleClose = () => {
    hide();
  };

  const requestHandler = () => {
    if(TaxExempt !== isTaxExempt){
      updateCustomerAccount({
        variables: {
          id: localStorage.getItem("emwUserId"),
          input: {
            isTaxExempt: isTaxExempt
          },
        }
      })
    }
    if(type !== userType){
      updateCustomerAccountType({
        variables: {
          user: localStorage.getItem("emwUserId"),
          tiertype: parseInt(userType)
        }
      })
    }   
  }



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
        <div className="address-form emw-account-form">
          <div className="items">
            <div className="inner-items">
              <span className="title">UPDATE YOUR ACCOUNT TYPE</span>
              <div className="infospan">
                <span>Choose the option that best describe you.</span>
                <div className="account__type__container">
                {accountTypes.map((type) =>{
                  return(
                    (type.emwTiertypeIsActive) ?
                    <div key={type.emwTiertypeId}
                      onClick={() => {setuserType(type.emwTiertypeId); setsubmitQuote(true)}}
                      className={`account__type__button ${parseInt(userType) === parseInt(type.emwTiertypeId) ? "account__type__button active" : ""}`}>
                      <span>{type.emwTiertypeName}</span>
                    </div>:
                    null
                  )
                })}
                </div>               
              </div>
              <div className="upload__checkbox">
              <Checkbox checked={isTaxExempt} onChange={(_, checked) => {setisTaxExempt(checked); setsubmitQuote(true)}} />
                        <p className="account__info__small__label"> 
                          I am tax exempt <br></br> (Require tax exempt certificate)
          </p>
                      </div>
             </div>
          </div>
        </div>
        <div className="request-button"><Button className={submitQuote ? "" : "inactive"} onClick={submitQuote ? () => requestHandler() : null} >SAVE CHANGES</Button></div>
      </React.Fragment>
    </DialogContent>
  </Dialog>
  );
};

export default EMWAccountTypeModal;
