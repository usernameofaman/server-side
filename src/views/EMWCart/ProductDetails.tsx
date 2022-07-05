import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import "./scss/index.scss";
import minusIcon from '../../images/minus-icon.png';
import plusIcon from '../../images/plus-icon.png';
import ReactSVG from "react-svg";
import deleteIcon from "../../images/icon-delete.svg";
import TextField from '@material-ui/core/TextField';
import { PlaceholderImage } from "@components/atoms";

interface ProductDetailsProps {
  // checkout: CheckoutContextInterface;
  // overlay: OverlayContextInterface;
  // cart: CartInterface;
  // shop: getShop_shop;
  data: any;
}


const ProductDetails: React.FC<ProductDetailsProps> = (props) => {
	const { data }=props;
	const [inputValues]=useState({
		lines: data && data.lines ? data.lines : null, 
	})
	return(
		<>
		<div className="emw-cart-product-info-wrapper">
			<Grid container spacing={3}>
				<Grid item lg={3}>
					<p>Items</p>
				</Grid>
				<Grid item lg={4}>
					<p>Options</p>
				</Grid>
				<Grid item lg={3}>
					<p>Quantity</p>
				</Grid>
				<Grid item lg={2}>
					<p>Total Price</p>
				</Grid>
	        </Grid>
        </div>
        {
            inputValues.lines &&  inputValues.lines.length>0 && inputValues.lines.map(item=>{
            	return(
            		<div className="emw-cart-product-details-wrapper">
			        	<Grid container spacing={3}>
							<Grid item lg={3}>
								<div>
									<p className="emw-cart-product-name-text">{item.product.name}</p>
									<p className="emw-add-bottom-space">(Item #: {item.product.emwProdVendorPartnumber})</p>
									<div className="emw-cart-container-image emw-add-bottom-space">
  					                  	{
					                  	
					                  	item.product.emwProdImages && item.product.emwProdImages.edges.length !== 0 ? 
                      						<img src={process.env.REACT_APP_CLOUDFRONT_URL + item.product.emwProdImages.edges[0].node.emwImageUrlPrfix + item.product.emwProdImages.edges[0].node.emwImageName}></img> 
					                      : <PlaceholderImage/>
					                    }
					                </div>
					                <p className="emw-cart-product-name-text">${item.product.aggregateMapPrice.amount} </p>
								</div>
							</Grid>
							<Grid item lg={4}>
								<div className="emw-cart-options-block">
								{
				                    item.productOptions && item.productOptions.length>0 && item.productOptions.map((optionsItem,index)=>{
				                      return(
				                        <div className="emw-cart-option-wrapper" key={index}>
											<p className="emw-cart-option-header">{ optionsItem.productOption.emwOptOptgrpid.emwOptgrpName }: { optionsItem.productOption.emwOptName }- 
												{ optionsItem.productOption.emwOptPrice.amount ? 
            										optionsItem.productOption.emwOptPrice.amount >0 ?
									    			'$'+optionsItem.productOption.emwOptPrice.amount 
									    			:
									    			'-$'+ Math.abs(optionsItem.productOption.emwOptPrice.amount)	

            										: "No Charge"
            									}
											</p>
											<p>(Item #: { optionsItem.productOption.emwOptStocknumber })</p>
										</div>
				                      )
				                    })
				                }
								</div>
							</Grid>
							<Grid item lg={3}>
								<div className="product-page-details product-page-cart-buttons emw-cart-quantity-buttons">
						            <div className="product-page-add-quantity">
						              <button className="product-page-add-quantity-symbol">
						                <img src={minusIcon} alt=""/>
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
								          // onChange={handleOnChanges}
								          name="quantity"
								          value={item.quantity}
								        />
						              </span>
						              <button className="product-page-add-quantity-symbol">
						                <img src={plusIcon} alt=""/>
						              </button>
						            </div>
						            <div className='cart-delete-icon'>
				                      <ReactSVG
				                        path={deleteIcon}
				                        className="overlay__header__close-icon"
				                      />
				                    </div>
						        </div>
							</Grid>
							<Grid item lg={2}>
								<p className="emw-cart-option-header emw-cart-line-total">${item.totalPrice.net.amount}</p>
							</Grid>
				        </Grid>
			        </div>
            	)
            })
	        
    	}
		</>

	);

}
export default ProductDetails;