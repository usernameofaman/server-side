import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import OrderSummary from "../EMWCheckoutBilling/OrderSummary";
import Grid from "@material-ui/core/Grid";
// import EMWModel from '../../components/EMWModal';
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { CartCheckoutDetailsQuery } from "../../@sdk/queries/emwAddToCartQueries";
import Loader from "../../components/Loader";
import Container from "@material-ui/core/Container";
import ConfirmDetails from "./ConfirmDetails";
import { getSupplementalDetails } from "../../@sdk/mutations/emwAddToCartMutations";
import { useAlert } from "react-alert";
import ReactGA from "react-ga";
import ReactSVG from "react-svg";
import loader from '../../images/emw-loader.svg';
import { EMWCartContext } from "../../components/EMWCartProvider/context";
import { OverlayContext } from "../../components/index";

interface PageProps {
  userDetails: any;
  isSupplimental: boolean;
  supplementalParams: any;
  hide: any;
}

const Page: React.FC<PageProps> = props => {
  const { userDetails, isSupplimental, supplementalParams, hide } = props;
  const localData = JSON.parse(localStorage.getItem("EMWCart"));
  const alert = useAlert();
  const [showTaxError, setShowTaxError] = useState("");
  const emwCartContext = React.useContext(EMWCartContext);
  const overlayContext = React.useContext(OverlayContext);
  // const { data, loading } = useQuery(CartCheckoutDetailsQuery, {
  // 	variables: { tokenId: localData.token }, fetchPolicy: "network-only",
  // });
  const [
    supplementalCheckoutDetail,
    { data: supplementalData, loading: supplimentalLoading },
  ] = useMutation(getSupplementalDetails, {
    onCompleted({ emwPayByLink }) {
      if (emwPayByLink.errors.length === 0) {
        return 0;
      } else {
        alert.show(
          { title: emwPayByLink.errors[0].message },
          { type: "error" }
        );
      }
    },
    onError(errors) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });

  const [getCartCheckoutDetail, { data, loading }] = useLazyQuery(
    CartCheckoutDetailsQuery,
    {
      fetchPolicy: "network-only",
      onCompleted({ emwproduct }) {
        return 0;
      },
      onError(error) {
        alert.show({ title: "Something went wrong!" }, { type: "error" });
      },
    }
  );

  useEffect(()=>{
    return(()=>{
      emwCartContext.setLines([], 0);
      overlayContext.hide();
      localStorage.setItem("EMWClearCart", "false");
      localStorage.removeItem("EMWCart");
      localStorage.removeItem("shippingtemp");
      localStorage.removeItem("contactInfoTemp");
      localStorage.removeItem("anonumousLoginIn");
      localStorage.removeItem("loggedInUserEmail");
      localStorage.removeItem("unverifiedShippingObject");
    })
  },[]);

  useEffect(() => {
    if (isSupplimental) {
      const orderNum =
        supplementalParams &&
        supplementalParams[0] &&
        supplementalParams[0].value;
      const tokenReceived =
        supplementalParams &&
        supplementalParams[1] &&
        supplementalParams[1].value;
      supplementalCheckoutDetail({
        variables: {
          ordernum: orderNum,
          token: tokenReceived,
        },
      });
    } else {
      getCartCheckoutDetail({
        variables: {
          tokenId: localData.token,
					bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false,
					bypassShipping :  JSON.parse(localStorage.getItem('bypassShipping')) || false
        },
      });
    }
  }, [isSupplimental]);

  const normalData = data && data.emwCheckout && data.emwCheckout.lines;
  const supplementData =
    supplementalData &&
    supplementalData.emwPayByLink &&
    supplementalData.emwPayByLink.emwCheckout &&
    supplementalData.emwPayByLink.emwCheckout.lines;

  useEffect(() => {
    // Page Load Timings
    if (window.performance) {
      const start = window.performance.getEntriesByName(
        `CHECKOUT_START`,
        "mark"
      );
      const step3Marking = window.performance.getEntriesByName(
        `CHECKOUT-STEP-3-START`,
        "mark"
      );
      const supplementalOrder = isSupplimental;
      const checkout = !supplementalOrder
        ? data && data.emwCheckout
        : supplementalData &&
          supplementalData.emwPayByLink &&
          supplementalData.emwPayByLink.emwCheckout;
      const orderName = supplementalOrder ? "Supplemental Order" : "Order";
      if (checkout) {
        if (start && start.length > 0) {
          window.performance.mark(`CHECKOUT_END`);
          window.performance.measure(
            "myMeasure",
            `CHECKOUT_START`,
            `CHECKOUT_END`
          );
          const entries = window.performance.getEntriesByType("measure");
          if (entries && entries.length > 0 && entries[0].duration) {
            // Sends the timing hit to Google Analytics.
            // `Completion Time For ${(supplementalOrder) && 'Supplemental Order'} ${checkout.orderNumber}`,
            ReactGA.timing({
              category: "Checkout Flow Completion Time",
              variable: `Completion Time For ${orderName} ${checkout.orderNumber}`,
              value: Math.round(entries[0].duration), // in milliseconds
              label: `Completion Time For ${orderName} ${checkout.orderNumber} `,
            });
          }
        }
        if (step3Marking && step3Marking.length > 0) {
          window.performance.mark(`CHECKOUT-STEP-4-END`);
          window.performance.measure(
            "checkout-step-4-measure",
            `CHECKOUT-STEP-4-START`,
            `CHECKOUT-STEP-4-END`
          );
          const entries = window.performance.getEntriesByType("measure");
          if (entries && entries.length > 0 && entries[0].duration) {
            // Sends the timing hit to Google Analytics.
            ReactGA.timing({
              category: "Checkout Step Wise Timings",
              variable: `Timings For ${orderName} Token ${checkout.token} At Step-4 `,
              value: Math.round(entries[0].duration), // in milliseconds
              label: `Timings For ${orderName} Token ${checkout.token} At Step-4 `,
            });
          }
        }
        performance.clearMarks();
        performance.clearMeasures();
      }
    }
  }, [supplementalData, data]);

  return (
    <>
      <div className="checkout-billing-section empty-sm-0">
        {loading || supplimentalLoading ? (
          <div className="product-page-details_block loader-wrapper">
            <ReactSVG path={loader} className="medium-size-loader" />
          </div>
        ) : (
          ((data && normalData.length > 0) ||
            (supplementData && supplementData.length > 0)) && (
            <Container maxWidth="lg">
              <Grid
                container
                spacing={3}
                className={
                  isSupplimental
                    ? "supplementConfirmSection"
                    : "orderConfirmSection"
                }
              >
                {isSupplimental && (
                  <Grid item xs={12} md={12} className="supplementalHeader">
                    <div className="supplementalHeading">
                      SUPPLEMENTAL CHECKOUT
                    </div>
                    <div className="supplemental-orderId">
                      {supplementalData &&
                        `# ${supplementalData.emwPayByLink.emwCheckout.orderNumber}`}
                    </div>
                  </Grid>
                )}
                <Grid item xs={12} md={12}>
                  <ConfirmDetails
                    userDetails={userDetails}
                    showTaxError={showTaxError}
                    data={
                      !isSupplimental
                        ? data.emwCheckout
                        : supplementalData &&
                          supplementalData.emwPayByLink.emwCheckout
                    }
                    hide={hide}
                    isSupplimental={isSupplimental}
                  />
                </Grid>
                {/*<Grid item xs={12} md={4} className="orderConfirmSummary">
                  <OrderSummary
                    data={
                      !isSupplimental
                        ? data.emwCheckout
                        : supplementalData &&
                          supplementalData.emwPayByLink.emwCheckout
                    }
                    errorStatus={false}
                    setShowTaxError={setShowTaxError}
                    isSupplimental={isSupplimental}
                    parentOrder={
                      !isSupplimental
                        ? null
                        : supplementalData &&
                          supplementalData.emwPayByLink.parentOrder
                    }
                    supplementalLastStep={true}
                  />
                </Grid>*/}
              </Grid>
            </Container>
          )
        )}
      </div>
    </>
  );
};
export default Page;
