import "./scss/index.scss";

import * as React from "react";
import { generatePath, Link } from "react-router-dom";
import ReactSVG from "react-svg";
// import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useUserDetails } from "@sdk/react";

import {
  Button,
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface
} from "../..";
import { baseUrl as checkoutUrl } from "../../../checkout/routes";
import { maybe } from "../../../core/utils";
import { cartUrl, checkoutLoginUrl } from "../../../routes";
import { TypedProductVariantsQuery } from "../../../views/Product/queries";
import { CartContext } from "../../CartProvider/context";
import { extractCartLines, getTotal } from "../../CartProvider/utils";
import { Error } from "../../Error";
import Loader from "../../Loader";
import { ShopContext } from "../../ShopProvider/context";
import Empty from "../EMWCart/Empty";
import ProductList from "./ProductList";

import closeImg from "../../../images/login-close.svg";
import EMWCart from '../EMWCart';
import { EMWCartContext } from "../../EMWCartProvider/context";
import cartImg from "../../../images/Cart.svg";

const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
  const { data: user } = useUserDetails();
  const cardDetail=JSON.parse(localStorage.getItem('EMWCart'));
  const cartData=overlay.context && overlay.context.data ? overlay.context.data : null;
  return (
    <Overlay context={overlay}>
      <Online>
        <CartContext.Consumer>
          {cart => (
            <ShopContext.Consumer>
              {({ defaultCountry, geolocalization }) => (
                <TypedProductVariantsQuery
                  displayLoader={false}
                  variables={{ ids: cart.lines.map(line => line.variantId) }}
                  skip={!cart.lines.length}
                  alwaysRender
                >
                  {({ data, loading, error }) => {
                    if (loading) {
                      return (
                        <div className="cart">
                          <Loader full />
                        </div>
                      );
                    }

                    if (error) {
                      return <Error error={error.message} />;
                    }

                    const locale = maybe(
                      () => geolocalization.country.code,
                      defaultCountry.code
                    );
                    return (
                      <div className="cart">
                        <div className="overlay__header">
                          {
                          // <ReactSVG
                          //   path={cartImg}
                          //   className="overlay__header__cart-icon"
                          // />
                          // <img src={cartImg} className="overlay__header__cart-icon" />
                          <ReactSVG path={cartImg} className="overlay__header__cart-icon"/>
                          }
                          {
                            /*<ShoppingCartOutlinedIcon />*/
                          }
                          <div className="overlay-header-width">
                           
                            <EMWCartContext.Consumer>
                            { value=>
                              (
                                <>
                                <span className="overlay__header-text">
                                {
                                  value.items ?  value.items : 0
                                } Items -  
                                </span>
                                {
                                  <span className="overlay__header-text-price">
                                    { 
                                      value.subTotal ?
                                      ` $${value.subTotal}`
                                      : " N/A"
                                    }
                                  </span>
                                }
                                </>
                              )
                              
                            }
                            </EMWCartContext.Consumer>
                          </div>
                          <ReactSVG
                            path={closeImg}
                            onClick={overlay.hide}
                            className="overlay__header__close-icon"
                          />
                        </div>
                        {

                        overlay.context && overlay.context.openEMWCart ?
                        <>
                        <EMWCart
                          data={cartData}
                          user={user}
                        />
                        </> 
                        : 
                        cardDetail && cardDetail.lines ?
                        <>
                        <EMWCart data="" user={user}/>
                        </> 
                        :                       
                        cart.lines.length && data ? (
                          <>
                            <ProductList
                              lines={extractCartLines(data, cart.lines, locale)}
                              remove={cart.remove}
                            />
                            <div className="cart__footer">
                              <div className="cart__footer__subtotoal">
                                <span>Subtotal</span>

                                <span>
                                  {getTotal(data, cart.lines, locale)}
                                </span>
                              </div>

                              <div className="cart__footer__button">
                                <Link
                                  to={generatePath(cartUrl, {
                                    token: null,
                                  })}
                                >
                                  <Button secondary>Go to my bag</Button>
                                </Link>
                              </div>
                              <div className="cart__footer__button">
                                <Link
                                  to={user ? checkoutUrl : checkoutLoginUrl}
                                >
                                  <Button>Checkout</Button>
                                </Link>
                              </div>
                            </div>
                          </>
                        ) : (
                          <Empty overlayHide={overlay.hide} />
                        )}
                      </div>
                    );
                  }}
                </TypedProductVariantsQuery>
              )}
            </ShopContext.Consumer>
          )}
        </CartContext.Consumer>
      </Online>
      <Offline>
        <div className="cart">
          <OfflinePlaceholder />
        </div>
      </Offline>
    </Overlay>
  );
};

export default Cart;
