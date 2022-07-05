import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import { maybe } from "@utils/misc";


import { Button, Form, TextField, Select } from "..";
import { ShopContext } from "../ShopProvider/context";
import loader from '../../images/emw-loader.svg';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import ReactSVG from "react-svg";

import { emwCheckoutUpdateShippingMutation } from '@sdk/mutations/emwShipping';

import { getshippingPricesForCheckout, getOrderByshippingPricesForCheckout } from '@sdk/queries/emwShipping';

import ShippingMethodOption from './ShippingMethodOption'
import ShippingMethodOrderOption from './ShippingMethodOrderOption'
import { GACheckoutStep, GACheckoutAdditionalOptions } from "../../utils/Google-Analytics";
import ReactGA from 'react-ga';
import { useAlert } from "react-alert";
import Box from '@material-ui/core/Box';
import InfoIcon from '../../images/info-icon.svg';
import ErrorIcon from '../../images/error-icon.svg';
import * as Sentry from "@sentry/react";

interface IShippingMethodFormEMW {
  hide?: () => void;
  changeActiveTab: () => void;
  Mopen: number;
  LoggedIn: boolean;
  triggerTwo: boolean;
  setInactiveNext: (status) => void;
  settriggerTwo: (status) => void;
}

const ShippingMethodFormEMW: React.FC<IShippingMethodFormEMW> = ({ hide, changeActiveTab, Mopen, LoggedIn, triggerTwo, setInactiveNext, settriggerTwo }) => {
  const alert = useAlert();
  const [loading, setloading] = useState(true);
  const [btnActive, setbtnActive] = useState(false);
  const [byOrder, setbyOrder] = useState(true);
  const [byItem, setbyItem] = useState(false);
  const [networkError, setnetworkError] = useState(false);
  const [avlShippingMethods, setavlShippingMethods] = useState([]);
  const [shippingLines, setshippingLines] = useState([]);
  const [LineShippingValue, setLineShippingValue] = useState({});
  const linesTemp = JSON.parse(localStorage.EMWCart)
  const [selectedMethod, setselectedMethod] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);
  const lines = linesTemp.lines
  const customerEmail = localStorage.getItem('ImpersonatedCustomerEmail');

  const [updateCheckoutShipping] = useMutation(emwCheckoutUpdateShippingMutation, {
    onCompleted({ emwCheckoutUpdateShipping }) {
      if (emwCheckoutUpdateShipping.errors.length === 0) {
        changeActiveTab()
      } else {
        //changeActiveTab()
        setnetworkError(true)
        alert.show({ title: emwCheckoutUpdateShipping.errors[0].message }, { type: "error" });
      }
    },
    onError(errors) {
      changeActiveTab()
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });

  const [fetchOrderByShippingMethod] = useLazyQuery(getOrderByshippingPricesForCheckout, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      if (data) {
        const shippingdata = data.shippingPricesForCheckout !== null ? data.shippingPricesForCheckout : []

        if (data.shippingPricesForCheckout === null) {
          setnetworkError(true)
        }
        if (shippingdata.length === 0) {
          handleShippingApiError()
          // setloading(false)
          // settriggerTwo(false)
          // changeActiveTab()
        } else {
          setavlShippingMethods(shippingdata)
          settriggerTwo(false)
          setloading(false)
        }

      }
    },
    onError(error) {
      // setnetworkError(true)
      // let ctest = { "data": { "shippingPricesForCheckout": [{ "code": "UPS_2ND_DAY_AIR", "name": "UPS 2nd Day Air", "price": { "amount": 58.87, "__typename": "Money" }, "businessDaysInTransit": 1, "__typename": "EMWShipping" }, { "code": "UPS_2ND_DAY_AIR_AM", "name": "UPS 2nd Day Air A.M.", "price": { "amount": 64.66, "__typename": "Money" }, "businessDaysInTransit": 1, "__typename": "EMWShipping" }, { "code": "UPS_3_DAY_SELECT", "name": "UPS 3 Day Select", "price": { "amount": 39.28, "__typename": "Money" }, "businessDaysInTransit": 1, "__typename": "EMWShipping" }, { "code": "UPS_GROUND", "name": "UPS Ground", "price": { "amount": 22.75, "__typename": "Money" }, "businessDaysInTransit": 1, "__typename": "EMWShipping" }, { "code": "UPS_NEXT_DAY_AIR", "name": "UPS Next Day Air", "price": { "amount": 97.42, "__typename": "Money" }, "businessDaysInTransit": 1, "__typename": "EMWShipping" }, { "code": "UPS_NEXT_DAY_AIR_EARLY", "name": "UPS Next Day Air Early", "price": { "amount": 159.67, "__typename": "Money" }, "businessDaysInTransit": 1, "__typename": "EMWShipping" }, { "code": "UPS_NEXT_DAY_AIR_SAVER", "name": "UPS Next Day Air Saver", "price": { "amount": 88.49, "__typename": "Money" }, "businessDaysInTransit": 1, "__typename": "EMWShipping" }] } }
      // setavlShippingMethods(ctest.data.shippingPricesForCheckout)
      setloading(false)
      settriggerTwo(false)
      handleShippingApiError()
      // changeActiveTab()
    },
  });


  const [fetchShippingMethod] = useLazyQuery(getshippingPricesForCheckout, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      if (data) {
        const shippingdata = data.shippingPricesForCheckoutByItem !== null ? data.shippingPricesForCheckoutByItem : []

        if (data.shippingPricesForCheckoutByItem === null) {
          setnetworkError(true)
        }
        if (shippingdata.length === 0) {
          handleShippingApiError()
          // setloading(false)
          // settriggerTwo(false)
          // changeActiveTab()
        } else {
          let redirectChk = false
          shippingdata.map((shipp, index) => {
            if (shipp.shipping.length === 0) {
              redirectChk = true
            }
          })

          if (redirectChk) {
            handleShippingApiError()
            // setloading(false)
            // settriggerTwo(false)
            // changeActiveTab()
          } else {
            setavlShippingMethods(shippingdata)
            settriggerTwo(false)
            setloading(false)
          }
        }

      }
    },
    onError(error) {
      // setnetworkError(true)
      // let ctest = { "data": { "shippingPricesForCheckout": [{ "code": "UPS_2ND_DAY_AIR", "name": "UPS 2nd Day Air", "price": { "amount": 58.87, "__typename": "Money" }, "businessDaysInTransit": 1, "__typename": "EMWShipping" }, { "code": "UPS_2ND_DAY_AIR_AM", "name": "UPS 2nd Day Air A.M.", "price": { "amount": 64.66, "__typename": "Money" }, "businessDaysInTransit": 1, "__typename": "EMWShipping" }, { "code": "UPS_3_DAY_SELECT", "name": "UPS 3 Day Select", "price": { "amount": 39.28, "__typename": "Money" }, "businessDaysInTransit": 1, "__typename": "EMWShipping" }, { "code": "UPS_GROUND", "name": "UPS Ground", "price": { "amount": 22.75, "__typename": "Money" }, "businessDaysInTransit": 1, "__typename": "EMWShipping" }, { "code": "UPS_NEXT_DAY_AIR", "name": "UPS Next Day Air", "price": { "amount": 97.42, "__typename": "Money" }, "businessDaysInTransit": 1, "__typename": "EMWShipping" }, { "code": "UPS_NEXT_DAY_AIR_EARLY", "name": "UPS Next Day Air Early", "price": { "amount": 159.67, "__typename": "Money" }, "businessDaysInTransit": 1, "__typename": "EMWShipping" }, { "code": "UPS_NEXT_DAY_AIR_SAVER", "name": "UPS Next Day Air Saver", "price": { "amount": 88.49, "__typename": "Money" }, "businessDaysInTransit": 1, "__typename": "EMWShipping" }] } }
      // setavlShippingMethods(ctest.data.shippingPricesForCheckout)
      setloading(false)
      settriggerTwo(false)
      handleShippingApiError()
      // changeActiveTab()
    },
  });

  const handleClose = () => {
    hide();
  };

  useEffect(() => {
    // set  google analytics checkout step-1 
    let linesTemp = localStorage.EMWCart === undefined ? { lines: [] } : JSON.parse(localStorage.EMWCart)
    let lines = linesTemp.lines;
    GACheckoutStep(lines, 2, "");

    // set additional options
    GACheckoutAdditionalOptions(2, 'BY_ORDER');

    if (window.performance) {
      const start = window.performance.getEntriesByName(`CHECKOUT-STEP-1-START`, "mark");
      if (start && start.length > 0) {
        const end = window.performance.mark(`CHECKOUT-STEP-1-END`);
        window.performance.measure('checkout-step-1-measure', `CHECKOUT-STEP-1-START`, `CHECKOUT-STEP-1-END`);
        const entries = window.performance.getEntriesByType('measure');

        if (entries && entries.length > 0 && entries[0].duration) {
          // Sends the timing hit to Google Analytics.
          ReactGA.timing({
            category: 'Checkout Step Wise Timings',
            variable: `Timings For Order Token ${linesTemp.token} At Step-1 `,
            value: Math.round(entries[0].duration), // in milliseconds
            label: `Timings For Order Token ${linesTemp.token} At Step-1 `,
          });
        }
      }
      window.performance.mark(`CHECKOUT-STEP-2-START`);
    }
  }, []);

  useEffect(() => {
    const temp = localStorage.getItem("shippingtemp")
    const tempshipping = temp === "" ? "" : JSON.parse(temp);
    if (byItem && LoggedIn && (tempshipping && tempshipping.shippingAddress.country !== undefined)) {
      fetchShippingMethod({
        variables: {
          id: tempshipping.checkoutId,
          address: {
            streetAddress1: tempshipping.shippingAddress.streetAddress1,
            streetAddress2: tempshipping.shippingAddress.streetAddress2,
            city: tempshipping.shippingAddress.city,
            country: tempshipping.shippingAddress.country.code ? tempshipping.shippingAddress.country.code : tempshipping.shippingAddress.country,
            countryArea: tempshipping.shippingAddress.countryArea,
            postalCode: tempshipping.shippingAddress.postalCode,
          },
          bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
        },
      });
    } else if (byItem && !LoggedIn && (tempshipping.shippingAddress.input.country !== undefined)) {
      fetchShippingMethod({
        variables: {
          id: tempshipping.checkoutId,
          address: {
            streetAddress1: tempshipping.shippingAddress.input.streetAddress1,
            streetAddress2: tempshipping.shippingAddress.input.streetAddress2,
            city: tempshipping.shippingAddress.input.city,
            country: tempshipping.shippingAddress.input.country,
            countryArea: tempshipping.shippingAddress.input.countryArea,
            postalCode: tempshipping.shippingAddress.input.postalCode,
          },
          bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
        },
      });
    } else if (byOrder && LoggedIn && (tempshipping.shippingAddress.country !== undefined)) {
      fetchOrderByShippingMethod({
        variables: {
          id: tempshipping.checkoutId,
          address: {
            streetAddress1: tempshipping.shippingAddress.streetAddress1,
            streetAddress2: tempshipping.shippingAddress.streetAddress2,
            city: tempshipping.shippingAddress.city,
            country: tempshipping.shippingAddress.country.code ? tempshipping.shippingAddress.country.code : tempshipping.shippingAddress.country,
            countryArea: tempshipping.shippingAddress.countryArea,
            postalCode: tempshipping.shippingAddress.postalCode,
          },
          bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
        },
      });
    } else if (byOrder && !LoggedIn && (tempshipping.shippingAddress.input.country !== undefined)) {
      fetchOrderByShippingMethod({
        variables: {
          id: tempshipping.checkoutId,
          address: {
            streetAddress1: tempshipping.shippingAddress.input.streetAddress1,
            streetAddress2: tempshipping.shippingAddress.input.streetAddress2,
            city: tempshipping.shippingAddress.input.city,
            country: tempshipping.shippingAddress.input.country,
            countryArea: tempshipping.shippingAddress.input.countryArea,
            postalCode: tempshipping.shippingAddress.input.postalCode,
          },
          bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
        },
      });
    }


  }, [byOrder, byItem]);

  useEffect(() => {
    const temp = localStorage.getItem("shippingtemp")
    const tempshipping = JSON.parse(temp)
    if (byItem && LoggedIn && (tempshipping.shippingAddress.country !== undefined)) {
      fetchShippingMethod({
        variables: {
          id: tempshipping.checkoutId,
          address: {
            streetAddress1: tempshipping.shippingAddress.streetAddress1,
            streetAddress2: tempshipping.shippingAddress.streetAddress2,
            city: tempshipping.shippingAddress.city,
            country: tempshipping.shippingAddress.country.code ? tempshipping.shippingAddress.country.code : tempshipping.shippingAddress.country,
            countryArea: tempshipping.shippingAddress.countryArea,
            postalCode: tempshipping.shippingAddress.postalCode,
          },
          bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
        },
      });
    } else if (byItem && !LoggedIn && (tempshipping.shippingAddress.input.country !== undefined)) {
      fetchShippingMethod({
        variables: {
          id: tempshipping.checkoutId,
          address: {
            streetAddress1: tempshipping.shippingAddress.input.streetAddress1,
            streetAddress2: tempshipping.shippingAddress.input.streetAddress2,
            city: tempshipping.shippingAddress.input.city,
            country: tempshipping.shippingAddress.input.country,
            countryArea: tempshipping.shippingAddress.input.countryArea,
            postalCode: tempshipping.shippingAddress.input.postalCode,
          },
          bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
        },
      });
    } else if (byOrder && LoggedIn && (tempshipping.shippingAddress.country !== undefined)) {
      fetchOrderByShippingMethod({
        variables: {
          id: tempshipping.checkoutId,
          address: {
            streetAddress1: tempshipping.shippingAddress.streetAddress1,
            streetAddress2: tempshipping.shippingAddress.streetAddress2,
            city: tempshipping.shippingAddress.city,
            country: tempshipping.shippingAddress.country.code ? tempshipping.shippingAddress.country.code : tempshipping.shippingAddress.country,
            countryArea: tempshipping.shippingAddress.countryArea,
            postalCode: tempshipping.shippingAddress.postalCode,
          },
          bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
        },
      });
    } else if (byOrder && !LoggedIn && (tempshipping.shippingAddress.input.country !== undefined)) {
      fetchOrderByShippingMethod({
        variables: {
          id: tempshipping.checkoutId,
          address: {
            streetAddress1: tempshipping.shippingAddress.input.streetAddress1,
            streetAddress2: tempshipping.shippingAddress.input.streetAddress2,
            city: tempshipping.shippingAddress.input.city,
            country: tempshipping.shippingAddress.input.country,
            countryArea: tempshipping.shippingAddress.input.countryArea,
            postalCode: tempshipping.shippingAddress.input.postalCode,
          },
          bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
        },
      });
    }


  }, []);

  useEffect(() => {

    if (triggerTwo === true) {
      handleNextSubmit();
    }
  }, [triggerTwo]);

  useEffect(() => {
    if (lines.length === Object.keys(LineShippingValue).length) {
      setbtnActive(true)
      setInactiveNext(false)
    }

  }, [LineShippingValue]);

  const onMethodSelectByItem = (method, index, id) => {
    setLineShippingValue({ ...LineShippingValue, [index]: { lineId: id, shippingMethod: method } });

  }

  const handleNextSubmit = () => {
    if (btnActive) {
      if (byOrder) {
        const temp = localStorage.getItem("shippingtemp")
        const tempshipping = JSON.parse(temp)
        let shippingobj = {}

        if (LoggedIn) {
          shippingobj = {
            shippingType: "BY_ORDER",
            shippingMethod: selectedMethod,
            newAddress: false,
            shippingAddressId: tempshipping.shippingAddressId,
          }
        } else {
          const temp = localStorage.getItem("contactInfoTemp")
          if (temp == null) {
            Sentry.captureException(new Error(`Anonymous User Contact Info Failed!`), {
              extra: {
                errorMsg: "Anonymous User Contact Info Failed At Checkout Shipping Address Updation",
              },
            });
          }
          const tempUser = JSON.parse(temp)
          shippingobj = {
            shippingType: "BY_ORDER",
            shippingMethod: selectedMethod,
            shippingAddressId: tempshipping.shippingAddressId,
            newAddress: true,
            shippingAddress: {
              firstName: tempUser.firstname,
              lastName: tempUser.lastname,
              email: tempUser.email,
              city: tempshipping.shippingAddress.input.city,
              countryArea: tempshipping.shippingAddress.input.countryArea,
              country: tempshipping.shippingAddress.input.country,
              postalCode: tempshipping.shippingAddress.input.postalCode,
              streetAddress1: tempshipping.shippingAddress.input.streetAddress1,
              companyName: tempUser && tempUser.companyName ? tempUser.companyName : "",
              phone: tempUser.phone,
              ccEmail: tempUser && tempUser.ccEmail ? tempUser.ccEmail : "",
              phoneExtension: tempUser && tempUser.phoneExtension ? tempUser.phoneExtension : ""
            },
          }
        }
        let requestBody = {}
        if (customerEmail && customerEmail.length) {
          requestBody = {
            checkoutId: tempshipping.checkoutId,
            onbehalfEmail: customerEmail,
            manualShipping: false,
            shipping: shippingobj,
            bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false,
            bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
          }
        } else {
          requestBody = {
            checkoutId: tempshipping.checkoutId,
            manualShipping: false,
            shipping: shippingobj,
            bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false,
          }
        }
        localStorage.setItem('unverifiedShippingObject',JSON.stringify(requestBody));
        updateCheckoutShipping({
          variables: requestBody
        })
      } else if (byItem) {
        const temp = localStorage.getItem("shippingtemp")
        const tempshipping = JSON.parse(temp)
        const Linevalues = Object.values(LineShippingValue);
        let shippingobj = {}
        if (LoggedIn) {
          shippingobj = {
            shippingType: "BY_ITEM",
            shippingLines: Linevalues,
            newAddress: false,
            shippingAddressId: tempshipping.shippingAddressId,
          }
        } else {
          const temp = localStorage.getItem("contactInfoTemp")
          if (temp == null) {
            Sentry.captureException(new Error(`Anonymous User Contact Info Failed!`), {
              extra: {
                errorMsg: "Anonymous User Contact Info Failed At Checkout Shipping Address Updation",
              },
            });
          }
          const tempUser = JSON.parse(temp)
          shippingobj = {
            shippingType: "BY_ITEM",
            shippingLines: Linevalues,
            shippingAddressId: "",
            newAddress: true,
            shippingAddress: {
              firstName: tempUser.firstname,
              lastName: tempUser.lastname,
              email: tempUser.email,
              city: tempshipping.shippingAddress.input.city,
              countryArea: tempshipping.shippingAddress.input.countryArea,
              country: tempshipping.shippingAddress.input.country,
              postalCode: tempshipping.shippingAddress.input.postalCode,
              streetAddress1: tempshipping.shippingAddress.input.streetAddress1,
              companyName: tempUser && tempUser.companyName ? tempUser.companyName : "",
              phone: tempUser.phone,
              ccEmail: tempUser && tempUser.ccEmail ? tempUser.ccEmail : "",
              phoneExtension: tempUser && tempUser.phoneExtension ? tempUser.phoneExtension : ""
            },
          }
        }
        let requestBody = {}
        if (customerEmail && customerEmail.length) {
          requestBody = {
            onbehalfEmail: customerEmail,
            checkoutId: tempshipping.checkoutId,
            manualShipping: false,
            shipping: shippingobj,
				    bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false,
            bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
          }
        } else {
          requestBody = {
            checkoutId: tempshipping.checkoutId,
            manualShipping: false,
            shipping: shippingobj,
            bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
          }
        }
        localStorage.setItem('unverifiedShippingObject',JSON.stringify(requestBody));
        updateCheckoutShipping({
          variables: requestBody
        })
      }

    }
  };


  const handleOnSubmit = async (evt) => {
    setButtonClicked(true)
    evt.preventDefault();
    if (btnActive) {
      setButtonClicked(false)
      if (byOrder) {
        const temp = localStorage.getItem("shippingtemp")
        const tempshipping = JSON.parse(temp)
        let shippingobj = {}

        if (LoggedIn) {
          shippingobj = {
            shippingType: "BY_ORDER",
            shippingMethod: selectedMethod,
            newAddress: false,
            shippingAddressId: tempshipping.shippingAddressId,
          }
        } else {
          const temp = localStorage.getItem("contactInfoTemp")
          if (temp == null) {
            Sentry.captureException(new Error(`Anonymous User Contact Info Failed!`), {
              extra: {
                errorMsg: "Anonymous User Contact Info Failed At Checkout Shipping Address Updation",
              },
            });
          }
          const tempUser = JSON.parse(temp)
          shippingobj = {
            shippingType: "BY_ORDER",
            shippingMethod: selectedMethod,
            shippingAddressId: tempshipping.shippingAddressId,
            newAddress: true,
            shippingAddress: {
              firstName: tempUser.firstname,
              lastName: tempUser.lastname,
              email: tempUser.email,
              city: tempshipping.shippingAddress.input.city,
              countryArea: tempshipping.shippingAddress.input.countryArea,
              country: tempshipping.shippingAddress.input.country,
              postalCode: tempshipping.shippingAddress.input.postalCode,
              streetAddress1: tempshipping.shippingAddress.input.streetAddress1,
              companyName: tempUser && tempUser.companyName ? tempUser.companyName : "",
              phone: tempUser.phone,
              ccEmail: tempUser && tempUser.ccEmail ? tempUser.ccEmail : "",
              phoneExtension: tempUser && tempUser.phoneExtension ? tempUser.phoneExtension : ""
            },
          }
        }
        let requestBody = {}
        if (customerEmail && customerEmail.length) {
          requestBody = {
            onbehalfEmail: customerEmail,
            checkoutId: tempshipping.checkoutId,
            manualShipping: false,
            shipping: shippingobj,
				    bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false,
            bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
          }
        } else {
          requestBody = {
            checkoutId: tempshipping.checkoutId,
            manualShipping: false,
            shipping: shippingobj,
            bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
          }
        }
        localStorage.setItem('unverifiedShippingObject',JSON.stringify(requestBody));
        updateCheckoutShipping({
          variables: requestBody
        })
      } else if (byItem) {
        const temp = localStorage.getItem("shippingtemp")
        const tempshipping = JSON.parse(temp)
        const Linevalues = Object.values(LineShippingValue);
        let shippingobj = {}
        if (LoggedIn) {
          shippingobj = {
            shippingType: "BY_ITEM",
            shippingLines: Linevalues,
            newAddress: false,
            shippingAddressId: tempshipping.shippingAddressId,
          }
        } else {
          const temp = localStorage.getItem("contactInfoTemp")
          if (temp == null) {
            Sentry.captureException(new Error(`Anonymous User Contact Info Failed!`), {
              extra: {
                errorMsg: "Anonymous User Contact Info Failed At Checkout Shipping Address Updation",
              },
            });
          }
          const tempUser = JSON.parse(temp)
          shippingobj = {
            shippingType: "BY_ITEM",
            shippingLines: Linevalues,
            shippingAddressId: "",
            newAddress: true,
            shippingAddress: {
              firstName: tempUser.firstname,
              lastName: tempUser.lastname,
              email: tempUser.email,
              city: tempshipping.shippingAddress.input.city,
              countryArea: tempshipping.shippingAddress.input.countryArea,
              country: tempshipping.shippingAddress.input.country,
              postalCode: tempshipping.shippingAddress.input.postalCode,
              streetAddress1: tempshipping.shippingAddress.input.streetAddress1,
              companyName: tempUser && tempUser.companyName ? tempUser.companyName : "",
              phone: tempUser.phone,
              ccEmail: tempUser && tempUser.ccEmail ? tempUser.ccEmail : "",
              phoneExtension: tempUser && tempUser.phoneExtension ? tempUser.phoneExtension : ""
            },
          }
        }
        let requestBody = {}
        if (customerEmail && customerEmail.length) {
          requestBody = {
            onbehalfEmail: customerEmail,
            checkoutId: tempshipping.checkoutId,
            manualShipping: false,
            shipping: shippingobj,
				    bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false,
            bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
          }
        } else {
          requestBody = {
            checkoutId: tempshipping.checkoutId,
            manualShipping: false,
            shipping: shippingobj,
            bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
          }
        }
        localStorage.setItem('unverifiedShippingObject',JSON.stringify(requestBody));
        updateCheckoutShipping({
          variables: requestBody
        })
      }

    }
  };

  const handleShippingApiError = () => {
    let ship_type = "BY_ORDER"
    if (byItem) {
      ship_type = "BY_ITEM"
    }
    const temp = localStorage.getItem("shippingtemp")
    const tempshipping = JSON.parse(temp)
    let shippingobj = {}
    if (LoggedIn) {
      shippingobj = {
        shippingType: ship_type,
        newAddress: false,
        shippingAddressId: tempshipping.shippingAddressId,
      }
    } else {
      const temp = localStorage.getItem("contactInfoTemp")
      if (temp == null) {
        Sentry.captureException(new Error(`Anonymous User Contact Info Failed!`), {
          extra: {
            errorMsg: "Anonymous User Contact Info Failed At Checkout Shipping Address Updation",
          },
        });
      }
      const tempUser = JSON.parse(temp)
      shippingobj = {
        shippingType: ship_type,
        newAddress: true,
        shippingAddress: {
          firstName: tempUser.firstname,
          lastName: tempUser.lastname,
          email: tempUser.email,
          city: tempshipping.shippingAddress.input.city,
          countryArea: tempshipping.shippingAddress.input.countryArea,
          country: tempshipping.shippingAddress.input.country,
          postalCode: tempshipping.shippingAddress.input.postalCode,
          streetAddress1: tempshipping.shippingAddress.input.streetAddress1,
        },
      }
    }
    let requestBody = {}
    if (customerEmail && customerEmail.length) {
      requestBody = {
        onbehalfEmail: customerEmail,
        checkoutId: tempshipping.checkoutId,
        manualShipping: true,
        shipping: shippingobj,
        bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false,
        bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
      }
    } else {
      requestBody = {
        checkoutId: tempshipping.checkoutId,
        manualShipping: true,
        shipping: shippingobj,
        bypassShipping: JSON.parse(localStorage.getItem('bypassShipping')) || false
      }
    }
    localStorage.setItem('unverifiedShippingObject',JSON.stringify(requestBody));
    updateCheckoutShipping({
      variables: requestBody
    })
  };
  const onSelectByOrder = () => {
    if (!byOrder) {
      // Google Analytics set additional options 
      GACheckoutAdditionalOptions(2, 'BY_ORDER');

      setbyOrder(true);
      setbyItem(false)
      setbtnActive(false)
      setloading(true)
      setLineShippingValue({})
      setavlShippingMethods([])
      setInactiveNext(true)
      settriggerTwo(false)
    }
  }

  const onMethodSelectByOrder = (name) => {
    setselectedMethod(name);
    setInactiveNext(false)
    setbtnActive(true)
  }

  const onSelectByItem = () => {
    // Google Analytics set additional options 
    if (!byItem) {
      GACheckoutAdditionalOptions(2, 'BY_ITEM');

      setbyOrder(false);
      setbyItem(true)
      setloading(true)
      setbtnActive(false)
      setselectedMethod({})
      setavlShippingMethods([])
      setInactiveNext(true)
      settriggerTwo(false)
    }
  }

  const supplyChainText = process.env.REACT_APP_SUPPLY_CHAIN_TEXT;
  return (
    <ShopContext.Consumer>
      {
        cartAction => {
          return (
            <React.Fragment>
              {loading ?
                <div className="product-page-details_block loader-wrapper">
                  <ReactSVG path={loader} className="medium-size-loader" />
                </div>
                :
                <div className="address-form">
                  <Form
                    errors={maybe(() => [], [])}
                    onSubmit={handleOnSubmit}
                  >
                    <div className="items">
                      <div className="inner-items">

                        {/*<div className="shipping-title"><span className="title">CHOOSE A SHIPPING METHOD</span></div>*/}
                        <p className="shipOrder">How would you like to ship your order?</p>
                        <div className="emw-choice">
                          <Button onClick={() => onSelectByOrder()} className={byOrder ? "active" : ""}>COMPLETE</Button>
                          <Button onClick={() => onSelectByItem()} className={byItem ? "active" : ""}>BY PART#</Button>
                        </div>


                        {networkError ? <span className="emw-network-error">Some network issue, please check after some time.</span> : null}

                        {!networkError && avlShippingMethods.length > 0 && byOrder ?
                          <ShippingMethodOrderOption Lines={lines} itemindex={1} onMethodSelectByItem={onMethodSelectByOrder} LoggedIn={LoggedIn} avlShippingMethods={avlShippingMethods} />
                          : null
                        }

                        {!networkError && byItem && avlShippingMethods && avlShippingMethods.map((line, index) => {
                          return <React.Fragment key={Math.random()}><ShippingMethodOption onMethodSelectByItem={onMethodSelectByItem} key={index} itemindex={index} LoggedIn={LoggedIn} products={line} lineWiseShippingValues={LineShippingValue} />
                            {avlShippingMethods.length === 1 ? <hr style={{ backgroundColor: "#CCCED0", margin: "20px 15px" }} /> : index > 0 && index % 2 !== 0 ? <></> : null}
                          </React.Fragment>
                        })

                        }

                        {
                          (supplyChainText !== "" && supplyChainText !== undefined) ?
                            <>
                              <br></br>
                              <Box display="flex" className="supply-chain-msg">
                                <Box className="supply-chain-msg-icon">
                                  <img src={InfoIcon} />
                                </Box>
                                <Box className="supply-chain-msg-text">
                                  <p>{process.env.REACT_APP_SUPPLY_CHAIN_TEXT}</p>
                                </Box>
                              </Box>
                            </>
                            : null
                        }

                        {!btnActive && buttonClicked &&
                          <>
                            <Box display="flex" className="account-exist-msg">
                              <Box className="account-exist-msg-icon">
                                <img src={ErrorIcon} />
                              </Box>
                              <Box className="account-exist-msg-text">
                                <p>Choose ship method to proceed</p>
                              </Box>
                            </Box>
                          </>
                        }

                        <div className="checkout-form__button active">
                          <Button type="submit">
                            {"Proceed to Billing"}
                          </Button>
                        </div>
                      </div>

                    </div>
                  </Form>
                </div>
              }
            </React.Fragment>
          )
        }

      }
    </ShopContext.Consumer>
  );
};

export default ShippingMethodFormEMW;
