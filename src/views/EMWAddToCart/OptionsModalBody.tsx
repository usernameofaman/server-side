import React from 'react';
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

interface OptionsModalBodyProps {
    data: any,
    currentOptionIndex: any,
    optionCheckboxChangeHandler: any,
    optionRadioChangeHandler: any,
}

const OptionsModalBody: React.FC<OptionsModalBodyProps> = props => {
    
    const { data,currentOptionIndex,optionRadioChangeHandler,optionCheckboxChangeHandler } = props;
    const optionGroupValue=data[currentOptionIndex];
    return (
        <>
            <Grid container spacing={3}>
                {
                    optionGroupValue.options && optionGroupValue.options.length > 0 ?
                        <>
                            {
                                (optionGroupValue.emwOptgrpType === 0 || optionGroupValue.emwOptgrpType === 2) && optionGroupValue.options.map((item, index) => {
                                    return (item.emwOptIsActive) && (
                                        <React.Fragment key={index}>
                                            <Grid item xs={8} sm={8} className="option-grid-padding">
                                                <span>
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox
                                                        name="optionField"
                                                        color="primary"
                                                        checked={optionGroupValue.tempValue.indexOf(item.id) > -1 ? true : false}
                                                        onChange={(event) => optionCheckboxChangeHandler(event, currentOptionIndex, item.id, item.emwOptPrice.amount)}
                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                        classes={{ root: "option-checkbox-color" }}
                                                    />
                                                }
                                                    label={item.emwOptName}
                                                />
                                                    
                                                </span>
                                            </Grid>
                                            <Grid item xs={4} sm={4} className="option-modal-values">
                                                <span>
                                                    {
                                                        item.emwOptPrice.amount
                                                            ?
                                                            item.emwOptPrice.amount > 0 ?
                                                                '$' + item.emwOptPrice.amount
                                                                :
                                                                '-$' + Math.abs(item.emwOptPrice.amount)
                                                            : "No charge"
                                                    }
                                                </span>
                                            </Grid>
                                        </React.Fragment>
                                    )
                                })
                            }
                            {
                                optionGroupValue.emwOptgrpType === 1 ?
                                    <React.Fragment>
                                        {
                                            optionGroupValue.options.map((item, index) => {
                                                return (item.emwOptIsActive) &&
                                                (
                                                    <React.Fragment key={index}>
                                                        <Grid item xs={8} sm={8} className="option-grid-padding">
                                                            <span>
                                                                <RadioGroup aria-label="" name="optionField" value={optionGroupValue.tempValue && optionGroupValue.tempValue.length > 0 ? optionGroupValue.tempValue[0] : ""} onChange={(event) => optionRadioChangeHandler(event, currentOptionIndex, item.emwOptPrice.amount)} classes={{ root: "option-checkbox-color option-radio" }}>
                                                                    <FormControlLabel value={item.id} control={<Radio />} label={item.emwOptName} />
                                                                </RadioGroup>
                                                            </span>
                                                        </Grid>
                                                        <Grid item xs={4} sm={4} className="option-modal-values">
                                                            <span>
                                                            {
                                                                item.emwOptPrice.amount
                                                                    ?
                                                                    item.emwOptPrice.amount > 0 ?
                                                                        '$' + item.emwOptPrice.amount
                                                                        :
                                                                        '-$' + Math.abs(item.emwOptPrice.amount)
                                                                    : "No charge"
                                                            }
                                                            </span>
                                                        </Grid>
                                                    </React.Fragment>
                                                )

                                            })
                                        }

                                    </React.Fragment>
                                    : null
                            }
                        </>
                        :
                        <>
                            <p> No option available </p>
                        </>
                }
            </Grid>
        </>
    )
}
export default OptionsModalBody;