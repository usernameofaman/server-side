import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import EMWCatlogDropdowns from '../../components/EMWCatalogDropdowns';

interface CatalogSectionProps{
    categoriesList: any;
}
const CatalogSection: React.FC<CatalogSectionProps> = (props) => {
const { categoriesList }=props;

const onCategoryConfirm=()=>{
    console.log('confirm category Called--');
}
const onProductTypeConfirm=()=>{
    console.log('confirm productType');
}

return (
<>
<Box className="catalog-section">
    <h3>Explore our catlalog by Category, Product Type, or Manufacturer.</h3>
    <Container maxWidth="md">
        <Grid container spacing={3} >
            <Grid item xs={12} md={6}>
                <EMWCatlogDropdowns 
                    heading={"Search within Category"} 
                    enableSearch={true}
                    onConfirm={onCategoryConfirm}
                    dropdownPlaceHolder={'Choose Category'}
                    optionsList={categoriesList &&  categoriesList.edges.length > 0 ? categoriesList.edges.map(item => ({
                        label: item.node.name,
                        value: item.node.name,
                      })) : []}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <EMWCatlogDropdowns 
                    heading={'Browse by Type and Attributes'} 
                    subHeading={"Select a produuct type to begin and further sort by by product attributes/specs on the following page."}
                    onConfirm={onProductTypeConfirm}
                    enableSearch={false}
                    dropdownPlaceHolder={"Choose Product Type"}
                    optionsList={[]}
                />
            </Grid>
        </Grid>
    </Container>
</Box>
</>
)
}
export default CatalogSection;