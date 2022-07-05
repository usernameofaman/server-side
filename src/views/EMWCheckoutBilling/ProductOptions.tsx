import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import downArrow from "../../images/Shape.png";
import Grid from '@material-ui/core/Grid';

interface ProductOptionsProps {
    data: any,
}

const ProductOptions: React.FC<ProductOptionsProps> = props => {
    const { data } = props;
    return (
        <>
            {
                data && data.length > 0 &&
                <ExpansionPanel className="miniCart-expansion supplement-Summary-expansion" key={Math.random()}>
                    <ExpansionPanelSummary
                        expandIcon={
                            <img src={downArrow} alt="" />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        key={Math.random()}
                    >
                        <Typography className="miniCart-exp-heading orderSummary-exp-heading">OPTIONS</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails key={Math.random()}>
                        {
                            data.map((optionsItem, index) => {
                                return (
                                    <div className="mb-12" key={index}>
                                        <Grid container spacing={3} key={Math.random()}>
                                            <Grid item xs={3} md={3} key={Math.random()}>
                                                <p className="option-index">OPT{index + 1}</p>
                                            </Grid>
                                            <Grid item xs={9} md={9} key={Math.random()}>
                                                <>
                                                    <p className="option-heading">{optionsItem.optionGrpName}: {optionsItem.optionValue}</p>
                                                    <p className="item-heading option-item-heading">(Item #: {optionsItem.optionStockNo})</p>
                                                </>
                                            </Grid>
                                        </Grid>
                                    </div>
                                )
                            })
                        }
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            }
        </>
    )
}
export default ProductOptions;
