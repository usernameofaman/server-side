import React, { useState, useEffect } from "react";
import ReactSVG from "react-svg";
import rightImg from "../../images/right-arrow.svg";
import { setInitOrderDetails, reviewTrackingItems } from './handler';
import Loader from "../../components/Loader";
import { merchantEmail, merchantPhone, merchantHours} from './constants';

interface OrderDetailsProps {
    orderID: any,
    loggedIn: boolean,
    data: any,
    loading: boolean,
}

const OrderDetails: React.FC<OrderDetailsProps> = props => {
    const { orderID, loggedIn, data, loading } = props;
    const [inputValues, setInputValues] = useState({
        orderId: orderID,
        items: null,
        shippingDetails: null,
    })
    const [isOrderValid, setIsOrderValid] = useState(false);
    const [allItemsTrackingMiss, setAllItemsTrackingMiss] = useState(false);

    useEffect(() => {
        if (data && data.emwOrder) {
            const initValues = setInitOrderDetails(data.emwOrder);
            setIsOrderValid(true);
            setInputValues({ ...inputValues, items: initValues.itemDetails, shippingDetails: initValues.shippingDetails, orderId: initValues.orderId });
            // check is all items tracking present or not
            const allItemsTracking = reviewTrackingItems(initValues.itemDetails);
            setAllItemsTrackingMiss(allItemsTracking);

        } else {
            setIsOrderValid(false);
        }
    }, [data]);

    const ErrorMessage = () => {
        return (
            <>
                <p className="tracking-error-title">We are unable to display order tracking  information at this time.</p>
                <p className="tracking-error-title2">Please try again later or call customer service.</p>
                <p className="tracking-merchant-service-title">Customer Service</p>
                <p className="tracking-merchant-details">Email: ({merchantEmail})</p>
                <p className="tracking-merchant-details">Phone: ({merchantPhone})</p>
                <p className="tracking-merchant-details">Hours: ({merchantHours})</p>
            </>
        )
    }

    return (
        <>
            {
                loading ?
                    <Loader />
                    :
                    <>
                        {
                            isOrderValid ?

                                (!allItemsTrackingMiss) ?
                                    <>
                                        <div className="order-tracking-heading order-id-gap">
                                            ORDER #: {inputValues.orderId}
                                        </div>
                                        {
                                            loggedIn &&
                                            <div>
                                                <p className="order-tracking-heading shipping-head-gap">SHIPPING TO:</p>
                                                <div className="order-shipping-details">
                                                    <p>{inputValues.shippingDetails && inputValues.shippingDetails.name}</p>
                                                    <p>{inputValues.shippingDetails && inputValues.shippingDetails.email}</p>
                                                    <p>{inputValues.shippingDetails && inputValues.shippingDetails.addressLine1}</p>
                                                    <p>{`${inputValues.shippingDetails && inputValues.shippingDetails.addressLine2} ${inputValues.shippingDetails && inputValues.shippingDetails.city}, ${inputValues.shippingDetails && inputValues.shippingDetails.countryArea}, ${inputValues.shippingDetails && inputValues.shippingDetails.postalCode}`}</p>
                                                </div>
                                            </div>
                                        }

                                        <div>
                                            <p className="order-tracking-heading">ITEMS:</p>
                                            {
                                                inputValues.items && inputValues.items.length > 0 && inputValues.items.map(item => {
                                                    return (
                                                        <div className="order-item-box">
                                                            <p className="order-item-name">{item.name}</p>
                                                            {
                                                                item.upsStatus == null ?
                                                                    <>
                                                                        <p className="order-item-details">Status: {item.status}</p>
                                                                        <p className="order-item-details">Tracking #: {item.tracking}</p>
                                                                        <p className="order-item-details">Pickup Date: {item.arrival}</p>
                                                                        <p className="order-item-details">Method: {item.method}</p>
                                                                        <div className="order-item-detail-section">
                                                                            <a href={item.trackingUrl} target="_blank" className="order-item-details order-item-detailed">View Detailed Tracking</a>
                                                                            <div>
                                                                                <ReactSVG path={rightImg} className="right-arrow" />
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <ErrorMessage />
                                                            }

                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </>
                                    :
                                    <div className="order-id-gap">
                                        <ErrorMessage />
                                    </div>
                                :
                                <p className='wrong-order-id'>The order number you entered was invalid.</p>
                        }

                    </>
            }

        </>
    );

}
export default OrderDetails;