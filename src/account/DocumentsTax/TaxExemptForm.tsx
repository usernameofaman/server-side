import React, { useState } from "react";
import "./scss/index.scss";
import { AlertManager, useAlert } from "react-alert";
import { TextField } from "../../components";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { taxExemptDetailsUpdate } from '../../@sdk/mutations/user';
import { FormControl, NativeSelect, styled, InputBase, Checkbox, Paper } from '@material-ui/core';
import { ClickAwayListener, Box } from "@material-ui/core";

export const StyledInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        marginBottom: "5px",
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '0.5px solid #CCCED0 !important',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        height: 29,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: '0 0 0 1px #21125e',
            color: '#21125e',
            transition: 'all 0.3s ease',
        },
        '&:hover': {
            boxShadow: '0 0 0 1px #21125e',
            color: '#21125e',
            transition: 'all 0.3s ease',
        },
    },
}));




const emwStyle = {
    statesSelector:{
        cursor: "pointer",
        '&:hover':{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }
    },
    statesSelected:{
        cursor: "pointer",
        background: "#f9f9f9",
        borderRadius: "3px"
    },
    emwTile: {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        backgroundColor: 'rgb(249, 250, 250)',
        width: " 100%",
        margin: "0px",
    },
    emwTileHead: {
        background: "#E5E5E5",
        textAlign: "left",
        color: " #425160",
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    emwTileContent: {
        color: "#425160",
        fontWeight: "normal",
        alignItems: "center",
        justifyContent: "center",
        contentEMWTile: {
            cursor: "pointer",
            textDecorationLine: "underline",
            fontWeight: "normal",
        }
    },
    emwLabel: {
        fontSize: "12px"
    },
    emwtextboxInput: {
        border: "0.5px solid #CCCED0",
        boxSizing: "border-box",
        borderRadius: "5px",
        marginTop: "5px"
    },
    emwtextboxInputState: {
        border: "0.5px solid #CCCED0",
        boxSizing: "border-box",
        borderRadius: "5px",
        marginTop: "5px",
        height: "40px",
    },
    submitButton: {
        maxWidth: "160px",
        marginBottom: "7px"
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }

}


const TaxExemptForm: React.FC<{
}> = ({ closeForm, refetch }) => {
    const alert = useAlert();

    const [usStates, setUsStates] = useState([
        { name: 'Alabama', abbreviation: 'AL', isChecked: false },
        { name: 'Alaska', abbreviation: 'AK', isChecked: false },
        { name: 'American Samoa', abbreviation: 'AS', isChecked: false },
        { name: 'Arizona', abbreviation: 'AZ', isChecked: false },
        { name: 'Arkansas', abbreviation: 'AR', isChecked: false },
        { name: 'California', abbreviation: 'CA', isChecked: false },
        { name: 'Colorado', abbreviation: 'CO', isChecked: false },
        { name: 'Connecticut', abbreviation: 'CT', isChecked: false },
        { name: 'Delaware', abbreviation: 'DE', isChecked: false },
        {
            name: 'District Of Columbia',
            abbreviation: 'DC',
            isChecked: false
        },
        {
            name: 'Federated States Of Micronesia',
            abbreviation: 'FM',
            isChecked: false
        },
        { name: 'Florida', abbreviation: 'FL', isChecked: false },
        { name: 'Georgia', abbreviation: 'GA', isChecked: false },
        { name: 'Guam', abbreviation: 'GU', isChecked: false },
        { name: 'Hawaii', abbreviation: 'HI', isChecked: false },
        { name: 'Idaho', abbreviation: 'ID', isChecked: false },
        { name: 'Illinois', abbreviation: 'IL', isChecked: false },
        { name: 'Indiana', abbreviation: 'IN', isChecked: false },
        { name: 'Iowa', abbreviation: 'IA', isChecked: false },
        { name: 'Kansas', abbreviation: 'KS', isChecked: false },
        { name: 'Kentucky', abbreviation: 'KY', isChecked: false },
        { name: 'Louisiana', abbreviation: 'LA', isChecked: false },
        { name: 'Maine', abbreviation: 'ME', isChecked: false },
        { name: 'Marshall Islands', abbreviation: 'MH', isChecked: false },
        { name: 'Maryland', abbreviation: 'MD', isChecked: false },
        { name: 'Massachusetts', abbreviation: 'MA', isChecked: false },
        { name: 'Michigan', abbreviation: 'MI', isChecked: false },
        { name: 'Minnesota', abbreviation: 'MN', isChecked: false },
        { name: 'Mississippi', abbreviation: 'MS', isChecked: false },
        { name: 'Missouri', abbreviation: 'MO', isChecked: false },
        { name: 'Montana', abbreviation: 'MT', isChecked: false },
        { name: 'Nebraska', abbreviation: 'NE', isChecked: false },
        { name: 'Nevada', abbreviation: 'NV', isChecked: false },
        { name: 'New Hampshire', abbreviation: 'NH', isChecked: false },
        { name: 'New Jersey', abbreviation: 'NJ', isChecked: false },
        { name: 'New Mexico', abbreviation: 'NM', isChecked: false },
        { name: 'New York', abbreviation: 'NY', isChecked: false },
        { name: 'North Carolina', abbreviation: 'NC', isChecked: false },
        { name: 'North Dakota', abbreviation: 'ND', isChecked: false },
        {
            name: 'Northern Mariana Islands',
            abbreviation: 'MP',
            isChecked: false
        },
        { name: 'Ohio', abbreviation: 'OH', isChecked: false },
        { name: 'Oklahoma', abbreviation: 'OK', isChecked: false },
        { name: 'Oregon', abbreviation: 'OR', isChecked: false },
        { name: 'Palau', abbreviation: 'PW', isChecked: false },
        { name: 'Pennsylvania', abbreviation: 'PA', isChecked: false },
        { name: 'Puerto Rico', abbreviation: 'PR', isChecked: false },
        { name: 'Rhode Island', abbreviation: 'RI', isChecked: false },
        { name: 'South Carolina', abbreviation: 'SC', isChecked: false },
        { name: 'South Dakota', abbreviation: 'SD', isChecked: false },
        { name: 'Tennessee', abbreviation: 'TN', isChecked: false },
        { name: 'Texas', abbreviation: 'TX', isChecked: false },
        { name: 'Utah', abbreviation: 'UT', isChecked: false },
        { name: 'Vermont', abbreviation: 'VT', isChecked: false },
        { name: 'Virgin Islands', abbreviation: 'VI', isChecked: false },
        { name: 'Virginia', abbreviation: 'VA', isChecked: false },
        { name: 'Washington', abbreviation: 'WA', isChecked: false },
        { name: 'West Virginia', abbreviation: 'WV', isChecked: false },
        { name: 'Wisconsin', abbreviation: 'WI', isChecked: false },
        { name: 'Wyoming', abbreviation: 'WY', isChecked: false }
    ])
    const taxTypeChoices = [
        "SSN",
        "FEIN",
        "StateIssued",
        "ForeignDiplomat"
    ]

    const exemptReasonChoices = [
        "FederalGovernmentDepartment",
        "StateOrLocalGovernmentName",
        "TribalGovernmentName",
        "ForeignDiplomat",
        "CharitableOrganization",
        "EducationalOrganization",
        "Resale",
        "AgriculturalProduction",
        "IndustrialProductionOrManufacturing",
        "DirectPayPermit",
        "DirectMail",
        "Other",
        "ReligiousOrganization",
    ]
    const businessTypeChoices = [
        "AccommodationAndFoodServices",
        "Agricultural_Forestry_Fishing_Hunting",
        "Construction",
        "FinanceAndInsurance",
        "Information_PublishingAndCommunications",
        "Manufacturing",
        "Mining",
        "RealEstate",
        "RentalAndLeasing",
        "RetailTrade",
        "TransportationAndWarehousing",
        "Utilities",
        "WholesaleTrade",
        "BusinessServices",
        "ProfessionalServices",
        "EducationAndHealthCareServices",
        "NonprofitOrganization",
        "Government",
        "NotABusiness",
        "Other"
    ]
    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        businessType: "",
        taxIdNumber: "",
        taxIdIssueState: "",
        taxType: "",
        exemptReason: "",
        purchaserTitle: "",
        tax_exampt_reason_other: ""
    })
    const handleChange = (e) => {
        if(e.target.name === "state")
            return
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const [updateTaxExemptDetails] = useMutation(taxExemptDetailsUpdate, {
        onCompleted({ taxExemptDetailsUpdate }) {
            console.log(taxExemptDetailsUpdate);
            if (taxExemptDetailsUpdate.errors.length === 0) {
                alert.show(
                    {
                        title: "Updated Successfully",
                    },
                    { type: "success", timeout: 2000 }
                );
                closeForm()
                refetch()
                window.scrollTo(0, 0)
            } else {
                alert.show(
                    {
                        title: "Something Went Wrong.",
                    },
                    { type: "error", timeout: 2000 }
                );
            }
        },
        onError(error) {
            alert.show(
                {
                    title: "Something Went Wrong.",
                },
                { type: "error", timeout: 2000 }
            );
        }
    });


    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const styles = {
        position: 'absolute',
        top: 47,
        right: 0,
        left: 0,
        height: "300px",
        overflow: "auto",
        border: "none",
        zIndex: 1,
        p: 1,
        bgcolor: 'background.paper',
        borderRadius: "5px",
        boxShadow: "rgb(0 0 0 / 8%) 1px 4px 5px 5px;"
    };

    const submitRegistration = () => {
        updateTaxExemptDetails({
            variables: {
                input: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    address1: formData.address1,
                    address2: formData.address2,
                    city: formData.city,
                    state: formData.state.trim(),
                    zipCode: formData.zipcode,
                    country: formData.country,
                    businessType: formData.businessType,
                    taxIdNumber: formData.taxIdNumber,
                    taxIdIssueState: formData.taxIdIssueState,
                    taxExamptReason: formData.exemptReason,
                    taxType: formData.taxType,
                    purchaserTitle: formData.purchaserTitle,
                    taxExamptReasonOther: formData.tax_exampt_reason_other
                }
            },
        })
    }

    const handleStatesInput = (e, i) => {
        let arr = [...usStates];
        let object = arr[i];
        object.isChecked = !object.isChecked;
        arr[i] = object;
        setUsStates(arr);
        let newValue = formData.state;
        if(object.isChecked === false){
            newValue = newValue.replace(object.abbreviation+", ","")
        }
        else{
            newValue = newValue + object.abbreviation+", "
        }
        setFormData({ ...formData, "state": newValue })
    }


    return (
        <>
            <div className="tax-exemption-desc">
                All fields below are required to complete the registration.
            </div>
            <div>First Name</div>
            <TextField
                name="firstName"
                autoComplete="firstname"
                placeholder="First Name"
                type="text"
                onChange={handleChange}
                style={emwStyle.emwtextboxInput}
            />
            <div>Last Name</div>
            <TextField
                name="lastName"
                autoComplete="lastName"
                placeholder="Last Name"
                type="text"
                onChange={handleChange}
                style={emwStyle.emwtextboxInput}
            />
            <div>Purchaser Title</div>
            <TextField
                name="purchaserTitle"
                autoComplete="purchaserTitle"
                placeholder="Purchaser Title"
                type="text"
                onChange={handleChange}
                style={emwStyle.emwtextboxInput}
            />
            <div>Address 1</div>
            <TextField
                name="address1"
                autoComplete="address1"
                placeholder="Address 1"
                type="text"
                onChange={handleChange}
                style={emwStyle.emwtextboxInput}
            />
            <div>Address 2</div>
            <TextField
                name="address2"
                autoComplete="address2"
                placeholder="Address 2"
                type="text"
                onChange={handleChange}
                style={emwStyle.emwtextboxInput}
            />
            <div> City </div>
            <TextField
                name="city"
                autoComplete="city"
                placeholder="City"
                type="text"
                onChange={handleChange}
                style={emwStyle.emwtextboxInput}
            />
            <div>Exempt States</div>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box sx={{ position: 'relative' }}>
                    <TextField
                        name="state"
                        autoComplete="state"
                        placeholder="Tax Exempt States"
                        type="text"
                        onClick={handleClick}
                        onChange={handleChange}
                        style={emwStyle.emwtextboxInputState}
                        variant="outlined"
                        value={formData.taxIdIssueState}
                    />
                    {open ? (
                        <Paper elevation={1}>
                            <Box sx={styles}>
                                {usStates.map((state, index) => (
                                    <div style={ state.isChecked ? emwStyle.statesSelected : emwStyle.statesSelector}
                                        id={state.abbreviation}
                                        onClick={(e) => handleStatesInput(e, index)}
                                    >
                                        <Checkbox
                                            checked={state.isChecked}
                                            onChange={(event) => setTermsCheckbox(event.target.checked)}
                                            name="termsCheckbox"
                                            classes={{ root: 'customcheckboxBorder' }}
                                            style={{
                                                color: "#9FAEC1",
                                            }}
                                        />
                                        {state.name}
                                    </div>
                                ))}
                            </Box>
                        </Paper>
                    ) : null}
                </Box>
            </ClickAwayListener>
            {/* <TextField
                name="state"
                autoComplete="state"
                placeholder="State (Fullname)"
                type="text"
                onChange={handleChange}
                style={emwStyle.emwtextboxInput}
            /> */}
            <div>Zip Code</div>
            <TextField
                name="zipcode"
                autoComplete="zipcode"
                placeholder="Zip Code"
                type="text"
                onChange={handleChange}
                style={emwStyle.emwtextboxInput}
            />
            <div>Exempt Reason</div>
            <FormControl fullWidth>
                <NativeSelect
                    className="basic-single"
                    name="exemptReason"
                    input={<StyledInput />}
                    onChange={(event) => handleChange(event)}
                    placeholder="exemptReason">
                    <option value="exemptReason" selected disabled>Exempt Reason </option>
                    {exemptReasonChoices && exemptReasonChoices.length > 0 ? exemptReasonChoices.map(reason => {
                        return <option value={reason}>{reason}</option>
                    }) : []}
                </NativeSelect>
            </FormControl>
            <div>Business Type</div>
            <FormControl fullWidth>
                <NativeSelect
                    className="basic-single"
                    name="businessType"
                    input={<StyledInput />}
                    autoComplete="businessType"
                    placeholder="Business Type"
                    type="text"
                    onChange={handleChange}>
                    <option value="exemptReason" selected disabled>Exempt Reason </option>
                    {businessTypeChoices && businessTypeChoices.length > 0 ? businessTypeChoices.map(reason => {
                        return <option value={reason}>{reason}</option>
                    }) : []}
                </NativeSelect>
            </FormControl>
            <div>Tax ID #</div>
            <TextField
                name="taxIdNumber"
                autoComplete="taxIdNumber"
                placeholder="Tax ID Number"
                type="text"
                onChange={handleChange}
                style={emwStyle.emwtextboxInput}
            />
            <div>Tax ID Issue State</div>
            <TextField
                name="taxIdIssueState"
                autoComplete="taxIdIssueState"
                placeholder="Tax ID # Issue State"
                type="text"
                onChange={handleChange}
                style={emwStyle.emwtextboxInput}
            />
            <div>Tax type</div>
            <FormControl fullWidth>
                <NativeSelect
                    className="basic-single"
                    name="taxType"
                    input={<StyledInput />}
                    autoComplete="taxType"
                    placeholder="Tax type"
                    type="text"
                    onChange={handleChange}>
                    <option value="exemptReason" selected disabled>Tax Type </option>
                    {taxTypeChoices && taxTypeChoices.length > 0 ? taxTypeChoices.map(reason => {
                        return <option value={reason}>{reason}</option>
                    }) : []}
                </NativeSelect>
            </FormControl>
            <div style={emwStyle.buttonContainer}>
                <button className="register" style={emwStyle.submitButton} onClick={submitRegistration}>
                    Submit Registration
                </button>
                <button className="cancel" style={emwStyle.submitButton} onClick={() => closeForm()}>
                    Cancel
                </button>
            </div>

        </>
    );
};



export default TaxExemptForm;
