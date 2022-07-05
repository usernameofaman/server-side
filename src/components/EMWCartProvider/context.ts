import React from 'react';


export const EMWCartContext = React.createContext({ 
	lines: [],
	setLines: (value,price) => { return } ,
	items: 0,
	subTotal: null,
	setSubTotal: (subTotalPrice) => { return },
});