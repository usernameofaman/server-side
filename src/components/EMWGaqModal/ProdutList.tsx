import "./scss/index.scss";

import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TextField } from "..";
import searchImg from "../../images/gaq-search.svg";
import deleteIcon from "../../images/icon-delete-dark.svg";
import deleteIconlite from "../../images/icon-delete-lite.svg";
import ReactSVG from "react-svg";

import { generateEMWProductSeoUrl, generateEMWProductSeoUrl } from "../../core/utils";
import { Link } from "react-router-dom";

interface IProductList {
  lines: [];
  checkoutUpdate: any;
  checkoutDelete: any;
  setopenSearch: any;
  setvalidateline: any;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  mtable: {
    minWidth: 100,
  },
});


const ProductList: React.FC<IProductList> = ({ lines, checkoutUpdate, checkoutDelete, setopenSearch, setvalidateline }) => {

  const classes = useStyles();
  const [lineQty, setlineQty] = React.useState({})

  const onChangeHandle = (event, id) => {
    const { name, value } = event.target
    setlineQty({ ...lineQty, [id]: value });
  }

  React.useEffect(() => {
    if (lines.length > 0) {
      setvalidateline(true)
    } else {
      setvalidateline(false)
    }
  }, [lines]);

  const handleSearchClick = () => {
    setopenSearch(true)
  }

  function createData(lineid: string, emwProdId: string, id: string, partNo: string, vendorpart: number, name: string, vendor: string, qty: number, emwProdSesurl: string) {
    return { lineid, emwProdId, id, partNo, vendorpart, name, vendor, qty, emwProdSesurl };
  }

  const rows = []
  lines && lines.map((line : any, index) => {
    // rows.push(createData(line.id, line.product.emwProdId, line.product.id, line.product.emwProdStockPartnumber, line.product.emwProdVendorPartnumber, line.product.name, line.product.emwProdVendorid.emwVendorName, line.quantity, line.emwProdSesurl))
    const vendorName=line.product.emwProdVendorid && line.product.emwProdVendorid.emwVendorName;
    const stockPartNum=line.product.emwProdStockPartnumber;
    const vendorPartNum= line.product.emwProdVendorPartnumber;
    rows.push(createData(line.id, line.product.emwProdId, line.product.id, stockPartNum ? stockPartNum : "N/A", vendorPartNum ? vendorPartNum : "N/A", line.product.name, vendorName ? vendorName: "N/A", line.quantity, line.emwProdSesurl))
  })

  const viewProduct = (id, name, url) => {
    history.push(generateEMWProductSeoUrl(name, url))
  }
  return (<div>
    <p className="product-title">Add a cataloged product to quote by searching below</p>
    <TextField name="search" onClick={() => handleSearchClick()} iconRight={<ReactSVG path={searchImg} />} type="text"></TextField>
  </div>
  );
};

export default ProductList;
