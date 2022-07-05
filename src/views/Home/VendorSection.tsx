import React from 'react';
import Box from '@material-ui/core/Box';
import EMWSlider from '../../components/EMWSlider';

interface VendorSectionProps{
    
}
const VendorSection: React.FC<VendorSectionProps> = (props) => {
return (
<>
<Box className="vendor-section">
    <h3>Top performing brands that you know and trust.</h3>
    <EMWSlider />
</Box>
</>
)
}
export default VendorSection;