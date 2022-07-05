import React from 'react'
import { Box, Button, Card, Dialog } from '@material-ui/core';
import AlertIcon from '../../images/alert-icon.svg';

export default function EMWSingleCustomModal({ messageData }) {
    const [open, setOpen] = React.useState(true);
    const handleClose = (e, reason) => {
        if (reason && reason == "backdropClick")
            return;
        setOpen(false)
    };

    return (
        <>
            <Dialog
                className={"emw-custom-modal-information"}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                hideBackdrop={true}
            >
                <Card className='custom-modal-dialog'>
                    <Box className='alert-icon-outer-container'>
                        <Box className='alert-icon-container'>
                            <img src={AlertIcon} alt='custom-message' className='custom-modal-image' />
                        </Box>
                    </Box>
                    <Box className='custom-modal-header'>
                        {messageData.messageHeader}
                    </Box>
                    <Box className='custom-modal-message' dangerouslySetInnerHTML={{ __html: messageData.message }}>
                    </Box>
                    <button onClick={(e) => handleClose(e, "Reason")} className='custom-modal-button' style={{ width: "100%" }}>
                        {messageData.buttonText}
                    </button>
                </Card>
            </Dialog>
        </>
    )
}
