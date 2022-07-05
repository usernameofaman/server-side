import React, { useState, useEffect } from "react";
import { TextField, Form } from "../../components";
import Button from '@material-ui/core/Button';
import { maybe } from "@utils/misc";
import Loader from "../../components/Loader";

interface TrackOrderProps {
    orderID: any,
    nextStep: any,
    loading: boolean,
}

const TrackOrder: React.FC<TrackOrderProps> = props => {
    const { orderID,nextStep,loading } = props;
    const [email, setEmail] = useState(null);
    const [orderId, setOrderId] = useState(orderID && orderID);
    const formSubmit=(event)=>{
        event.preventDefault();
        if(email && orderId){
            nextStep(orderId,email);
        }
    }
    return (
        <>
            <div className="order-tracking-heading track-heading-gap">
                TRACK ORDER STATUS
			</div>
            <div className="order-track-section">
                <Form
                    errors={maybe(() => [], [])}
                    onSubmit={formSubmit}
                >
                    <label className="emw-label">Order #</label>
                    <TextField
                        name="order"
                        placeholder="Order #"
                        type="text"
                        onChange={(event) => {
                            setOrderId(event.target.value);
                        }}
                        value={orderId}
                    />
                    <label className="emw-label">Email </label>
                    <TextField
                        name="email"
                        autoComplete="Email"
                        placeholder="Email"
                        type="email"
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <div className="findOrderBtn btn-center">
                        <Button type="submit" disabled={(email && orderId) ? false : true}>
                            { loading ? 
                                <div className='add-to-cart-Loader tracking-loader-padding'>
                                    <Loader/>
                                </div>	
                            : "TRACK ORDER" }
                        </Button>
                    </div>
                </Form>
            </div>
            
        </>);

}
export default TrackOrder;	