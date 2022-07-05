import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import SVG from "react-inlinesvg";
import emwLogo from "@assets/images/emw-logo.svg";

interface ShippingDetailsProps {
    data: any;
}

const useStyles = makeStyles(
    theme => ({
        ShippingDetailsSection: {
            background: "#F3F3F3",
            border: "1px solid #E5E5E5",
            boxSizing: "border-box",
            borderRadius: 10,
            padding: '0px 15px 15px 15px !important',
            minHeight: 150,
        },
        heading: {
            color: "#435160",
            fontWeight: 500,
            fontSize: 18,
            lineHeight: "21px",
        },
        subHeadingValues: {
            fontWeight: 300,
            fontSize: 16,
            lineHeight: "22px",
            color: "#000000",
            marginBottom: 5,
            marginTop: 0,
        }
    }),
    { name: "EMWOrderInvoice" }
);

const ShippingDetails: React.FC<ShippingDetailsProps> = props => {
    const { data }=props;
    const emwOrder=data.emwOrder;
    const billingDetail=emwOrder.orderCheckouts[0] && emwOrder.orderCheckouts[0].billingAddress;
    const shippingDetail=emwOrder.orderCheckouts[0] && emwOrder.orderCheckouts[0].shippingAddress;
    const billName=billingDetail && billingDetail.firstName && billingDetail.lastName && `${billingDetail.firstName} ${billingDetail.lastName}` ;
    const shipName=shippingDetail && shippingDetail.firstName && shippingDetail.lastName && `${shippingDetail.firstName} ${shippingDetail.lastName}` ;
    const classes = useStyles(props);
    return (
        <>
            <Grid container spacing={5} >
                <Grid item md={6}>
                    <div className={classes.ShippingDetailsSection}>
                        <div>
                            <p className={classes.heading}>BILLING ADDRESS</p>
                        </div>
                        <div>
                            {
                                emwOrder.customerStats && emwOrder.customerStats.orgName && <p className={classes.subHeadingValues}>{emwOrder.customerStats.orgName}</p>
                            }
                            {
                                billName && <p className={classes.subHeadingValues}>{billName}</p>
                            }
                            {
                                billingDetail && billingDetail.streetAddress1 && <p className={classes.subHeadingValues}>{billingDetail.streetAddress1}</p>
                            }
                            {
                                billingDetail && billingDetail.streetAddress2 && <p className={classes.subHeadingValues}>{billingDetail.streetAddress2}</p>
                            }
                            {
                                billingDetail && billingDetail.countryArea && <p className={classes.subHeadingValues}>
                                    {`${ billingDetail.city}, ${ billingDetail.countryArea} ${ billingDetail.postalCode}`}
                                </p>
                            }
                            {
                                (!billingDetail) && <p className={classes.subHeadingValues}>N/A</p>
                            }
                        </div>
                    </div>
                </Grid>

                <Grid item md={6} >
                    <div className={classes.ShippingDetailsSection}>
                        <div>
                            <p className={classes.heading}>SHIPPING ADDRESS</p>
                        </div>
                        <div>
                            {
                                emwOrder.customerStats && emwOrder.customerStats.orgName && <p className={classes.subHeadingValues}>{emwOrder.customerStats.orgName}</p>
                            }
                            {
                                shipName && <p className={classes.subHeadingValues}>{shipName}</p>
                            }
                            {
                                shippingDetail && shippingDetail.streetAddress1 && <p className={classes.subHeadingValues}>{shippingDetail.streetAddress1}</p>
                            }
                            {
                                shippingDetail && shippingDetail.streetAddress2 && <p className={classes.subHeadingValues}>{shippingDetail.streetAddress2}</p>
                            }
                            {
                                shippingDetail && shippingDetail.countryArea && <p className={classes.subHeadingValues}>
                                    {`${ shippingDetail.city}, ${ shippingDetail.countryArea} ${ shippingDetail.postalCode}`}
                                </p>
                            }
                            {
                                (!shippingDetail) && <p className={classes.subHeadingValues}>N/A</p>
                            }
                        </div>
                    </div>
                </Grid>
                <Grid item md={1}/>
            </Grid>
        </>
    );
};
ShippingDetails.displayName = "ShippingDetails";
export default ShippingDetails;