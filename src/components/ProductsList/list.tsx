import "./scss/index.scss";

import * as React from "react";
import { Link, withRouter } from "react-router-dom";

import { generateEMWProductSeoUrl } from "../../core/utils";
import Loader from "../Loader";

import { Product } from "../ProductListItem";

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import { Thumbnail } from "@components/molecules";

import plusIcon from '../../images/plus-icon.png'

import minusIcon from '../../images/minus-icon.png'

import IndividualProductsList from "./IndividualProductsList"
import { EMWProductDetails_emwproduct } from "../../../src/views/Product/types/EMWProductDetails";
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
  firstPIndex: number;
  lastPIndex: number;
  product: EMWProductDetails_emwproduct;
  history: any
  isCategory: boolean
}


export const ProductListView: React.FC<ProductsListProps> = ({
  displayLoader,
  hasNextPage,
  notFound,
  onLoadMore,
  products,
  totalCount,
  firstPIndex,
  lastPIndex,
  product,
  history,
  isCategory,
}) => {
  const hasProducts = !!totalCount;

  const ImgUrl = process.env.REACT_APP_CLOUDFRONT_URL

  // const [getProductAndRedirect] = useLazyQuery(emwProductIdQuery, {
  //   fetchPolicy: 'network-only',
  //   onCompleted(data) {
  //     if (data && data.emwproductByProductId) {
  //       history.push(generateEMWProductSeoUrl(data.emwproductByProductId.id, data.emwproductByProductId.name, data.emwproductByProductId.emwProdSesurl))
  //     }
  //   },
  //   onError(error) {
  //     console.error('Error in query', error)
  //   },
  // });

  const getProductAndRedirect = (id, name, emwProdSesurl, aggregateSellPrice) => {
    // click event when user going from list to pdp 
    const listName = isCategory ? "Category Listing" : "Search Results";
    GAImpressionClickEvent({ id: id, name: name, aggregateSellPrice: aggregateSellPrice && aggregateSellPrice.amount }, listName);
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
      // <div className="product-page-details_block loader-wrapper">
      //   < ReactSVG path={loader} className="medium-size-loader" />
      // </div > 
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
      : hasProducts ? (
        <>
          <Grid container spacing={3}>
            {productListArray.map((product, index) => (
              <Grid item md={12} sm={12} xs={12}>
                <div key={product.id} onClick={() => {
                  getProductAndRedirect(product.emwProdId, product.name, product.emwProdSesurl, product.aggregateSellPrice)
                }}>
                  <Link
                    to={generateEMWProductSeoUrl(product.emwProdId, product.name, product.emwProdSesurl)}
                    key={product.id}
                  >
                    <IndividualProductsList product={product} key={product.id} />
                  </Link>
                </div>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
            <div className="products-list__products-not-found">{notFound}</div>
          )}
    </div>
  );
};

ProductListView.defaultProps = {
  notFound: "We couldn't find any product matching these conditions",
};

export default withRouter(ProductListView);
