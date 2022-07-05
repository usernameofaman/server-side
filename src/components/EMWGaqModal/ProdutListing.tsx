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

interface IProductListing {
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


const ProductListing: React.FC<IProductListing> = ({ lines, checkoutUpdate, checkoutDelete, setopenSearch, setvalidateline }) => {

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

  const deleteCheckout = (lineId) => {
    const isQuoteExist = JSON.parse(localStorage.getItem('EMWQuote'));
    checkoutDelete({
      variables: {
        quoteId: isQuoteExist.id,
        lineId,
      },
    })
  }

  const onqtyChnage = (id, e, minqty) => {
    const isQuoteExist = JSON.parse(localStorage.getItem('EMWQuote'));
    checkoutUpdate({
      variables: {
        quoteId: isQuoteExist.id,
        quantity: parseInt(e.target.value,10) - parseInt(minqty,10),
        productId: id,
        optionIds: [],
      },
    })
  }

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
    {rows && rows.length > 0 ? <>
    <p className="product-title">Products added to quote:</p>
    <TableContainer className="gaq-desktop-table">
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Part #</TableCell>
            <TableCell align="left">Vendor Part#</TableCell>
            <TableCell align="left">Product Name</TableCell>
            <TableCell align="left">Vendor</TableCell>
            <TableCell align="left">Qty</TableCell>
            <TableCell align="left">Remove item</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.partNo}
              </TableCell>
              <TableCell align="left">{row.vendorpart}</TableCell>
              <TableCell align="left"><Link
                to={generateEMWProductSeoUrl(row.emwProdId, row.name, row.emwProdSesurl)}
                key={row.id}
              >{row.name}</Link></TableCell>
              <TableCell align="left">{row.vendor}</TableCell>
              <TableCell align="left">
                <TextField
                  name="quantity"
                  value={lineQty[row.id] != undefined || lineQty[row.id] != null ? lineQty[row.id] : row.qty}
                  onBlur={(event) => onqtyChnage(row.id, event, row.qty)}
                  onChange={(event) => onChangeHandle(event, row.id)}
                  type="text">
                </TextField>
              </TableCell>
              <TableCell align="left"><a className="removeItem" onClick={() => deleteCheckout(row.lineid)}>Remove Item</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <TableContainer className="gaq-mobile-table">
      <Table className={classes.mtable} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Qty</TableCell>
            <TableCell align="left">Vendor</TableCell>
            <TableCell>Part #</TableCell>
            <TableCell align="left"><ReactSVG path={deleteIcon} /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="left">
                <TextField
                  name="quantity"
                  value={lineQty[row.id] != undefined || lineQty[row.id] != null ? lineQty[row.id] : row.qty}
                  onBlur={(event) => onqtyChnage(row.id, event, row.qty)}
                  onChange={(event) => onChangeHandle(event, row.id)}
                  type="text">
                </TextField>
              </TableCell>
              <TableCell align="left">{row.vendor}</TableCell>
              <TableCell component="th" scope="row">
                {row.partNo}
              </TableCell>
              <TableCell align="left"><a className="removeItem" onClick={() => deleteCheckout(row.lineid)}><ReactSVG path={deleteIconlite} /></a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    : null}
  </div>
  );
};

export default ProductListing;
