import "./scss/index.scss";
import { history } from '../../history';
import React from "react";

interface ReplacementProps {
  url: any,
}

const Replacement: React.FC<ReplacementProps> = props => {
	const { url }=props;
	const redirectPage=()=>{
		const tempUrl= url && url.emwProdSesurl;
		history.push(`/${tempUrl}`);
	}
	return(
		<div>
			<div>
				<p className="product-page-details-text-not-hover add-to-cart-message replacement-bottom ">
					This item has been discontinued and replaced with a new model.
				</p>
			</div>
			<div className="golden-btn add-to-cart-button-center ">
					 <button onClick={()=>redirectPage()} className="replacement-link">
					 	SEE REPLACEMENT
					 </button>
        	</div>
    	</div>
	);
}
export default Replacement;