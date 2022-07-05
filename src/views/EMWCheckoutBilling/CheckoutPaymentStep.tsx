import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import OrderSummary from './OrderSummary';
import Grid from '@material-ui/core/Grid';
import Payment from './Payment';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { CartCheckoutDetailsQuery } from '../../@sdk/queries/emwAddToCartQueries';
import Loader from "../../components/Loader";
import Container from '@material-ui/core/Container';
import { getSupplementalDetails } from '../../@sdk/mutations/emwAddToCartMutations';
import { useAlert } from "react-alert";
import ReactGA from 'react-ga';
import ReactSVG from "react-svg";
import loader from '../../images/emw-loader.svg';

interface BillingAddressProps {
	nextStep: () => void,
	isSupplimental: boolean,
	supplementalParams: any;
}
const CheckoutPaymentStep: React.FC<BillingAddressProps> = props => {
	const { nextStep, isSupplimental, supplementalParams } = props;
	const alert = useAlert();
	const localData = JSON.parse(localStorage.getItem('EMWCart'));
	// const { data, loading } = useQuery(CartCheckoutDetailsQuery, {
	// 	variables: { tokenId: localData.token }, fetchPolicy: "network-only",
	// });
	const [getCartCheckoutDetail, { data , loading}] = useLazyQuery(CartCheckoutDetailsQuery, {
		fetchPolicy: 'network-only',
		onCompleted({emwproduct}) {
			localStorage.setItem("EMWCart", JSON.stringify(data.emwCheckout));
			return 0;
		},
		onError(error) {
			alert.show({title: "Something went wrong!"},{ type: "error" });
		},
	});
	const [errorStatus, setErrorStatus] = useState(null);
	const [showTaxError, setShowTaxError] = useState("");
	const [supplementalCheckoutDetail, { data: supplementalData , loading: supplimentalLoading}] = useMutation(getSupplementalDetails, {
	    onCompleted({ emwPayByLink }) {
	    if(emwPayByLink.errors.length===0)
	    {
			return 0;
	    }else{
			alert.show({title: emwPayByLink.errors[0].message},{ type: "error" });
	    }
	     
	    },
	    onError(errors) {
		  alert.show({title: "Something went wrong!"},{ type: "error" });
	    },
	});

	useEffect(() => {
		if(isSupplimental){
   			const orderNum=supplementalParams && supplementalParams[0] && supplementalParams[0].value;
			const tokenReceived=supplementalParams && supplementalParams[1] && supplementalParams[1].value;
			supplementalCheckoutDetail({
				variables: {
					ordernum:  orderNum,
					token: tokenReceived,
				},
			})
		}else{
			getCartCheckoutDetail({
				variables: {
					tokenId: localData.token,
					bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false,
					bypassShipping :  JSON.parse(localStorage.getItem('bypassShipping')) || false
				},
			})
		}
	 }, [isSupplimental]);

	useEffect(() => {
		if(window.performance){
			const start=window.performance.getEntriesByName(`CHECKOUT-STEP-3-START`, "mark");
			const supplementalOrder=isSupplimental;
			const checkout=(!supplementalOrder) ? data && data.emwCheckout : supplementalData && supplementalData.emwPayByLink && supplementalData.emwPayByLink.emwCheckout ;
			if(checkout){
				if (start && start.length>0)
				{
					const end=window.performance.mark(`CHECKOUT-STEP-3-END`);
					window.performance.measure('checkout-step-3-measure', `CHECKOUT-STEP-3-START`, `CHECKOUT-STEP-3-END`);
					const entries=window.performance.getEntriesByType('measure');
				
					if(entries && entries.length>0 && entries[0].duration)
					{
						// Sends the timing hit to Google Analytics.
						const orderName=(supplementalOrder) ? 'Supplemental Order' : "Order" ;
						ReactGA.timing({
						category: 'Checkout Step Wise Timings',
							variable: `Timings For ${orderName} Token ${checkout.token} At Step-3 `,
							value: Math.round(entries[0].duration), // in milliseconds
							label: `Timings For ${orderName} Token ${checkout.token} At Step-3 `,
						});
					}
				}
			}
			window.performance.mark(`CHECKOUT-STEP-4-START`);
		}
	}, [supplementalData,data]);

	const normalData=data && data.emwCheckout && data.emwCheckout.lines;
	const supplementData=supplementalData && supplementalData.emwPayByLink && supplementalData.emwPayByLink.emwCheckout && supplementalData.emwPayByLink.emwCheckout.lines;
	return (
		<>
			<div className="items">
				<div className="checkout-billing-section">
					{

						(loading || supplimentalLoading) ? 
						<div className="product-page-details_block loader-wrapper">
							<ReactSVG path={loader} className="medium-size-loader" />
						</div> : 
						((data && normalData.length > 0) || (supplementData && supplementData.length > 0) ) &&
							// <Container maxWidth="md">
								<Grid container spacing={3}>
									{
										isSupplimental && 
										<Grid item xs={12} md={12} className="supplementalHeader">
											<div className="supplementalHeading">
												SUPPLEMENTAL CHECKOUT
											</div>
											<div className="supplemental-orderId">
												{supplementalData && `# ${supplementalData.emwPayByLink.emwCheckout.orderNumber}`}
											</div>
										</Grid>
									}
									{/*<Grid item xs={12} md={5}>
										{
											showTaxError &&
											<div className="mb-30">
												<p className="order-summary-payment-text">Unfortunately we are unable to calculate {showTaxError === 'both' ? 'shipping and tax' : showTaxError} at this time.</p>
												<p className="order-summary-payment-text">A sales associate will contact you within 24hrs to arrange the details of your order.</p>
											</div>
										}
										<OrderSummary data={(!isSupplimental) ? data.emwCheckout : supplementalData && supplementalData.emwPayByLink.emwCheckout} errorStatus={errorStatus} setShowTaxError={setShowTaxError} isSupplimental={isSupplimental} parentOrder={(!isSupplimental) ? null : supplementalData && supplementalData.emwPayByLink.parentOrder} supplementalLastStep={false}/>
									</Grid>
									<Grid item xs={12} md={2} className="d-sm-none"></Grid>*/}
									<Grid item xs={12} md={12}>
										<Payment data={(!isSupplimental) ? data.emwCheckout : supplementalData && supplementalData.emwPayByLink.emwCheckout} nextStep={nextStep} setErrorStatus={setErrorStatus} />
									</Grid>
								</Grid>
							// </Container>
					}
				</div>
			</div>
		</>
	);

}
export default CheckoutPaymentStep;	