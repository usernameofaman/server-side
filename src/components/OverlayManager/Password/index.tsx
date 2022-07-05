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

import closeImg from "../../../images/login-close.svg";
const Password: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) => (
    <Overlay context={overlay}>
      <div className="password-reset">
        <Online>
          <div className="overlay__header forgot-password-header">
              <div className="login__tabs">
                <span   onClick={() => {
                      overlay.show(OverlayType.register, OverlayTheme.right);
                    }}
                >
                  Create an Account
              </span>
                <span class="active-tab"
                >
                  Login to Account
              </span>
              </div>
            
            <ReactSVG
              path={closeImg}
              onClick={overlay.hide}
              className="overlay__header__close-icon"
            />
          </div>
          <div className="password-reset__content">
            <PasswordResetForm />
          </div>
        </Online>
        <Offline>
          <OfflinePlaceholder />
        </Offline>
      </div>
    </Overlay>
  );

export default Password;
