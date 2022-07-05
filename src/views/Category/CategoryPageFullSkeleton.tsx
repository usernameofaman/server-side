import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import CategoryProductSkeletons from "./CategoryProductSkeletons";
import { Helmet } from 'react-helmet' 

interface CategoryPageFullSkeletonProps {
    // ProductGridView: boolean;
}
const CategoryPageFullSkeleton: React.FC<CategoryPageFullSkeletonProps> = (props) => {
    return (
        <div className="category">
          <Helmet>
          <meta charSet="utf-8" />
          <link rel="canonical" href={process.env.REACT_APP_STOREFRONT_BASE_URL + window.location.pathname} />
        </Helmet>
          {/* Main Page started Here */}
          <section className="category">
            <div className="container-fluid top-space">
              {/* <Breadcrumbs breadcrumbs={extractBreadcrumbs(category)} /> */}
                <div className="category-skeleton-breadcrumbs">
                    <Skeleton variant="rect" animation="wave" height={15} className="product-mobile-skeleton-rounded" />
                </div>
            </div>
            <div className="container-fluid">
    
              {/* Left Sidebar Started Here */}
                  <div className='category_sidebar category-mobile-facet-filter-skeleton'>
                    <Skeleton variant="text" animation="wave" height={25} />
                    <Skeleton variant="text" animation="wave" height={25} />
                    <Skeleton variant="text" animation="wave" height={25} />
                    <Skeleton variant="text" animation="wave" height={25} />
                    <Skeleton variant="text" animation="wave" height={25} />
                    <Skeleton variant="text" animation="wave" height={25} />
                    <Skeleton variant="text" animation="wave" height={25} />
                    <Skeleton variant="text" animation="wave" height={25} />
                    <Skeleton variant="text" animation="wave" height={25} />
                    <Skeleton variant="text" animation="wave" height={25} />
                    <Skeleton variant="text" animation="wave" height={25} />
                  </div>
              {/* Left Sidebar Ended Here */}
    
              <div className="categoryWrapper">
                      <Skeleton variant="rect" animation="wave" height={44} className="category-header-skeleton category-show-desktop-skeleton" />
                      <Skeleton variant="rect" animation="wave" height={44} className="category-header-skeleton category-show-desktop-skeleton" />
    
                {/*---------------------------- Mobile Category Design ------------------*/}
                <div className="categoryWrapper-mobile category-show-mobile-skeleton">
                  
                        <Skeleton variant="rect" animation="wave" height={40} className="category-mobile-skeleton-rounded" />
                      
                        <Skeleton variant="rect" animation="wave" height={40} className="category-mobile-skeleton-rounded category-mobile-header-skeleton" />
                </div>
    
                <div className="category-contentWrap category-show-desktop-skeleton">
                        <Skeleton variant="rect" animation="wave" height={40} className="category-mobile-skeleton-rounded" />
                </div>
    
    
    
                {/* Product List Wrapper Started Here */}
    
                  <div className="productListWrapper">
                    
    
                    {/* Mobile Product Filter */}
                          <Skeleton variant="rect" animation="wave" height={60} className="category-mobile-skeleton-rounded category-show-mobile-skeleton" />
    
                          <Skeleton variant="rect" animation="wave" height={60} className="category-mobile-skeleton-rounded category-mobile-header-skeleton category-mobile-bottom-space-skeleton category-show-mobile-skeleton" />
                        
                    
                        <CategoryProductSkeletons ProductGridView={true} />
                        
                        <Skeleton variant="rect" animation="wave" height={44} className="category-header-skeleton category-show-desktop-skeleton" />
                        
    
                    {/* Mobile pagination Bottom   */}
                        <Skeleton variant="rect" animation="wave" height={60} className="category-mobile-skeleton-rounded category-mobile-header-skeleton category-show-mobile-skeleton" />
                    
    
    
                    {/* Product Pagination Wrapper */}
    
                    {/* Daynmic Product Grid Ended Here*/}
    
                  </div>
                {/* Product List Wrapper Started Here */}
    
              </div>
            </div>
          </section>
          {/* Main Page Ended Here */}
    
    
          <div className="container">
          </div>
        </div>
      );
}
export default CategoryPageFullSkeleton;
