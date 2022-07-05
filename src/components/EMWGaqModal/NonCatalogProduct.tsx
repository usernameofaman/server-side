import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';

interface INonCatalogProduct {
nonCatalogReq: string;
quoteCommentUpdate: any;
setvalidateNonCatalog:any;
}


const NonCatalogProduct: React.FC<INonCatalogProduct> = ({ nonCatalogReq, quoteCommentUpdate, setvalidateNonCatalog }) => {

  const[nonCatalogReqVal, setnonCatalogReqVal] = useState(nonCatalogReq)
  React.useEffect(() => {
    setnonCatalogReqVal(nonCatalogReq)
    if(nonCatalogReq.trim() !== ""){
      setvalidateNonCatalog(true)
    }
  }, [nonCatalogReq]);

  const handleOnChange = (event) => {
    setnonCatalogReqVal(event.target.value)
    if(event.target.value.trim() !== ""){
      setvalidateNonCatalog(true)
    } else {
      setvalidateNonCatalog(false)
    }
  }

    const handleOnBlur = (event) => {
    const isQuoteExist=JSON.parse(localStorage.getItem('EMWQuote'));
    quoteCommentUpdate({
      variables: {
        id: isQuoteExist.id,
        input: {
          nonCatalogReq: nonCatalogReqVal,
        },
      },
    })
  }

return (<div className="emw-width-100">
   <p className="product-title" style={{marginBottom: "15px"}}>If items do not appear in search above, please type out your request/requirement below</p>
   <span className="sub-heading">*it is advised to upload nameplate picture for expedient and accurate quotation.</span> <br></br>
   <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          variant="outlined"
          value={nonCatalogReqVal} 
          onBlur={ (event) => handleOnBlur(event)} 
          onChange={(event) => handleOnChange(event)} 
          name="quantity"
    />
   
  </div>
  );
};

export default NonCatalogProduct;
