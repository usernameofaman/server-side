import "./scss/index.scss";

import React, { useState, useEffect } from "react";

import { Button, Form, TextField } from "..";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import closeImg from "../../images/login-close.svg";
import logo from "../../images/logo.svg";

import ReactSVG from "react-svg";
//import Select from 'react-select';
import { maybe } from "@utils/misc";
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';

import ProductList from "./ProdutList"
import ProductListing from "./ProdutListing"
import RelatedComment from "./RelatedComment"
import NonCatalogProduct from "./NonCatalogProduct"
import RelatedDocuments from "./RelatedDocuments"
import ShippingAddress from "./ShippingAddress"
import BillingAddress from "./BillingAddress"
import ShippingMethods from "./ShippingMethods"
import SearchProduct from "./SearchProduct"

import { useAlert } from "react-alert";
import Loader from "../../components/Loader";

import { quoteSubmitMutation,quoteDeleteMutation,  QuoteUpdateMutation,  quoteFileDeleteMutation, quoteFileCreateMutation, quoteCommentUpdateMutation} from '../../@sdk/mutations/emwGetAQuoteMutations';


import { GetStatesQuery } from '../../@sdk/queries/states';

import { QuoteDetailsQuery, GetEMWShippingMethods, GetEMWFreightShippingMethods } from '../../@sdk/queries/emwGetAQuoteQueries';


interface IEMWGaqModal {
  hide?: () => void;
  Mopen: boolean;
}

const EMWGaqModal: React.FC<IEMWGaqModal> = ({ hide, Mopen}) => {

  const [open, setOpen] = useState(Mopen);
  const [submitQuote, setsubmitQuote] = useState(false);
  const [validateline, setvalidateline] = useState(false);
  const [validateshipping, setvalidateshipping] = useState(false);
  const [validatebilling, setvalidatebilling] = useState(false);
  const [validatemethod, setvalidatemethod] = useState(false);
  const [validateNonCatalog, setvalidateNonCatalog] = useState(false);


  const theme = useTheme();
  const alert = useAlert();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [btnActive, setbtnActive] = useState(false);
  const [openSearch, setopenSearch] = useState(false);
  const [selectedShippingAdd, setselectedShippingAdd] = useState({});
  const LoggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  const [stateValue, setStateValue] = useState(null);

  const localData = JSON.parse(localStorage.getItem('EMWQuote'));
  const [showTaxError,setShowTaxError]=useState(false);
  
  const { data, loading, refetch} = useQuery(QuoteDetailsQuery, {
		variables: { tokenId: localData && localData.token }, fetchPolicy: "no-cache", skip: (localData!==null) ? false : true
  });

  const [checkoutDelete] = useMutation(quoteDeleteMutation, {
    onCompleted({ emwQuoteLineDelete }) {
      if (emwQuoteLineDelete.errors.length === 0) {
        refetch()
      } else {
        alert.show({title: "Something went wrong!"},{ type: "error" });
      }
    },
    onError(errors) {
      alert.show({title: "Something went wrong!"},{ type: "error" });
    },
  });



  const [checkoutUpdate] = useMutation(QuoteUpdateMutation, {
    onCompleted({ emwQuoteLinesAdd }) {
    if (emwQuoteLinesAdd.errors.length===0) {
      setopenSearch(false)
      refetch()
    } else {
      alert.show({title: emwQuoteLinesAdd.errors[0].message},{ type: "error" });
    }
    },
    onError(errors) {
    alert.show({title: "Something went wrong!"},{ type: "error" });
    },
});

const [quoteCommentUpdate] = useMutation(quoteCommentUpdateMutation, {
  onCompleted({ emwQuoteUpdate }) {
  if (emwQuoteUpdate.errors.length===0) {
    refetch()
  } else {
    alert.show({title: emwQuoteUpdate.errors[0].message},{ type: "error" });
  }
  },
  onError(errors) {
  alert.show({title: "Something went wrong!"},{ type: "error" });
  },
});

const [quoteFileCreate] = useMutation(quoteFileCreateMutation, {
  onCompleted({ emwQuotefileCreate }) {
  if (emwQuotefileCreate.errors.length===0) {
    refetch()
  } else {
    alert.show({title: emwQuotefileCreate.errors[0].message},{ type: "error" });
  }
  },
  onError(errors) {
  alert.show({title: "Something went wrong!"},{ type: "error" });
  },
});

const [quoteFileDelete] = useMutation(quoteFileDeleteMutation, {
  onCompleted({ emwQuotefileDelete }) {
  if (emwQuotefileDelete.errors.length===0) {
    refetch()
  } else {
    alert.show({title: emwQuotefileDelete.errors[0].message},{ type: "error" });
  }
  },
  onError(errors) {
  alert.show({title: "Something went wrong!"},{ type: "error" });
  },
});

const [quoteSubmit] = useMutation(quoteSubmitMutation, {
  onCompleted({ emwQuoteSubmit }) {
  if (emwQuoteSubmit.errors.length===0) {
    localStorage.removeItem('EMWQuote')
    alert.show({title:"Request quote is submitted successfully."},{ type: "success" });
    hide();
  } else {
    alert.show({title: emwQuoteSubmit.errors[0].message},{ type: "error" });
  }
  },
  onError(errors) {
  alert.show({title: "Something went wrong!"},{ type: "error" });
  },
});


React.useEffect(() => {
  if((validateline || validateNonCatalog) && validateshipping && validatebilling && (validatemethod || validateNonCatalog) ){
    setsubmitQuote(true)
  } else {
    setsubmitQuote(false)
  }
    
}, [validateline, validateshipping, validatebilling, validatemethod, validateNonCatalog]);

  React.useEffect(() => {
    setOpen(Mopen);
  }, [Mopen]);


  const handleClose = () => {
    hide();
  };

  const requestHandler = () => {
    const isQuoteExist=JSON.parse(localStorage.getItem('EMWQuote')); 
    if(isQuoteExist){
      quoteSubmit({
        variables: {
          id: isQuoteExist.id,
        },
      }) 
    }   
  }

  const updateSelectedShippingAdd = (id) => {
    setselectedShippingAdd({ ...selectedShippingAdd, ["id"]: id});
  }

  return ( <Dialog
    className={"emw-checkout-box add-shipping-form"}
    fullScreen={fullScreen}
    open={open}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
  >

    <DialogTitle id="responsive-dialog-title">
      <p className="overlay__header-text"><ReactSVG
        path={logo}
        className="overlay__header__close-icon"
      /></p>
      <p className="overlay__header-text" onClick={handleClose}><ReactSVG
        path={closeImg}
        className="overlay__header__close-icon"
      /></p>
    </DialogTitle>

    <DialogContent>
      <React.Fragment>
        <div className="address-form emw-gaq-form">
       <h2>REQUEST A QUOTE</h2> 

          <ProductList setvalidateline={setvalidateline} setopenSearch={setopenSearch} checkoutDelete={checkoutDelete} checkoutUpdate={checkoutUpdate} lines={data ? data.emwQuote.lines : []}/>
          <ProductListing setvalidateline={setvalidateline} setopenSearch={setopenSearch} checkoutDelete={checkoutDelete} checkoutUpdate={checkoutUpdate} lines={data ? data.emwQuote.lines : []}/>
          <NonCatalogProduct setvalidateNonCatalog={setvalidateNonCatalog} quoteCommentUpdate={quoteCommentUpdate} nonCatalogReq={data ? data.emwQuote.nonCatalogReq !== null ? data.emwQuote.nonCatalogReq : "" : ""}/>
          <div className="gaq-comment-doc">
          <RelatedComment quoteCommentUpdate={quoteCommentUpdate} note={data ? data.emwQuote.note : ""}/>
          <RelatedDocuments quoteFileDelete={quoteFileDelete} quoteFileCreate={quoteFileCreate} files={data ? data.emwQuote.files : []}/>
          </div>          
          <ShippingAddress setvalidateshipping={setvalidateshipping} updateSelectedShippingAdd={updateSelectedShippingAdd} LoggedIn={LoggedIn === true ? true : false} quoteShipping={data ? data.emwQuote.shippingAddress : null} setselectedShippingAdd={setselectedShippingAdd} />
          <BillingAddress  setvalidatebilling={setvalidatebilling}  LoggedIn={LoggedIn === true  ? true : false} quoteShipping={data ? data.emwQuote.shippingAddress : null} quoteBilling={data ? data.emwQuote.billingAddress : null} selectedShippingAdd={selectedShippingAdd} />
          <ShippingMethods validateNonCatalog={validateNonCatalog} setvalidatemethod={setvalidatemethod} quotemethod={data ? data.emwQuote.shippingAddress : null} quoteShipping={data ? data.emwQuote.shippingAddress : null} selectedShippingAdd={selectedShippingAdd}/>
          <SearchProduct checkoutUpdate={checkoutUpdate} setopenSearch={setopenSearch} openSearch={openSearch} />
        </div>
        <div className="request-button"><span className="cancel-gaq" onClick={handleClose}>CANCEL</span> <Button className={submitQuote ? "" : "inactive"} onClick={submitQuote ? () => requestHandler() : null}>REQUEST QUOTE</Button></div>
      </React.Fragment>
    </DialogContent>
  </Dialog>
  );
};

export default EMWGaqModal;
