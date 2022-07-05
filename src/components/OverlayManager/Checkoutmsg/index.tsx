import "./scss/index.scss";

import * as React from "react";
import ReactSVG from "react-svg";

import {
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
  PasswordResetForm,
  OverlayTheme,
  OverlayType
} from "../..";

import loginlogo from "../../../images/login-logo.svg";
import closeImg from "../../../images/login-close.svg";
import logincart from "../../../images/Cart.svg";
import tick from "../../../images/checkout-tick.svg";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Button } from "../../../components";

import EMWModalSignOut from '../../EMWModal/EMWModalSignOut'

const Checkoutmsg: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) =>{
  const [checked, setChecked] = React.useState(false);
  const [viewShipping, setviewShipping] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const GreenCheckbox = withStyles({
    root: {
      color: "#F3A738",
      '&$checked': {
        color: "#F3A738",
      },
    },
    checked: {},
  })((props: CheckboxProps) => <Checkbox name="ChkNew" color="default" {...props} />);

  const ClickOnRegister = () => {
    localStorage.setItem("ischeckedIn", "true")
    overlay.show(OverlayType.register, OverlayTheme.right);
  }

  const ClickOnLogin = () => {
    localStorage.setItem("ischeckedIn", "true")
    overlay.show(OverlayType.login, OverlayTheme.right);
  }
  return  (
    <React.Fragment>
    <Overlay context={overlay}>
      <div className="checkout-msg-login">
        <Online>
          <div className="overlay__header">
            <div className="overlay__header-text"><ReactSVG
              path={logincart}
              className="overlay__header__close-icon"
            /></div>
            <div className="login__tabs">
              <span className="active-tab" onClick={() => ClickOnRegister()}>
                Create <font className="an_text">an</font> Account
              </span>
              <span onClick={() => ClickOnLogin()}>
                Login to Account
              </span>
            </div>

            <ReactSVG
              path={closeImg}
              onClick={overlay.hide}
              className="overlay__header__close-icon"
            />
          </div>
          <div className="checkout-msg-login__content scroller">
            <span className="login-logo">
              <ReactSVG
                path={loginlogo}
              />
            </span>
            <div className="checkout-msg-block">
              <span className="checkout-msg"><ReactSVG path={tick} className="overlay__header__close-icon" />
              Obtain account level pricing and save custom quotes</span>
              <span className="checkout-msg"><ReactSVG path={tick} className="overlay__header__close-icon" />
              Pre fill address and contact info</span>
              <span className="checkout-msg"><ReactSVG path={tick} className="overlay__header__close-icon" />
              Upload required documents</span>
              <span className="checkout-msg"><ReactSVG path={tick} className="overlay__header__close-icon" />
              Quickly access order and tracking info</span>
              <h3>OR</h3>

              <FormControlLabel
                      control={<GreenCheckbox checked={checked} onChange={handleChange} name="checkedG" />}
                      label="I want to proceed to quick checkout without advantage account benefits."
                    />

              <div className="password-reset-form__button">
                <Button onClick={checked ? () => setviewShipping(true) : null} className={checked ? "no-bg active" : "no-bg"}>
                  {"QUICK CHECKOUT"}
                </Button>
                {/*<Button onClick={() => ClickOnRegister()}>
                  {"CREATE MY ACCOUNT"}
                </Button>*/}
              </div>
            </div>
          </div>
        </Online>
        <Offline>
          <OfflinePlaceholder />
        </Offline>
      </div>
    </Overlay>
    <EMWModalSignOut step={1} Mopen={viewShipping} hide={() => setviewShipping(false)} />
    </React.Fragment>
  );
}

export default Checkoutmsg;
