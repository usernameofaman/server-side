import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";

interface SubTotalSectionProps {
    data: any;
}

const useStyles = makeStyles(
    theme => ({
        subTotalSection: {
            padding: "15px 0px 0px 15px",
            background: "#FFFFFF",
            border: "1px solid #ECECEE",
            boxSizing: "border-box",
            borderRadius: 10,
            '& div':{
                display: "flex",
                justifyContent: "space-around",
            }
        },
        heading: {
            color: "#435160",
            fontWeight: 500,
            fontSize: 18,
            lineHeight: "21px",
        },
        subTotalValues: {
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "16px",
            textAlign: "right",
            color: "#9FAEC2",
        },
        subTotalHeading:{
            fontSize: 14,
            lineHeight: "16px",
            textAlign: "right",
            color: "#435160",
        },
        totalHeading:{
            fontWeight: 500,
            fontSize: 18,
            lineHeight: "21px",
            textAlign: "right",
            color: "#435160",
        },
        totalHeadingValues:{
            fontWeight: 500,
            fontSize: 18,
            lineHeight: "21px",
            textAlign: "right",
            color: "#435160",
        },
        dueValue:{
            fontWeight: 500,
            fontSize: 18,
            lineHeight: "21px",
            color: "#F3A738",
        },
        borderClass:{
            border: "1px solid #E5E5E5",
        },
        upperDiv:{
            padding: "0 10px",
            '& p':{
                marginTop: 5,
                marginBottom : 10,
            },
            '& > p:first-child':{
                width: "70%",
                textAlign: "right",
            },
            '& > p:last-child':{
                width: "30%",
                textAlign: "right",
            }
        },
        lowerDiv:{
            padding: "0 10px",
            '& p':{
                width: "60%",
                textAlign: "right",
            },
            
        },
        goldFont:{
            color: "#F3A738",
        },
        amountPaidWrap:{
            display: "flex",
            '& p:first-child':{
                marginRight: 10,
                flex: 1,
            },
        }
    }),
    { name: "EMWOrderInvoice" }
);

const SubTotalSection: React.FC<SubTotalSectionProps> = props => {
    const { data }=props;
    const emwOrder=data.emwOrder;
    const total=emwOrder.totalPrice.amount + emwOrder.totalShippingCharges.amount + emwOrder.totalTaxes.amount;
    const classes = useStyles(props);
    const parentTotalPaid=emwOrder.parentOrder && emwOrder.parentOrder.totalPaid;
    return (
        <>
            <Grid container spacing={1} >
                <Grid item md={7}>
                    <div className={classes.subTotalSection}>
                        <p className={classes.heading}>NOTES: {(emwOrder.customerNote!==null) ? emwOrder.customerNote: "" }</p>
                    </div>
                </Grid>
                <Grid item md={1}/>
                <Grid item md={4} className={classes.subTotalSection}>
                    <div className={classes.upperDiv}>
                        <p className={classes.subTotalHeading}>Subtotal </p>
                        <p className={classes.subTotalValues}>{`$${emwOrder.totalItemprice.amount.toFixed(2)}`}</p>
                    </div>
                    <div className={classes.upperDiv}>
                        <p className={classes.subTotalHeading}>Shipping & Handling </p>
                        <p className={classes.subTotalValues}>{`$${emwOrder.totalShippingCharges.amount.toFixed(2)}`}</p>
                    </div>
                    <div className={classes.upperDiv}>
                        <p className={classes.subTotalHeading} >Duties/Taxes </p>
                        <p className={classes.subTotalValues}>{`$${emwOrder.totalTaxes.amount.toFixed(2)}`}</p>
                    </div>
                    <hr className={classes.borderClass}/>
                    <div className={classes.upperDiv}>
                        <p className={classes.subTotalHeading} >Total </p>
                        <p className={classes.subTotalValues}>{`$${emwOrder.totalPrice.amount.toFixed(2)}`}</p>
                    </div>
                    {
                        (parentTotalPaid) &&
                        <div className={classes.upperDiv}>
                            <p className={classes.amountPaidWrap}>
                                <p className={[classes.subTotalHeading,classes.goldFont].join(" ")}>{`#${emwOrder.emwLinkedOrderId}`}</p>
                                <p className={classes.subTotalHeading}>AMOUNT PAID</p>
                            </p>
                            
                            <p className={classes.subTotalValues} >{`$${parentTotalPaid && parentTotalPaid.amount.toFixed(2)}`}</p>
                        </div>
                    }
                    <div className={classes.upperDiv}>
                        <p className={classes.amountPaidWrap}>
                            <p className={[classes.subTotalHeading,classes.goldFont].join(" ")}>{`#${emwOrder.emwOrderId}`}</p>
                            <p className={classes.subTotalHeading}>AMOUNT PAID</p>
                        </p>
                        
                        <p className={classes.subTotalValues} >{`$${emwOrder.totalPaid.amount.toFixed(2)}`}</p>
                    </div>
                    <div className={classes.upperDiv}>
                        <p className={classes.totalHeadingValues}>AMOUNT DUE </p>
                        <p className={classes.dueValue}>{`$${emwOrder.totalDue.amount.toFixed(2)}`}</p>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};
SubTotalSection.displayName = "SubTotalSection";
export default SubTotalSection;