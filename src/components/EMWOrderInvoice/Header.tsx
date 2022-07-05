import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import ReactSVG from "react-svg";
import emwLogo from "../../images/logo-address.svg"; 
import moment from 'moment';

interface HeaderProps {
    data: any;
}

const useStyles = makeStyles(
    theme => ({
        invoiceHeaderSection:{
            background: "#F3F3F3",
            borderRadius: 10,
        },
        invoiceHeading:{
            color: "#435160",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: 35,
            lineHeight: "41px",
            textAlign: "center",
            margin: "15px 36.5px 0 36.5px",
        },
        invoiceSubHeading:{
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
        subHeadingGoldenValues:{
            color: "#F3A738 !important",
        },
        orderSection:{
            padding: '0px 15px 0px 15px',
        }
    }),
    { name: "EMWOrderInvoice" }
);

const Header: React.FC<HeaderProps> = props => {
    const { data }=props;
    const emwOrder=data.emwOrder;
    const classes = useStyles(props);
    return (
        <>
            <Grid container spacing={1}>
                <Grid item md={6}>
                    <ReactSVG path={emwLogo} />
                </Grid>
                <Grid item md={6}>
                    <Grid container className={classes.invoiceHeaderSection}>
                        <Grid item md={12}>
                        <div>
                            <p className={classes.invoiceHeading}>
                                {
                                    (emwOrder.orderStatus==="shipped")  ? "COMMERCIAL INVOICE" : "PROFORMA INVOICE"
                                }
                            </p>
                        </div>
                        </Grid>
                        <Grid container className={classes.orderSection}>
                            <Grid item md={3}>
                                <div>
                                    <p className={classes.invoiceSubHeading}>Order#</p>
                                </div>
                                <div>
                                    <p className={classes.subHeadingValues}>{emwOrder.emwOrderId}</p>
                                </div>
                            </Grid>
                            <Grid item md={4}>
                                <div>
                                    <p className={classes.invoiceSubHeading}>Date Received</p>
                                </div>
                                <div>
                                    <p className={classes.subHeadingValues}>
                                        {emwOrder.createdAt ? moment(emwOrder.createdAt).utcOffset('-0500').format('MM/DD/YYYY hh:mm A') : "N/A"}
                                    </p>
                                </div>
                            </Grid>
                            <Grid item md={5}>
                                <div>
                                    <p className={classes.invoiceSubHeading}>Current Order Status</p>
                                </div>
                                <div>
                                    <p className={[classes.subHeadingGoldenValues,classes.subHeadingGoldenValues].join(" ")}>{emwOrder.orderStatus}</p>
                                </div>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                </Grid>



            </Grid>
        </>
    );
};
Header.displayName = "Header";
export default Header;