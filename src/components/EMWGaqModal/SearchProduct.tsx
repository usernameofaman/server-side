import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from "..";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import searchImg from "../../images/gaq-search.svg";
import ReactSVG from "react-svg";

import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import { getProductSearchResult } from '../../@sdk/queries/emwGetAQuoteQueries';
import { useAlert } from "react-alert";

interface ISearchProduct {
  openSearch:any;
  setopenSearch: any;
  checkoutUpdate: any;
}


const SearchProduct: React.FC<ISearchProduct> = ({ openSearch, setopenSearch, checkoutUpdate }) => {

  const[openAddModal, setOpenAddModal] = useState(openSearch)
  const [productSearch, setproductSearch] = useState("");
  const [SearchProduct, setSearchProduct] = useState([]);
  const [checkboxChk, setcheckboxChk] = useState({});
  const [selectedProduct, setselectedProduct] = useState({});
  const alert = useAlert();

  React.useEffect(() => {
      setOpenAddModal(openSearch)
      if(openSearch){
        setSearchProduct([])
        setproductSearch("")
        setcheckboxChk({})
        setselectedProduct({})
      }
  }, [openSearch]);

  // React.useEffect(() => {
  //   if(!openAddModal)
  //   setopenSearch(openSearch)
  // }, [openAddModal]);

  const [EMWProductSearch] = useLazyQuery(getProductSearchResult, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      setSearchProduct(data.emwproducts.edges)
    },
    onError(error) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });

  const handleSearchOnChange = event => {
    const { name, value } = event.target;
    setproductSearch(value)
    EMWProductSearch({ variables: { filter: { search: value } } })
  };

  const handleCheckChanges = (id, index) => {
    setcheckboxChk({ ...checkboxChk, [index]: checkboxChk[index] ? !checkboxChk[index] : true });
    setselectedProduct({ ...selectedProduct, [index]: selectedProduct[index] ? undefined : id });

  }

  const addProduct = () => {
    if(!Object.values(selectedProduct).length){
      console.log("Select Product")
    }
    Object.values(selectedProduct).forEach((value) => {
      const isQuoteExist=JSON.parse(localStorage.getItem('EMWQuote'));
      checkoutUpdate({
        variables: {
          quoteId: isQuoteExist.id,
          quantity: parseInt("1",10),
          productId: value,
          optionIds: [],
        },
      })
    })
  }

return ( <Dialog className="relatedProduct-popup" open={openAddModal} onClose={() => setopenSearch(false)} aria-labelledby="form-dialog-title">
<DialogTitle id="form-dialog-title" className="searchHead">{"Search for products"}</DialogTitle>
<DialogContent>
  <Grid container spacing={1}>
    <Grid item md={12} sm={12}>
      <div className="related-topSearchbar">
      <TextField
        autoFocus
        // margin="dense"
        label={"Search"}
        id="groupname"
        // label="Group Name"
        // type="text"
        name="searchProductName"
        value={productSearch}
        onChange={handleSearchOnChange}
        iconRight={<ReactSVG path={searchImg} />}
      />
      {/* <SearchIcon style={{color:'#009999', fontSize: '30px',}} /> */}
      </div>
    </Grid>
    <Grid item md={12}>
      <div className="related-searcList">
        {SearchProduct.length === 0 ? <span className="searchtext">Type to search</span> : SearchProduct.map((product, index) => {
          return <span key={index}> <Checkbox
            name="emwProdIsFreeship"
            className="free-ship-checkbox"
            color="default"
            checked={checkboxChk[index] || false}
            onChange={() => handleCheckChanges(product.node.id, index)}
          />
            {product.node.emwProdStockPartnumber == null || product.node.emwProdStockPartnumber.trim() === "" ? product.node.name : <React.Fragment><span>{product.node.emwProdStockPartnumber}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>{product.node.name}</span></React.Fragment>}
          </span>
        })}

      </div>
    </Grid>
  </Grid>
</DialogContent>
<DialogActions>
  <Button onClick={() => setopenSearch(false)} color="primary">
    Cancel
</Button>
  <Button onClick={() => addProduct()} color="primary">
    OK
</Button>
</DialogActions>
</Dialog>
  );
};

export default SearchProduct;
