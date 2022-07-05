import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import minusIcon from '../../images/minus-icon.png';
import plusIcon from '../../images/plus-icon.png';
import TextField from '@material-ui/core/TextField';
import Options from "./Options";
import { setProductOptions } from './SetProductOptions';
import Modal from '../EMWModal';
import { OverlayContext, OverlayTheme, OverlayType } from '../../components/Overlay';
import { checkoutCreateMutation, checkoutUpdateMutation } from '../../@sdk/mutations/emwAddToCartMutations';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import Loader from "../../components/Loader";
import { EMWCartContext } from "../../components/EMWCartProvider/context";
import { calculatePriceWithOptions } from '../../components/EMWCalculatePrice/calculatePriceWithOptions';
import { GetSellPrice } from '../../@sdk/queries/emwAddToCartQueries';
import { useAlert } from "react-alert";
import AddToCartHandler from "./AddToCartHandler";
import ReactSVG from "react-svg";
import loader from '../../images/emw-loader.svg'
import { GADetails, GAaddToCart } from "../../utils/Google-Analytics";

// Single Collapse 
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { isAddToCartEnabled } from "./SetProductOptions";

interface PageProps {
	data: any,
	loggedIn: boolean,
	productDataLoading: boolean,
	productData: any,
}

const Page: React.FC<PageProps> = props => {
	const { data, loggedIn, productDataLoading, productData } = props;
	const alert = useAlert();
	const [inputValues, setInputValues] = useState({
		quantity: productData && productData.minimumQuantity ? productData.minimumQuantity : 0,
		minQuantity: 1,
		prodMinQuantity: productData && productData.minimumQuantity ? productData.minimumQuantity : 1,
		maxQuantity: 100,
		productOptions: [],
		optionIds: [],
		mainPrice: 0,
		tempPrice: 0,
		productId: data.id,
	});

	const [hideProductDetails, setHideProductDetails] = useState(false);
	const [optionRequireModal, setOptionRequireModal] = useState(false);
	const [openOptionModal, setOpenOptionModal] = useState(false);
	const [overlayContext, setOverlayContext] = useState(false);
	const [startLoader, setStartLoader] = useState(false);
	const [cartFunction, setCartFunction] = useState(null);
	const [allowUpdate, setAllowUpdate] = useState(null);

	const [checkoutCreate] = useMutation(checkoutCreateMutation, {
		onCompleted({ emwCheckoutCreate }) {
			if (emwCheckoutCreate.errors.length === 0) {
				localStorage.setItem("EMWCart", JSON.stringify(emwCheckoutCreate.emwCheckout));
				const subTotalPrice = emwCheckoutCreate.emwCheckout.emwTotalPrice && emwCheckoutCreate.emwCheckout.emwTotalPrice.totalItemPrice.amount;
				cartFunction.setLines(emwCheckoutCreate.emwCheckout.lines, subTotalPrice);

				const setContext = { data: emwCheckoutCreate.emwCheckout, openEMWCart: true }
				overlayContext.show(
					OverlayType.cart,
					OverlayTheme.right,
					setContext
				);

				// GA Add To Cart
				if (data) {
					let variant = [];
					inputValues.productOptions && inputValues.productOptions.length > 0 &&
						inputValues.productOptions.map(item => {
							variant.push(item.emwOptgrpName);
						})
				const price=inputValues.tempPrice;
					GAaddToCart({
						'id': data.id,
						"name": data.name,
						"quantity": inputValues.quantity,
						"price": inputValues.tempPrice,
						'variant': (variant && variant.length > 0) ? variant.toString() : "",
						"category": data.emwProdCatid && data.emwProdCatid.name,
						"dimension1": `$${price}`,
					});
				}

			} else {
				alert.show({ title: emwCheckoutCreate.errors[0].message }, { type: "error" });
			}
			setStartLoader(false);
			//After creating checkout, Add items which are newly added
			const isCartExist = JSON.parse(localStorage.getItem('EMWCart'));
			if (isCartExist) {
				checkoutUpdate({
					variables: {
						checkOutId: isCartExist.id,
						quantity: inputValues.quantity,
						prodId: data.id,
						optionsId: inputValues.optionIds,
						bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false
					},
				})
			}

		},
		onError(errors) {
			setStartLoader(false);
			alert.show({ title: "Something went wrong!" }, { type: "error" });
		},
	});

	const [checkoutUpdate] = useMutation(checkoutUpdateMutation, {
		onCompleted({ emwCheckoutLinesAdd }) {
			if (emwCheckoutLinesAdd.errors.length === 0) {

				localStorage.setItem("EMWCart", JSON.stringify(emwCheckoutLinesAdd.emwCheckout));

				// GA Add To Cart
				if (data) {
					let variant = [];
					inputValues.productOptions && inputValues.productOptions.length > 0 &&
						inputValues.productOptions.map(item => {
							variant.push(item.emwOptgrpName);
						})
					const price=inputValues.tempPrice;
					GAaddToCart({
						'id': data.id,
						"name": data.name,
						"quantity": inputValues.quantity,
						"price": price,
						'variant': (variant && variant.length > 0) ? variant.toString() : "",
						"category": data.emwProdCatid && data.emwProdCatid.name,
						"dimension1": `$${price}`,
					});
				}

				const subTotalPrice = emwCheckoutLinesAdd.emwCheckout.emwTotalPrice && emwCheckoutLinesAdd.emwCheckout.emwTotalPrice.totalItemPrice.amount;
				cartFunction.setLines(emwCheckoutLinesAdd.emwCheckout.lines, subTotalPrice);
				const setContext = { data: emwCheckoutLinesAdd.emwCheckout, openEMWCart: true }
				overlayContext.show(
					OverlayType.cart,
					OverlayTheme.right,
					setContext
				);
			} else {
				checkoutCreate({
					variables: {
						quantity: inputValues.quantity,
						prodId: data.id,
						optionsId: inputValues.optionIds
					}
				})
			}
			setStartLoader(false);
		},
		onError(errors) {
			setStartLoader(false);
			alert.show({ title: "Something went wrong!" }, { type: "error" });
		},
	});

	const [getSellPrice] = useLazyQuery(GetSellPrice, {
		fetchPolicy: 'network-only',
		onCompleted({ emwproduct }) {
			if (emwproduct.aggregateSellPrice) {

				const caltulatedPrice = calculatePriceWithOptions(inputValues.productOptions, emwproduct.aggregateSellPrice.amount);
				if (inputValues.mainPrice !== emwproduct.aggregateSellPrice.amount || inputValues.tempPrice !== caltulatedPrice) {
					const mutateArray = { ...inputValues };
					mutateArray.mainPrice = emwproduct.aggregateSellPrice.amount;
					mutateArray.tempPrice = caltulatedPrice;
					setInputValues({ ...mutateArray });
					setAllowUpdate(false);
				}
			}
		},
		onError(error) {
			alert.show({ title: "Something went wrong!" }, { type: "error" });
		},
	});

	const onMinusHandler = () => {
		const tempValues = { ...inputValues };
		let quantity = tempValues.quantity;
		if (quantity > inputValues.minQuantity) {
			tempValues.quantity = --quantity;
			getSellPrice({
				variables: {
					id: inputValues.productId,
					quantity: tempValues.quantity,
				},
			})
		}
		setInputValues({ ...tempValues })
	}

	const onPlusHandler = () => {
		const tempValues = { ...inputValues };
		let quantity = tempValues.quantity;
		if (quantity < inputValues.maxQuantity) {
			tempValues.quantity = ++quantity;
			getSellPrice({
				variables: {
					id: inputValues.productId,
					quantity: tempValues.quantity,
				},
			})
		}
		setInputValues({ ...tempValues });
	}

	const handleOnChanges = event => {
		const { name, value } = event.target;
		if (name === "quantityGetAQuote") {
			setInputValues({ ...inputValues, quantity: parseInt(value) });
			getSellPrice({
				variables: {
					id: inputValues.productId,
					quantity: parseInt(value),
				},
			})
		} else {
			setAllowUpdate(true);
			if(name=="quantity"){
				setInputValues({ ...inputValues, [name]: parseInt(value) });
			}else{
				setInputValues({ ...inputValues, [name]: value });
			}
		}

	};

	const onOptionSubmit = () => {
		const tempInputValues = { ...inputValues };
		const optionsArray = inputValues.productOptions;
		const optionIdsArray = [];
		let price = inputValues.mainPrice;
		optionsArray.map((item, index) => {
			item.value = [...item.tempValue];
			return item.pricing.map(optionIds => {
				optionIdsArray.push(optionIds.id);
				price = price + optionIds.price;
			})

		});
		tempInputValues.productOptions = optionsArray;
		tempInputValues.optionIds = optionIdsArray;
		tempInputValues.tempPrice = price;
		setInputValues({ ...tempInputValues });
		setOpenOptionModal(false);
	}



	const optionCheckboxChangeHandler = (event, groupIndex, valueId, price) => {
		const tempInputValues = { ...inputValues };
		const optionsArray = tempInputValues.productOptions;
		if (event.target.checked) {
			optionsArray[groupIndex].tempValue.push(valueId);
			optionsArray[groupIndex].pricing.push({ id: valueId, price });
		} else {
			const optionIndex = optionsArray[groupIndex].tempValue.indexOf(valueId);
			optionsArray[groupIndex].pricing.splice(optionIndex, 1);
			optionsArray[groupIndex].tempValue.splice(optionIndex, 1);
		}
		tempInputValues.productOptions = optionsArray;
		setInputValues({ ...tempInputValues });
	}

	const optionRadioChangeHandler = (event, index, price) => {
		const tempInputValues = { ...inputValues };
		const newOptionArray = tempInputValues.productOptions;
		if (newOptionArray[index].tempValue.length > 0) {
			newOptionArray[index].tempValue[0] = event.target.value
			newOptionArray[index].pricing[0] = { id: event.target.value, price };
		} else {
			newOptionArray[index].tempValue.push(event.target.value);
			newOptionArray[index].pricing.push({ id: event.target.value, price });
		}
		tempInputValues.productOptions = newOptionArray;
		setInputValues({ ...tempInputValues });
	}

	const addToCartOptionsCheck = (overlayContext, cartAction) => {
		localStorage.setItem("checkoutLocked", "False")
		setStartLoader(true);
		const tempValues = { ...inputValues };
		const optionsArray = tempValues.productOptions;
		let openRequireModal = false;
		optionsArray.map(item => {
			if (item.emwOptgrpIsRequired) {
				if (item.value.length <= 0) {
					openRequireModal = true
				}
			}
			return true;
		})
		if (openRequireModal) {
			setOptionRequireModal(true);
			setStartLoader(false);
		} else {
			const isCartExist = JSON.parse(localStorage.getItem('EMWCart'));
			setCartFunction(cartAction);
			if (isCartExist) {
				checkoutUpdate({
					variables: {
						checkOutId: isCartExist.id,
						quantity: inputValues.quantity,
						prodId: data.id,
						optionsId: inputValues.optionIds,
						bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false
					},
				})
			} else {
				checkoutCreate({
					variables: {
						quantity: inputValues.quantity,
						prodId: data.id,
						optionsId: inputValues.optionIds,
						bypassTax :  JSON.parse(localStorage.getItem('bypassTax')) || false
					}
				})
			}

			setOverlayContext(overlayContext);

			setOptionRequireModal(false);
		}
	}

	useEffect(() => {
		//  GA Add product details
		if (data && productData) {
			let variant = [];
			productData && productData.emwProdOptgrps && productData.emwProdOptgrps.edges.length > 0 &&
				productData.emwProdOptgrps.edges.map(item => {
					variant.push(item.node.emwOptgrpName);
				})
			let isATCEnabled=isAddToCartEnabled(productData);
			let price=productData && productData.aggregateSellPrice && productData.aggregateSellPrice.amount;
			
			let productDetails={
				'id': data.id,
				"name": data.name,
				'variant': (variant && variant.length > 0) ? variant.toString() : "",
				"category": data.emwProdCatid && data.emwProdCatid.name,
				"dimension1": (isATCEnabled) ? `$${price}` : "ATC Not Enabled",
			}
			if(isATCEnabled){
				productDetails['price']=(price) ? parseFloat(price) : 0.00
			}
				GADetails({...productDetails},data.seoTitle);
		}
	}, [data,productData]);

	useEffect(() => {
		const initPrice = productData && productData.aggregateSellPrice && productData.aggregateSellPrice.amount;
		const mutateInputValues = { ...inputValues };
		// const options = setProductOptions(data);
		const options = productData && productData.emwProdOptgrps && setProductOptions(productData);
		const productMinQuantity = productData && productData.minimumQuantity;
		const optionIdsArray = [];
		let price = initPrice;

		if (initPrice) {

			options.map((item, index) => {
				item.value = [...item.tempValue];
				return item.pricing.map(optionIds => {
					optionIdsArray.push(optionIds.id);
					price = price + optionIds.price;
				})

			});
		}
		mutateInputValues.mainPrice = initPrice;
		mutateInputValues.tempPrice = price;
		mutateInputValues.productOptions = options;
		mutateInputValues.optionIds = optionIdsArray;
		mutateInputValues.prodMinQuantity = productMinQuantity;
		mutateInputValues.quantity = productMinQuantity;
		setInputValues({ ...mutateInputValues });

	}, [productData]);

	const onBlurHandler = () => {
		if (allowUpdate) {
			getSellPrice({
				variables: {
					id: inputValues.productId,
					quantity: parseInt(inputValues.quantity),
				},
			})
		}
	}

	return (
		<>
			{
				(productDataLoading) ?
					<div className="product-page-details_block loader-wrapper">
						<ReactSVG path={loader} className="medium-size-loader" />
					</div>

					:
					<>
						{
							!loggedIn ?
								<EMWCartContext.Consumer>
									{cartAction => (
										<OverlayContext.Consumer>
											{overlayContext => (
												<div className="product-page-login_block">
													<button onClick={() => {
														localStorage.setItem("ischeckedIn", "false")
														overlayContext.show(
															OverlayType.login,
															OverlayTheme.right
														)
													}
													} className="product-page-loginButton">LOGIN FOR ADVANTAGE PRICING</button>
												</div>
											)}
										</OverlayContext.Consumer>
									)}
								</EMWCartContext.Consumer>

								:

								<div className="product-page-dynamic-block" style={{ backgroundColor: (productData && productData.usertierColorcode || "#d4af36") }}>
									<p>EMW Advantage - {productData && productData.usertierName}</p>
								</div>
						}


						<div className="product-page-details_block">

							<div className="product-page-details">
								{
									productData && productData.emwProdShowPartno &&
									<div className="product-page-details_partNumber">
										<span className="product-page-details-text-not-hover">Part No: </span><span className="product-page-details-number">{productData.emwProdVendorPartnumber === null ? "N/A" : productData.emwProdVendorPartnumber}</span>
									</div>
								}

								{
									productData && productData.emwProdShowManufPartno &&
									<div className="product-page-details_manufacturer">
										<span className="product-page-details-text-not-hover">Manuf. Part No: </span><span className="product-page-details-number">{productData.emwProdManufacturerPartnumber === null ? "N/A" : productData.emwProdManufacturerPartnumber}</span>
									</div>
								}
								{
									productData && productData.emwProdShowModelno &&
									<div className="product-page-details_manufacturer">
										<span className="product-page-details-text-not-hover">Model/Spec No: </span><span className="product-page-details-number">{productData.emwProdManufacturerModelnumber === null ? "N/A" : productData.emwProdManufacturerModelnumber}</span>
									</div>
								}
								{
									(productData && productData.weight && productData.weight.value) && 
									<div className="product-page-details_manufacturer">
										<span className="product-page-details-text-not-hover">Ship Weight: </span><span className="product-page-details-number">{productData.weight.value === null ? "N/A" : productData.weight.value.toFixed(2) + " lbs"}</span>
									</div>
								}
							</div>

							{
								!hideProductDetails &&
								<div>
									<div className="product-page-details">
										<span className="product-page-details-price-text">Price: </span><span className="product-page-details-price-value">{inputValues.tempPrice ? "$" + inputValues.tempPrice.toFixed(2) : "N/A"}</span>
									</div>
									{
										loggedIn &&
										<div className="">
											<span className="product-page-details-text-not-hover">MAP: </span>
											<span className="product-page-details-number product-price-msrp">
												${productData && productData.aggregateMapPrice && productData.aggregateMapPrice.amount ? productData.aggregateMapPrice.amount.toFixed(2) : "N/A"}
											</span>
										</div>
									}


									<div className="product-page-details">
										<span className="product-page-details-text-not-hover">MSRP: </span><span className="product-page-details-number product-price-msrp">${productData && productData.listPrice && productData.listPrice.amount ? productData.listPrice.amount.toFixed(2) : "N/A"}</span>
									</div>
									{
										inputValues.productOptions && inputValues.productOptions.length > 0 &&
										<Options
											data={inputValues.productOptions}
											optionCheckboxChangeHandler={optionCheckboxChangeHandler}
											optionRadioChangeHandler={optionRadioChangeHandler}
											onOptionSubmit={onOptionSubmit}
											openOptionModal={openOptionModal}
											setOpenOptionModal={setOpenOptionModal}
										/>
									}

									<div className="product-page-details product-page-cart-buttons">
										<div className="product-page-add-quantity">
											<button 
												className="product-page-add-quantity-symbol"
												disabled={productData==null ? true : false} 
												onClick={onMinusHandler}
											>
												<img src={minusIcon} alt="" />
											</button>
											<span className="product-page-add-quantity-number">
												<TextField
													id="standard-number"
													label=""
													type="tel"
													InputLabelProps={{
														shrink: true,
													}}
													classes={{ root: 'add-cart-quantity-text' }}
													onChange={handleOnChanges}
													onBlur={onBlurHandler}
													name="quantity"
													value={inputValues.quantity ? inputValues.quantity : 0}
													disabled={productData==null ? true : false}
												/>
											</span>
											<button 
												className={inputValues.quantity === 100 ? "product-page-add-quantity-symbol inactive" : "product-page-add-quantity-symbol"} 
												disabled={productData==null ? true : false} 
												onClick={onPlusHandler}
											>
												<img src={plusIcon} alt="" />
											</button>
										</div>
										<div className="golden-btn add-cart-button">
											<EMWCartContext.Consumer>
												{cartAction => (
													<OverlayContext.Consumer>
														{overlayContext => (
															<button onClick={() => addToCartOptionsCheck(overlayContext, cartAction)} disabled={productData==null ? true : inputValues.quantity > 100 ? true : false}>
																{ startLoader ?
																	<div className='add-to-cart-Loader'>
																		<Loader />
																	</div>
																	: "ADD TO CART"}
															</button>
														)}
													</OverlayContext.Consumer>
												)}
											</EMWCartContext.Consumer>
										</div>
									</div>
								</div>
							}
							<AddToCartHandler
								inputValues={inputValues}
								setHideProductDetails={setHideProductDetails}
								onMinusHandler={onMinusHandler}
								handleOnChanges={handleOnChanges}
								onPlusHandler={onPlusHandler}
								{...props}
							/>
							{
								!loggedIn ?
									<ExpansionPanel className="better-price-accordian reduce-margin-bottom">
									<ExpansionPanelSummary
									  aria-controls="panel1c-content"
									  id="panel1Mob-header"
									>
									  <div className="better-price-button">
										<a className="product-page-better-pricing advantage-heading">Create your Advantage account now to save you time and money.</a>
										</div>
									</ExpansionPanelSummary>
									<ExpansionPanelDetails>
									<div className="better-price-button">										
										<p className="product-page-better-pricing-detail advantage-text">
										Advantage customer status unlocks pricing and product features that are not available without an account.
										</p>
										<p className="product-page-better-pricing-detail advantage-text">
										Once created, members receive tiered pricing customized to fit your organization’s needs.
										</p>
										<p className="product-page-better-pricing-detail advantage-text">
										Sign up today to enjoy the benefits with EMW Advantage!
										</p>
										<p className="better-price-button add-top-gap">
											<EMWCartContext.Consumer>
												{cartAction => (
													<OverlayContext.Consumer>
														{overlayContext => (
															<button onClick={() => {
																localStorage.setItem("ischeckedIn", "false")
																overlayContext.show(
																	OverlayType.register,
																	OverlayTheme.right
																)
															}
															} >CREATE ACCOUNT</button>
														)}
													</OverlayContext.Consumer>
												)}
											</EMWCartContext.Consumer>

										</p>

									</div>
									</ExpansionPanelDetails>
								  </ExpansionPanel>
									:

									null
							}

						</div>
						<Modal
							show={optionRequireModal}
							loading={false}
							hide={() => { setOptionRequireModal(false) }}
							title="Option Selection Required"
							cancelBtnText="CANCEL"
							submitBtnText="OK"
							modalCustomClass="requiredOptionModal"
							onSubmitHandler={() => { setOptionRequireModal(false) }}
						>
							<>
								<p>Options marked with an <span className="option-field-required">*</span> are required.</p>
								<p>A selection must be made before proceeding to checkout.</p>
							</>
						</Modal>
					</>
			}
		</>
	);

}
export default Page;	