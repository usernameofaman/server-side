import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import SVG from "react-inlinesvg";
import emwLogo from "@assets/images/emw-logo.svg";

interface PaymentDetailsProps {
    data: any;
}

const useStyles = makeStyles(
    theme => ({
        paymentDetailsSection: {
            background: "#F3F3F3",
            border: "1px solid #E5E5E5",
            boxSizing: "border-box",
            borderRadius: 10,
            padding: '0px 15px 0px 15px',
        },
        heading: {
            color: "#435160",
            fontWeight: 500,
            fontSize: 18,
            lineHeight: "21px",
        },
        subHeadingValues:{
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "16px",
            color: "#637895",
        },
        supplimentalSpace:{
            marginBottom: 15,
            '& p':{
                fontWeight: 500,
                fontSize: 18,
                lineHeight: "21px",
                color: "#435160",
                '& span':{
                    color: "#F3A738 !important",
                }
            }
        }
    }),
    { name: "EMWOrderInvoice" }
);

const PaymentDetails: React.FC<PaymentDetailsProps> = props => {
    const { data }=props;
    const emwOrder=data.emwOrder;
    const classes = useStyles(props);
    const isSupplimental=emwOrder.isSupplementalOrder;
    return (
        <>
            {
                isSupplimental && 
                
                <Grid container spacing={1} className={[classes.paymentDetailsSection,classes.supplimentalSpace].join(" ")}>
                    <p>SUPPLIMENTAL INVOICE for Order <span>#{emwOrder.emwLinkedOrderId}</span></p>
                </Grid>
            }

            <Grid container spacing={1} className={classes.paymentDetailsSection}>
                <Grid item md={8}>
                    <Grid container>
                        <Grid item md={3}>
                            <div>
                                <p className={classes.heading}>Customer PO#</p>
                            </div>
                            <div>
                                <p className={classes.subHeadingValues}>{emwOrder.customerPurchaseOrderNumber ? emwOrder.customerPurchaseOrderNumber : ""}</p>
                            </div>
                        </Grid>
                        <Grid item md={3}>
                            <div>
                                <p className={classes.heading}>Payment Terms</p>
                            </div>
                            <div>
                                <p className={classes.subHeadingValues}>{emwOrder.paymentTerms ? emwOrder.paymentTerms : "N/A"}</p>
                            </div>
                        </Grid>
                        <Grid item md={3}>
                            <div>
                                <p className={classes.heading}>Payment Method</p>
                            </div>
                            <div>
                                <p className={classes.subHeadingValues}>{emwOrder.paymentMethod ? emwOrder.paymentMethod : "N/A"}</p>
                            </div>
                        </Grid>
                        <Grid item md={3}>
                            <div>
                                <p className={classes.heading}>Shipment Terms</p>
                            </div>
                            <div>
                                <p className={classes.subHeadingValues}>{emwOrder.shipmentTerms ? emwOrder.shipmentTerms : ""}</p>
                            </div>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item md={4}>
                </Grid>

            </Grid>
        </>
    );
};
PaymentDetails.displayName = "PaymentDetails";
export default PaymentDetails;