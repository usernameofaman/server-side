import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import downArrow from "../../images/Shape.png";
import whiteDownArrow from "../../images/whiteDownArrow.png";
import print from "../../images/print.png";
import ProductOptions from "./ProductOptions";
import {
  setInitOrderDetails,
  setOrderSummaryTotalValues,
  returnErrorField,
} from "./TransformData";

interface OrderSummaryProps {
  data: any;
  errorStatus: boolean;
  setShowTaxError: any;
  isSupplimental: boolean;
  parentOrder: any;
  supplementalLastStep: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = props => {
  const {
    data,
    errorStatus,
    setShowTaxError,
    isSupplimental,
    parentOrder,
    supplementalLastStep,
  } = props;
  const [orderDetail, setOrderDetail] = useState(false);
  const [toggleImage, setToggleImage] = useState(false);
  const [SummaryOpen, setSummaryOpen] = useState(true);

  const [orderItemDetails, setOrderItemDetails] = useState({
    items: null,
    tax: null,
    shipping: null,
  });
  const [shippingStateStatus] = useState(data.shippingStatus);
  const [taxStateStatus] = useState(data.taxesStatus);

  const [inputValues, setInputValues] = useState(null);

  useEffect(() => {
    const details = setInitOrderDetails(data);
    const totalValues = setOrderSummaryTotalValues(data);

    if (shippingStateStatus !== "Ready") {
      const errorField = returnErrorField(shippingStateStatus, taxStateStatus);
      if (setShowTaxError) {
        setShowTaxError(errorField);
      }
    } else {
      if (setShowTaxError) {
        setShowTaxError("");
      }
    }
    setOrderItemDetails({
      ...orderItemDetails,
      items: details.linesArray,
      tax: details.tax,
      shipping: details.shipping,
    });
    setInputValues({ ...totalValues });
  }, [data]);

  const toggle = () => {
    setToggleImage(!toggleImage);
    setOrderDetail(!orderDetail);
    setSummaryOpen(!SummaryOpen);
  };
  return (
    <>
      <div>
        {errorStatus ? (
          <div className="mb-30">
            <p className="order-summary-payment-text">
              There was a payment error which resulted in cancellation. Please
              try again.
            </p>
            <p className="order-summary-payment-text">
              If the error persists, please try a different payment method.
            </p>
          </div>
        ) : null}
        <div className="mb-30">
          <ExpansionPanel expanded={SummaryOpen} className="order-summary-expansion">
            <ExpansionPanelSummary
              expandIcon={
                !toggleImage ? (
                  <img src={downArrow} alt="" />
                ) : (
                  <img src={whiteDownArrow} alt="" />
                )
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={() => toggle()}
              className="order-panel-summary"
            >
              <Typography className="order-summary-heading">
                ORDER SUMMARY
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <div>
                  {!isSupplimental ? (
                    <div className="suppliment-order-summary space-top">
                      <p>Items</p>
                      <p
                        className={!isSupplimental ? "gold-color" : ""}
                      >{`$ ${inputValues && inputValues.itemsTotal}`}</p>
                    </div>
                  ) : (
                    <div className="suppliment-order-summary subtotal-space">
                      <p>SubTotal</p>
                      <p>{`$ ${inputValues && inputValues.itemsTotal}`}</p>
                    </div>
                  )}

                  {orderItemDetails &&
                    orderItemDetails.items &&
                    orderItemDetails.items.length > 0 &&
                    orderItemDetails.items.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="supplementBg supplemental-product-box"
                        >
                          <div key={Math.random()} className="order-summary-details"> 
                            <p key={Math.random()}>
                              <span>{item.quantity} * </span>
                              <label>
                                {item.name} {item.itemNo} 
                              </label>
                            </p>
                            <p>${item.price}</p>
                          </div>
                          {
                            (item.emwProdIsFreeship) && 
                            <div className="emw-free-ship-note" key={Math.random()}>
                              THIS ITEM SHIPS FREE 
                            </div>
                          }
                          <div key={Math.random()}>
                            {item.productOptions &&
                              item.productOptions.length > 0 && (
                                <ProductOptions key={Math.random()} data={item.productOptions} />
                              )}
                          </div>
                        </div>
                      );
                    })}

                  <div className="suppliment-order-summary">
                    <p>Shipping</p>
                    <p className={!isSupplimental ? "gold-color" : ""}>
                      {inputValues && shippingStateStatus === "Ready"
                        ? `$ ${inputValues && inputValues.shippingTotal}`
                        : "***"}
                    </p>
                  </div>
                  {inputValues &&
                  inputValues.shippingTotal &&
                  shippingStateStatus === "Ready" ? (
                    orderItemDetails &&
                    orderItemDetails.shipping &&
                    orderItemDetails.shipping.length > 0 &&
                    orderItemDetails.shipping.map((item, index) => {
                      return (
                        <>
                          <div
                            className="order-summary-details supplementBg supplemental-product-box"
                            key={index}
                          >
                            <p key={Math.random()}>
                              <span>{item.quantity} * </span>
                              {item.name}
                            </p>
                            <p key={Math.random()}>
                              {item.price !== null ? `$ ${item.price}` : "N/A"}
                            </p>
                          </div>
                          {item.residentialSurcharge ? (
                            <div className="order-summary-details supplementBg supplemental-product-box" key={Math.random()}>
                              <p>
                                <span>{item.quantity} * </span>Residential
                                Freight Delivery Fee
                              </p>
                              <p>{`$ ${item.residentialSurcharge}`}</p>
                            </div>
                          ) : null}
                        </>
                      );
                    })
                  ) : (
                    <div className="order-summary-details supplementBg supplemental-product-box">
                      <p>
                        <span>!</span>We will contact you within 24hrs to
                        arrange shipping for your order
                      </p>
                      <p>***</p>
                    </div>
                  )}

                  <div className="suppliment-order-summary">
                    <p>Tax</p>
                    <p className={!isSupplimental ? "gold-color" : ""}>
                      {inputValues && taxStateStatus === "Ready"
                        ? `$ ${inputValues && inputValues.taxTotal}`
                        : "***"}
                    </p>
                  </div>
                  {inputValues &&
                  inputValues.taxTotal &&
                  taxStateStatus === "Ready" ? (
                    orderItemDetails &&
                    orderItemDetails.tax &&
                    orderItemDetails.tax.length > 0 &&
                    orderItemDetails.tax.map((item, index) => {
                      return (
                        <div
                          className="order-summary-details supplementBg supplemental-product-box"
                          key={index}
                        >
                          <p key={Math.random()}>
                            <span>{item.quantity} * </span>
                            {item.name}
                          </p>
                          <p key={Math.random()}>
                            {item.price !== null ? `$ ${item.price}` : "N/A"}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="order-summary-details supplementBg supplemental-product-box">
                      <p>
                        <span>!</span>We will contact you within 24hrs to
                        arrange tax for your order
                      </p>
                      <p>***</p>
                    </div>
                  )}
                </div>
                <div className="order-total-space suppliment-order-summary">
                  <p>Total</p>
                  <p
                    className={!isSupplimental ? "gold-color" : ""}
                  >{`$ ${inputValues && inputValues.overAllTotal}`}</p>
                </div>
                {isSupplimental && (
                  <>
                    <div className="suppliment-order-summary">
                      <p>Amount Paid</p>
                      <p></p>
                    </div>

                    <div className="suppliment-order-summary">
                      <p className="gold-color">
                        {parentOrder && parentOrder.emwOrderId
                          ? `# ${parentOrder.emwOrderId}`
                          : "N/A"}{" "}
                      </p>
                      <p className="cross-price">{`$ ${inputValues &&
                        inputValues.amountTotal}`}</p>
                    </div>
                    {supplementalLastStep && (
                      <>
                        <div className="suppliment-order-summary">
                          <p>Amount Paid</p>
                          <p></p>
                        </div>
                        <div className="suppliment-order-summary">
                          <p className="gold-color">
                            {data && data.orderNumber
                              ? `# ${data.orderNumber}`
                              : "N/A"}{" "}
                          </p>
                          <p className="cross-price">{`$ ${inputValues &&
                            inputValues.dueTotal}`}</p>
                        </div>
                      </>
                    )}
                    <hr className="supplemental-border" />
                    <div className="suppliment-order-summary">
                      <p>Total Due</p>
                      <p className="gold-color">
                        {!supplementalLastStep
                          ? `$ ${inputValues && inputValues.dueTotal}`
                          : `$ ${inputValues && inputValues.confirmPageDue}`}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        {!orderDetail && (
          <div>
            {!isSupplimental ? (
              <>
                <div>
                  <div className="suppliment-order-summary">
                    <p>Items</p>
                    <p className="gold-color">{`$ ${inputValues &&
                      inputValues.itemsTotal}`}</p>
                  </div>
                  <div className="suppliment-order-summary">
                    <p>Shipping</p>
                    {/* <p>{inputValues && inputValues.shippingTotal!==null ? `$ ${inputValues.shippingTotal}` : "***"}</p> */}
                    <p className="gold-color">
                      {inputValues && shippingStateStatus === "Ready"
                        ? `$ ${inputValues && inputValues.shippingTotal}`
                        : "***"}
                    </p>
                  </div>
                  <div className="suppliment-order-summary">
                    <p>Tax</p>
                    {/* <p>{inputValues && inputValues.taxTotal!==null ? `$ ${inputValues.taxTotal}` : "***"}</p> */}
                    <p className="gold-color">
                      {inputValues && taxStateStatus === "Ready"
                        ? `$ ${inputValues && inputValues.taxTotal}`
                        : "***"}
                    </p>
                  </div>
                </div>
                <div className="suppliment-order-summary">
                  <p>Total</p>
                  <p className="gold-color">{`$ ${inputValues &&
                    inputValues.overAllTotal}`}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="suppliment-order-summary">
                    <p>Subtotal</p>
                    <p>{`$ ${inputValues && inputValues.itemsTotal}`}</p>
                  </div>
                  <div className="suppliment-order-summary">
                    <p>Shipping</p>
                    <p>
                      {inputValues && shippingStateStatus === "Ready"
                        ? `$ ${inputValues && inputValues.shippingTotal}`
                        : "***"}
                    </p>
                  </div>
                  <div className="suppliment-order-summary">
                    <p>Duties/Tax</p>
                    <p>
                      {inputValues && taxStateStatus === "Ready"
                        ? `$ ${inputValues && inputValues.taxTotal}`
                        : "***"}
                    </p>
                  </div>
                </div>
                <div className="suppliment-order-summary">
                  <p>Total</p>
                  <p>{`$ ${inputValues && inputValues.overAllTotal}`}</p>
                </div>
                <hr className="supplemental-border" />
                <div className="suppliment-order-summary">
                  <p>Amount Paid</p>
                  <p></p>
                </div>

                <div className="suppliment-order-summary">
                  <p className="gold-color">
                    {parentOrder && parentOrder.emwOrderId
                      ? `# ${parentOrder.emwOrderId}`
                      : "N/A"}{" "}
                  </p>
                  <p className="cross-price">{`$ ${inputValues &&
                    inputValues.amountTotal}`}</p>
                </div>
                {supplementalLastStep && (
                  <>
                    <div className="suppliment-order-summary">
                      <p>Amount Paid</p>
                      <p></p>
                    </div>
                    <div className="suppliment-order-summary">
                      <p className="gold-color">
                        {data && data.orderNumber
                          ? `# ${data.orderNumber}`
                          : "N/A"}{" "}
                      </p>
                      <p className="cross-price">{`$ ${inputValues &&
                        inputValues.dueTotal}`}</p>
                    </div>
                  </>
                )}
                <hr className="supplemental-border" />
                <div className="suppliment-order-summary">
                  <p>Total Due</p>
                  <p className="gold-color">
                    {!supplementalLastStep
                      ? `$ ${inputValues && inputValues.dueTotal}`
                      : `$ ${inputValues && inputValues.confirmPageDue}`}
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default OrderSummary;
