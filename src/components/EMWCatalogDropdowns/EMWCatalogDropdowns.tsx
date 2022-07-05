import './scss/index.scss';
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import { categoryList } from './constants';
// import {TextField } from "../../components";
import TextField from '@material-ui/core/TextField';

interface EMWCatlogDropdownsProps{
    heading: string;
    subHeading? : string;
    onConfirm: any;
    enableSearch: boolean;
    dropdownPlaceHolder: string;
    optionsList: any;
}
const EMWCatlogDropdowns: React.FC<EMWCatlogDropdownsProps> = (props) => {
    const { heading, subHeading, onConfirm, enableSearch, dropdownPlaceHolder, optionsList }= props;
return (
<>
<Box className="catalog-dropdown-container" alignItems="center" textAlign="center">
    <Grid container spacing={3} >
        <Grid item xs={12} md={12}>
            <p className="catalog-dropdown-label">{heading}</p>
        </Grid>
        <Grid item xs={12} md={12}>
            {
                (enableSearch) ?
                <>
                    <Box flex="1">
                        <Select
                            className="catalog-dropdown"
                            minMenuHeight={40}
                            placeholder={dropdownPlaceHolder}
                            // onChange={(values) => setOptionValues(values)}
                            isSearchable={true}
                            options={optionsList.length > 0 ? optionsList : []}
                        />
                    </Box>
                </>
                :
                <>
                    <Box flex="1">
                        <p className="sub-heading-text">{subHeading}</p>
                    </Box>
                </>

            }
        </Grid>

        <Grid item xs={12} md={12}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box flex="1" pr={1}>
                    {
                        (enableSearch) ?
                        <TextField
                            name="searchTerm"
                            placeholder="Enter search term"
                            type="text"
                            InputLabelProps={{shrink: false}}
                            // variant="filled"
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            className={'search-term-class'}
                            // onChange={handleOnChange}
                        />
                        :
                        
                        <Select
                            className="catalog-dropdown"
                            minMenuHeight={40}
                            placeholder={dropdownPlaceHolder}
                            // onChange={(values) => setOptionValues(values)}
                            isSearchable={true}
                            options={optionsList.length > 0 ? optionsList : []}
                        />
                    }
                    
                </Box>
                <Box>
                    <Button className="catalog-go-btn" onClick={onConfirm}>
                        GO
                    </Button>
                </Box>
            </Box>
        </Grid>
    </Grid>
</Box>
</>
)
}
export default EMWCatlogDropdowns;