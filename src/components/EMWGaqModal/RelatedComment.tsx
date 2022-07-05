import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';

interface IRelatedComment {
note: string;
quoteCommentUpdate: any;
}


const RelatedComment: React.FC<IRelatedComment> = ({ note, quoteCommentUpdate }) => {

  const[noteVal, setnoteVal] = useState(note)
  React.useEffect(() => {
    setnoteVal(note)
  }, [note]);

  const handleOnChange = (event) => {
    setnoteVal(event.target.value)
  }

    const handleOnBlur = (event) => {
    const isQuoteExist=JSON.parse(localStorage.getItem('EMWQuote'));
    quoteCommentUpdate({
      variables: {
        id: isQuoteExist.id,
        input: {
          note: noteVal,
        },
      },
    })
  }

return (<div className="emw-width-60">
   <p className="product-title" style={{marginBottom: "15px"}}>Add related comments</p>
   <span style={{color: "#425160", fontSize:"12px"}}>Comments</span> <br></br>
   <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          variant="outlined"
          value={noteVal} 
          onBlur={ (event) => handleOnBlur(event)} 
          onChange={(event) => handleOnChange(event)} 
          name="quantity"
    />
   
  </div>
  );
};

export default RelatedComment;
