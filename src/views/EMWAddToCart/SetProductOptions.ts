export const setProductOptions=(data)=>{
	const optionsArray=[]

	if(data.emwProdOptgrps && data.emwProdOptgrps.edges.length>0 )
	{
		data.emwProdOptgrps.edges.map((group, index) => {
			if(group.node.emwOptgrpIsActive)
			{
				
				const setOptionArray=[]
				const defaultOption=group.node.emwOptgrpDefaultOption;
				const prodOptions=group.node.prodoptions;
				const pricingDefaultOption=prodOptions && setDefaultOptionValue(prodOptions,defaultOption);
				const defaultOptionId=pricingDefaultOption && pricingDefaultOption[0] && pricingDefaultOption[0].id;
				
				let tempValue=[]; 
				defaultOptionId && tempValue.push(defaultOptionId);

				const groupOptions={
					groupId: group.node.id,
					emwOptgrpDefaultOption: defaultOption,
					emwOptgrpIsActive: group.node.emwOptgrpIsActive,
					emwOptgrpIsRequired: group.node.emwOptgrpIsRequired,
					emwOptgrpName: group.node.emwOptgrpName,
					emwOptgrpType: group.node.emwOptgrpType,
					value: [],
					tempValue: tempValue,
					pricing: pricingDefaultOption,
					options: prodOptions,
				}


				optionsArray.push(groupOptions);	
			}
		});

		
	}
	return optionsArray;
}

const setDefaultOptionValue=(options,defaultId)=>{
	let value=[];
	if(options && options.length>0){
		const filterOption=options.filter(item=>{
			if(item.emwOptId==defaultId){
				return true;
			}
		})
		if(filterOption && filterOption[0]){
			const optionPrice=filterOption[0].emwOptPrice && filterOption[0].emwOptPrice.amount;
			const setData={ id: filterOption[0].id, price: optionPrice};
			value.push(setData);
		}	
	}
	return value;
}

export const isAddToCartEnabled=(data)=>{
	let flag=true;
	const isDiscontinued=data && data.emwProdIsDiscontinued;
	const replacementUrl=data && data.emwProdReplacementProd;
	const notesQuote=(data && data.emwProdIsGetQuote && data && data.emwProdOrderingNotesMessage.trim() !== "") ? true : false;
	const informational=data && data.emwProdIsInformational;
	if(isDiscontinued && replacementUrl && Object.keys(replacementUrl).length){
		flag=false;

	}else if(notesQuote || informational || isDiscontinued)
	{
		flag=false
	}
	return flag;
}