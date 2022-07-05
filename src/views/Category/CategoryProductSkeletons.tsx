import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

interface CategoryProductSkeletonsProps {
    ProductGridView: boolean;
}
const CategoryProductSkeletons: React.FC<CategoryProductSkeletonsProps> = (props) => {
    const { ProductGridView } = props;
    return (
        (ProductGridView) ?
            <Grid container spacing={3}>
                <Grid item lg={3} md={4} sm={6} xs={6}>
                    <Skeleton variant="rect" animation="wave" height={232} />
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={6}>
                    <Skeleton variant="rect" animation="wave" height={232} />
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={6}>
                    <Skeleton variant="rect" animation="wave" height={232} />
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={6}>
                    <Skeleton variant="rect" animation="wave" height={232} />
                </Grid>

                <Grid item lg={3} md={4} sm={6} xs={6}>
                    <Skeleton variant="rect" animation="wave" height={232} />
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={6}>
                    <Skeleton variant="rect" animation="wave" height={232} />
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={6}>
                    <Skeleton variant="rect" animation="wave" height={232} />
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={6}>
                    <Skeleton variant="rect" animation="wave" height={232} />
                </Grid>

                <Grid item lg={3} md={4} sm={6} xs={6}>
                    <Skeleton variant="rect" animation="wave" height={232} />
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={6}>
                    <Skeleton variant="rect" animation="wave" height={232} />
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={6}>
                    <Skeleton variant="rect" animation="wave" height={232} />
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={6}>
                    <Skeleton variant="rect" animation="wave" height={232} />
                </Grid>
            </Grid>
            :
            <Grid container spacing={3}>
                <Grid item md={12} sm={12} xs={12}>
                    <div>
                        <Skeleton variant="rect" height={200} />
                    </div>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                    <div>
                        <Skeleton variant="rect" height={200} />
                    </div>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                    <div>
                        <Skeleton variant="rect" height={200} />
                    </div>
                </Grid>
            </Grid>
    )
}
export default CategoryProductSkeletons;
