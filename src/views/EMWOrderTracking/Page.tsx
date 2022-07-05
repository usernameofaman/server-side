import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import OrderDetails from "./OrderDetails";
import EMWOrderTrackingModal from '../../components/EMWModal/EMWOrderTrackingModal';
import TrackOrder from "./TrackOrder";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { OverlayContext } from "../../components";
import { GetBillingAddressQuery } from '../../@sdk/queries/emwOrderTrackingQueries';
import { useLazyQuery } from '@apollo/react-hooks';
import { useAlert } from "react-alert";
import { history } from '../../history';
import ReactGA from 'react-ga';

interface PageProps {
	orderId: any,
	userDetails: any,
}

const Page: React.FC<PageProps> = props => {
	const { orderId, userDetails } = props;
	const alert = useAlert();
	const [openModal, setOpenModal] = useState(true);
	const [step, setStep] = useState(1);

	const [loggedIn, setLoggedIn] = useState(false);
	const [orderData, setOrderData] = useState(null);
	const [loading, setLoading] = useState(false);

	const [getOrderDetails] = useLazyQuery(GetBillingAddressQuery, {
		fetchPolicy: 'network-only',
		onCompleted(data) {
			if(data && data.emwOrder)
			{
				setOrderData({...data});
				
			}else{
				setOrderData(null);
			}
			if(!loggedIn){
				setStep(2);
			}
			setLoading(false);
		},
		onError(error) {
			setLoading(false);
			alert.show({title: "Something went wrong!"},{ type: "error" });
		},
	});

	useEffect(() => {
		const userEmail = userDetails && userDetails.data && userDetails.data.email;
		if (userEmail && orderId) {
			setLoading(true);
			setLoggedIn(true);
			getOrderDetails({
				variables: {
					orderNum: orderId,
				},
			})
		} else {
			setLoggedIn(false);
		}
	}, [userDetails.data]);

	useEffect(() => {
		// page timings 
		if (window.performance) {
			const timeSincePageLoad = Math.round(performance.now());
			ReactGA.timing({
				category: 'Tracking Page Load Time',
				variable: `${location.pathname}`,
				value: timeSincePageLoad, // in milliseconds
				label: window.location.pathname
			});
		}
	},[])
	 


	const onAccountCreateClick=(overlayContext)=>{
		setOpenModal(false);
		history.push('/');
		localStorage.setItem("ischeckedIn", "false");
		setTimeout(() => { 
			overlayContext.show(
				"register",
				"right"
			);
		}, 1000);
		
	}

	const nextStepHandler=(orderId,dataEmail)=>{
		setLoading(true);
		getOrderDetails({
			variables: {
				orderNum: orderId,
				email: dataEmail,
			},
		})
	}

	const trackingButtonHandler=()=>{
		if(!loggedIn){
			setStep(1);
		}
	}

	const closeModalHandler=()=>{
		setOpenModal(false);
		history.push('/');
	}

	return (
		<>

			<div>
				<OverlayContext.Consumer>
					{
						overlayContext => (
							<>
							<EMWOrderTrackingModal onAccountCreateClick={onAccountCreateClick} overlayContext={overlayContext} Mopen={openModal} hide={() => closeModalHandler()} leftButtonText="Tracking" rightButtonText="create an account" showLeftButton={(step === 1) ? false : true} userLoggedIn={loggedIn} trackingButtonHandler={trackingButtonHandler}>

								<Container maxWidth="md">
									<Grid container spacing={3}>
										<Grid item xs={12} md={3} className="d-sm-none"></Grid>
										<Grid item xs={12} md={6} >
											{
												loggedIn ?
													<OrderDetails loading={loading} data={orderData} orderID={orderId} loggedIn={loggedIn} />
													:

													(step === 1) ?
														<TrackOrder orderID={orderId} nextStep={nextStepHandler} loading={loading}/>
														:
														<OrderDetails loading={loading} data={orderData} orderID={orderId} loggedIn={loggedIn} />
											}
											{
												!loggedIn &&
												<div className="order-login-section">
													<p><span className="order-login-head" onClick={()=>onAccountCreateClick(overlayContext)}>Create an Account</span> or <span className="order-login-head" onClick={()=>onAccountCreateClick(overlayContext)}>Login</span> to quickly</p>
													<p>access order and shipment</p>
													<p>information.</p>
												</div>
											}
										</Grid>
										<Grid item xs={12} md={3} className="d-sm-none"></Grid>
									</Grid>
								</Container>
							</EMWOrderTrackingModal>
							</>
						)
					}
				</OverlayContext.Consumer>
			</div>


		</>
	);

}
export default Page;	