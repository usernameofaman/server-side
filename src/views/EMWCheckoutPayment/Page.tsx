import React, { useEffect, useRef, useState } from 'react';
import api from '../../utils/Api';
import { useAlert } from "react-alert";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { addPaymentAdyen } from '../../@sdk/mutations/emwAdyenCheckoutMutations';
import { GAFinalCheckoutStep, GATransaction, GACheckoutAdditionalOptions } from "../../utils/Google-Analytics";
import { shopName } from '../Account/queries';
import './index.css';
import ErrorModal from '../../components/OverlayManager/ErrorModal';
import { cartExpiredMessage } from "../../constants";

interface PageProps {
  checkoutData: any,
  nextStep: () => void,
  setErrorStatus: any,
  customerDetails: any,
  setTermsError: any,
  termsCheckbox: boolean,
  executeScroll: any,
}

const Page: React.FC<PageProps> = (props) => {
  const { checkoutData, nextStep, setErrorStatus, customerDetails, termsCheckbox, setTermsError, executeScroll } = props;
  const paymentContainer = useRef(null)
  const { data: shopNameData } = useQuery(shopName, { fetchPolicy: "no-cache" });
  const alert = useAlert();
  const [payData, setPayData] = useState(null);
  const [payEnable, setPayEnable] = useState(true);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showFinalResult = (response) => {
    // nextStep();
    processPaymentResponse(response.data);
  }

  const [paymentCreate] = useMutation(addPaymentAdyen, {
    onCompleted({ emwCheckoutAddPayment }) {
      if (emwCheckoutAddPayment.errors.length === 0) {
        // add condition to check result code
        const result = JSON.parse(emwCheckoutAddPayment.result.replace(/'/g, '"'));

        // Add GA Transaction 
        if (checkoutData && checkoutData.lines) {
          const gross = checkoutData.emwTotalPrice && checkoutData.emwTotalPrice.grossTotalPrice && checkoutData.emwTotalPrice.grossTotalPrice.amount;
          const ship = checkoutData.emwTotalPrice && checkoutData.emwTotalPrice.totalShippingPrice && checkoutData.emwTotalPrice.totalShippingPrice.amount;
          const tax = checkoutData.emwTotalPrice && checkoutData.emwTotalPrice.totalTaxPrice && checkoutData.emwTotalPrice.totalTaxPrice.amount;
          const storeName = (shopNameData && shopNameData.shop && shopNameData.shop.name) ? shopNameData.shop.name : "";
          GATransaction(checkoutData.lines, {
            'id': result.merchantReference,
            'affiliation': storeName,
            'revenue': gross ? gross : 0,
            'tax': tax ? tax : 0,
            'shipping': ship ? ship : 0,
          });
        }

        processPaymentResponse(result);
      } else {
        if (emwCheckoutAddPayment.errors[0].message === cartExpiredMessage) {
          setErrorModalOpen(true);
          setErrorMessage(cartExpiredMessage);
        }
        alert.show({ title: emwCheckoutAddPayment.errors[0].message }, { type: "error" });
      }
      setPayEnable(true);
    },
    onError(errors) {
      setPayEnable(true);
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });

  useEffect(() => {
    const customerEmail = localStorage.getItem('ImpersonatedCustomerEmail');
    if (payData && checkoutData && checkoutData.id && payData.encryptedCardnumber) {
      if (termsCheckbox) {
        const requestBody = {
          paymentType: payData.paymentType,
          encryptedCardnumber: payData.encryptedCardnumber,
          encryptedExpirymonth: payData.encryptedExpirymonth,
          encryptedExpiryyear: payData.encryptedExpiryyear,
          encryptedSecuritycode: payData.encryptedSecuritycode,
          holderName: payData.holderName,
          checkoutId: checkoutData.id,
          storefrontBaseUrl: payData.storefrontUrl,
          customerPurchaseOrderNumber: customerDetails.poNumber,
          customerNote: customerDetails.note,
        }
        setTermsError(false);
        setPayEnable(false);
        //We do not require to pass onBehalf email as we handle this via token now
        if (customerEmail && customerEmail.length) {
          paymentCreate({
            variables: {
              ...requestBody,
              onBehalfEmail: customerEmail,
              bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false
            },
          })
        } else {
          paymentCreate({
            variables: {
              ...requestBody,
              bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false
            },
          })
        }
      } else {
        setPayEnable(true);
        setTermsError(true);
        executeScroll();
      }
    }
  }, [payData]);

  useEffect(() => {
    if (checkoutData && checkoutData.lines) {
      // set  google analytics checkout final step-3 
      GAFinalCheckoutStep(checkoutData.lines, 4, "");

      // Google Analytics set additional options 
      GACheckoutAdditionalOptions(4, 'credit or debit card');
    }
  }, [checkoutData]);


  const clearData = () => {
    localStorage.setItem("EMWClearCart", "false");
    setTimeout(() => {
      localStorage.removeItem("EMWCart");
    }, 500);
    localStorage.removeItem("shippingtemp");
    localStorage.removeItem("contactInfoTemp");
    localStorage.removeItem("anonumousLoginIn");
    localStorage.removeItem("ValidAddressID")
    }

  const processPaymentResponse = (paymentRes) => {
    if (paymentRes.resultCode && !paymentRes.action) {
      switch (paymentRes.resultCode) {
        case "Authorised":
          // alert.show(
          //   {
          //     title: "Your payment has been processed successfully",
          //   },
          //   { type: "success" }
          // );
          localStorage.removeItem('EMWPaymentStatus');
          localStorage.setItem('EMWClearCart', "true");
          clearData()
          nextStep();
          break;
        case "Pending":
        case "Received":
        case "PresentToShopper":
        case "IdentifyShopper":
        case "ChallengeShopper":
        case "RedirectShopper":
          localStorage.setItem('EMWClearCart', "true");
          localStorage.setItem('EMWPaymentStatus', 'pending');
          nextStep();
          break;
        case "Refused":
        case "Cancelled":
          localStorage.setItem('EMWClearCart', "false");
          localStorage.setItem('EMWPaymentStatus', 'error');
          setErrorStatus(true);
          break;
        default:
          localStorage.setItem('EMWClearCart', "false");
          localStorage.setItem('EMWPaymentStatus', 'error');
          setErrorStatus(true);
          break;
      }
    }
  }

  const onPay = (state, dropin) => {
    const paymentType = state.data.paymentMethod.type;
    const encryptedCardnumber = state.data.paymentMethod.encryptedCardNumber;
    const encryptedExpirymonth = state.data.paymentMethod.encryptedExpiryMonth;
    const encryptedExpiryyear = state.data.paymentMethod.encryptedExpiryYear;
    const encryptedSecuritycode = state.data.paymentMethod.encryptedSecurityCode;
    const holderName = state.data.paymentMethod.holderName;
    const storefrontUrl = process.env.REACT_APP_STOREFRONT_BASE_URL;
    setPayData({
      paymentType,
      encryptedCardnumber,
      encryptedExpirymonth,
      encryptedExpiryyear,
      encryptedSecuritycode,
      holderName,
      storefrontUrl,
    })
  }

  const additionalDetails = (state, dropin) => {
    api.post(`/payments/details/`, state.data).then((response) => {
      if (response.data.action) {
        dropin.handleAction(response.data.action);
      } else {

        showFinalResult(response);
      }
    })
      .catch((error) => {
        alert.show({ title: "Something went wrong please try again later!" }, { type: "error" });
      })
  }

  useEffect(() => {
    if (checkoutData && checkoutData.id && checkoutData.paymentTypes) {
      const configuration = {
        paymentMethodsResponse: JSON.parse(checkoutData.paymentTypes),
        clientKey: process.env.REACT_APP_ADYEN_CLIENT_KEY,
        locale: process.env.REACT_APP_ADYEN_LOCALE,
        showPaymentMethods: true,
        showPayButton: true,
        environment: process.env.REACT_APP_ADYEN_ENVIRONMENT,
        onSubmit: (state, dropin) => {
          onPay(state, dropin);
        },
        onAdditionalDetails: (state, dropin) => {
          additionalDetails(state, dropin);
        },
        paymentMethodsConfiguration: {
          card: {
            hasHolderName: true,
            holderNameRequired: true,
            hideCVC: false,
            name: 'Credit or debit card',
          },
        },
      };
      try {
        const checkout = new AdyenCheckout(configuration);
        const dropin = checkout.create('dropin').mount(paymentContainer.current);
      } catch (error) {
        alert.show({ title: "Error in loading Adyen Payment" }, { type: "error" });
      }
    }
  }, []);



  return (
    <>
      <div className={["payment-container", (payEnable) ? "" : "disable-adyen-pay"].join(" ")}>
        <div ref={paymentContainer} className="payment"></div>
      </div>
      <ErrorModal body={errorMessage} setErrorModalOpen={setErrorModalOpen} open={errorModalOpen} handleClose={() => setErrorModalOpen(!errorModalOpen)} />
    </>

  );
}
export default Page;