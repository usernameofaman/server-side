import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import SubTotalSection from './SubTotalSection';
import ItemTable from './ItemTable';


interface EMWItemDetailsProps {
    data: any;
}

const useStyles = makeStyles(
    theme => ({
        itemDetailsSection: {
            background: "#F3F3F3",
            border: "1px solid #E5E5E5",
            boxSizing: "border-box",
            borderRadius: 10,
            padding: "0px 15px 15px 15px",
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
        },
        borderClass:{
            border: "1px solid #E5E5E5",
            width: 760,
            marginTop: 25,
            marginBottom: 25,
        }
    }),
    { name: "EMWOrderInvoice" }
);

const EMWItemDetails: React.FC<EMWItemDetailsProps> = props => {
    const { data }=props;
    const classes = useStyles(props);
    return (
        <>
            <div className={classes.itemDetailsSection}>
                <div>
                    <p className={classes.heading}>ITEMS ON ORDER</p>
                </div>
                <div>
                    <ItemTable data={data}/>
                </div>
                <hr className={classes.borderClass}/>
                <div>
                    <SubTotalSection data={data}/>
                </div>
            </div>
        </>
    );
};
EMWItemDetails.displayName = "EMWItemDetails";
export default EMWItemDetails;