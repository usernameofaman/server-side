import "./scss/index.scss";

import React, { useState } from "react";
import Modal from '../EMWModal';
import EMWFullWidthModal from '../EMWFullWidthModal';
import OptionsModalBody from './OptionsModalBody';

interface OptionsProps {
  data: any,
  optionCheckboxChangeHandler: any,
  optionRadioChangeHandler: any,
  onOptionSubmit: any,
  openOptionModal: any,
  setOpenOptionModal: any,
}

const Options: React.FC<OptionsProps> = props => {
	const { data, onOptionSubmit, openOptionModal, setOpenOptionModal }=props;
	const [currentOptionIndex,setCurrentOptionIndex]=useState(-1);
	const openOptionModalHandler=(index)=>{
		setCurrentOptionIndex(index);
		setOpenOptionModal(true);
	}

	return(
		<>
		<div className="product-page-options add-to-cart-options-section">
          	<div  className="options-mb-10">
          	<span className="product-page-details-text add-to-cart-options-heading">Options</span>
          	</div>
            <div className="product-page-details">
          		{	
          			data && data.map((item, index) => {
                	return (
	          			<React.Fragment key={Math.random()}>
						<div 
							key={Math.random()} 
							className="product-page-details-text" 
							onClick={()=> openOptionModalHandler(index)}
						>
							<span 
								className="option-group-name-heading" 
								key={Math.random()}
							>
								{item.emwOptgrpName}
							</span>
	                    	{item.emwOptgrpIsRequired && <span className="option-field-required" key={Math.random()}>*</span> }
	                    	<div key={Math.random()}>
	                    		{
	                    			item.value.length>0 && item.options.length>0 ?
	                    				item.options.map(optionItem=>{
	                    					return item.value.map(valueItem=>{
	                    						if(valueItem===optionItem.id)
	                    						{
	                    							return(
	                    								<div key={Math.random()}>
	                    								<span className="product-page-details-text" key={Math.random()}>
	                    									{optionItem.emwOptName}- 
	                    									{ optionItem.emwOptPrice.amount ? 
	                    										optionItem.emwOptPrice.amount >0 ?
												    			'$'+optionItem.emwOptPrice.amount 
												    			:
												    			'-$'+ Math.abs(optionItem.emwOptPrice.amount)	

	                    										: "No Charge"
	                    									}
	                    								</span>
	                    								</div>
	                    							)

	                    						}
	                    						
			                    			})
			                    			

	                    				}) 
	                    			
	                    			: null
	                    		}
	                    	</div>
	                    	<div key={Math.random()}>
	                    		{
	                    			item.options.length>0 ? 
		                            item.value.length<=0 ?
		                            <span className="option-modal-text product-page-details-text" key={Math.random()}>
		                              Click to open
		                            </span>
		                            :
		                            <> 
		                            <span className="option-modal-text product-page-details-text" key={Math.random()} >
		                              Click to edit
		                            </span>
		                            </>
		                            :
		                            null
		                        }
	                    	</div>
	                    </div>
	                  </React.Fragment>
	                );
	                }) 
          		}
            </div>
        </div>
        {
        <Modal
        	show={openOptionModal}
        	loading={false}
        	hide={()=>{ setOpenOptionModal(false) }}
        	title={ data &&  currentOptionIndex>-1 ? data[currentOptionIndex].emwOptgrpName : ""}
        	cancelBtnText="CANCEL"
        	submitBtnText="OK"
        	onSubmitHandler={onOptionSubmit}
        >
        	<>
			{
				currentOptionIndex>-1 ? 
				<OptionsModalBody 
					data={data} 
					currentOptionIndex={currentOptionIndex}
					{...props}
				/> 
				: null
				
			}
        		
        	</>
        </Modal>
    	}
    	{
    	<EMWFullWidthModal
    	open={openOptionModal}
    	handleClose={()=> { setOpenOptionModal(false) }}
    	title={ data &&  currentOptionIndex>-1 ? data[currentOptionIndex].emwOptgrpName : ""}
    	modalCustomClass="responsiveFullWidthDialog"	
    	onSaveHandler={onOptionSubmit}
    	>
    	<>
			{
				currentOptionIndex>-1 ? 
				<OptionsModalBody 
					data={data} 
					currentOptionIndex={currentOptionIndex}
					{...props}
				/> : null
				
			}
    	</>
    	</EMWFullWidthModal>
    	}
        </>
	);

}
export default Options;