import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import OrderSummary from './OrderSummary';
import Grid from '@material-ui/core/Grid';
import BillingAddress from './BillingAddress';
import Payment from './Payment';
// import EMWModel from '../../components/EMWModal';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { CartCheckoutDetailsQuery } from '../../@sdk/queries/emwAddToCartQueries';
import Loader from "../../components/Loader";
import Container from '@material-ui/core/Container';
import { getSupplementalDetails } from '../../@sdk/mutations/emwAddToCartMutations';
import { useAlert } from "react-alert";
import { GACheckoutStep } from "../../utils/Google-Analytics";
import ReactGA from 'react-ga';
import ReactSVG from "react-svg";
import loader from '../../images/emw-loader.svg';

interface PageProps {
	userDetails: any,
	nextStep: () => void,
	setInactiveNext: (status) => void;
	billingTrigger: boolean,
	isSupplimental: boolean,
	supplementalParams: any;
}

const Page: React.FC<PageProps> = props => {
	const { nextStep, setInactiveNext, billingTrigger, isSupplimental, supplementalParams } = props;
	const localData = JSON.parse(localStorage.getItem('EMWCart'));
	const [showTaxError, setShowTaxError] = useState("");
	const alert = useAlert();
	// const { data, loading } = useLazyQuery(CartCheckoutDetailsQuery, {
	// 	variables: { tokenId: localData.token }, fetchPolicy: "network-only",
	// });
	const [supplementalCheckoutDetail, { data: supplementalData, loading: supplimentalLoading }] = useMutation(getSupplementalDetails, {
		onCompleted({ emwPayByLink }) {
			if (emwPayByLink.errors.length === 0) {
				return 0;
			} else {
				alert.show({ title: emwPayByLink.errors[0].message }, { type: "error" });
			}

		},
		onError(errors) {
			alert.show({ title: "Something went wrong!" }, { type: "error" });
		},
	});

	const [getCartCheckoutDetail, { data, loading }] = useLazyQuery(CartCheckoutDetailsQuery, {
		fetchPolicy: 'network-only',
		onCompleted({ emwproduct }) {
			localStorage.setItem("EMWCart", JSON.stringify(data.emwCheckout));
			return 0;
		},
		onError(error) {
			alert.show({ title: "Something went wrong!" }, { type: "error" });
		},
	});

	useEffect(() => {
		// set  google analytics checkout final step-3 
		const linesTemp = localStorage.EMWCart === undefined ? { lines: [] } : JSON.parse(localStorage.EMWCart)
		const lines = linesTemp.lines;
		const supplementalOrder = isSupplimental;
		const checkout = (!supplementalOrder) ? data && data.emwCheckout : supplementalData && supplementalData.emwPayByLink && supplementalData.emwPayByLink.emwCheckout;

		(checkout && checkout.lines) ? GACheckoutStep(checkout.lines, 3, "") : null;

		if (window.performance) {
			if (checkout) {
				const start = window.performance.getEntriesByName(`CHECKOUT-STEP-2-START`, "mark");
				const checkoutStart = window.performance.getEntriesByName(`CHECKOUT-STEP-1-START`, "mark");
				if (start && start.length > 0) {
					const end = window.performance.mark(`CHECKOUT-STEP-2-END`);
					window.performance.measure('checkout-step-2-measure', `CHECKOUT-STEP-2-START`, `CHECKOUT-STEP-2-END`);
					const entries = window.performance.getEntriesByType('measure');

					if (entries && entries.length > 0 && entries[0].duration) {
						// Sends the timing hit to Google Analytics.
						const orderName = (supplementalOrder) ? 'Supplemental Order' : "Order";
						ReactGA.timing({
							category: 'Checkout Step Wise Timings',
							variable: `Timings For ${orderName} Token ${linesTemp.token} At Step-2 `,
							value: Math.round(entries[0].duration), // in milliseconds
							label: `Timings For ${orderName} Token ${linesTemp.token} At Step-2 `,
						});
					}
				}
				if (checkoutStart && checkoutStart.length <= 0) {
					window.performance.mark(`CHECKOUT_START`);
				}
				window.performance.mark(`CHECKOUT-STEP-3-START`);
			}
		}
	}, [supplementalData, data]);

	useEffect(() => {
		if (isSupplimental) {
			const orderNum = supplementalParams && supplementalParams[0] && supplementalParams[0].value;
			const tokenReceived = supplementalParams && supplementalParams[1] && supplementalParams[1].value;
			supplementalCheckoutDetail({
				variables: {
					ordernum: orderNum,
					token: tokenReceived,
				},
			})
		} else {
			getCartCheckoutDetail({
				variables: {
					tokenId: localData.token,
					bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false,
					bypassShipping :  JSON.parse(localStorage.getItem('bypassShipping')) || false
				},
			})
		}
	}, [isSupplimental]);

	const normalData = data && data.emwCheckout && data.emwCheckout.lines;
	const supplementData = supplementalData && supplementalData.emwPayByLink && supplementalData.emwPayByLink.emwCheckout && supplementalData.emwPayByLink.emwCheckout.lines;
	return (
		<>

			<div className="checkout-billing-section">
				{

					(loading || supplimentalLoading) ?
						<div className="product-page-details_block loader-wrapper">
							<ReactSVG path={loader} className="medium-size-loader" />
						</div>
						:
						((data && normalData.length > 0) || (supplementData && supplementData.length > 0)) ?
							<Container maxWidth="md">
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
										<p className="order-summary-payment-text">Unfortunately we are unable to calculate {showTaxError==='both' ? 'shipping and tax' : showTaxError} at this time.</p>
										<p className="order-summary-payment-text">A sales associate will contact you within 24hrs to arrange the details of your order.</p> 
									</div>
								}
								
									<OrderSummary data={(!isSupplimental) ? data.emwCheckout : supplementalData && supplementalData.emwPayByLink.emwCheckout} errorStatus={false} setShowTaxError={setShowTaxError} isSupplimental={isSupplimental} parentOrder={(!isSupplimental) ? null : supplementalData && supplementalData.emwPayByLink.parentOrder} supplementalLastStep={false}/>
								</Grid>*/}
									<Grid item xs={12} md={12}>
										<BillingAddress data={(!isSupplimental) ? data.emwCheckout : supplementalData && supplementalData.emwPayByLink.emwCheckout} nextStep={nextStep} setInactiveNext={setInactiveNext} billingTrigger={billingTrigger} {...props} />
									</Grid>
								</Grid>
							</Container>
							:

							(supplementalData && supplementalData.emwPayByLink.errors[0].message) &&
							<p className="order-summary-heading errorMsg">{supplementalData.emwPayByLink.errors[0].message}</p>

				}
			</div>


		</>
	);

}
export default Page;	