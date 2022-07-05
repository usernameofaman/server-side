
import React, { useEffect, useState } from 'react';
import { EMWCartContext } from './context';

const EMWCartProvider: React.FC = props => {
	
	const [localState,setLocalState]=useState({
		lines: [],
		setLines: (lineArray,price)=>setLines(lineArray,price),
		items: 0,
		subTotal: 0,
		setSubTotal: (subTotalPrice)=>setSubTotal(subTotalPrice),
		// removeLine: ()=>removeLine,
		// changeQuantity: this.changeQuantity,
		// quantity: 0,
		// addQuantity : this.addQuantity,
	});
	
	useEffect(() => {
		const localLines=JSON.parse(localStorage.getItem('EMWCart'));
		const qty=getTotalQuantity(localLines && localLines.lines);
	    if(localLines && localLines.lines && localLines.emwTotalPrice && qty)
	    {	
			valueSetter(localLines.lines,qty,localLines.emwTotalPrice.totalItemPrice.amount);
	    }
	  }, []);

	const valueSetter=(lines,linesLength,subTotalPrice)=>{
		const tempValues={...localState};
		tempValues.lines=lines;
		tempValues.items=linesLength;
		if(subTotalPrice)
		{
			tempValues.subTotal=subTotalPrice.toFixed(2);
		}else{
			tempValues.subTotal=0;
		}
		setLocalState({...tempValues});
	}

	const getTotalQuantity=(lines)=>{
		let count=0
		lines && lines.map(item=>{
			count=count+item.quantity;
		})
		return count;
	}

	const setLines = (lineArray,subTotalPrice) => {
		const qty=getTotalQuantity(lineArray);
		valueSetter(lineArray,qty,subTotalPrice)
		// this.calQuantity(value);
	}

	const setSubTotal= (subTotalPrice) =>{
		const tempValues={...localState};
		tempValues.subTotal=subTotalPrice.toFixed(2);
		setLocalState({...tempValues});
	}


	// addQuantity = (value) => {
	//     let newQuantity=this.state.quantity+value;
	//     console.log('called here',newQuantity);
	//     this.setState({quantity: newQuantity });
	// };

	// changeQuantity = (value) => {
	//     let newQuantity=value;
	//     this.setState({quantity: value });
	// };

	// calQuantity = (value) => {
	// 	let quant=0;
	// 	value && value.length>0 && value.map(item=>{
	// 		console.log('calQuantity',item.quantity);
	// 		return quant=quant+item.quantity;
	// 	})	
	// 	console.log('newQuant',quant);	
	// 	this.setState({quantity: quant});
	// }

	
	return (
		<EMWCartContext.Provider value={localState}>
		{props.children}
		</EMWCartContext.Provider>
	);
	
}
export default EMWCartProvider;