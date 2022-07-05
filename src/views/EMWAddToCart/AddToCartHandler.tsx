import "./scss/index.scss";
import React from "react";
import Replacement from './Replacement';
import GetAQuote from './GetAQuote';

interface AddTOCartHandlerProps{
	productData: any,
	inputValues: any,
	setHideProductDetails: any,
	onMinusHandler: any,
	handleOnChanges: any,
	onPlusHandler: any,
}

const AddToCartHandler: React.FC<AddTOCartHandlerProps> = props => {
	const { productData,inputValues,setHideProductDetails,onPlusHandler,handleOnChanges,onMinusHandler }=props;
	const Handler=()=>{
		const isDiscontinued=productData && productData.emwProdIsDiscontinued;
		const replacementUrl=productData && productData.emwProdReplacementProd;
		const notesQuote=(productData && productData.emwProdIsGetQuote && productData && productData.emwProdOrderingNotesMessage.trim() !== "") ? true : false;
		const informational=productData && productData.emwProdIsInformational;
		const isQuantityChoosenLess=inputValues.quantity< (inputValues.prodMinQuantity) ? true : false;
		if(isDiscontinued && replacementUrl && Object.keys(replacementUrl).length){
			setHideProductDetails(true);
			return <Replacement url={replacementUrl}/>

		}else if(notesQuote || informational || isQuantityChoosenLess || isDiscontinued)
		{
			setHideProductDetails(true);
			return <GetAQuote 
				isQuantityChoosenLess={isQuantityChoosenLess} 
				isDiscontinued={isDiscontinued} 
				replacementUrl={replacementUrl} 
				data={inputValues}
				onMinusHandler={onMinusHandler}
				handleOnChanges={handleOnChanges}
				onPlusHandler={onPlusHandler}
				/>
		}else{
			setHideProductDetails(false);
			return null;
		}
	}
	return(
		<Handler />
	)
}
export default AddToCartHandler;