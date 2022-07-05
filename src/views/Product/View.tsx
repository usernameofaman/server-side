import "./scss/index.scss";
import React, { useState, useEffect, Suspense } from "react";
import { RouteComponentProps } from "react-router";

import { MetaWrapper, NotFound, OfflinePlaceholder } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { maybe } from "../../core/utils";
// import Page from "./Page";
import { EMWproductDetailsQuery } from "./queries";
import { EMWProductDetails_emwproduct } from "./types/EMWProductDetails";
import { useUserDetails } from "@sdk/react";
import { useQuery } from '@apollo/react-hooks';

import ReactSVG from "react-svg";
import loader from '../../images/emw-loader.svg'
import { useAlert } from "react-alert";
import ProductSkeletonStructure from './ProductSkeletonStructure';

const Page = React.lazy(() => import("./Page"));

const canDisplay = (product: EMWProductDetails_emwproduct) =>
  maybe(
    () =>
      !!product.descriptionJson &&
      !!product.name &&
      !!product.sellPrice
  );
const extractMeta = (product: EMWProductDetails_emwproduct) => ({
  custom: [
    {
      content: product.sellPrice.amount.toString(),
      property: "product:price:amount",
    },
    {
      content: product.sellPrice.currency,
      property: "product:price:currency",
    },
    {
      content: product.emwProdIsActive ? "in stock" : "out off stock",
      property: "product:isAvailable",
    },
    {
      content: product.emwProdCatid.name,
      property: "product:category",
    },
  ],
  description: product.seoDescription || product.descriptionJson,
  title: product.seoTitle || product.name,
  type: "product.item",
  url: window.location.href,
});

interface ProductViewProps extends RouteComponentProps<{ id: any }> {
  prodId: string
}

const View: React.FC<ProductViewProps> = ({ match, prodId }) => {
  const alert = useAlert();
  const userDetails = useUserDetails();
  const [loggedIn, setLoggedIn] = useState(false);
  const [ProductData, setNewProductData] = useState(null);
  const [productId, setProductId] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState({})
  const impersonatedCustomerEmail = localStorage.getItem('ImpersonatedCustomerEmail');

  let requestData = {}
  if(impersonatedCustomerEmail && impersonatedCustomerEmail.length){
    requestData ={
      id:productId,
      email:impersonatedCustomerEmail
    }
  }else{
    requestData ={
      id:productId,
    }
  }

  const { data, loading, refetch, error } = useQuery(EMWproductDetailsQuery, {
    variables: requestData,
    fetchPolicy: "network-only",
    errorPolicy: 'all',
    skip: (productId !== "") ? false : true,
  });

  useEffect(() => {
    if (prodId) {
      setProductId(prodId);
    }
  }, [prodId]);

  useEffect(() => {
    if (data) {
      setShowSkeleton(false);
      setNewProductData(data);
    } else if (data == undefined && error) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
      setNewProductData(null);
      setShowSkeleton(false);
    }
  }, [data, error]);

  useEffect(() => {
    if (productId) {
      setShowSkeleton(true);
    }
  }, [productId]);

  useEffect(() => {
    const email = userDetails.data && userDetails.data.email;
    if (productId) {
      if (email) {
        setLoggedIn(true);
        refetch();
      } else {
        setLoggedIn(false);
        refetch();
      }
    }
  }, [userDetails.data, productId]);

  let productData = ProductData && ProductData.emwproduct;
  return (
    (showSkeleton) ?
      <ProductSkeletonStructure />
      :
      <>
        <NetworkStatus>
          {isOnline => {
            if (canDisplay(productData)) {
              return (
                <MetaWrapper meta={extractMeta(productData)}>
                  <Suspense fallback={
                    <div className="product-page-details_block loader-wrapper">
                      <ReactSVG path={loader} className="medium-size-loader" />
                    </div>
                  }>
                    <Page selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} product={productData} loggedIn={loggedIn} productDataLoading={loading} />
                  </Suspense>
                </MetaWrapper>
              );
            }

            if (productData === null) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
          }}
        </NetworkStatus>
      </>
  )
};

export default View;
