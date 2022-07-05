import "./scss/index.scss";

import React, { useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import minusIcon from '../../images/minus-icon.png';
import plusIcon from '../../images/plus-icon.png';
import { useAlert } from "react-alert";
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import Loader from "../../components/Loader";

import { quoteCreateMutation, QuoteUpdateMutation } from '../../@sdk/mutations/emwGetAQuoteMutations';
import { setProductOptions } from './SetProductOptions';
import EMWGaqModal from '../../components/EMWGaqModal'
import ReactSVG from "react-svg";
import quoteImg from "../../images/get-quote.svg";
import { Link } from "react-router-dom";
import { history } from '../../history';

interface GetAQuoteMenuProps {
	mainMenu: any,
	openModal? : boolean;
}

const GetAQuoteMenu: React.FC<GetAQuoteMenuProps> = props => {
	
	const { mainMenu, openModal } = props;
	const [viewQuote, setviewQuote] = React.useState(false)
	const alert = useAlert();

	useEffect(() => {
		if(openModal){
			addToQuote();
		}
	}, []);

	const [checkoutCreate] = useMutation(quoteCreateMutation, {
		onCompleted({ emwQuoteCreate }) {
			if (emwQuoteCreate.errors.length === 0) {
				localStorage.setItem("EMWQuote", JSON.stringify(emwQuoteCreate.emwQuote));
				setviewQuote(true)
			} else {
				alert.show({ title: emwQuoteCreate.errors[0].message, }, { type: "error" });
			}

		},
		onError(errors) {
			alert.show({ title: "Something went wrong!", }, { type: "error" });
		}
	});


	const addToQuote = () => {
		let isQuoteExist = JSON.parse(localStorage.getItem('EMWQuote'));
		if (isQuoteExist && Object.keys(isQuoteExist).length) {
			setviewQuote(true)
		} else {
			checkoutCreate({
				variables: {
					input: {
						lines: []
					}
				}
			})
		}
	}

	const hideHandler=()=>{
		setviewQuote(false);
		if(openModal){
			history.push("/");
		}
	}

	return (
		<React.Fragment>
			{mainMenu ? 
				<button onClick={() => addToQuote()} >GET A QUOTE</button> : 
				(!openModal) &&
				<Link to={"#"}
					className="side-nav__menu-item-link"
					onClick={() => addToQuote()}
				>
				<ReactSVG className="emw-menu-img" path={quoteImg} />
					<span className="sidebar-text">Get A Quote</span>
				</Link>
			}
			{
				viewQuote ? 
					<EMWGaqModal 
						Mopen={viewQuote} 
						hide={hideHandler} 
					/> 
					:
					null
			}
		</React.Fragment>
	);
}
export default GetAQuoteMenu;