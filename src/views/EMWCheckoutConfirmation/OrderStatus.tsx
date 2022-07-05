import React, { useEffect } from "react";
import classNames from "classnames";
import useHotjar from 'react-use-hotjar';

interface OrderStatusProps {
    email: string,
    showTaxError: string,
    data: any,
    isSupplimental: boolean,
    userDetails: any;
}

const OrderStatus: React.SFC<OrderStatusProps> = (props) => {
    const { email,showTaxError,data, isSupplimental, userDetails }=props;
    const contactData=JSON.parse(localStorage.getItem('contactInfoTemp'));
    const paymentStatus=localStorage.getItem('EMWPaymentStatus');
    const totalDue=data && data.totalDue && data.totalDue.amount;
    const { identifyHotjar } = useHotjar();

    useEffect(() => {
        if(data && data.orderNumber){
            const userEmail = userDetails && userDetails.data && userDetails.data.email;
            const customerId= userDetails && userDetails.data && userDetails.data.id;
            if(userEmail){
                const userId = customerId || null; 
                identifyHotjar(userId,{
                  'email': userEmail,
                   'order number': data.orderNumber,
                   'isAnonymous': false,
                });
            }else if(contactData && contactData.email){
                const userId = contactData.email; 
                identifyHotjar(userId,{
                  'email': contactData.email,
                  'order number': data.orderNumber,
                  'isAnonymous': true,
                });
            } 
        }
    }, [userDetails, data && data.orderNumber]);

    return (
        <div className="items">  
        <div className='thankyou-section'>
            {   
                paymentStatus==="pending-offline" ?
                <>
                    {
                        (!isSupplimental) ?
                        <p className="order-placed-heading">Your order {data && data.orderNumber ? `(#${data && data.orderNumber})` : null} has been placed</p>
                        :
                        <p className="order-placed-heading">Your payment of  {`$ ${totalDue.toFixed(2)}`} is pending</p>
                    }
                    <p className="offline-text offline-first-margin-top offline-text-margin-bottom">OFFLINE payment method was chosen and we have not collected payment for this order.</p>
                    <p className="offline-text">An agent will contact you shortly to arrange your offline payment.</p>
                   
                </>
                :
                paymentStatus==="pending" ?
                <>
                    {
                        (!isSupplimental) ?
                        <p className="order-placed-heading">Your order {data && data.orderNumber ? `(#${data && data.orderNumber})` : null} has been placed</p>
                        :
                        <p className="order-placed-heading">Your payment of  {`$ ${totalDue.toFixed(2)}`} is pending</p>
                    }
                    <p className="mail-heading">Unfortunately, we are unable to accept payment at this time.</p>
                    <p className="mail-heading">A sales associate will contact you within 24hrs for payment by quick link</p>
                    <p className="mail-heading">As soon as we receive payment, your order will be processed and shipped.</p>
                </>
                :
                <>
                    {
                        (!isSupplimental) ?
                        <p className="order-placed-heading">Your order {data && data.orderNumber ? `(#${data && data.orderNumber})` : null} has been placed</p>
                        :
                        <p className="order-placed-heading">Your payment of  {`$ ${totalDue.toFixed(2)}`} has been accepted</p>
                    }
                    <p className="mail-heading">An order confirmation email has been sent to {email ? email : contactData && contactData.email }  </p>
                </>
            }
            {
                showTaxError ?
                <>
                    <p className={classNames("order-summary-payment-text", {
                        "offline-error-status-gap": paymentStatus==="pending-offline",
                        "offline-error-status-alignment" : paymentStatus==="pending-offline",
                    })}>
                        Unfortunately we are unable to calculate {showTaxError==='both' ? 'shipping and tax' : showTaxError} at this time.</p>
                    <p className={classNames("order-summary-payment-text", {
                        "offline-error-status-alignment" : paymentStatus==="pending-offline",
                    })}>A sales associate will contact you within 24hrs to arrange the details of your order.</p> 
                </>
                : null
            }
        </div>    
        </div>
    );
};

export default OrderStatus;
