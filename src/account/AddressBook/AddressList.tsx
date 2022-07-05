import React from "react";
import "./scss/index.scss";
import { Trans } from "@lingui/react";
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


const showFields = (value) => {
    return (
        <>
            {value && <div className="address-single-field">
                {value}
            </div>}
        </>
    )
}

const AddressList: React.FC<{
    user: any;
    addressList: any;
    setDefaultAddress: any;
    onEditClick: any;
    deleteSelectedAddress: any;
}> = ({ user, addressList, setDefaultAddress, onEditClick, deleteSelectedAddress }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = React.useState(false);
    const [selectedAddress, setSelectedAddress] = React.useState()

    const handleClose = () => {
        setOpenDeleteConfirmation(false);
    };

    const handleSetDefaultAddress = (e, address) => {
        const addressId = address.node.id;
        setDefaultAddress({
            variables: {
                addressId
            },
        })
    }

    const onDeleteClick = (address) => {
        const addressId = address.node.id;
        deleteSelectedAddress({
            variables: {
                addressId
            }
        })
        handleClose()
    }

    return (
        <>  
        <Dialog
            // fullScreen={fullScreen}
            // maxWidth={'xs'}
            open={openDeleteConfirmation}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <div className="delete-confirmation">
                    <span className="delete-warning-text">
                        Are you sure you want to delete
                    </span>
                    <div onClick={()=> onDeleteClick(selectedAddress)} className="delete-button">
                        Delete Address
                    </div>
                    <div onClick={() => handleClose()} className="cancel">
                        Cancel
                    </div>
            </div>
        </Dialog>
            {addressList.map((address) => {
                if (address.node.isDefaultAddress)
                    return (
                        <>
                            <div className="address-view">
                                <div className="address-details">
                                    {showFields(`${address.node.firstName} ${address.node.lastName}`)}
                                    {showFields(address.node.companyName)}
                                    {showFields(address.node.streetAddress1)}
                                    {showFields(address.node.streetAddress2)}
                                    {showFields(`${address.node.city} ${address.node.countryArea} ${address.node.postalCode} `)}
                                    <br></br>
                                    {address.node.phone && (
                                        <>
                                            <Trans id="Phone number" />: {address.node.phone} <br />
                                        </>
                                    )}
                                    {address.node.email && (
                                        <>
                                            {address.node.email}
                                        </>
                                    )}
                                    {address.node.email && (
                                        <>
                                            {address.node.ccEmail}
                                        </>
                                    )}
                                </div>
                                <div className="address-controls">
                                    <div className="address-control-edit"
                                        onClick={() => onEditClick(address.node)}>
                                        Edit
                                    </div>
                                    <div className="address-control-delete"
                                        onClick={() => {
                                            setSelectedAddress(address)
                                            setOpenDeleteConfirmation(true)
                                        }
                                        }>
                                        Delete
                                    </div>
                                </div>
                            </div>
                            <div className="selected-default-address">
                                <h3 className="default-address-text">
                                    Default address

                                </h3>
                            </div>
                        </>
                    )
            })}

            {addressList.map((address) => {
                if (!address.node.isDefaultAddress)
                    return (
                        <>
                            <div className="address-view">
                                <div className="address-details">
                                    {showFields(`${address.node.firstName} ${address.node.lastName}`)}
                                    {showFields(address.node.companyName)}
                                    {showFields(address.node.streetAddress1)}
                                    {showFields(address.node.streetAddress2)}
                                    {showFields(`${address.node.city} ${address.node.countryArea} ${address.node.postalCode} `)}
                                    <br></br>
                                    
                                    {address.node.phone && (
                                        <>
                                            <Trans id="Phone number" />: {address.node.phone} <br />
                                        </>
                                    )}
                                    {address.node.email && (
                                        <>
                                            {address.node.email}
                                        </>
                                    )}
                                    {address.node.email && (
                                        <>
                                            {address.node.ccEmail}
                                        </>
                                    )}
                                </div>
                                <div className="address-controls">
                                    <div className="address-control-edit"
                                        onClick={() => onEditClick(address.node)}>
                                        Edit
                                    </div>
                                    <div className="address-control-delete"
                                        onClick={() => {
                                            setSelectedAddress(address)
                                            setOpenDeleteConfirmation(true)
                                        }
                                        }>
                                        Delete
                                    </div>
                                </div>
                            </div>
                            <div className="set-default-address">
                                <input style={{ width: "16px", height: "16px", marginRight: "10px" }}
                                    type="checkbox"
                                    checked={address.node.isDefaultAddress}
                                    onChange={(value) => handleSetDefaultAddress(value, address)} />
                                <div>Set as default address</div>
                            </div>
                        </>
                    )
            })}
        </>

    );
};

export default AddressList;
