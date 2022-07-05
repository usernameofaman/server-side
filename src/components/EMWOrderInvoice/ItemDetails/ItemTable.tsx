import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getItemValues } from './handler';

interface ItemTableProps {
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
            '& div': {
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
            lineHeight: "14px",
            textAlign: "right",
            color: "#9FAEC2",
        },
        tableDescriptionCol: {
            display: "flex",
            justifyContent: "space-between",
            '& p': {
                fontSize: 9,
                lineHeight: "24px",
                color: "#425160",
            }
        },
        tableRow: {
            background: "#E5E5E5",
            '& th': {
                fontWeight: 'bold',
                fontSize: 16,
                lineHeight: "24px",
            }
        },
        tableValues: {
            fontSize: 12,
            lineHeight: "24px",
            color: "#425160",
            background: "#FFFF",
            borderBottom: 0,
        },
        tableShippingValues: {
            color: "#F3A738 !important",
        },
        headerClass: {
            borderLeft: "1px solid #CCCED0",
            // paddingLeft: 10,
        },
        tableValueBorder: {
            // borderLeft: "1px solid #CCCED0",
            // paddingLeft: 10,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        },
        innerTableValues: {
            fontSize: 12,
            lineHeight: "24px",
            color: "#425160",
            background: "#FFFF",
            paddingLeft: "10px !important",
            borderBottom: 0,
            paddingTop: "0px !important",
            paddingBottom: "5px !important",
            height: "auto",
        },
        shipTableBg: {
            '& td': {
                height: "auto",
                borderBottom: "none",
            },
            '& > td:not(:first-child)': {
                background: "#F3F3F3",
                '& td': {
                    background: "#F3F3F3",
                }
            }
        },
        trackingLink: {
            marginLeft: 20,
            color: "#F3A738",
        },
        fullTableBorder: {
            border: "1px solid #E5E5E5",
        }

    }),
    { name: "EMWOrderInvoice" }
);

const ItemTable: React.FC<ItemTableProps> = props => {
    const { data } = props;
    const emwOrder = data.emwOrder;
    const byOrderShipping = emwOrder.orderCheckouts && emwOrder.orderCheckouts[0] && emwOrder.orderCheckouts[0].shipping && emwOrder.orderCheckouts[0].shipping[0];
    const byOrderTracking = emwOrder.orderCheckouts && emwOrder.orderCheckouts[0] && emwOrder.orderCheckouts[0].orderTracking && emwOrder.orderCheckouts[0].orderTracking[0];
    const classes = useStyles(props);
    const tableHeader = ['Item', 'Description', 'Qty', 'Cost', 'Total'];
    const [tableValues, setTableValues] = useState([]);
    useEffect(() => {
        if (data && data.emwOrder) {
            let values = getItemValues(data.emwOrder);
            setTableValues(values);
        }
    }, [data]);

    return (
        <>
            <Grid container spacing={1} >
                <Grid item md={12}>
                    {
                        tableValues && tableValues.length > 0 &&

                        <TableContainer component={Paper}>
                            <Table aria-label="simple table" className={classes.fullTableBorder}>
                                <TableHead>
                                    <TableRow className={classes.tableRow}>
                                        {
                                            tableHeader.map((item, index) => {
                                                return (
                                                    <TableCell className={["", (index > 0) ? classes.headerClass : ""].join(" ")}><div>{item}</div></TableCell>
                                                )
                                            })
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        tableValues.map((row) => (
                                            <>
                                                <TableRow key={row.item}>
                                                    <TableCell component="th" scope="row" className={classes.tableValues}>
                                                        {row.item}
                                                    </TableCell>
                                                    <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}>
                                                        <div className={classes.tableValueBorder}>
                                                            <Table aria-label="simple table" >
                                                                <TableRow >
                                                                    <TableCell className={classes.innerTableValues} colSpan={2}>{row.description.prodName}</TableCell>
                                                                </TableRow >
                                                                {
                                                                    row.description.options && row.description.options.length > 0 && row.description.options.map(item => {
                                                                        return (
                                                                            <>
                                                                                <TableRow >
                                                                                    <TableCell className={classes.innerTableValues}>{item.optionGrpName}</TableCell>
                                                                                    <TableCell className={classes.innerTableValues}>{item.optionName}</TableCell>
                                                                                </TableRow>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                                {/* <TableRow>
                                                            {
                                                                row.description.shipping &&
                                                                <>
                                                                    <TableCell className={[classes.tableShippingValues, classes.innerTableValues].join(" ")}> Shipment Method/Tracking</TableCell>
                                                                    <TableCell className={[classes.tableShippingValues, classes.innerTableValues].join(' ')}>{`${row.description.shipping.method} / ${row.description.shipping.trackingNum}`}</TableCell>
                                                                </>
                                                            }

                                                        </TableRow> */}
                                                            </Table>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}> <div className={classes.tableValueBorder}>{row.qty}</div></TableCell>
                                                    <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}><div className={classes.tableValueBorder}>{row.cost}</div></TableCell>
                                                    <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}><div className={classes.tableValueBorder}>{row.total}</div></TableCell>
                                                </TableRow>
                                                {/* shipping method row  by item wise*/}
                                                {
                                                    (emwOrder.orderCheckouts[0].shippingType == "BY_ITEM") ?
                                                        <>
                                                            <TableRow className={classes.shipTableBg}>
                                                                <TableCell className={classes.tableValues}></TableCell>
                                                                <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}>
                                                                    <Table aria-label="simple table" >
                                                                        <TableRow >
                                                                            <TableCell className={classes.innerTableValues}>ShippingMethod</TableCell>
                                                                            <TableCell className={classes.innerTableValues}>
                                                                                {row.description.shipping.method}
                                                                                {
                                                                                    (emwOrder.orderStatus === "shipped") &&

                                                                                    <span className={classes.trackingLink}>{row.description.shipping.trackingNum}</span>
                                                                                }

                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </Table>
                                                                </TableCell>
                                                                <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}></TableCell>
                                                                <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}></TableCell>
                                                                <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}>{row.description.shipping.price}</TableCell>
                                                            </TableRow>
                                                            {
                                                                row.description.shipping.residentialPrice ?

                                                                    <TableRow className={classes.shipTableBg}>
                                                                        <TableCell className={classes.tableValues}></TableCell>
                                                                        <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}>
                                                                            <Table aria-label="simple table" >
                                                                                <TableRow >
                                                                                    <TableCell className={classes.innerTableValues}>Residential Surcharge</TableCell>
                                                                                    <TableCell className={classes.innerTableValues}></TableCell>
                                                                                </TableRow>
                                                                            </Table>
                                                                        </TableCell>
                                                                        <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}></TableCell>
                                                                        <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}></TableCell>
                                                                        <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}>{`$ ${(row.description.shipping.residentialPrice).toFixed(2)}`} </TableCell>
                                                                    </TableRow>
                                                                    : null
                                                            }

                                                        </>
                                                        :
                                                        null
                                                }
                                            </>
                                        ))
                                    }
                                    {/* Tax Row  */}
                                    <TableRow className={classes.taxRow}>
                                        <TableCell className={classes.tableValues}>Sales Tax/ Duties</TableCell>
                                        <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}></TableCell>
                                        <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}></TableCell>
                                        <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}></TableCell>
                                        <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}>{`$ ${(emwOrder.totalTaxes.amount).toFixed(2)}`} </TableCell>
                                    </TableRow>

                                    {/*  Shipping Method / tracking for by order  */}
                                    {
                                        (emwOrder.orderCheckouts[0].shippingType == "BY_ORDER") ?

                                            <>
                                                <TableRow className={classes.shipTableBg}>
                                                    <TableCell className={classes.tableValues}></TableCell>
                                                    <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}>
                                                        <Table aria-label="simple table" >
                                                            <TableRow >
                                                                <TableCell className={classes.innerTableValues}>ShippingMethod</TableCell>
                                                                <TableCell className={classes.innerTableValues}>
                                                                    {byOrderShipping && byOrderShipping.name ? byOrderShipping.name : "N/A"}
                                                                    {
                                                                        (emwOrder.orderStatus === "shipped") &&

                                                                        <span className={classes.trackingLink}>{byOrderTracking && byOrderTracking.trackingNumber ? byOrderTracking.trackingNumber : "N/A"}</span>
                                                                    }

                                                                </TableCell>
                                                            </TableRow>
                                                        </Table>
                                                    </TableCell>
                                                    <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}></TableCell>
                                                    <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}></TableCell>
                                                    <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}>{(byOrderShipping  && byOrderShipping.price) ? `$ ${(byOrderShipping.price.amount).toFixed(2)}` : "N/A"} </TableCell>
                                                </TableRow>
                                                {
                                                    (byOrderShipping  && byOrderShipping.residentialSurcharge && byOrderShipping.residentialSurcharge.amount) ?

                                                        <TableRow className={classes.shipTableBg}>
                                                            <TableCell className={classes.tableValues}></TableCell>
                                                            <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}>
                                                                <Table aria-label="simple table" >
                                                                    <TableRow >
                                                                        <TableCell className={classes.innerTableValues}>Residential Surcharge</TableCell>
                                                                        <TableCell className={classes.innerTableValues}></TableCell>
                                                                    </TableRow>
                                                                </Table>
                                                            </TableCell>
                                                            <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}></TableCell>
                                                            <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}></TableCell>
                                                            <TableCell className={[classes.tableValues, classes.headerClass].join(" ")}>{(byOrderShipping.residentialSurcharge) ? `$ ${(byOrderShipping.residentialSurcharge.amount).toFixed(2)}` : "N/A"} </TableCell>
                                                        </TableRow>
                                                        : null
                                                }

                                            </>

                                            :
                                            null

                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </Grid>
            </Grid>
        </>
    );
};
ItemTable.displayName = "ItemTable";
export default ItemTable;