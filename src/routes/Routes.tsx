import React, { lazy, Suspense } from "react";
import { Route, Switch , Redirect } from "react-router-dom";

const HomePage = lazy(() =>
  import(/*webpackChunkName: "HomePage" */ "../views/Home/View")
);
const DefaultLogin = lazy(() =>
  import(/*webpackChunkName: "DefaultLogin" */ "../components/DefaultLogin")
);
const SearchPage = lazy(() =>
  import(/*webpackChunkName: "SearchPage" */ "../views/Search/SearchPage")
);
const SiteSearchPage = lazy(() =>
  import(/*webpackChunkName: "SearchPage" */ "../views/SiteSearch/View")
);
const CategoryPage = lazy(() =>
  import(/*webpackChunkName: "CategoryPage" */ "../views/Category/View")
);
const CollectionPage = lazy(() =>
  import(/*webpackChunkName: "CollectionPage" */ "../views/Collection/View")
);
const ProductPage = lazy(() =>
  import(/*webpackChunkName: "ProductPage" */ "../views/Product/View")
);
const EMWCartPage = lazy(() =>
  import(/*webpackChunkName: "EMWCartPage" */ "../views/EMWCart/View")
);
const CheckoutLogin = lazy(() =>
  import(/*webpackChunkName: "CheckoutLogin" */ "../components/CheckoutLogin")
);
const ArticlePage = lazy(() =>
  import(/*webpackChunkName: "ArticlePage" */ "../views/Article/EMWView")
);
const UserAccount = lazy(() =>
  import(/*webpackChunkName: "UserAccount" */ "../userAccount/routes")
);
const OrderDetails = lazy(() =>
  import(
    /*webpackChunkName: "OrderDetails" */ "../userAccount/views/OrderDetails/View"
  )
);
const OrderConfirmation = lazy(() =>
  import(
    /*webpackChunkName: "OrderConfirmation" */ "../views/OrderConfirmation/View"
  )
);
const Account = lazy(() =>
  import(/*webpackChunkName: "Account" */ "../views/Account/Account")
);
const AccountConfirm = lazy(() =>
  import(
    /*webpackChunkName: "AccountConfirm" */ "../views/Account/AccountConfirm"
  )
);
const PasswordReset = lazy(() =>
  import(
    /*webpackChunkName: "PasswordReset" */ "../@next/components/views/PasswordReset/PasswordReset"
  )
);
const EMWOrderTracking = lazy(() =>
  import(
    /*webpackChunkName: "EMWOrderTracking" */ "../views/EMWOrderTracking/View"
  )
);
const NotFound = lazy(() =>
  import(/*webpackChunkName: "NotFound" */ "../components/NotFound/")
);
const SupplementOrder = lazy(() =>
  import(
    /*webpackChunkName: "NotFound" */ "../views/EMWCheckoutBilling/SupplementalInvoiceRoute"
  )
);
const TermsAndConditions = lazy(() =>
  import(/*webpackChunkName: "NotFound" */ "../views/TermsAndCondition/")
);
const RefundPolicy = lazy(() =>
  import(/*webpackChunkName: "NotFound" */ "../views/RefundPolicy")
);
const SeoUrlComponent = lazy(() =>
  import(/*webpackChunkName: "NotFound" */ "../views/SeoUrl/View")
);
const InvoicePage = lazy(() =>
  import(/*webpackChunkName: "InvoicePage" */ "../views/Invoice/View")
);

const GAQPage = lazy(() =>
  import(/*webpackChunkName: "InvoicePage" */ "../views/GAQ/View")
);

import {
  baseUrl as userAccountBaseUrl,
  userOrderDetailsUrl,
} from "../userAccount/routes";

const slugUrl = ":slug([a-z-0-9]+)/:id([0-9]+)/";
const idUrl = ":slug([a-z-0-9]+)/";
const pageSlug = ":slug([a-z0-9-/]+)";

export const baseUrl = "/";
export const searchUrl = `${baseUrl}search/`;
export const siteSearchUrl = `${baseUrl}site-search/`;
export const categoryUrl = `${baseUrl}category/${slugUrl}`;
export const collectionUrl = `${baseUrl}collection/${slugUrl}`;
export const productUrl = `${baseUrl}product/${slugUrl}`;
export const cartUrl = `${baseUrl}cart/:token?/`;
export const checkoutLoginUrl = `${baseUrl}login/`;
export const pageUrl = `${baseUrl}page/${pageSlug}`;
export const guestOrderDetailsUrl = `/order-history/:token/`;
export const orderConfirmationUrl = `${baseUrl}order-confirmation/`;
export const accountUrl = `${baseUrl}account/`;
export const accountConfirmUrl = `${baseUrl}account-confirm/`;
export const orderHistoryUrl = `${baseUrl}order-history/`;
export const documentTaxUrl = `${baseUrl}document-tax/`;
export const addressBookUrl = `${baseUrl}address-book/`;
export const paymentOptionsUrl = `${baseUrl}payment-options/`;
export const passwordResetUrl = `${baseUrl}reset-password/`;
// export const emwCheckoutUrl = `${baseUrl}emwcheckout/`;
export const emwOrderTrackingUrlHeader = `${baseUrl}orders/`;
export const emwOrderTrackingUrl = `${baseUrl}orders/${idUrl}`;
export const supplementalUrl = `${baseUrl}review-order/`;
export const termsUrl = `${baseUrl}terms-condition/`;
export const refundPolicyUrl = `${baseUrl}refund-policy/`;
export const seoUrl = `${baseUrl}:seoUrl`;
export const invoice = `${baseUrl}invoice/:id?/:email?`;
export const contactUsUrl = "/page/contact-us";
export const GAQUrl = `${baseUrl}quote/`;
export const signInPage = `${baseUrl}sign-in/`


export const Routes: React.FC = () => (
  <Suspense fallback={<p>Loading</p>}>
    <Switch>
      <Route exact path={baseUrl} component={HomePage} />
      <Route exact path={signInPage} component={DefaultLogin} />
      <Route path={searchUrl} component={SearchPage} />
      <Route path={siteSearchUrl} component={SiteSearchPage} />
      <Route path={categoryUrl} component={CategoryPage} />
      <Route path={collectionUrl} component={CollectionPage} />
      <Route path={productUrl} component={ProductPage} />
      <Route path={cartUrl} component={EMWCartPage} />
      <Route path={checkoutLoginUrl} component={CheckoutLogin} />
      <Route path={pageUrl} component={ArticlePage} />
      <Route path={userAccountBaseUrl} component={UserAccount} />
      <Route path={userOrderDetailsUrl} component={OrderDetails} />
      <Route path={guestOrderDetailsUrl} component={OrderDetails} />
      <Route path={orderConfirmationUrl} component={OrderConfirmation} />
      <Route path={accountUrl} component={Account} />
      <Route path={accountConfirmUrl} component={AccountConfirm} />
      <Route path={orderHistoryUrl} component={Account} />
      <Route path={documentTaxUrl} component={Account} />
      <Route path={addressBookUrl} component={Account} />
      <Route path={paymentOptionsUrl} component={Account} />
      <Route path={passwordResetUrl} component={PasswordReset} />
      {/* <Route path={emwCheckoutUrl} component={EMWCheckoutPayment} /> */}
      <Route path={emwOrderTrackingUrl} component={EMWOrderTracking} />
      <Route path={emwOrderTrackingUrlHeader} component={EMWOrderTracking} />
      <Route path={invoice} component={InvoicePage} />
      <Route path={termsUrl} component={TermsAndConditions} />
      <Route path={refundPolicyUrl} component={RefundPolicy} />
      <Route path={supplementalUrl} component={SupplementOrder} />
      <Route path={GAQUrl} component={GAQPage} />
      {
        (window.location.pathname !== "/sitemap.txt" && window.location.pathname !== "/sitemap.xml") &&
        <>
          <Switch>
            {window.location.pathname.includes("www.authorize.net/") &&
              <Redirect to={window.location.pathname.replace("www.authorize.net/", "")} />}
            {window.location.pathname.includes("www.authorize.net") &&
              <Redirect to={window.location.pathname.replace("www.authorize.net", "")} />}
            <Route path={seoUrl} component={SeoUrlComponent} />
            <Route component={NotFound} />
          </Switch>
        </>
      }
    </Switch>
  </Suspense>
);

export default Routes;
