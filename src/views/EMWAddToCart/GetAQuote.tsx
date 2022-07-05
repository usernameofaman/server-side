import "./scss/index.scss";

import React from "react";
import TextField from '@material-ui/core/TextField';
import minusIcon from '../../images/minus-icon.png';
import plusIcon from '../../images/plus-icon.png';
import { useAlert } from "react-alert";
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import Loader from "../../components/Loader";

import { quoteCreateMutation, QuoteUpdateMutation } from '../../@sdk/mutations/emwGetAQuoteMutations';
import { setProductOptions } from '../../views/EMWAddToCart/SetProductOptions';
import EMWGaqModal from '../../components/EMWGaqModal'
interface GetAQuoteProps {
	isQuantityChoosenLess: boolean,
	isDiscontinued: boolean,
	replacementUrl: string,
	onMinusHandler: any,
	handleOnChanges: any,
	onPlusHandler: any,
	data: any,
}

const GetAQuote: React.FC<GetAQuoteProps> = props => {

	const { isQuantityChoosenLess, isDiscontinued, replacementUrl, onMinusHandler, onPlusHandler, handleOnChanges, data } = props;
	const [viewQuote, setviewQuote] = React.useState(false)
	const [startLoader, setStartLoader] = React.useState(false);
	const [inputValues, setInputValues] = React.useState({
		quantity: data.minQuantity ? data.minQuantity : 0,
		optionIds: [],
		productId: data.productId,
	});
	const alert = useAlert();
	const [checkoutCreate] = useMutation(quoteCreateMutation, {
		onCompleted({ emwQuoteCreate }) {
			if (emwQuoteCreate.errors.length === 0) {
				localStorage.setItem("EMWQuote", JSON.stringify(emwQuoteCreate.emwQuote));
				setviewQuote(true)
			} else {
				alert.show({ title: emwQuoteCreate.errors[0].message, }, { type: "error" });
			}
			setStartLoader(false);

		},
		onError(errors) {
			setStartLoader(false);
			alert.show({ title: "Something went wrong!", }, { type: "error" });
		}
	});

	const [checkoutUpdate] = useMutation(QuoteUpdateMutation, {
		onCompleted({ emwQuoteLinesAdd }) {
			if (emwQuoteLinesAdd.errors.length === 0) {

				setviewQuote(true)
			} else {
				alert.show({ title: emwQuoteLinesAdd.errors[0].message, }, { type: "error" });
			}
			setStartLoader(false);
		},
		onError(errors) {
			setStartLoader(false);
			alert.show({ title: "Something went wrong!", }, { type: "error" });
		}
	});

	const addToQuote = () => {
		setStartLoader(true);
		let isQuoteExist = JSON.parse(localStorage.getItem('EMWQuote'));
		if (isQuoteExist && Object.keys(isQuoteExist).length) {
			checkoutUpdate({
				variables: {
					quoteId: isQuoteExist.id,
					quantity: inputValues.quantity,
					productId: data.productId,
					optionIds: inputValues.optionIds,
				}
			})
		} else {
			checkoutCreate({
				variables: {
					input:{
						lines: [{
							quantity: parseInt(inputValues.quantity),
							productId: data.productId
						}]
					}					
				}
			})
		}
	}



	return (
		<div>
			<div>
				{
					isQuantityChoosenLess ?
						<p className="product-page-details-text add-to-cart-message">
							This item has a minimum order quantity for order placement.
					</p>
						:
						isDiscontinued && !replacementUrl ?
							<>
								<p className="product-page-details-text add-to-cart-message">
									The item has been discontinued without replacement.
						</p>
								<p className="product-page-details-text add-to-cart-message">
									Our team will be happy to see if we can offer functional replacement.
						</p>
							</>
							: null

				}
			</div>
			{
				isQuantityChoosenLess ?
					<>
						<div className="product-page-details product-page-cart-buttons">
							<div className="product-page-add-quantity">
								<button className="product-page-add-quantity-symbol inactive" onClick={onMinusHandler}>
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
										name="quantityGetAQuote"
										value={data.quantity}
									/>
								</span>
								<button className="product-page-add-quantity-symbol" onClick={onPlusHandler}>
									<img src={plusIcon} alt="" />
								</button>
							</div>
							<div className="golden-btn add-cart-button">
								<button onClick={() => addToQuote()}>Get A Quote</button>
							</div>
						</div>
					</>
					:
					<>
						<div className="golden-btn add-to-cart-button-center">
							<button onClick={() => addToQuote()} >
								{startLoader ?
									<div className='add-to-cart-Loader'>
										<Loader />
									</div>
									: "GET A QUOTE"}
							</button>
						</div>
					</>
			}
			{viewQuote ? <EMWGaqModal Mopen={viewQuote} hide={() => setviewQuote(false)} /> : null}
		</div>
	);
}
export default GetAQuote;