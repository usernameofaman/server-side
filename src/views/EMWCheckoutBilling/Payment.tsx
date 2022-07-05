import "./scss/index.scss";
import React, { useState, useRef, useEffect } from "react";
import {EMWCheckoutPayment} from '../EMWCheckoutPayment';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { Radio, RadioGroup } from '@material-ui/core';
import downArrow from "../../images/Shape.png";
import { TextField } from "../../components/index";
import Checkbox from '@material-ui/core/Checkbox';
import  { history } from "../../history";
import whiteCross from "../../images/cross-white-shape.svg";
import ReactSVG from "react-svg";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from "../../components";
import { useUserDetails } from "@sdk/react";
import { useMutation } from '@apollo/react-hooks';
import { useAlert } from "react-alert";
import { CreateOfflinePaymentMutation } from "../../@sdk/mutations/emwOfflinePaymentMutations";
import loader from '../../images/emw-loader.svg'
import ErrorModal from '../../components/OverlayManager/ErrorModal';
import { cartExpiredMessage } from "../../constants";

interface PaymentProps {
    data: any,
    nextStep:()=> void,
    setErrorStatus: any,
}

const Payment: React.FC<PaymentProps> = props => {
    const { data, nextStep, setErrorStatus }=props;
    const alert = useAlert();
    const [inputValues,setInputValues]=useState({
        poNumber: "",
        note: "",
    })
    const [termsCheckbox,setTermsCheckbox]=useState(false);
    const [showWarningError,setShowWarningError]=useState(false);
    const [offlinePayment,setOfflinePayment]=useState(false);
    const [disableButton,setDisableButton]=useState(false);
    const [loggedIn,setLoggedIn]=useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const userDetails= useUserDetails();

    useEffect(() => {
        const userEmail = userDetails && userDetails.data && userDetails.data.email;
        if (userEmail) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [userDetails.data]);

    const onTextChange=(e)=>{
        const { name, value }= e.target;
        setInputValues({...inputValues,[name]: value });
    }

    const myRef = useRef(null);
    const scrollToRef = () => {
        myRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        });
    }
    const executeScroll = () => { scrollToRef() }

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

    const [createOfflinePayment,{ loading: mutationLoader}] = useMutation(CreateOfflinePaymentMutation, {
        onCompleted({ emwOfflinePaymentCheckout }) {
            if (emwOfflinePaymentCheckout.errors.length === 0) {
                localStorage.setItem('EMWClearCart',"true");
                // localStorage.setItem('EMWPaymentStatus','pending-offline');
                clearData()
                nextStep();
            } else {
                setDisableButton(false);
                if(emwOfflinePaymentCheckout.errors[0].message === cartExpiredMessage){
                    setErrorModalOpen(true);
                    setErrorMessage(cartExpiredMessage);
                }
                alert.show({ title: emwOfflinePaymentCheckout.errors[0].message }, { type: "error" });
            }
        },
        onError(error) {
            setDisableButton(false);
            alert.show({ title: "Something went wrong!" }, { type: "error" });
        },
    });

    const handleOfflinePayment=()=>{
        if(termsCheckbox){
            setShowWarningError(false);
            setDisableButton(true);
            // mutation call
            const customerEmail = localStorage.getItem('ImpersonatedCustomerEmail');
            // we do not require to call impersonated mutation call anymore as we are doing this with token
            if(customerEmail && customerEmail.length){
                createOfflinePayment({
                    variables: {
                        checkoutId: data && data.id,
                        paymentMode: "Offline",
                        customerPurchaseOrderNumber: inputValues.poNumber,
                        customerNote: inputValues.note,
                        onBehalfEmail: customerEmail,
                        bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false
                    },
                })
            }else{
                createOfflinePayment({
                    variables: {
                        checkoutId: data && data.id,
                        paymentMode: "Offline",
                        customerPurchaseOrderNumber: inputValues.poNumber,
                        customerNote: inputValues.note,
                        bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false
                    },
                })
            }
        }else{
            setShowWarningError(true);
            executeScroll();
        }
    }

    return(
		<div className="">
            <div>
                <>
                <div className="supplementBg supplemental-product-box">
                    <p className="payment-bottom-space payment-heading"> Add PO# or NOTE to order (optional) </p>
                    <ExpansionPanel className="miniCart-expansion supplement-Summary-expansion payment-bottom-space">
                        <ExpansionPanelSummary
                            expandIcon={
                                <img src={downArrow} alt="" />
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className="miniCart-exp-heading orderSummary-exp-heading payment-expansion-heading">Purchase Order Number</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <p className="option-heading payment-minor-bottom-space">
                                You may enter your own purchase number for your records here. This number is not used by Electric Motor Wholesale Inc, it is only for your reference.
                            </p>
                            <div className="payment-textbox">
                            <TextField
                                name="poNumber"
                                placeholder="PO #"
                                type="text"
                                onChange={(e)=>onTextChange(e)}
                            />
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel className="miniCart-expansion supplement-Summary-expansion">
                        <ExpansionPanelSummary
                            expandIcon={
                                <img src={downArrow} alt="" />
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className="miniCart-exp-heading orderSummary-exp-heading payment-expansion-heading">Note</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <textarea name="note" className="payment-text-area" rows={8} placeholder="Enter Note Here"  onChange={(e)=>onTextChange(e)}></textarea>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
                <div ref={myRef}></div>
                {
                    showWarningError && 
                    <div className="terms-warning" >
                        <p>Please agree to below terms to proceed with payment</p>
                        <ReactSVG
                            path={whiteCross}
                            className="white-cross"
                        />
                    </div>
                }
                <div className='terms-condition-section'>
                        <Checkbox
                            checked={termsCheckbox}
                            onChange={(event) => setTermsCheckbox(event.target.checked)}
                            name="termsCheckbox"
                            classes={{ root: 'customcheckboxBorder' }}
                            style ={{
                                color: "#9FAEC1",
                            }}
                        />
                        <p>I agree to the <a href='/page/terms-condition'  target="_blank">Terms and Conditions</a> and the <a href='/page/refund-policy'  target="_blank">Refund and Cancellation</a> Policy</p>
                </div>
                {
                    (loggedIn) && ''
                    // <div>
                    //     <FormControlLabel
                    //         control={
                    //         <Checkbox
                    //             checked={offlinePayment}
                    //             onChange={(event)=> setOfflinePayment(event.target.checked)}
                    //             name="checkedB"
                    //             style ={{
                    //                 color: "#9FAEC1",
                    //             }}
                    //         />
                    //         }
                    //         classes={{ root: 'offline-mode-checkbox' }}
                    //         label="I have a pre-existing agreement with EMW for offline payment"
                    //     />
                    // </div>
                }
                    <div className="payment-card-top-gap">
                        <p className="order-summary-heading mt-12 selectPaymentMethod">PAYMENT METHOD</p>
                        <RadioGroup aria-label="gender" name="gender1" value={offlinePayment ? 'offlinePayment' : 'creditCard'} className="creditCardRadioButton" >
                            <FormControlLabel value="creditCard" control={<Radio color="primary" onClick={()=>setOfflinePayment(false)}/>} label="Credit Card" />
                            <FormControlLabel value="offlinePayment" control={<Radio color="primary" onClick={()=>setOfflinePayment(true)}/>} label="Offline Payment" />
                        </RadioGroup>
                        {(!offlinePayment) && <EMWCheckoutPayment data={data} nextStep={nextStep} setErrorStatus={setErrorStatus} additionalDetails={inputValues} setTermsError={setShowWarningError} termsCheckbox={termsCheckbox} executeScroll={executeScroll}/>}
                    </div>
                    {
                    (offlinePayment) &&
                    <div>
                        {
                            offlinePayment ? 
                                (mutationLoader) ?
                                <div className="product-page-details_block loader-wrapper offline-payment-loader">
                                    <ReactSVG path={loader} className="small-size-loader" />
                                </div>
                                :
                                <div className="checkout-form__button payment-button-space paymentBtn offline-submit-btn active">
                                    <p className="offlinePaymentText">I have a pre-existing agreement with Electric Motor Wholesale Inc. to complete payment via other offline method.</p>
                                    <Button disabled={disableButton} onClick={handleOfflinePayment}>
                                        SUBMIT ORDER
                                    </Button>
                                </div>
                            : null
                        }
                    </div>
                }
                <ErrorModal body={errorMessage} setErrorModalOpen={setErrorModalOpen} open={errorModalOpen} handleClose={()=> setErrorModalOpen(!errorModalOpen)}/>
                
                </> 
            </div>
        </div>
	);

}
export default Payment;	