import "./scss/index.scss";

import * as React from "react";
import ReactSVG from "react-svg";
import qs from "query-string"

import {
  LoginForm,
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType
} from "../..";
import RegisterForm from "./RegisterForm";

import closeImg from "../../../images/login-close.svg";
import ForgottenPassword from "./ForgottenPassword";
import logincart from "../../../images/login-cart.svg";
import loginlogo from "../../../images/login-logo.svg";

class Login extends React.Component<
  { overlay: OverlayContextInterface; active?: "login" | "register" },
  { active: "login" | "register" }
  > {
  static defaultProps = {
    active: "register",
  };
  constructor(props) {
    super(props);
    if(props.overlay.type==="login"){
      localStorage.setItem('registerHide',"false");
    }else{
      localStorage.setItem('registerHide',"false");
    }
    this.state = {
      active: props.overlay.type,
      // active: props.active,
    };
  }

  changeActiveTab = (active: "login" | "register") => {
    if(active=="login"){
      localStorage.setItem('registerHide',"false");
    }else{
      localStorage.setItem('registerHide',"false");
    }
    this.setState({ active });
  };
  

  render() {
    const { overlay } = this.props;
    const { show, hide } = overlay;
    return (
      <Overlay context={overlay}>
        <div className="login">
          <Online>
            <div className="overlay__header">
              {/* <p className="overlay__header-text"><ReactSVG
                path={logincart}
                className="overlay__header__close-icon"
              /></p> */}
              <div className="login__tabs">
                <span
                  onClick={() => this.changeActiveTab("register")}
                  className={this.state.active === "register" ? "active-tab" : ""}
                >
                  Create an Account
              </span>
                <span
                  onClick={() => this.changeActiveTab("login")}
                  className={this.state.active === "login" ? "active-tab" : ""}
                >
                  Login to Account
              </span>
              </div>
              <ReactSVG
                path={closeImg}
                onClick={hide}
                className="overlay__header__close-icon"
              />
            </div>

            <div className="login__content"> 
              {this.state.active === "login" ? (
                <>
                  <LoginForm hide={hide} changeActiveTab={this.changeActiveTab} forgotPass={() => {
                      show(OverlayType.password, OverlayTheme.right);
                    }}>
                      <ForgottenPassword
                    onClick={() => {
                      show(OverlayType.password, OverlayTheme.right);
                    }}
                  />
                   </LoginForm>
                  
                </>
              ) : (
                  <RegisterForm hide={hide} changeActiveTab={this.changeActiveTab}/>
                )}
            </div>
          </Online>
          <Offline>
            <OfflinePlaceholder />
          </Offline>
        </div>
      </Overlay>
    );
  }
}

export default Login;
