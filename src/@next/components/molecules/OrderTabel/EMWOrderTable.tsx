import { Trans } from "@lingui/react";
import React from "react";
import Media from "react-media";
import { ThemeContext } from "styled-components";

// import { Thumbnail } from "..";
// import { generateProductUrl } from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";
import "./scss/index.scss";
// import { showTrackLink } from './renderTrackOrder';
import { CircularProgress } from '@material-ui/core';
import ReactSVG from "react-svg";
import rightArrow from "../../../../images/right-arrow.svg";
import moment from 'moment';
import InfiniteScroll from "react-infinite-scroll-component";

const header = (matches: boolean) => (
  <S.HeaderRow className='header-text emwOrderTableCol '>
    <S.IndexNumber>
      <Trans id="Order #" />
    </S.IndexNumber>

    <div className='placedOn'>
      <Trans id="Placed On" />
    </div>
    <div>
      <Trans id="Item Qty" />
    </div>
    <div>
      <Trans id="TotalCost  " />
    </div>
    <div className='addressCol'>
      <Trans id="Ship to:" />
    </div>
    <div className='deliverCol'>
      <Trans id="Tracking" />
    </div>
    <div className='invoiceCol'>
      <Trans id="Open Invoice" />
    </div>
    {/*<div className='invoiceCol details'>
      <Trans id="Details" />
    </div>*
    <S.Status>
      <Trans id="Status" />
    </S.Status> */}
  </S.HeaderRow>
);

const mobileViewheader = (matches: boolean) => (
  <S.HeaderRow className='header-text emwOrderTableCol '>
    
    <div className='mobileOnly placedOn'>
      <span><Trans id="Order Number" /></span>
      <span className='header-text__light'> <Trans id="Tracking #" /></span>
    </div>
    
    <div className='mobileOnly placedOn'>
      <span><Trans id="Placed On" /></span>
       <span className='header-text__light'><Trans id="View Invoice" /></span>
    </div>
  </S.HeaderRow>
);

export const OrderTabel: React.FC<IProps> = ({ orders, history, loading, nextPage, handleClickOpen }: any) => {
  const theme = React.useContext(ThemeContext);
  const ordersLength = orders && orders.emwOrders && orders.emwOrders.edges.length;
  const hasMore = orders && orders.emwOrders && orders.emwOrders.pageInfo.hasNextPage;
  const loader = () => {
    return (
      <S.Row className="table-row order-history-progress">
        <CircularProgress />
      </S.Row>
    );
  }
  return (
    <InfiniteScroll
      dataLength={ordersLength > 0 ? ordersLength : 0}
      next={nextPage}
      hasMore={hasMore ? true : false}
      loader={loader()}
      height={400}
    >
      <S.Wrapper>
        <Media
          query={{
            minWidth: theme.breakpoints.mediumScreen,
          }}
        >
          {(matches: boolean) => {
            return (
              <>
                <S.Row className="emwOrderHistoryHeaderRow">{window.innerWidth < 767 ? mobileViewheader(matches) :header(matches)}</S.Row>
                {
                  (loading) ?

                    <S.Row className="table-row order-history-progress">
                      <CircularProgress />
                    </S.Row>

                    :
                    orders && orders.emwOrders && orders.emwOrders.edges.length > 0 ?
                      orders.emwOrders.edges.map(order => {
                        //   const date = new Date(order.node.created);
                        const resultData = order.node;
                        const isShippingAddress = resultData && resultData.orderCheckouts && resultData.orderCheckouts[0].shippingAddress;
                        const shipAddress = isShippingAddress ? `${isShippingAddress.streetAddress1} ${isShippingAddress.streetAddress2}, ${isShippingAddress.city}, ${isShippingAddress.countryArea}` : "N/A";

                        const shippingType = resultData && resultData.orderCheckouts && resultData.orderCheckouts[0].shippingType;

                        // tracking info
                        const orderTracking = resultData && resultData.orderCheckouts && resultData.orderCheckouts[0].orderTracking;
                        const lineTracking = resultData && resultData.orderCheckouts && resultData.orderCheckouts[0].lines;


                        const finalPrice = resultData && resultData.totalPrice && resultData.totalPrice.amount;
                        return (
                          <S.Row
                            key={Math.random()}
                            className="table-row emwOrderTableCol tableHeight"
                          //   onClick={evt => {
                          //     evt.stopPropagation();
                          //     history.push(`/order/${order.node.token}`);
                          //   }}
                          >
                            <div>{resultData.emwOrderId ? resultData.emwOrderId : "N/A"}</div>
                            {window.innerWidth > 767 &&<div className='placedOn'>{resultData.createdAt ? moment(resultData.createdAt).utcOffset('-0500').format('MM/DD/YYYY') : "N/A"}</div>}
                            <div>{resultData.totalQuantity ? resultData.totalQuantity : "N/A"}</div>
                            <div>{finalPrice ? `$ ${finalPrice.toFixed(2)}` : "N/A"}</div>
                            <div className='addressCol'>{shipAddress}</div>
                            <div className='deliverCol mobileOnly'>
                            <span>{window.innerWidth < 767 &&<>{resultData.emwOrderId ? resultData.emwOrderId : "N/A"}</>}</span>
                              <>
                                {
                                  (shippingType === "BY_ORDER") ?

                                    <>
                                      {
                                        orderTracking && orderTracking.length > 0 ?

                                          orderTracking.map((link, index) => {
                                            return (
                                              <>
                                                {
                                                  link.trackingUrl ?
                                                    <a key={index} href={link.trackingUrl} target="_blank" className="order-table-underline">{link.trackingNumber}</a>
                                                    :
                                                    <span key={index}>{"N/A"}</span>
                                                }
                                              </>
                                            );
                                          })

                                          :
                                          <span>{"N/A"}</span>
                                      }
                                    </>
                                    :
                                    <>
                                      {
                                        lineTracking && lineTracking.length > 0 ?

                                          lineTracking.map((link, index) => {
                                            if (link && link.lineTracking) {
                                              return (
                                                <>
                                                  {
                                                    link.lineTracking[0] && link.lineTracking[0].trackingUrl ?
                                                      <a key={index} href={link.lineTracking[0] && link.lineTracking[0].trackingUrl} target="_blank" className="order-table-underline">{link.lineTracking[0] && link.lineTracking[0].trackingNumber}</a>
                                                      :
                                                      <span key={index}>{"N/A"}</span>
                                                  }
                                                </>
                                              );
                                            }
                                          })
                                          :
                                          <span>{"N/A"}</span>
                                      }
                                    </>
                                }
                              </>
                              {/* {
                          (showTrackLink(order.placedOn)) ? <span>Track Order</span> : null
                        } */}
                            </div>

                            <div className="invoiceCol mobileOnly">
                              <span>
                            {window.innerWidth < 767 &&<>{resultData.createdAt ? moment(resultData.createdAt).utcOffset('-0500').format('MM/DD/YYYY') : "N/A"}</>}
                            </span>
                              <>
                              {
                                resultData.printInvoice ?
                                  // <a className="order-table-underline" href={resultData.printInvoice}>Print Invoice</a>
                                  <span className="order-table-underline" onClick={() => handleClickOpen(resultData.emwOrderId)}>View Invoice</span>
                                  :
                                  "N/A"
                              }
                              </>
                            </div>
                             {/*<div className="invoiceCol mobileOnly details"><img alt="" src={rightArrow} /></div>
                            {matches ? (
                        <>
                          <div>
                            {order.node.lines
                              .slice(0, 5)
                              .map((product: any) => (
                                <span
                                  key={product.variant.product.id}
                                  onClick={evt => {
                                    evt.stopPropagation();
                                    history.push(
                                      generateProductUrl(
                                        product.variant.product.id,
                                        product.variant.product.name
                                      )
                                    );
                                  }}
                                >
                                  <Thumbnail source={product} />
                                </span>
                              ))}
                          </div>
                          <div>
                            {`${date.getMonth() +
                              1}/${date.getDate()}/${date.getFullYear()}`}
                          </div>
                          <div>{order.node.total.gross.localized}</div>
                        </>
                      ) : (
                        ""
                      )} */}
                          </S.Row>
                        );
                      })
                      :
                      <S.Row className="table-row emwOrderTableCol">No Order Found</S.Row>
                }
              </>
            );
          }}
        </Media>
      </S.Wrapper>
    </InfiniteScroll>
  );
};
