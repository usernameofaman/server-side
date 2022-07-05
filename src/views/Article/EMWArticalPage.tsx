import * as React from "react";
import EMWRelatedCategories from "./EMWRelatedCategories";
import EMWRelatedVendors from "./EMWRelatedVendors";
import { Breadcrumb, Breadcrumbs } from "../../components";
import EMWRelatedProducts from './EMWRelatedProducts';
import EMWContentArea from './EMWContentArea';
import { Helmet } from 'react-helmet'

interface PageProps {
    page: any;
}

export const Page: React.FC<PageProps> = props => {
    const { page } = props;
    const vendor = page && page.vendor && page.vendor.edges && page.vendor.edges.length > 0;
    const products = page && page.products && page.products.edges && page.products.edges.length > 0;
    const categories = page && page.categories && page.categories.edges && page.categories.edges.length > 0;

    return (

        <div className="">
            <div className="bottom-space">
                <Helmet>
                    <meta charSet="utf-8" />
                    <link rel="canonical" href={process.env.REACT_APP_STOREFRONT_BASE_URL + window.location.pathname} />
                </Helmet>
                <EMWContentArea data={page} />
            </div>
            <div className="container">
                {
                    (vendor || products || categories) &&
                    <div className="related-section bottom-space">
                        {
                            page && page.vendors && page.vendors.edges && page.vendors.edges.length ?
                                <div style={{ marginBottom: 40 }}>
                                    <p className="related-item-heading mt-0">Related Vendors</p>
                                    <EMWRelatedVendors data={page} />
                                </div>
                                : null
                        }
                        <div>
                            <p className="related-item-heading mt-0">Related Categories</p>
                            <EMWRelatedCategories data={page} />
                        </div>
                        <div>
                            <p className="related-item-heading">Related Products</p>
                            <EMWRelatedProducts data={page} />
                        </div>
                    </div>
                }
            </div>
        </div>

    );
}