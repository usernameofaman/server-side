import "./scss/index.scss";

import React, { useState, useEffect, useContext } from "react";
// import ReactSVG from "react-svg";
import shippingIco from '../../../images/shippingIco.svg'

import minusIcon from '../../../images/minus-icon.png';
import plusIcon from '../../../images/plus-icon.png';
// import Loader from "../../../components/Loader";
import TextField from '@material-ui/core/TextField';
import ReactSVG from "react-svg";
// import closeImg from "../../../images/x.svg";
import deleteIcon from "../../../images/deleteIcon.png";
// import DeleteIcon from '@material-ui/icons/Delete';
import { CartCheckoutDetailsQuery } from '../../../@sdk/queries/emwAddToCartQueries';
import { checkoutUpdateMutation, checkoutDeleteMutation } from '../../../@sdk/mutations/emwAddToCartMutations';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import Empty from "./Empty";
// import Loader from "../../../components/Loader";
import loader from '../../../images/emw-loader.svg'

import { EMWCartContext } from "../../../components/EMWCartProvider/context";
// import { Link } from "react-router-dom";
import { history } from '../../../history';
import { OverlayContext } from '../../../components/Overlay';

import logo from "../../../images/logo-mini-cart.png";
import leftArrow from "../../../images/leftArrow.png";
import downArrow from "../../../images/Shape.png";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ErrorModal from '../ErrorModal';

// Shipping Import
import { Modal } from "@components/organisms";
import EMWModal from "../../EMWModal/EMWModal";
import EMWModalSignOut from "../../EMWModal/EMWModalSignOut";
// import { GetEMWShippingMethods } from '../../../@sdk/queries/emwAddToCartQueries';
import { Thumbnail } from "../../../@next/components/molecules";
import { cartExpiredMessage } from "../../../constants";
import {
  Overlay,
  OverlayTheme,
  OverlayType
} from "../..";
import { transformSubtotalPrice } from './handlers';
import noPhotoImg from "../../../images/no-photo.svg";
import { GARemoveToCart } from "../../../utils/Google-Analytics";
import { useAlert } from "react-alert";

interface EMWCartProps {
  data: any,
  user: any,
}

const EMWCart: React.FC<EMWCartProps> = (props) => {
  const { data, user } = props;
  const alert = useAlert();
  const localData = JSON.parse(localStorage.getItem('EMWCart'));
  const loggedIn = localStorage.getItem('loggedIn') ? true : false;
  // let cartDetails="";
  const [cartDetails, setCartDetails] = useState(null);
  const [startLoader, setStartLoader] = useState(false);
  const [cartFunction, setCartFunction] = useState(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [userName, setUserName] = useState(null);

  const [viewShipping, setviewShipping] = useState(false);
  const [deletedItemDetails, setDeletedItemDetails] = useState(null);
  const subTotal = cartDetails && cartDetails.emwTotalPrice && cartDetails.emwTotalPrice.totalItemPrice && cartDetails.emwTotalPrice.totalItemPrice.amount && cartDetails.emwTotalPrice.totalItemPrice.amount.toFixed(2);

  const contextValue = useContext(EMWCartContext);

  useEffect(() => {
    const name = user && user.firstName;
    if (name) {
      setUserName(name);
    } else {
      setUserName(false);
    }
  }, [user]);

  const [fetchCartData] = useLazyQuery(CartCheckoutDetailsQuery, {
    fetchPolicy: 'network-only',
    onCompleted({ emwCheckout }) {
      if (emwCheckout) {
        setCartDetails(emwCheckout);
        const price = { emwCheckout: emwCheckout };
        const subTotalPrice = transformSubtotalPrice(price);
        contextValue.setLines(emwCheckout.lines, subTotalPrice);
        localStorage.setItem("EMWCart", JSON.stringify(emwCheckout));
      } else {
        contextValue.setLines([], 0);
      }
      setStartLoader(false);
    },
    onError(error) {
      setStartLoader(false);
      setCartDetails(localData);
    },
  });

  const [checkoutUpdate] = useMutation(checkoutUpdateMutation, {
    onCompleted({ emwCheckoutLinesAdd }) {
      if (emwCheckoutLinesAdd.errors.length === 0) {
        localStorage.setItem("EMWCart", JSON.stringify(emwCheckoutLinesAdd.emwCheckout));
        const subTotalPrice = transformSubtotalPrice(emwCheckoutLinesAdd);
        cartFunction.setLines(emwCheckoutLinesAdd.emwCheckout.lines, subTotalPrice);
        setCartDetails(emwCheckoutLinesAdd.emwCheckout);
      } else {
        alert.show({ title: emwCheckoutLinesAdd.errors[0].message }, { type: "error" });
        if (emwCheckoutLinesAdd.errors[0].message === cartExpiredMessage) {
          setErrorModalOpen(true);
          setErrorMessage(cartExpiredMessage);
        }
      }
    },
    onError(errors) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });

  const [checkoutDelte] = useMutation(checkoutDeleteMutation, {
    onCompleted({ emwChecoutLineDelete }) {
      if (emwChecoutLineDelete.errors.length === 0) {
        if (emwChecoutLineDelete.emwCheckout && emwChecoutLineDelete.emwCheckout.lines && emwChecoutLineDelete.emwCheckout.lines.length === 0)
          localStorage.removeItem("EMWCart")
        else
          localStorage.setItem("EMWCart", JSON.stringify(emwChecoutLineDelete.emwCheckout));
        const subTotalPrice = transformSubtotalPrice(emwChecoutLineDelete);
        cartFunction.setLines(emwChecoutLineDelete.emwCheckout.lines, subTotalPrice);
        setCartDetails(emwChecoutLineDelete.emwCheckout);
        setStartLoader(false);

        //  GA Remove From Cart
        if (deletedItemDetails) {
          GARemoveToCart({
            'id': deletedItemDetails.id,
            "name": deletedItemDetails.product && deletedItemDetails.product.name,
            "quantity": deletedItemDetails.quantity,
          });
        }
      } else {
        alert.show({ title: emwChecoutLineDelete.errors[0].message }, { type: "error" });
        setStartLoader(false);
        if (emwChecoutLineDelete.errors[0].message === cartExpiredMessage) {
          setErrorModalOpen(true);
          setErrorMessage(cartExpiredMessage);
        }
      }

    },
    onError(errors) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
      setStartLoader(false);
    },
  });


  useEffect(() => {
    if (data) {
      setCartDetails(data);
    } else {
      if (localData && localData.token) {
        setStartLoader(true);
        fetchCartData({
          variables: {
            tokenId: localData.token,
            bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false,
            bypassShipping :  JSON.parse(localStorage.getItem('bypassShipping')) || false
          },
        });
      }
    }
  }, [data]);

  const updateCartDetails = (index, newQuant, oldQuant) => {
    const overAllCartData = cartDetails;
    const lineData = cartDetails.lines[index];
    const optionIdArray = [];
    if (lineData.productOptions && lineData.productOptions.length > 0) {
      lineData.productOptions.map(item => {
        return optionIdArray.push(item.productOption.id);
      });
    }
    if (newQuant !== oldQuant) {
      checkoutUpdate({
        variables: {
          checkOutId: overAllCartData.id,
          // quantity: lineData.quantity,
          quantity: newQuant - oldQuant,
          prodId: lineData.product.id,
          optionsId: optionIdArray,
          bypassTax: JSON.parse(localStorage.getItem('bypassTax')) || false
        },
      })
    }
  }

  const deleteCheckout = (lineId, cartAction, item) => {

    const overAllCartData = cartDetails;
    setCartFunction(cartAction);
    setDeletedItemDetails(item);
    // Here
    checkoutDelte({
      variables: {
        checkOutId: overAllCartData.id,
        lineId,
      },
    })
    setStartLoader(true);
  }

  const handleOnChanges = (event, index, cartAction) => {
    setCartFunction(cartAction);
    const cartTempData = { ...cartDetails };
    const newQuantity = event.target.value;
    cartTempData.lines[index].quantity = newQuantity;
    setCartDetails(cartTempData);
  }

  const onBlurHandler = (event, index) => {
    const cartTempData = { ...cartDetails };
    const prodMinQuantity = cartTempData.lines[index].product.minimumQuantity;
    const newQuantity = event.target.value;
    const oldQuantity = localData && localData.lines && localData.lines[index].quantity;
    // setOldProdQuantity(oldQuantity);

    if (newQuantity <= prodMinQuantity) {
      cartTempData.lines[index].quantity = prodMinQuantity;
    } else if (newQuantity >= 100) {
      cartTempData.lines[index].quantity = 100;
    }
    else {
      cartTempData.lines[index].quantity = newQuantity;
    }
    setCartDetails(cartTempData);
    const quantity = cartTempData.lines[index].quantity;
    if (quantity !== oldQuantity) {
      updateCartDetails(index, quantity, oldQuantity);
    }
  }

  const onMinusHandler = (index, cartAction) => {
    const cartTempData = { ...cartDetails };
    const prodMinQuantity = cartTempData.lines[index].product.minimumQuantity;
    const oldQuantity = cartTempData.lines[index].quantity;
    const lineData = cartDetails.lines[index];
    let newQuantity = --lineData.quantity;
    if (newQuantity <= prodMinQuantity) {
      cartTempData.lines[index].quantity = prodMinQuantity;
      newQuantity = prodMinQuantity;
    } else {
      cartTempData.lines[index].quantity = newQuantity;
    }
    setCartDetails(cartTempData);
    setCartFunction(cartAction);
    updateCartDetails(index, newQuantity, oldQuantity);

  }

  const onPlusHandler = (index, cartAction) => {
    const cartTempData = { ...cartDetails };
    const prodMinQuantity = cartTempData.lines[index].product.minimumQuantity;
    const oldQuantity = cartTempData.lines[index].quantity;
    const lineData = cartDetails.lines[index];
    let newQuantity = ++lineData.quantity;
    if (newQuantity >= 100) {
      cartTempData.lines[index].quantity = 100;
      newQuantity = 100;
    } else {
      cartTempData.lines[index].quantity = newQuantity;
    }
    setCartDetails(cartTempData);
    setCartFunction(cartAction);
    updateCartDetails(index, newQuantity, oldQuantity);
  }

  const proccedToCheckoutHandler = (overlayContext) => {
    overlayContext.hide();
    // history.push('/cart');
  }

  const fixDecimalValues = (val) => {
    if (typeof (val) === "number")
      return val.toFixed(0)
    return val
  }
  const anonumousLoginIn = JSON.parse(localStorage.getItem('anonumousLoginIn'))
  return (
    <>
      {
        startLoader ?
          <div className="loader-wrapper">
            <ReactSVG path={loader} className="medium-size-loader" />
          </div>
          :
          cartDetails && cartDetails.lines.length > 0 ?
            <React.Fragment>
              <EMWCartContext.Consumer>
                {
                  cartAction => (
                    <div className="minicart-page">
                      {/* {
                        userName &&
                        <div className="logged-in-name">
                          <img src={logo} width="40px" />
                          <p className="logo-user-name">Welcome back <span>,{userName}!</span></p>
                        </div>
                      } */}

                      {
                        cartDetails && cartDetails.lines.length > 0 && cartDetails.lines.map((item, index) => {
                          return (
                            <div className="bottom-space-add" key={index}>


                              <div className="product-page-details_block">
                                <div className="product-page-details-container-details">
                                  <div className="product-name-wrapper">
                                    <div className="product-page-details-container-image bottom-space-add">
                                      <div className="product-image">
                                        {/* {item.product.emwProdImages && item.product.emwProdImages.edges.length !== 0 ?
                                          <img src={process.env.REACT_APP_CLOUDFRONT_URL + item.product.emwProdImages.edges[0].node.emwImageUrlPrfix + item.product.emwProdImages.edges[0].node.emwImageName}></img>
                                          : <img src={noPhotoImg}></img>
                                        } */}
                                        {item.product.emwProdImages && item.product.emwProdImages.edges.length ? <Thumbnail source={{ thumbnail: { url: process.env.REACT_APP_CLOUDFRONT_URL + item.product.emwProdImages.edges[0].node.emwImageUrlPrfix + item.product.emwProdImages.edges[0].node.emwImageName } }} /> : <Thumbnail source={item.product} />}
                                      </div>
                                      {/* <div className="price-description">
                                      <div className="std-price">
                                        <p >Standard Price:</p>
                                        <p className="product-price-msrp">{item.product.aggregateMapPrice ? `$${item.product.aggregateMapPrice.amount}` : "N/A"}</p>
                                      </div>
                                      {
                                        loggedIn ?
                                          <div className="advantage-price">
                                            <p>Your Advantage Price:</p>
                                            <p >{item.product.aggregateSellPrice ? `$${item.product.aggregateSellPrice.amount}` : "N/A"}</p>
                                          </div>
                                          :
                                          <div>
                                            <a className="product-page-better-pricing">How Can I get better pricing?</a>
                                          </div>
                                      }

                                    </div> */}
                                      <div className="productNameWrp">
                                        <p className="product-name-heading">{item.product.name}</p>
                                      </div>
                                    </div>



                                    <div>
                                      <p className="item-heading">(Item #: {item.product.emwProdVendorPartnumber})</p>
                                      {item.product.weight &&
                                        <p className="product-shipping-weight item-heading">Weight : {fixDecimalValues(item.product.weight.value) + " " + item.product.weight.unit}</p>}
                                      {item.product.emwProdLength &&
                                        <p className="product-dimensions-details item-heading">Dimensions(LXWXH) :
                                          <span className="item-dimension-length">
                                            {fixDecimalValues(item.product.emwProdLength.value)}
                                          </span>X
                                          <span className="item-dimension-width">
                                            {fixDecimalValues(item.product.emwProdWidth.value)}
                                          </span>X
                                          <span className="item-dimension-height">
                                            {fixDecimalValues(item.product.emwProdHeight.value)}
                                          </span> {item.product.emwProdHeight.unit}</p>}
                                      <p className="item-category" style={{ display: "none" }}>
                                        {item.product.category ? item.product.category.name : ""}
                                      </p>
                                      <p className="item-brand" style={{ display: "none" }}>
                                        {item.product.emwProdVendorid ? item.product.emwProdVendorid.emwVendorName : ""}
                                      </p>
                                      <p className="item-url" style={{ display: "none" }}>
                                        {item.product.emwProdSesurl ? item.product.emwProdSesurl : ""}
                                      </p>
                                      <p className="item-country-of-origin" style={{ display: "none" }}>
                                        
                                      </p>
                                      <p className="item-hs-code" style={{ display: "none" }}>
                                        {item.product.emwProdHsCode ? item.product.emwProdHsCode : ""}
                                        </p>
                                    </div>
                                    <div className="advantage-price">
                                      <p >{item.unitPrice && item.unitPrice.amount ? `$${item.unitPrice.amount.toFixed(2)}` : "N/A"}</p>
                                    </div>
                                    <div className="qty_wrp">
                                      <div className="product-page-details product-page-cart-buttons">
                                        <div className="product-page-add-quantity quantity-field">
                                          <button className="product-page-add-quantity-symbol" onClick={() => onMinusHandler(index, cartAction)}>
                                            <img src={minusIcon} alt="" />
                                          </button>
                                          <span className="product-page-add-quantity-number">
                                            <TextField
                                              id="standard-number"
                                              label=""
                                              type="tel"
                                              InputLabelProps={{
                                                shrink: true,
                                              }}
                                              classes={{ root: 'add-cart-quantity-text' }}
                                              onChange={(event) => handleOnChanges(event, index, cartAction)}
                                              onBlur={(event) => onBlurHandler(event, index)}
                                              name="quantity"
                                              value={item.quantity}
                                            />
                                          </span>
                                          <button className="product-page-add-quantity-symbol" onClick={() => onPlusHandler(index, cartAction)}>
                                            <img src={plusIcon} alt="" />
                                          </button>

                                        </div>
                                        <div className='cart-delete-icon' onClick={() => deleteCheckout(item.id, cartAction, item)}>
                                          <img src={deleteIcon} width="25" className="overlay__header__close-icon" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    {
                                      item.productOptions && item.productOptions.length > 0 &&
                                      <ExpansionPanel className="miniCart-expansion">
                                        <ExpansionPanelSummary
                                          expandIcon={
                                            <img src={downArrow} alt="" />
                                          }
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                        >
                                          <Typography className="miniCart-exp-heading">OPTIONS</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                          {
                                            item.productOptions && item.productOptions.length > 0 && item.productOptions.map((optionsItem, index) => {
                                              if (optionsItem && optionsItem.productOption && optionsItem.productOption.emwOptName !== "NONE")
                                                return (
                                                  <div className="mb-12" key={index}>
                                                    <p className="option-heading">{optionsItem.productOption.emwOptOptgrpid.emwOptgrpName}: {optionsItem.productOption.emwOptName}</p>
                                                    <p className="item-heading option-item-heading">(Item #: {optionsItem.productOption.emwOptStocknumber})</p>
                                                    <p className="item-heading option-item-price">Price - ${optionsItem.productOption.emwOptPrice.amount} </p>
                                                  </div>
                                                )
                                            })
                                          }
                                        </ExpansionPanelDetails>
                                      </ExpansionPanel>
                                    }
                                  </div>
                                  <div className="mini-cart-main-block">
                                    {
                                      (item.product.emwProdIsFreeship && !item.product.emwProdIsInformational) &&
                                      <div className="mini-cart-shipping-banner mt-fix-0">
                                        <div className="product-page_shipping-image_block">
                                          <img className="product-page_shipping-image" src={shippingIco} />
                                        </div>
                                        <div className="product-page_shipping-description-block">
                                          <p className="product-page_shipping-description">FREE Ground Shipping to Continental USA!</p>
                                        </div>
                                      </div>
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }

                      {
                        cartDetails && cartDetails.lines && cartDetails.emwTotalPrice &&
                        <>
                          <div className="button-fields-container bottom-space-add">
                            <div className="subtotal-heading">
                              SUBTOTAL
                            </div>
                            <div className="subtotal-price-heading">
                              ${subTotal}
                            </div>
                          </div>

                          <div className="button-fields-container bottom-space-add cart-footer">
                            <OverlayContext.Consumer>
                              {
                                overlayContext => (
                                  <div className="keep-shopping keep-shopping-pointer" onClick={() => proccedToCheckoutHandler(overlayContext)}>
                                    {
                                      /*<Link to='/cart'>
                                        <button>PROCCED TO MY CART</button>
                                      </Link>*/
                                    }
                                    {/* <button onClick={()=>proccedToCheckoutHandler(overlayContext)}>PROCCED TO MY CART</button>
             */}

                                    <img src={leftArrow} />
                                    <p>KEEP SHOPPING</p>
                                  </div>
                                )
                              }
                            </OverlayContext.Consumer>
                            <OverlayContext.Consumer>
                              {
                                overlayContext => (
                                  <div className="product-page-addToCart">
                                    <button
                                      onClick={() => {
                                        localStorage.setItem("checkoutLocked", "False")
                                        setviewShipping(true)
                                        // localStorage.setItem("checkoutLocked", "True")
                                      }
                                        // : () =>
                                        //   overlayContext.show(
                                        //     OverlayType.checkoutmsg,
                                        //     OverlayTheme.right
                                        //   )
                                      }>SECURE CHECKOUT</button>
                                  </div>
                                )
                              }
                            </OverlayContext.Consumer>

                          </div>
                        </>
                      }
                    </div>
                  )
                }
              </EMWCartContext.Consumer>
              {loggedIn ? <OverlayContext.Consumer>
                {
                  overlayContext => (<>
                    {anonumousLoginIn ?
                      <EMWModalSignOut step={3} Mopen={viewShipping} overlayContext={overlayContext} hide={() => setviewShipping(false)} /> :
                      <EMWModal step={1} overlayContext={overlayContext} Mopen={viewShipping} hide={() => setviewShipping(false)} />}
                  </>)
                }
              </OverlayContext.Consumer> :
                <OverlayContext.Consumer>{
                  overlayContext => (
                    <EMWModalSignOut step={1} Mopen={viewShipping} overlayContext={overlayContext} hide={() => setviewShipping(false)} />
                  )}</OverlayContext.Consumer>}
            </React.Fragment>
            :
            <OverlayContext.Consumer>
              {
                overlayContext => (
                  <Empty overlayHide={() => overlayContext.hide()} />
                )
              }
            </OverlayContext.Consumer>
      }
      <ErrorModal body={errorMessage} setErrorModalOpen={setErrorModalOpen} open={errorModalOpen} handleClose={() => setErrorModalOpen(!errorModalOpen)} />
    </>
  );
};

export default EMWCart;
