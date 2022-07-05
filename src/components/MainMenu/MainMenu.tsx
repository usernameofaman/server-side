import {
  mediumScreen,
  smallScreen
} from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";

import { useSignOut, useUserDetails } from "@sdk/react";
import { History } from "history";
import { Trans } from "@lingui/react";
import React, { useEffect, useState } from "react";
import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { Tooltip } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Popover } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import Toggleicon from "../../images/gearIcon.svg"

import {
  MenuDropdown,
  Offline,
  Online,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "..";

import { history } from '../../history';
import { maybe } from "../../core/utils";
import {
  accountUrl,
  addressBookUrl,
  baseUrl,
  orderHistoryUrl,
  paymentOptionsUrl,
  contactUsUrl
} from "../../routes";
// import { CartContext } from "../CartProvider/context";
import NavDropdown from "./NavDropdown";
import { TypedMainMenuQuery, TypedMainEMWMenuQuery } from "./queries";

import cartImg from "../../images/Cart.svg";
import contactImg from "../../images/contact.svg";
import searchImgD from "../../images/menu-search.svg";
import trackImg from "../../images/track.svg";
import GetAQuote from "../../images/get-a-quote.svg"
import hamburgerHoverImg from "../../images/hamburger-hover.svg";
import hamburgerImg from "../../images/hamburger.svg";
// import logoImg from "../../images/logo.svg";
import logoImg from "../../images/header-logo-md.svg";
import MobilelogoImg from "../../images/mobile-logo.svg";
import loginlogo from "../../images/login-logo.svg";
import searchImg from "../../images/search-mobile.svg";
import userImg from "../../images/emw-user.svg";
import { EMWCartContext } from "../EMWCartProvider/context";
import qs from "query-string"
import TextField from '@material-ui/core/TextField';
import { searchUrl, siteSearchUrl } from "../../routes/index";
import { handleDropdownChange } from "../../views/EMWCheckoutBilling/BillingHandlers";

import GetAQuoteMenu from "../../views/EMWAddToCart/GetAQuoteMenu"
import EMWAutoCompleteSearchBox from "../EMWAutocompleteSearchBox";
import noPhotoImg from "../../images/no-photo.svg";
import { displayNotificationBar } from "../EMWNotificationBar";
import { Thumbnail } from "../../@next/components/molecules";
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { quoteCreateMutation, QuoteUpdateMutation } from '../../@sdk/mutations/emwGetAQuoteMutations';
import { useAlert } from "react-alert";
import EMWGaqModal from '../../components/EMWGaqModal'

const MainMenu: React.FC<{
  overlay: any,
  pathname: any,
}> = ({
  overlay,
  pathname
}) => {
    const { data: user } = useUserDetails();
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    const [signOut] = useSignOut();
    const [topMainMenuHeight, setTopMainMenuHeight] = useState(0);
    const [viewQuote, setviewQuote] = React.useState(false)
    const alert = useAlert();
    const customerEmail = localStorage.getItem('ImpersonatedCustomerEmail');
    useEffect(() => {
      window.addEventListener('click' ,(e) => {
        if(e.target && e.target.id === "bar-button"){
          handleClick(e)
        }
      })
      if(JSON.parse(localStorage.getItem('bypassTax'))===true)
        setBypassTax(false)
      if(JSON.parse(localStorage.getItem('bypassShipping'))===true)
        setBypassShipping(false)
      const details = localStorage.getItem('EMWClearCart');
      if (details && details === "true") {
        localStorage.removeItem('EMWCart');
        localStorage.setItem('EMWClearCart', "false");
      }

      const parsed = qs.parse(window.location.search)
      const isAccountSetup = (window.location.pathname !== "/reset-password/") ? true : false;
      if (parsed.email && parsed.token && isAccountSetup) {
        setTimeout(() => {
          overlay.show(
            OverlayType.register,
            OverlayTheme.right
          )
        }, 1000)
      }
      // if (!customerEmail) displayNotification();
    }, []);

    useEffect(() => {
      if (customerEmail && customerEmail.length) displayNotification();
      // if (!customerEmail) {
      //   if (!document.getElementById("helloBar_13kfayjrgswr")) {
      //     setTopMainMenuHeight(0);
      //   }
      // }
    }, [customerEmail]);

    const displayNotification = () => {
      // display notification bar 
      let emailId = JSON.parse(localStorage.getItem('currentUserData'));
      if(emailId)
        emailId = emailId.email;
      else
        emailId = ""
      const userEmailId = emailId
      const gearIcon = `<img id='bar-button' style="margin: -6px -3px; cursor: pointer;" src="${Toggleicon}" />`
      const customerBannerText = `Agent ${userEmailId} is impersonating customer ${customerEmail}. Close this browser instance when completed. <span class="bypass-menu-toggle" onclick="window.alert("HH")"> ${gearIcon} </span>`
      let bannerText = customerEmail && customerEmail.length ? customerBannerText : "Please be advised that rapid commodity increases are causing most vendors to implement price increases in the 5-10% range throughout the month of July.";
      const hideClose = customerEmail && customerEmail.length ? true : false;
      if ((bannerText !== "" && bannerText !== undefined)) {
        let bgColor = customerEmail && customerEmail.length ? '#B21B0C' : process.env.REACT_APP_NOTIFICATION_BAR_BG_COLOR;
        const id = customerEmail ? 'helloBar_impersonation' : 'helloBar_13kfayjrgswr';
        let bar;
        if(customerEmail && customerEmail.length)
          bar = displayNotificationBar(bannerText, 'top', bgColor, hideClose, id);
        else
          bar = displayNotificationBar(bannerText, 'bottom', bgColor, hideClose, id);

        bar.on("close-bar", () => {
          setTopMainMenuHeight(0);
          const root = document.documentElement;
          root.style.setProperty("--helloBarHeight", `0px`);
        });
        setTimeout(function () {
          const barContainer = document.querySelector('.hello-bar');
          let topHeight = 0;
          if (barContainer && barContainer.clientHeight) {
            topHeight = barContainer.clientHeight;
            setTopMainMenuHeight(barContainer.clientHeight);
          }
          const root = document.documentElement;
          let height = topHeight.toString();
          let blackdropHeight = ((topHeight + 80).toString());
          root.style.setProperty("--helloBarHeight", `${height}px`);
          root.style.setProperty("--helloBarHeightBlackDropHeight", `${blackdropHeight}px`);
        }, 1000);
      } else {
        const root = document.documentElement;
        root.style.setProperty("--helloBarHeight", `0px`);
        root.style.setProperty("--helloBarHeightBlackDropHeight", `80px`);
      }
    }
    const [search, setsearch] = useState("");
    const [openMobileSeachFlag, setOpenMobileSeachFlag] = useState(false);

    const handleSubmit = (evt: React.FormEvent) => {
      evt.preventDefault();
      if (search !== "") {
        history.push(`${siteSearchUrl}?term=${search}`);
      }
    };
    const handleMobileSearch = (overlayContext) => {
      if (openMobileSeachFlag) {
        overlayContext.hide();
        setOpenMobileSeachFlag(false);
      } else {
        overlayContext.show(OverlayType.search, OverlayTheme.top)
        setOpenMobileSeachFlag(true);
      }
    }
    const onMenuClick = (url) => {
      history.push(url);
    }
    const [checkoutCreate] = useMutation(quoteCreateMutation, {
      onCompleted({ emwQuoteCreate }) {
        if (emwQuoteCreate.errors.length === 0) {
          localStorage.setItem("EMWQuote", JSON.stringify(emwQuoteCreate.emwQuote));
          setviewQuote(true)
        } else {
          alert.show({ title: emwQuoteCreate.errors[0].message, }, { type: "error" });
        }

      },
      onError(errors) {
        alert.show({ title: "Something went wrong!", }, { type: "error" });
      }
    });

    const addToQuote = () => {
      let isQuoteExist = JSON.parse(localStorage.getItem('EMWQuote'));
      if (isQuoteExist && Object.keys(isQuoteExist).length) {
        setviewQuote(true)
      } else {
        checkoutCreate({
          variables: {
            input: {
              lines: []
            }
          }
        })
      }
    }
    const ToBeStyledTooltip = ({ className, ...props }: TooltipProps) => (
      <Tooltip {...props} classes={{ tooltip: className }} />
    );
    const StyledTooltip = styled(ToBeStyledTooltip)(({ theme }) => ({
      backgroundColor: '#25282B',
      "& .MuiTooltip-arrow": {
        color: "#25282B"
      }
    }));

    const accountUrl = ['/account/',
      '/order-history/',
      '/address-book/',
      '/document-tax/'];

      // document.getElementById("bar-button").addEventListener("touchstart", touchHandler, false);
      // function touchHandler(e) {
      //     window.alert("You touched the screen!");
      // }

    const [bypassShipping, setBypassShipping] = React.useState(true)
    const [bypassTax, setBypassTax] = React.useState(true)
    const onBypassTax = (e) => {
      setBypassTax(e)
      localStorage.setItem('bypassTax',JSON.stringify(!e))
    }
    const onBypassShipping = (e) => {
      setBypassShipping(e)
      localStorage.setItem('bypassShipping',JSON.stringify(!e))
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.target);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
      <React.Fragment>
        <OverlayContext.Consumer>
          {overlayContext => (
            <nav style={{ "background": "#E5E5E5", "top": topMainMenuHeight }} className="main-menu emw-main-menu headerBgColor" id="header">
                  <div className="main-menu__left emw-main-menu-left">
                    {/* This would handle the automatic opening of sign-in sidebar if user is not logged in */}
                    {/* {
                    localStorage.getItem("openLoginBar") ? overlayContext.show(
                      OverlayType.login,
                      OverlayTheme.right
                    ) : ""
                  } */}
                    {/* This would handle the automatic opening of sign-in sidebar if user is not logged in */}
                    <span className="burgerSpacer">
                      <TypedMainMenuQuery renderOnError displayLoader={false}>
                        {({ data }) => {
                          const items = maybe(() => data.shop.navigation.main.items, []);
                          const filterOutItems = maybe(() => (items).filter(item => (item.name !== "Premium LED Lighting")), []);
                          return (
                            <React.Fragment>
                              <ul>
                                {/* <Media
                            query={{ maxWidth: mediumScreen }}
                            render={() => ( */}
                                <li
                                  className={overlayContext.type === "side-nav" ? "main-menu__hamburger active" : "main-menu__hamburger"}
                                  onClick={() =>
                                    overlayContext.type === "side-nav" ?
                                      overlayContext.hide()
                                      : overlayContext.show(
                                        OverlayType.sideNav,
                                        OverlayTheme.left,
                                        { data: filterOutItems }
                                      )
                                  }
                                >
                                  <ReactSVG
                                    path={hamburgerImg}
                                    className={"main-menu__hamburger--icon"}
                                  />
                                </li>
                                {/* )}
                          /> */}
                              </ul>
                            </React.Fragment>
                          );
                        }}
                      </TypedMainMenuQuery>
                    </span>
                    <Media
                      query={{ maxWidth: mediumScreen }}
                      render={() =>
                        <span onClick={() => handleMobileSearch(overlayContext)}>
                          <ReactSVG
                            className={overlayContext.type === "search" ? "mobile-search-icon active" : "mobile-search-icon"}
                            path={searchImg}
                          />
                        </span>
                      }
                    />
                    <Media
                      query={{ minWidth: mediumScreen }}
                      render={() =>
                        <Link to={baseUrl}>
                          <img src={logoImg} alt="logo" className="logo-max-height" />
                        </Link>
                      }
                    />
                  </div>

                  <div className="main-menu__center emw-main-menu-center">
                    <Media
                      query={{ maxWidth: mediumScreen }}
                      render={() =>
                        <Link to={baseUrl}>
                          <ReactSVG path={MobilelogoImg} />
                        </Link>
                      }
                    />

                    <Media
                      query={{ minWidth: mediumScreen }}
                      render={() =>
                        <React.Fragment>
                          <EMWAutoCompleteSearchBox />
                          {/* <div className="search-container">
                        <form
                          onClick={e => e.stopPropagation()}
                          onSubmit={handleSubmit}
                        >
                          <TextField
                            onChange={evt => setsearch(evt.target.value)}
                            value={search}
                            autoFocus={true}
                            variant="outlined"
                            placeholder="Search"
                          />
                          <span onClick={handleSubmit}><ReactSVG className="emw-menu-search" path={searchImgD} /></span>
                        </form>
                      </div> */}
                        </React.Fragment>
                      }
                    />
                  </div>

                  <div className="main-menu__right emw-main-menu-right">
                    <ul>
                      {/* <GetAQuoteMenu mainMenu={true} /> */}
                      <>
                        <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                        >
                          <div className="popover-options">
                            <div className="popover-hover">
                              Impersonation Options
                            </div>
                            <div className="popover-hover" onClick={() => onBypassShipping(!bypassShipping)
                            }>
                            <Checkbox
                              checked={bypassShipping}
                              // onChange={(event) => onBypassShipping(event)}
                              name="bypassShipping"
                              classes={{ root: 'customcheckboxBorder' }}
                              style ={{
                                  color: "#9FAEC1",
                                  marginRight:"5px"
                              }}
                            />
                              Calculate shipment
                            </div>
                            <div className="popover-hover"  onClick={() => onBypassTax(!bypassTax)}>
                            <Checkbox
                              checked={bypassTax}
                              // onChange={(event) => onBypassTax(event)}
                              name="bypassTax"
                              classes={{ root: 'customcheckboxBorder' }}
                              style ={{
                                  color: "#9FAEC1",
                                  marginRight:"5px"
                              }}
                            />
                              Calculate taxes
                            </div>
                          </div>
                        </Popover>
                      </>
                      {
                        !viewQuote && <EMWCartContext.Consumer>
                          {
                            value => {
                              return (
                                <StyledTooltip title={<p className="tooltip">Get A Quote</p>} placement="bottom" arrow>
                                  <li
                                    className={overlayContext.type === "cart" ? "main-menu__icon__active main-menu__cart remove-quote" : "main-menu__icon main-menu__cart remove-quote"}
                                    onClick={() => {
                                      addToQuote();
                                    }}
                                  >
                                    <ReactSVG path={GetAQuote} />
                                  </li>
                                </StyledTooltip>
                              )
                            }

                          }
                        </EMWCartContext.Consumer>
                      }
                      <Online>
                        <Media
                          query={{ minWidth: mediumScreen }}
                          render={() =>
                            <StyledTooltip title={<p className="tooltip">Contact</p>} placement="bottom" arrow>
                              <li className={pathname === contactUsUrl ? "main-menu__icon__active main-menu__cart" : "main-menu__icon main-menu__cart"}>
                                <Link to={contactUsUrl}>
                                  <ReactSVG path={contactImg} />
                                </Link>
                              </li>
                            </StyledTooltip>
                          }
                        />




                        {
                          <EMWCartContext.Consumer>
                            {
                              value => {
                                return (
                                  <StyledTooltip title={<p className="tooltip">Cart</p>} placement="bottom" arrow>
                                    <li
                                      className={overlayContext.type === "cart" ? "main-menu__icon__active main-menu__cart" : "main-menu__icon main-menu__cart"}
                                      onClick={() => {
                                        overlayContext.show(
                                          OverlayType.cart,
                                          OverlayTheme.right
                                        );
                                      }}
                                    >
                                      <ReactSVG path={cartImg} />
                                      {
                                        value.items > 0 ? (
                                          <span className="main-menu__cart__quantity bag-item-count">
                                            {value.items}
                                          </span>
                                        ) : null
                                      }
                                    </li>
                                  </StyledTooltip>
                                )
                              }

                            }
                          </EMWCartContext.Consumer>
                        }
                        <Media
                          query={{ minWidth: mediumScreen }}
                          render={() =>
                            <StyledTooltip title={<p className="tooltip">Track Shipment</p>} placement="bottom" arrow>
                              <li className="main-menu__icon main-menu__cart">
                                <Link to={'/orders'}><ReactSVG path={trackImg} /></Link>
                              </li>
                            </StyledTooltip>
                          }
                        />
                        {
                          <EMWCartContext.Consumer>
                            {cartAction =>
                            (
                              // <Media
                              //   query={{ minWidth: smallScreen }}
                              //   render={() => (
                              //     <>
                              user || loggedIn ? (
                                <>
                                  <StyledTooltip title={<p className="tooltip">Account</p>} placement="bottom" arrow>
                                    <li
                                      //data-testid="login-btn"
                                      className="main-menu__icon main-menu__cart"
                                      onClick={() => {
                                        overlayContext.show(
                                          OverlayType.account,
                                          OverlayTheme.right
                                        )
                                      }
                                      }
                                    >
                                      <ReactSVG path={userImg} />
                                    </li>
                                  </StyledTooltip>
                                </>
                                // <MenuDropdown
                                //   head={
                                //     <li className="main-menu__icon main-menu__user--active">
                                //       <ReactSVG path={userImg} />
                                //     </li>
                                //   }
                                //   content={
                                //     <ul className="main-menu__dropdown">
                                //       <li>
                                //         <Link to={accountUrl}>
                                //           <Trans id="My Account" />
                                //         </Link>
                                //       </li>
                                //       <li>
                                //         <Link to={orderHistoryUrl}>
                                //           <Trans id="Order history" />
                                //         </Link>
                                //       </li>
                                //       <li>
                                //         <Link to={addressBookUrl}>
                                //           <Trans id="Address book" />
                                //         </Link>
                                //       </li>
                                //       {/* <li>
                                //           <Link to={paymentOptionsUrl}>
                                //             Payment options
                                //                         </Link>
                                //         </li> */}
                                //       <li onClick={() => signOut(cartAction)} data-testid="logout-link">
                                //         Log Out
                                //                       </li>
                                //     </ul>
                                //   }
                                // />
                              ) : (
                                <StyledTooltip title={<p className="tooltip">Account</p>} placement="bottom" arrow>
                                  <li
                                    data-testid="login-btn"
                                    className="main-menu__icon main-menu__cart"
                                    onClick={() => {
                                      localStorage.setItem("ischeckedIn", "false")
                                      overlayContext.show(
                                        OverlayType.login,
                                        OverlayTheme.right
                                      )
                                    }
                                    }
                                  >
                                    <ReactSVG path={userImg} />
                                  </li>
                                </StyledTooltip>
                              )
                              // </>
                              //  )}
                              // />
                            )
                            }
                          </EMWCartContext.Consumer>
                        }
                      </Online>
                      <Offline>
                        <li className="main-menu__offline">
                          <Media
                            query={{ minWidth: mediumScreen }}
                            render={() => <span>Offline</span>}
                          />
                        </li>
                      </Offline>
                    </ul>
                  </div>
            </nav>
          )}
        </OverlayContext.Consumer>
        <Media
          query={{ minWidth: mediumScreen }}
          render={() =>
            <nav className={`main-menu emw-main-menu-height ${accountUrl.includes(history.location.pathname) ? 'display-none' : 'display-flex'}`} id="header">
              <div className="main-menu__left emw-menu-for-desktop" >
                <TypedMainEMWMenuQuery renderOnError displayLoader={false}>
                  {({ data }) => {
                    const items = maybe(() => data.shop.navigation.main.items, []);

                    return (
                      <ul>
                        <Media
                          query={{ minWidth: mediumScreen }}
                          render={() =>
                            items.map(item => {
                              return (
                                (item.name !== "Premium LED Lighting") &&
                                <div
                                  key={Math.random()}
                                  className='menu-cursor'
                                  onClick={() => onMenuClick(`/${item.emwcategory.emwCatSesurl}`)}
                                >
                                  <li className="main-menu__item" key={item.id}>
                                    <NavDropdown overlay={null} {...item} />
                                  </li>
                                </div>
                              )
                            })
                          }
                        />
                      </ul>
                    );
                  }}
                </TypedMainEMWMenuQuery>
              </div>
            </nav>

          }
        />
        <Media
          query={{ maxWidth: mediumScreen }}
          render={() =>
            <nav className={`main-menu emw-mobile-menu ${accountUrl.includes(history.location.pathname) ? 'display-none' : 'display-flex'}`} id="header">
              <div className="main-menu__left " >
                <TypedMainEMWMenuQuery renderOnError displayLoader={false}>
                  {({ data }) => {
                    const items = maybe(() => data.shop.navigation.main.items, []);

                    return (
                      <ul>
                        <Media
                          query={{ maxWidth: mediumScreen }}
                          render={() =>
                            items.map(item => {
                              return (
                                (item.name !== "Premium LED Lighting") &&
                                <li className="emw-mobile-menu-item" key={item.id}>
                                  <Link to={`/${item.emwcategory.emwCatSesurl}`}>
                                    {
                                      (item.emwcategory.emwCatImageUrl !== null || item.emwcategory.emwCatImageUrl !== "") ?
                                        <Thumbnail source={{ thumbnail: { url: process.env.REACT_APP_CLOUDFRONT_URL + item.emwcategory.emwCatImageUrl, alt: "" } }} />
                                        :
                                        <Thumbnail source={item.emwcategory} />
                                    }
                                    <span>{item.name}</span>
                                  </Link>
                                </li>
                              )
                            })
                          }
                        />
                      </ul>
                    );
                  }}
                </TypedMainEMWMenuQuery>
              </div>
            </nav>

          }
        />
        {
          viewQuote ?
            <EMWGaqModal
              Mopen={viewQuote}
              hide={() => setviewQuote(false)}
            />
            :
            <></>
        }
      </React.Fragment>
    );
  };

export default MainMenu;
