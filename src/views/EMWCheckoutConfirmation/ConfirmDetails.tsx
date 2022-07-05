import "./scss/index.scss";

import React, { useEffect, useState } from "react";
import loginlogo from "../../images/emw-confirm-logo.svg";
import ReactSVG from "react-svg";
import OrderStatus from "./OrderStatus";
import { EMWCartContext } from "../../components/EMWCartProvider/context";
import { OverlayContext } from "../../components/Overlay";
import { history } from "../../history";

interface ConfirmDetailsProps {
  userDetails: any;
  showTaxError: string;
  data: any;
  hide: any;
  isSupplimental: any;
}

const ConfirmDetails: React.SFC<ConfirmDetailsProps> = props => {
  const { userDetails, showTaxError, data, hide, isSupplimental } = props;
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (isSupplimental) {
      if (data && data.email) {
        setEmail(data.email);
      } else if (data && data.user && data.user.email) {
        setEmail(data.user.email);
      }
    } else {
      const userEmail =
        userDetails && userDetails.data && userDetails.data.email;
      if (userEmail) {
        setEmail(userEmail);
      } else {
        setEmail(null);
      }
    }
  }, [userDetails.data]);

  const returnToStore = (cartAction, overlayContext) => {
    hide();
    overlayContext.hide();
    cartAction.setLines([], 0);
    // localStorage.setItem("EMWClearCart", "false");
    // setTimeout(() => {
    //   localStorage.removeItem("EMWCart");
    // }, 500);
    // localStorage.removeItem("shippingtemp");
    // localStorage.removeItem("contactInfoTemp");
    // localStorage.removeItem("anonumousLoginIn");
    // localStorage.removeItem("ValidAddressID")
    history.push(`/`);
  };

  return (
    <>
      <div className="confirmDetails-section">
        {/*<div>
          <span className="login-logo">
            <ReactSVG path={loginlogo} className="overlay__header__logo-icon" />
          </span>
        </div>*/}
        <OrderStatus
          email={email}
          data={data}
          showTaxError={showTaxError}
          isSupplimental={isSupplimental}
          userDetails={userDetails}
        ></OrderStatus>
        <div>
          <EMWCartContext.Consumer>
            {cartAction => (
              <OverlayContext.Consumer>
                {overlayContext => (
                  <p
                    className="returnToStoreButton"
                    onClick={() => returnToStore(cartAction, overlayContext)}
                  >
                    RETURN TO STORE
                  </p>
                )}
              </OverlayContext.Consumer>
            )}
          </EMWCartContext.Consumer>
        </div>
      </div>
    </>
  );
};

export default ConfirmDetails;
