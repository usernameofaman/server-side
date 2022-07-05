import * as React from "react";
import { Link } from "react-router-dom";

// import { Carousel, ProductListItem } from "..";
// import { generateProductUrl, maybe } from "../../core/utils";
// import { TypedFeaturedProductsQuery } from "./queries";

import "./scss/index.scss";


import { useQuery } from '@apollo/react-hooks';
import { emwarticleQuery } from "../../views/Article/query";
import EMWContentArea from '../../views/Article/EMWContentArea';


interface ProductsFeaturedProps {
  title?: string;
}

const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({ title }) => {

  const { data, loading, error } = useQuery(emwarticleQuery, {
    variables: { slug: "bottom-hero" }, fetchPolicy: "network-only",
  });

  return (

    data && data.emwpageBySlug ? <div className="emw-vendor-listing">
        <div className="home-page__categoriesemwtitle">
          <h3>We sell the brand that you know and trust.</h3>
        </div>
        <EMWContentArea data={data.emwpageBySlug} />
      </div>
        : null

  );
};

ProductsFeatured.defaultProps = {
  title: "Featuredewew",
};

export default ProductsFeatured;
