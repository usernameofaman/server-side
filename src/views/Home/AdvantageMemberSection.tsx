import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { OverlayContext } from "../../components";

const onAccountCreateClick=(overlayContext)=>{
    setTimeout(() => { 
        overlayContext.show(
            "register",
            "right"
        );
    }, 1000);
}
const AdvantageMemberSection: React.FC = () => {
    return (
        <>
            <Box className="advantage-section">
                <h3>Explore the benefits of becoming an Advantage Member</h3>
                <Container maxWidth="md">
                    <Box display="flex" alignItems="center" justifyContent="space-between" flexDirection={{ 'xs': 'column','sm': "row" }}>
                        <Box flex="1" pr={4}>
                            <p>Advantage customer status unlocks pricing and product features that are not available without an account. Once created, members receive tiered pricing customized to fit your organization’s needs.</p>
                            <p className="advantage-spacing-gap">Sign up today to enjoy the benefits with EMW Advantage!</p>
                        </Box>
                        <Box>
                        <OverlayContext.Consumer>
					    {
                            overlayContext => (
                            <Button className='create-account-btn' onClick={()=>onAccountCreateClick(overlayContext)}>
                                CREATE ACCOUNT NOW
                            </Button>
                            )
                        }
                        </OverlayContext.Consumer>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}
export default AdvantageMemberSection;