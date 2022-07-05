import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import { TextField, Button } from "..";

import addAddress from "../../images/add-address.svg";
import ReactSVG from "react-svg";
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useAlert } from "react-alert";
import { getshippingPricesForQuote } from '../../@sdk/queries/emwShipping';

import { emwQuoteUpdateShippingMutation } from '@sdk/mutations/emwGetAQuoteMutations';

interface IShippingMethods {
  selectedShippingAdd: any;
  quotemethod: any;
  quoteShipping: any;
  setvalidatemethod: any;
  validateNonCatalog: any;
}


const ShippingMethods: React.FC<IShippingMethods> = ({ selectedShippingAdd, quotemethod, quoteShipping, setvalidatemethod, validateNonCatalog }) => {

  const [selectedShipingMethod, setselectedShipingMethod] = useState("");
  const [ShippingAdd, setShippingAdd] = useState(quoteShipping);
  const [ShippingError, setShippingError] = useState("");
  const [shipmethod, setshipmethod] = useState([]);
  const [NonCatalog, setNonCatalog] = useState(validateNonCatalog);

  React.useEffect(() => {
    if (quotemethod && quotemethod.code) {
      setselectedShipingMethod(quotemethod.code)
      setvalidatemethod(true)
    }
  }, [quotemethod]);

  React.useEffect(() => {
    if (quoteShipping){
      setShippingAdd(quoteShipping)
    }
  }, [quoteShipping]);

  React.useEffect(() => {
    setNonCatalog(validateNonCatalog)
  }, [validateNonCatalog]);

  React.useEffect(() => {

  }, [shipmethod]);

  const [fechQuoteShippingMethods] = useLazyQuery(getshippingPricesForQuote, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      if (data) {
        setShippingError("")
        setshipmethod(data.shippingPricesForQuote)
      }
    },
    onError(error) {
      setshipmethod([])
      setShippingError("Please reduce the quantity of product.")
    },
  });

  React.useEffect(() => {
    if (ShippingAdd && !NonCatalog) {
      const isQuoteExist = JSON.parse(localStorage.getItem('EMWQuote'));
      fechQuoteShippingMethods({
        variables: {
          id: isQuoteExist.id,
          address: {
            streetAddress1: ShippingAdd.streetAddress1,
            streetAddress2: ShippingAdd.streetAddress2,
            city: ShippingAdd.city,
            country: "US",
            countryArea: ShippingAdd.countryArea,
            postalCode: ShippingAdd.postalCode,
          },
        },
      });
    }
  }, [ShippingAdd, NonCatalog]);

  React.useEffect(() => {
    if (Object.keys(selectedShippingAdd).length){
      setShippingAdd(selectedShippingAdd)
    }
  }, [selectedShippingAdd]);


  const alert = useAlert();

  const [updateCheckoutShipping] = useMutation(emwQuoteUpdateShippingMutation, {
    onCompleted({ emwQuoteUpdateShipping }) {
      if (emwQuoteUpdateShipping.errors.length === 0) {
        setvalidatemethod(true)
      } else {
        alert.show({title: emwQuoteUpdateShipping.errors[0].message },{ type: "error" });
      }
    },
    onError(errors) {
      alert.show({title: "Something went wrong!" },{ type: "error" });
    }
  });

  const handleMethodClick = (node) => {
    if (ShippingAdd && Object.keys(ShippingAdd).length) {
      setselectedShipingMethod(node.code)

      const isQuoteExist = JSON.parse(localStorage.getItem('EMWQuote'));
      const shippingAddress = {
        shippingType: "BY_ORDER",
        shippingMethod: node.code,
        shippingAddressId: ShippingAdd.id,
        newAddress: false,
      }
      updateCheckoutShipping({
        variables: {
          quoteId: isQuoteExist.id,
          manualShipping: false,
          shipping: shippingAddress,
        },
      })
    } else {
      alert.show({title: "Please select a shipping address." },{ type: "error" });
    }

  }

  return (<div>
    <p className="product-title">Choose preferred shipping method:</p>
    <div className="items">
      <div className="inner-items">
        {NonCatalog ? <div className="non-catalog-product">
          <span>
            * Ground shipment will be quoted. if this request is urgent or you require expedited shipping, please indicate the requirement in notes above prior to quote submittion.
        </span>
        </div> :
          <div className="gaq-methods">
            {shipmethod && shipmethod.map((method, index) => {
              return <div onClick={() => handleMethodClick(method)} className="shipping-list-item" key={Math.random()}>
                <div key={Math.random()} className={method.code === selectedShipingMethod ? "emw-shipp-methods active" : "emw-shipp-methods"}>
                  <span>{method.name}</span>
                </div>
              </div>
            })}
            {ShippingError !== "" ? <div className="gaq-methods-msg">{ShippingError}</div> : shipmethod && shipmethod.length === 0 ? <div className="gaq-methods-msg">No shipping address is available.</div> : null}
          </div>
        }
      </div>
    </div>
  </div>
  );
};

export default ShippingMethods;
