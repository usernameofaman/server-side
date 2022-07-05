import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import { Breadcrumbs } from "../../components";

interface ProductSkeletoStructureProps {
}
const ProductSkeletoStructure: React.FC<ProductSkeletoStructureProps> = () => {
    return (
        <div className="product-page">
            <div className="container">
                {/* <Breadcrumbs breadcrumbs={this.populateBreadcrumbs(product)} /> */}
                <div className="product-skeleton-breadcrumbs">
                    <Skeleton variant="rect" animation="wave" height={15} className="product-mobile-skeleton-rounded" />
                </div>
                <div className="product-page-product-container">
                    <div className="product-page-product-container-left">
                        <div>
                            <Skeleton variant="rect" animation="wave" height={300} className="product-mobile-skeleton-rounded" />
                        </div>
                        <div className="product-hide-skeleton">
                            <Skeleton variant="rect" animation="wave" height={80} className="product-mobile-top-space-skeleton product-mobile-skeleton-rounded" />
                        </div>
                        <div className="product-hide-skeleton">
                            <Skeleton variant="rect" animation="wave" height={40} className="product-mobile-top-space-skeleton product-mobile-skeleton-rounded" />
                        </div>
                    </div>
                    <div className="product-page-product-container-right">
                        <div className="product-hide-skeleton">
                            <Skeleton variant="rect" animation="wave" height={90} className="product-mobile-skeleton-rounded" />
                        </div>
                        <div className="product-hide-skeleton">
                            <Skeleton variant="rect" animation="wave" height={50} className="product-mobile-top-space-skeleton product-mobile-skeleton-rounded" />
                        </div>
                        <div className="product-show-mobile-skeleton">
                            <Skeleton variant="rect" animation="wave" height={200} className="product-mobile-top-space-skeleton product-mobile-skeleton-rounded" />
                        </div>
                        <div>
                            <Skeleton variant="rect" animation="wave" height={260} className="product-mobile-top-space-skeleton product-mobile-skeleton-rounded" />
                        </div>
                    </div>

                </div>
                <div className="product-mobile-top-space-skeleton">
                    <Skeleton variant="rect" animation="wave" height={40} className="product-mobile-skeleton-rounded" />
                    <div className="productListWrapper product-mobile-top-space-skeleton product-hide-skeleton product-mobile-bottom-space-skeleton">
                        <Grid container spacing={3}>
                            <Grid item lg={3} md={4} sm={6} xs={6}>
                                <Skeleton variant="rect" animation="wave" height={230} />
                            </Grid>
                            <Grid item lg={3} md={4} sm={6} xs={6}>
                                <Skeleton variant="rect" animation="wave" height={230} />
                            </Grid>
                            <Grid item lg={3} md={4} sm={6} xs={6}>
                                <Skeleton variant="rect" animation="wave" height={230} />
                            </Grid>
                            <Grid item lg={3} md={4} sm={6} xs={6}>
                                <Skeleton variant="rect" animation="wave" height={230} />
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className="product-mobile-top-space-skeleton product-show-mobile-skeleton">
                    <Skeleton variant="rect" animation="wave" height={80} className="product-mobile-skeleton-rounded" />
                </div>
                <div className="product-mobile-top-space-skeleton product-show-mobile-skeleton product-mobile-bottom-space-skeleton">
                    <Skeleton variant="rect" animation="wave" height={40} className="product-mobile-skeleton-rounded" />
                </div>
            </div>
        </div>
    )
}
export default ProductSkeletoStructure;
