import React, { useState } from "react";
import Header from "./Header";
import PaymentDetails from "./PaymentDetails";
import { makeStyles } from "@material-ui/core/styles";
import ShippingDetails from "./ShippingDetails";
import EMWItemDetails from "./ItemDetails";
import Button from "@material-ui/core/Button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

interface EMWOrderInvoiceProps {
  data: any;
  handleClose: any;
  typeModal: boolean;
}

const useStyles = makeStyles(
  theme => ({
    addSpace: {
      marginBottom: 15,
    },
    moreSpace: {
      marginBottom: 25,
    },
    email: {
      fontWeight: 500,
      fontSize: 18,
      lineHeight: "21px",
      color: "#637895",
      marginRight: 35,
    },
    emailSection: {
      display: "flex",
      justifyContent: "center",
    },
     customerButton: {
      background: '#F2F2F2',
      border: '1px solid #CCCED0',
      borderRadius: '5px',
      color: '#425160',
      height: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5px 16px',
      minWidth: '250px',
      "& span": {
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: '24px',
      },
    },
    buttonCenter: {
      textAlign: "center",
      padding: 24,
    },
    invoiceSection: {
      padding: 24,
    },
    buttonSpace: {
      display: "flex",
      justifyContent: "space-around",
    },
    notifyBox: {
      borderRadius: 4,
      padding: 10,
      marginTop: 15,
      marginBottom: 15,
      fontSize: 16,
      lineHeight: "24px",
      color: "#FFFFFF",
    },
    notifySuccess: {
      background: "#81B781",
    },
    notifyError: {
      background: "#C75B54",
    },
    loader: {
      "& svg": {
        color: "#FFF",
      },
    },
  }),
  { name: "EMWOrderInvoice" }
);

const InvoiceDetails: React.FC<EMWOrderInvoiceProps> = props => {
  const { data, handleClose, typeModal } = props;
  const emwOrder = data.emwOrder;
  const [status, setStatus] = useState("");
  const classes = useStyles(props);

  const sendPdf = () => {
    setStatus("loading");
    window.scrollTo(0,0);
    html2canvas(document.getElementById("invoice")).then(canvas => {
      let imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      try {
        pdf.save(`invoice-${emwOrder.emwOrderId}.pdf`);
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    });
  };
  return (
    <>
      <div id="invoice" className={classes.invoiceSection}>
        <div className={classes.addSpace}>
          <Header data={data} />
        </div>
        <div className={classes.addSpace}>
          <PaymentDetails data={data} />
        </div>
        <div className={classes.addSpace}>
          <ShippingDetails data={data} />
        </div>
        <div className={classes.moreSpace}>
          <EMWItemDetails data={data} />
        </div>
        <div className={[classes.emailSection, classes.moreSpace].join(" ")}>
          <p className={classes.email}>www.electricmotorwholesale.com</p>
          <p className={classes.email}>sales@electricmotorwholesale.com</p>
        </div>
      </div>
      <div className={classes.buttonCenter}>
        <Grid container spacing={1}>
          <Grid item md={2}></Grid>
          <Grid item md={8}>
            <div className={classes.buttonSpace}>
              {typeModal ? (
                <Button
                  className={classes.customerButton}
                  color="primary"
                  onClick={handleClose}
                >
                  Close
                </Button>
              ) : (
                ""
              )}
              <Button
                className={classes.customerButton}
                color="primary"
                onClick={sendPdf}
              >
                {status == "loading" ? (
                  <div className={classes.loader}>
                    <CircularProgress />
                  </div>
                ) : (
                  "Download Invoice"
                )}
              </Button>
            </div>
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
      </div>
    </>
  );
};
InvoiceDetails.displayName = "InvoiceDetails";
export default InvoiceDetails;
