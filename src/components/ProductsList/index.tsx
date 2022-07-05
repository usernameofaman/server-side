import "./scss/index.scss";

import * as React from "react";
import { Link, withRouter } from "react-router-dom";

// import { Button, ProductListItem } from "..";
import { ProductListItem } from "..";

import { generateEMWProductSeoUrl } from "../../core/utils";
import Loader from "../Loader";

import { Product } from "../ProductListItem";

import Grid from '@material-ui/core/Grid';
import { TypedEMWProductIdQuery, emwProductIdQuery } from "@temp/views/Product/queries";
import { useLazyQuery } from "react-apollo";
import { GAImpressionClickEvent } from "../../utils/Google-Analytics";

import ReactSVG from "react-svg";
import loader from '../../images/emw-loader.svg'
import Skeleton from '@material-ui/lab/Skeleton';


interface ProductsListProps {
  displayLoader: boolean;
  hasNextPage: boolean;
  notFound?: string | React.ReactNode;
  onLoadMore: (limit) => void;
  products: Product[];
  totalCount: number;
  lastPIndex: number;
  firstPIndex: number;
  history: any
  isCategory: boolean
}

export const ProductList: React.FC<ProductsListProps> = ({
  displayLoader,
  hasNextPage,
  notFound,
  onLoadMore,
  products,
  totalCount,
  lastPIndex,
  firstPIndex,
  history,
  isCategory
}) => {
  const hasProducts = !!totalCount;

  // const [getProductAndRedirect] = useLazyQuery(emwProductIdQuery, {
  //   fetchPolicy: 'network-only',
  //   onCompleted(data) {
  //     if (data && data.emwproductByProductId) {
  //       history.push(generateEMWProductSeoUrl(data.emwproductByProductId.emwProdId, data.emwproductByProductId.name, data.emwproductByProductId.emwProdSesurl))
  //     }
  //   },
  //   onError(error) {
  //     console.error('Error in query', error)
  //   },
  // });

  const getProductAndRedirect = (id, name, emwProdSesurl, aggregateSellPrice) => {
    // click event when user going from list to pdp 
    const listName=isCategory ? "Category Listing" : "Search Results"; 
    GAImpressionClickEvent({ id: id, name: name, aggregateSellPrice: aggregateSellPrice && aggregateSellPrice.amount},listName);
  }

  let informationalProduct:Product[]=[];
  let detailProduct:Product[]=[];
  const listedProducts = products.map((product,map)=>{
  if(product.emwProdIsInformational){
    return informationalProduct.push(product);
  }else{
    return detailProduct.push(product);
  }
  });
  const productListArray = detailProduct.concat(informationalProduct);
  
  return (
    <div className="productListWrapper">
        {displayLoader ? 
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
          // <div className="product-page-details_block loader-wrapper">
          //   <ReactSVG path={loader} className="medium-size-loader" />
          // </div> 
          : hasProducts ? (
        <>
          <Grid container spacing={3}>
            {productListArray.map((product, index) => {
              return (
                <Grid 
                onClick={() => {
                  getProductAndRedirect( product.emwProdId, product.name, product.emwProdSesurl, product.aggregateSellPrice)
                }}  
                item lg={3} md={4} sm={6} xs={6}>
                  <Link
                    to={generateEMWProductSeoUrl(product.emwProdId, product.name, product.emwProdSesurl)}
                    key={product.id}
                  >
                    <ProductListItem product={product} />
                  </Link>
                </Grid>
              )
            })}
          </Grid>
        </>
      ) : (
          <div className="products-list__products-not-found">{notFound}</div>
        )}
    </div>
  );
};

ProductList.defaultProps = {
  notFound: "We couldn't find any product matching these conditions",
};

export default withRouter(ProductList);
