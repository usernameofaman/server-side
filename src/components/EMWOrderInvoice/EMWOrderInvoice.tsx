import React, { useEffect } from "react";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from "@material-ui/core/styles";
import InvoiceDetail from "./InvoiceDetail";
import { useLazyQuery } from "@apollo/react-hooks";
import { GetOrderDetailQuery } from "./query";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactSVG from "react-svg";
import loader from '../../images/emw-loader.svg';

interface EMWOrderInvoiceProps {
  handleClose: any;
  open: boolean;
  orderNum: string;
  orderEmail: string;
  typeModal: boolean;
}

const useStyles = makeStyles(
  theme => ({
    removePadding: {
      padding: 0,
    },
    loader: {
      minHeight: 450,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    errorMsg: {
      color: "#637895",
    },
    clickToClose: {
      marginLeft: 10,
      cursor: "pointer",
      color: "#637895",
    },
  }),
  { name: "EMWOrderInvoice" }
);

const EMWOrderInvoice: React.FC<EMWOrderInvoiceProps> = props => {
  const { open, handleClose, orderNum, orderEmail, typeModal } = props;
  const classes = useStyles(props);
  const [fetchOrderDetail, { data, loading }] = useLazyQuery(
    GetOrderDetailQuery,
    {
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    if (open) {
      if(orderEmail !== ""){
        fetchOrderDetail({
          variables: {
            ordernum: orderNum,
            email: orderEmail
          },
        });
      } else {
        fetchOrderDetail({
          variables: {
            ordernum: orderNum
          },
        });
      }
      
    }
  }, [open]);
  return (
    <>
      {typeModal ? (
        <Dialog
          fullWidth={true}
          maxWidth={"lg"}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          {/* <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle> */}
          <DialogContent className={classes.removePadding}>
            {loading ? (
              <div className="product-page-details_block loader-wrapper">
                <ReactSVG path={loader} className="medium-size-loader" />
              </div>
            ) : data && data.emwOrder !== null ? (
              <div className="emw-order-invoice-section">
                <InvoiceDetail
                  data={data}
                  handleClose={handleClose}
                  typeModal={typeModal}
                />
              </div>
            ) : (
              <div className={classes.loader}>
                <p className={classes.errorMsg}>
                  Something went wrong please try again after some time!
                </p>
                <p className={classes.clickToClose} onClick={handleClose}>
                  Click to close
                </p>
              </div>
            )}
          </DialogContent>
          {/* <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions> */}
        </Dialog>
      ) : loading ? (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      ) : data && data.emwOrder !== null ? (
        <div className="emw-order-invoice-section">
          <InvoiceDetail
            data={data}
            handleClose={handleClose}
            typeModal={typeModal}
          />
        </div>
      ) : (
        <div className={classes.loader}>
          <p className={classes.errorMsg}>
            Something went wrong please try again after some time!
          </p>
          {/* <p className={classes.clickToClose} onClick={handleClose}>
            Click to close
          </p> */}
        </div>
      )}
    </>
  );
};
EMWOrderInvoice.displayName = "EMWOrderInvoice";
export default EMWOrderInvoice;
