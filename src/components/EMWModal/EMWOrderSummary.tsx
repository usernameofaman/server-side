import "./scss/index.scss";

import React, { useState } from "react";
import downArrow from "../../images/Shape.png";
import { CartCheckoutDetailsQuery } from '../../@sdk/queries/emwAddToCartQueries';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";
import { styled } from "@material-ui/core/styles";
import { AlertManager, useAlert } from "react-alert";

interface Steps {
  stepNo: any,
  hide: any,
}
const EMWOrderSummary: React.FC<Steps> = ({ stepNo, hide }) => {
  const alert = useAlert();

  const ToBeStyledTooltip = ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ tooltip: className }} />
  );
  const StyledTooltip = styled(ToBeStyledTooltip)(({ theme }) => ({
    backgroundColor: '#25282B',
    "& .MuiTooltip-arrow": {
      color: "#25282B"
    }
  }));
  const size = window.innerWidth;
  const [expanded, setExpanded] = React.useState(size > 767 ? true : false);
  const [optionExpanded, setOptionExpanded] = React.useState({value:'',state:false});
  const [open, setOpen] = React.useState(false);
  const [toolTipValue, setToolTipValue] = useState({ value: '', state: false })

  const tempCart = localStorage.getItem("EMWCart");
  const cartData = tempCart === "" ? false : JSON.parse(tempCart);
  const tempShip = localStorage.getItem("shippingtemp");
  const shippingData = tempShip === "" ? false : JSON.parse(tempShip);
  const tempUserDetail = localStorage.getItem("contactInfoTemp");
  const userDetailData = tempUserDetail === "" ? false : JSON.parse(tempUserDetail);

  const [getCartCheckoutDetail, { data, loading }] = useLazyQuery(CartCheckoutDetailsQuery, {
    fetchPolicy: 'network-only',
    onCompleted({ emwproduct }) {
      return 0;
    },
    onError(error) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });

  React.useEffect(() => {
    if (cartData.token) {
      getCartCheckoutDetail({
        variables: {
          tokenId: cartData.token,
          bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false,
          bypassShipping : JSON.parse(localStorage.getItem('bypassShipping')) || false
        },
      })
    }
  }, [stepNo]);

  const totalAmount = data && data.emwCheckout &&
    data.emwCheckout.emwTotalPrice.totalItemPrice.amount +
    data.emwCheckout.emwTotalPrice.totalShippingPrice.amount +
    data.emwCheckout.emwTotalPrice.totalTaxPrice.amount;

  const handleTooltipClose = () => {
    setOpen(false);
    setToolTipValue({ value: '', state: false })
  };

  const handleTooltipOpen = (value) => {
    setToolTipValue({ value: value, state: !open })
    setOpen(!open);
  };

  return (
    <div className="items orderSummery">
      <ExpansionPanel className="miniCart-expansion" expanded={expanded}>
        <ExpansionPanelSummary expandIcon={
          <img src={downArrow} alt="" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => setExpanded(!expanded)}
        >
          <Typography className="miniCart-exp-heading">Order Summary</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="orderSummeryPannelDetails">
          <div>
            {cartData && cartData.lines.length !== 0 && (
              <table className="orderSummeryTabel">
                <thead>
                  <tr>
                    <th>Part No.</th>
                    <th>Item Cost</th>
                    <th className="text-center" width="30">QTY</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.lines.map((value) => {
                    return (
                      <>
                        <tr>
                          <td className="productNo">
                            {size < 767 && <StyledTooltip title={<p className="tooltip">{value.product && value.product.name}</p>} placement="bottom" arrow
                              componentsProps={{
                                tooltip: {
                                  sx: {
                                    bgcolor: 'common.black',
                                    '& .MuiTooltip-arrow': {
                                      color: 'common.black',
                                    },
                                  },
                                },
                              }}
                              PopperProps={{
                                disablePortal: true,
                              }}
                              onClose={handleTooltipClose}
                              open={value.product && value.product.emwProdVendorPartnumber === toolTipValue.value ? open : false}
                              disableFocusListener
                              disableHoverListener
                              disableTouchListener>
                              <div onClick={() => handleTooltipOpen(value.product && value.product.emwProdVendorPartnumber)}>
                                {value.product && value.product.emwProdVendorPartnumber}
                              </div>
                            </StyledTooltip>}
                            {size > 767 && <StyledTooltip title={<p className="tooltip">{value.product && value.product.name}</p>} placement="bottom" arrow>
                              <div>
                                {value.product && value.product.emwProdVendorPartnumber}
                              </div>
                            </StyledTooltip>}
                          </td>
                          <td className="textRight">
                            {value.unitPrice && "$ " + value.unitPrice.amount.toFixed(2)}
                          </td>
                          <td className="text-center">
                            {value.quantity}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="3">
                            {value.productOptions && value.productOptions.length !== 0 && <ExpansionPanel className="addedOptionPanel" onClick={() => setOptionExpanded({value:value.id,state:!optionExpanded.state})} expanded={value.id === optionExpanded.value ? optionExpanded.state : false}>
                              <ExpansionPanelSummary className="customRight" expandIcon={
                                <img src={downArrow} alt="" />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography className="miniCart-exp-heading">Added Options</Typography>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails className="">
                                {value.productOptions.map((optionsItem, index) => {
                                  if(optionsItem && optionsItem.productOption && optionsItem.productOption.emwOptName !== "NONE")
                                  return (
                                    <div className="option-list" key={index}>
                                      <p className="option-heading">{optionsItem.productOption.emwOptOptgrpid.emwOptgrpName}: {optionsItem.productOption.emwOptName}</p>
                                      <p className="item-heading option-item-heading">(Item #: {optionsItem.productOption.emwOptStocknumber})</p>
                                    </div>
                                  )
                                })}
                              </ExpansionPanelDetails>
                            </ExpansionPanel>}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>
                      <table className="mt-remove">
                        <tr>
                          <td colSpan={2} className="textRight">SubTotal</td>
                          <td width="100">{"$ " + cartData.emwTotalPrice.totalItemPrice.amount.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td colSpan={2} className="textRight">Shipping</td>
                          {stepNo > 2 && data && data.emwCheckout ? <td>{"$ " + data.emwCheckout.emwTotalPrice.totalShippingPrice.amount.toFixed(2)}</td>
                            : <td>$ 0.00</td>}
                        </tr>
                        <tr>
                          <td colSpan={2} className="textRight">Taxes</td>
                          {stepNo > 2 && data && data.emwCheckout ? <td>{"$ " + data.emwCheckout.emwTotalPrice.totalTaxPrice.amount.toFixed(2)}</td>
                            : <td>$ 0.00</td>}
                        </tr>
                        <tr>
                          <td colSpan={3} className="infotext">
                            {/* <div><span> We will contact you within 24hrs to collect tax if required by your state.</span></div> */}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2} className="textRight">ORDER TOTAL</td>
                          {stepNo > 2 && data && data.emwCheckout ? <td>{"$ " + totalAmount.toFixed(2)}</td>
                            : <td>{"$ " + cartData.emwTotalPrice.totalItemPrice.amount.toFixed(2)}</td>}
                        </tr>
                      </table>
                    </td>
                  </tr>
                </tfoot>
              </table>)}
            {stepNo > 1 && (shippingData || userDetailData || cartData) && <div className="shipTo">
              <div className="shipHeader">
                Ship To
              </div>
              <div className="shipToBody">
                <p className="mb20">
                  {userDetailData && userDetailData.firstname ? userDetailData.firstname + " " :
                    cartData.shippingAddress && cartData.shippingAddress.firstName + " "}
                  {userDetailData && userDetailData.lastname ?
                    userDetailData.lastname : cartData.shippingAddress && cartData.shippingAddress.lastName} <br />
                  {userDetailData && userDetailData.companyName ? userDetailData.companyName :
                    cartData.shippingAddress && cartData.shippingAddress.companyName} <br />
                  {cartData.shippingAddress && cartData.shippingAddress.streetAddress1 ?
                    cartData.shippingAddress.streetAddress1 :
                    shippingData && shippingData.shippingAddress.input && shippingData.shippingAddress.input.streetAddress1} <br />
                  {cartData.shippingAddress && cartData.shippingAddress.streetAddress2 ?
                    cartData.shippingAddress.streetAddress2 :
                    shippingData && shippingData.shippingAddress.input && shippingData.shippingAddress.input.streetAddress2}<br />
                  {cartData.shippingAddress && cartData.shippingAddress.city ?
                    cartData.shippingAddress.city :
                    shippingData && shippingData.shippingAddress.input && shippingData.shippingAddress.input.city},
                  {cartData.shippingAddress && cartData.shippingAddress.countryArea ?
                    cartData.shippingAddress.countryArea :
                    shippingData && shippingData.shippingAddress.input && shippingData.shippingAddress.input.countryArea} ,
                  {cartData.shippingAddress && cartData.shippingAddress.postalCode ?
                    cartData.shippingAddress.postalCode :
                    shippingData && shippingData.shippingAddress.input && shippingData.shippingAddress.input.postalCode}
                </p>
                <p>
                  {userDetailData ? userDetailData.phone : cartData.shippingAddress && cartData.shippingAddress.phone} {userDetailData ? userDetailData.phoneExtension : cartData.shippingAddress && cartData.shippingAddress.phoneExtension} <br />
                  {userDetailData && userDetailData.email ? userDetailData.email : data && data.emwCheckout && data.emwCheckout.user && data.emwCheckout.user.email} <br />
                  {userDetailData ? userDetailData.ccEmail : cartData.shippingAddress && cartData.shippingAddress.ccEmail}
                </p>
              </div>
            </div>}
            {stepNo > 3 && data && data.emwCheckout && <div className="shipTo">
              <div className="shipHeader">
                Bill To
              </div>
              <div className="shipToBody">
                <p className="mb20">
                  {data.emwCheckout.billingAddress && data.emwCheckout.billingAddress.firstName + " "}
                  {data.emwCheckout.billingAddress && data.emwCheckout.billingAddress.lastName} <br />
                  {data.emwCheckout.billingAddress && data.emwCheckout.billingAddress.companyName} <br />
                  {data.emwCheckout.billingAddress && data.emwCheckout.billingAddress.streetAddress1} <br />
                  {data.emwCheckout.billingAddress && data.emwCheckout.billingAddress.streetAddress2}<br />
                  {data.emwCheckout.billingAddress && data.emwCheckout.billingAddress.city},
                  {data.emwCheckout.billingAddress && data.emwCheckout.billingAddress.countryArea} ,
                  {data.emwCheckout.billingAddress && data.emwCheckout.billingAddress.postalCode}
                </p>
                <p>
                  {data.emwCheckout.billingAddress && data.emwCheckout.billingAddress.phone ? data.emwCheckout.billingAddress.phone + " " : '-'} 
                  {data.emwCheckout.billingAddress && data.emwCheckout.billingAddress.phoneExtension ? data.emwCheckout.billingAddress.phoneExtension : '-'} <br />
                  {data.emwCheckout.billingAddress && data.emwCheckout.billingAddress.email ? data.emwCheckout.billingAddress.email : '-'} <br />
                  {data.emwCheckout.billingAddress && data.emwCheckout.billingAddress.ccEmail ? data.emwCheckout.billingAddress.ccEmail : '-'}
                </p>
              </div>
            </div>}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default EMWOrderSummary;
