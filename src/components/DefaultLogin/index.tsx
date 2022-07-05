import "./scss/index.scss";

import React,{ useState, useEffect } from "react";
import loginlogo from "../../images/emw-confirm-logo.svg";
// import { useSignIn } from "@sdk/react";
// import { maybe } from "@utils/misc";
// import { emwCheckoutUpdateShippingMutation } from '@sdk/mutations/emwShipping';
import { LoginForm } from "../";
// import { Button, Form, TextField } from "..";
// import { EMWCartContext } from "../EMWCartProvider/context";
// import { useMutation } from "react-apollo";
// import {history} from '../../history'

interface ILoginForm {
}

const DefaultLogin: React.FC<ILoginForm> = ({ }) => {
  return (
    <div className="login-wrapper">
      <div className="login-container">
      <img className="login-page-image" src={loginlogo} />
      <LoginForm />
      </div>
    </div>
  );
};

export default DefaultLogin;
