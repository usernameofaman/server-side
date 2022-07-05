import * as React from "react";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
import { Trans } from "@lingui/react";
import "./scss/index.scss";
import { EMWCartContext } from "../../EMWCartProvider/context";
import { useAlert } from "react-alert";
import closeImg from "../../../images/login-close.svg";
import {
  accountUrl,
  addressBookUrl,
  baseUrl,
  documentTaxUrl,
  orderHistoryUrl
} from "../../../routes";
import {
  Online,
  Overlay,
  OverlayContextInterface,
  TextField,
  Button,
} from "../..";
import { useSignOut } from "@sdk/react";
import { EMWUserAccountQuery } from '@sdk/queries/user';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { emwImpersonatedCheckoutCreate, emwSignoutToImpersonatedMode } from '@sdk/mutations/emwImpersonatedMutation';

const Account: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) => {
  const { loading, error, data, refetch, fetchMore } = useQuery(EMWUserAccountQuery, {
    variables: {
      id: localStorage.getItem("emwUserId")
    },
    fetchPolicy: "no-cache"
  });
  const [signOut] = useSignOut();
  const alert = useAlert();
  const isStaffMember = JSON.parse(localStorage.getItem("isStaff"));
  const [emailValue, setEmailValue] = React.useState("")
  const [impersonating, setImpersonating] = React.useState(false)
  const EMWCart = JSON.parse(localStorage.getItem("EMWCart"));
  const contextValue = React.useContext(EMWCartContext);

  const transformSubtotalPrice = (data) => {
    const price = data.emwCheckout.emwTotalPrice && data.emwCheckout.emwTotalPrice.totalItemPrice && data.emwCheckout.emwTotalPrice.totalItemPrice.amount
    return price;
  }
  const [createImpersonatedCheckout] = useMutation(emwImpersonatedCheckoutCreate, {
    onCompleted({ emwImpersonatedCheckoutCreate }) {
      const { token  , user} = emwImpersonatedCheckoutCreate;
      // if (user.emwCheckout.user && user.emwCheckout.user.email) {
        // const email = user.emwCheckout.user.email;
        // if (document.getElementById("helloBar_13kfayjrgswr")) {
        //   document.getElementById("helloBar_13kfayjrgswr").style.display = "none";
        // }
        // localStorage.setItem('ImpersonatedCustomerEmail', email)
        // const price = { emwCheckout: user.emwCheckout };
        // const subTotalPrice = transformSubtotalPrice(price);
        // contextValue.setLines(user.emwCheckout.lines, subTotalPrice);
        // localStorage.setItem("EMWCart", JSON.stringify(user.emwCheckout));
        // overlay.hide();
        // localStorage.removeItem("shippingtemp");
        // localStorage.removeItem("ValidAddressID");
        // localStorage.removeItem("contactInfoTemp");
        // setImpersonating(false);
      // }
      if(token && user){
        if (document.getElementById("helloBar_13kfayjrgswr")) {
              document.getElementById("helloBar_13kfayjrgswr").style.display = "none";
            }
        const email = user.email;
        localStorage.setItem('ImpersonatedCustomerEmail', email);
        const currentUserData = {
          email : localStorage.getItem('userEmailId'),
          id : localStorage.getItem('emwUserId'),
          token : localStorage.getItem('token'),
          cart : localStorage.getItem('EMWCart')
        }
        localStorage.setItem('token',token)
        localStorage.setItem('currentUserData',JSON.stringify(currentUserData))
        localStorage.setItem('emwUserId',user.id)
        localStorage.setItem('userEmailId',user.email)
        overlay.hide();
        setImpersonating(false);

        // const price = { emwCheckout: user.emwCheckout };
        // const subTotalPrice = transformSubtotalPrice(price);
        // contextValue.setLines(user.emwCheckout.lines, subTotalPrice);
        localStorage.setItem("EMWCart", JSON.stringify(user.emwCheckout));
        overlay.hide();
        localStorage.removeItem("shippingtemp");
        localStorage.removeItem("ValidAddressID");
        localStorage.removeItem("contactInfoTemp");
        window.location.reload();
      }

    },
    onError(errors) {
      setImpersonating(false)
      // alert.show(
      //   {
      //     title: "User does not exist",
      //   },
      //   { type: "error", timeout: 2000 }
      // );
      console.log(error, "error")
    },
  });

  const [signOutImpersonatedCheckout] = useMutation(emwSignoutToImpersonatedMode, {
    onCompleted({ token }) {
      // const { emwCheckout } = emwCheckoutCreate;

      // const price = { emwCheckout: emwCheckout };
      // const subTotalPrice = transformSubtotalPrice(price);
      // contextValue.setLines(emwCheckout.lines, subTotalPrice);
      // localStorage.setItem("EMWCart", JSON.stringify(emwCheckout));

      let currentUser = JSON.parse(localStorage.getItem('currentUserData'))
      localStorage.setItem('token',currentUser.token)
      localStorage.setItem('emwUserId',currentUser.id)
      localStorage.setItem('userEmailId',currentUser.email)
      localStorage.setItem('EMWCart',currentUser.cart)

      overlay.hide();
      localStorage.removeItem("shippingtemp");
      localStorage.removeItem("ValidAddressID");
      localStorage.removeItem("contactInfoTemp");
      localStorage.removeItem('ImpersonatedCustomerEmail');
      localStorage.removeItem('currentUserData')
      window.location.reload();
    },
    onError(errors) {
      console.log( "error");
      window.location.reload();
    },
  });

  const handleCustomerImpersonation = () => {
    if(impersonating)
      return
    if (emailValue) {
      setImpersonating(true)
      createImpersonatedCheckout({
        variables: {
          customerEmail: emailValue,
          bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false
        },
      })
    }
  }
  const handleSignoutImpersonatedCustomer = () => {
    // const userEmailId = localStorage.getItem('userEmailId')
    let currentUser = JSON.parse(localStorage.getItem('currentUserData'))
    localStorage.setItem('token',currentUser.token)
    localStorage.setItem('emwUserId',currentUser.id)
    localStorage.setItem('userEmailId',currentUser.email)
    localStorage.setItem('EMWCart',currentUser.cart)

    overlay.hide();
    localStorage.removeItem("shippingtemp");
    localStorage.removeItem("ValidAddressID");
    localStorage.removeItem("contactInfoTemp");
    localStorage.removeItem('ImpersonatedCustomerEmail');
    localStorage.removeItem('currentUserData')
    window.location.reload();
    // signOutImpersonatedCheckout({
    //   variables: {
    //     email: userEmailId
    //   },
    // })
  }
  const loggedOut = (cartAction) => {
    signOut(cartAction);
    overlay.hide();
    if (document.getElementById("helloBar_impersonation")) {
      document.getElementById("helloBar_impersonation").style.display = "none";
    }
    if (document.getElementById("helloBar_13kfayjrgswr")) {
      document.getElementById("helloBar_13kfayjrgswr").style.display = "flex";
    }
    localStorage.removeItem('bypassTax')
    localStorage.removeItem('bypassShipping')
  }
  const customerEmail = localStorage.getItem('ImpersonatedCustomerEmail')
  return (
    <React.Fragment>
      <Overlay context={overlay}>
        <div className="checkout-msg-login">
          <Online>
            <div className="overlay__header">
              <div className="overlay__header-text">Account Actions</div>
              <ReactSVG
                path={closeImg}
                onClick={overlay.hide}
                className="overlay__header__close-icon"
              />
            </div>
            <div className="overlay-account">
              <EMWCartContext.Consumer>
                {cartAction => (
                  <>
                    <p className="userId">You are logged in as {data && data.storefrontUser && data.storefrontUser.email}</p>
                    <ul className="main-menu__dropdown">
                      <li>
                        <Link to={accountUrl}>
                          <Trans id="Account Information" />
                        </Link>
                      </li>
                      <li>
                        <Link to={orderHistoryUrl}>
                          <Trans id="Order history" />
                        </Link>
                      </li>
                      <li>
                        <Link to={addressBookUrl}>
                          <Trans id="Address book" />
                        </Link>
                      </li>
                      <li>
                        <Link to={documentTaxUrl}>
                          <Trans id="Documents and Tax" />
                        </Link>
                      </li>
                      <li>
                        <span onClick={() => { loggedOut(cartAction) }} data-testid="logout-link" className="logout">
                          Log Out
                        </span>
                      </li>
                    </ul>
                    {isStaffMember === true && (<div>
                      <div className="cust-impersonation">
                        <div className="cust-header-title">Customer Impersonation</div>
                        <label>Customer Account Email</label>
                        {customerEmail && customerEmail.length ? <><TextField
                          name="email"
                          autoComplete="Email"
                          placeholder="Email"
                          type="email"
                          value={customerEmail}
                          disabled={true}
                          required
                        />
                          <Button className="cust-impersonation-btn active" onClick={() => { handleSignoutImpersonatedCustomer() }}> Quit Impersonation </Button>
                        </> : <><TextField
                          name="email"
                          autoComplete="Email"
                          placeholder="Email"
                          type="email"
                          onChange={(e) => setEmailValue(e.target.value)}
                          required
                        />
                          <Button disabled={emailValue ? false : true} className="cust-impersonation-btn blue" onClick={() => { handleCustomerImpersonation() }}>{impersonating ? 'Impersonating..' : 'Impersonate Customer'}</Button>
                        </>}
                      </div>
                    </div>)}
                  </>)}
              </EMWCartContext.Consumer>
            </div>
          </Online>
        </div>
      </Overlay>
    </React.Fragment>
  );
}

export default Account;
