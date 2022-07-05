import React, { useState, useEffect, Children, useRef } from 'react';

import { RouteComponentProps } from "react-router";

import { IFiltersEMW } from "@types";
import { StringParam, useQueryParam } from "use-query-params";
import { MetaWrapper, NotFound, OfflinePlaceholder } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import {
  convertSortByFromString,
  convertToAttributeScalar,
  getGraphqlIdFromDBId,
  maybe,
} from "../../core/utils";
import Page from "./Page";
import { TypedEMWCategoryProductsQuery, TypedEMWElasticCategoryProductsQuery, emwElasticCategoryProductsQuery, emwCategoryProductsQuery, emwElasticCategoryProductsQuery as emwElasticCatProductsQuery } from "./queries";
import { minBy, maxBy, filter } from 'lodash';
import { OrderDirection } from 'types/globalTypes';
import ReactSVG from "react-svg";
import loader from '../../images/emw-loader.svg'
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { useAlert } from "react-alert";
import qs from "query-string";
import CategoryPageFullSkeleton from "./CategoryPageFullSkeleton";
const getFacetsFilters = (
  facets,
  id,
  sort
) => {
  const { selectedVendors = [], selectedPrices = [], selectedCategories = [], selectedAttributes = [], selectedProductTypes = [], searchText = "" } = facets

  let categories = selectedCategories

  categories = selectedCategories.length ? selectedCategories : id

  const filters: any = {}

  if (categories.length) {
    filters.ids = categories.map(cat => String(cat))
  }

  if (selectedVendors.length) {
    filters.vendorIds = selectedVendors.map(vendor => String(vendor.key))
  }

  if (selectedAttributes.length) {
    filters.attrIds = selectedAttributes.map(attr => String(attr.key))
  }

  if (selectedProductTypes.length) {
    filters.prodTypeIds = selectedProductTypes.map(attr => String(attr.key))
  }

  if (selectedPrices.length) {
    const minimumFromPrice = minBy(selectedPrices, "from")
    const maximumToPrice = maxBy(selectedPrices, "to")
    const maximumFromPrice = maxBy(selectedPrices, "from")
    const minimumToPrice = minBy(selectedPrices, "to")


    if (minimumFromPrice && minimumFromPrice.from) {
      filters.priceFrom = minimumFromPrice.from
    }

    if (maximumToPrice && maximumToPrice.to) {
      filters.priceTo = maximumToPrice.to
    }

    if (maximumFromPrice && maximumFromPrice.from && !maximumFromPrice.to) {
      delete filters.priceTo
    }

    if (minimumToPrice && minimumToPrice.to && !minimumToPrice.from) {
      filters.priceFrom = 0
    }
  }

  if (searchText) {
    filters.search = {
      name: {
        value: searchText,
      },
    }
  }

  if (sort) {
    const direction = sort.includes("-") ? OrderDirection.DESC : OrderDirection.ASC
    const sortBylabel = sort.replace("-", "")

    let sortBy = ""

    switch (sortBylabel) {
      case "name":
        sortBy = "name";
        break;
      case "price":
        sortBy = "dispprice";
        break;
      case "updated_at":
        sortBy = "emwProdSortorder";
        break;
    }

    filters.ordering = {
      [sortBy]: direction,
    }
  }

  return filters
}

export const mapProductListElasticDataToNormal = data => {

  if (!data) {
    return data
  }

  const modifiedData = data

  modifiedData.emwproducts = modifiedData.emwElasticProductQueries
  modifiedData.emwproducts.totalCount = modifiedData.emwElasticProductQueries.totalCount
  modifiedData.emwproducts.edges = modifiedData.emwElasticProductQueries.edges.map(
    productEdge => {

      const minStdPrice = minBy(productEdge.node.prodstdpricing, 'emw_stdpricing_quantity')
      const sellPriceAmount = minStdPrice ? minStdPrice.emw_stdpricing_sellprice_amount : 0

      return {
        ...productEdge,
        node: {
          ...productEdge.node,
          emwProdStdpricing: {
            edges: productEdge.node.prodstdpricing.map(
              stdPrice => ({
                node: {
                  id: stdPrice.emw_stdpricing_id,
                  emwStdpricingCost: {
                    amount: stdPrice.emw_stdpricing_cost_amount,
                  },
                  emwStdpricingSellprice: {
                    amount: stdPrice.emw_stdpricing_sellprice_amount,
                  },
                  emwStdpricingQuantity: stdPrice.emw_stdpricing_quantity,
                  emwStdpricingAddlHandling: {
                    amount: stdPrice.emw_stdpricing_addl_handling_amount,
                  },

                },
              })
            ),
          },
          emwProdImages: {
            edges: productEdge.node.prodimages.map(image => ({
              node: {
                emwImageUrlPrfix: image.emw_image_url_prfix,
                emwImageName: image.emw_image_name,
                emwImageCaption: image.emw_image_caption,
              },
            })),
          },
          listPrice: {
            amount: productEdge.node.emwProdListPriceAmount,
          },
          aggregateSellPrice: {
            amount: sellPriceAmount,
          },
          sellPrice: {
            amount: sellPriceAmount,
          },
          emwProdShipAdder: {
            amount: productEdge.node.emwProdShipAdderAmount,
          },
          emwProdVendorid: {
            ...productEdge.node.emwProdVendorid,
            emwVendorName: productEdge.node.emwProdVendorid.emw_vendor_name,
          },
          emwProdCatid: {
            ...productEdge.node.emwProdCatid,
            id: productEdge.node.emwProdCatid.emw_cat_id,
          },
          weightPounds: null,
        },
      }
    }
  )

  return modifiedData
}


type ViewProps = RouteComponentProps<{
  id: string;
}>;

export const FilterQuerySet = {
  encode(valueObj) {
    const str = [];
    Object.keys(valueObj).forEach(value => {
      str.push(value + "_" + valueObj[value].join("_"));
    });
    return str.join(".");
  },

  decode(strValue) {
    const obj = {};
    const propsWithValues = strValue.split(".").filter(n => n);
    propsWithValues.map(value => {
      const propWithValues = value.split("_").filter(n => n);
      obj[propWithValues[0]] = propWithValues.slice(1);
    });
    return obj;
  },
};

export const View: React.FC<ViewProps> = ({ match, seoId }) => {
  const alert = useAlert();
  const [productsData, setProductsData] = useState({})
  const [catId, setCatId] = useState(0)
  const [currentPageNumber, setcurrentPageNumber] = useState(1)
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [facetsFilters, setFacetsFilters] = useState({})
  const [vendorFacetsList, setVendorFacetsList] = useState(null)
  const [productTypesFacetsList, setProductTypeFacetsList] = useState(null)
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );
  const [facetSelectedFlag, setFacetSelectedFlag] = useState(false);
  // ProductLimit
  const [productLimit, setproductLimit] = useState(50);
  const [showLoader, setShowLoader] = useState(false);

  
  const [intialProductLoad, { loading: initialLoading, data: initialProducts, fetchMore }] = useLazyQuery(emwElasticCategoryProductsQuery, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    onCompleted(data) {
      return null;
    },
    onError(error) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });

  const [EMWElasticCategoryProductsQuery, { loading: productDataLoading, data: ElasticData, fetchMore: fetchMoreElasticQuery }] = useLazyQuery(emwElasticCatProductsQuery, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    onError(error) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });

  const nextPage = (limit) => {
    const endCursor = initialProducts.emwElasticProductQueries.pageInfo.endCursor;
    setcurrentPageNumber(currentPageNumber + 1);
    const varData = { 
      ...getFacetsFilters(facetsFilters, [catId] , sort),
      first: limit,
      after: endCursor,  
      emwProdIsInformational: {}
    };

    fetchMore({
      query: emwElasticCategoryProductsQuery,
      variables: varData,
      updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
        return {
          ...previousResult,
          emwElasticProductQueries: {
            ...previousResult.emwElasticProductQueries,
            edges: fetchMoreResult.emwElasticProductQueries.edges,
            pageInfo: fetchMoreResult.emwElasticProductQueries.pageInfo,
          },
        };
      },
    });
  };

  const previousPage = (limit) => {
    const startCursor = initialProducts.emwElasticProductQueries.pageInfo.startCursor;
    setcurrentPageNumber(currentPageNumber - 1);
    const varData = { 
      ...getFacetsFilters(facetsFilters, [catId] , sort),
      first: limit,
      before: startCursor,  
      emwProdIsInformational: {}
    };

    fetchMore({
      query: emwElasticCategoryProductsQuery,
      variables: varData,
      updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
        return {
          ...previousResult,
          emwElasticProductQueries: {
            ...previousResult.emwElasticProductQueries,
            edges: fetchMoreResult.emwElasticProductQueries.edges,
            pageInfo: fetchMoreResult.emwElasticProductQueries.pageInfo,
          },
        };
      },
    });
  };
  const usePrevious=(value)=>{
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const prevCatId = usePrevious({catId});

  useEffect(() => {
    if(catId){
      let initalLoadFlag=facetSelectedFlag;
      const parsed = qs.parse(window.location.search);
      let persistedFilter=false;
      if(parsed['productType'] || parsed['vendor'] || parsed['attribute']){
        persistedFilter=true;
      }
      if(initalLoadFlag && (!persistedFilter)){
        if(!facetSelectedFlag || (prevCatId && prevCatId.catId!==catId)){
          setFacetSelectedFlag(false);
          initalLoadFlag=false;
        }else{
          setFacetSelectedFlag(true);
          initalLoadFlag=true;
        }
      }else if(persistedFilter){
        setFacetSelectedFlag(true);
        initalLoadFlag=true;
      }
      if(catId && !initalLoadFlag){
        intialProductLoad({
          variables: {
              ...getFacetsFilters(facetsFilters, [catId] , sort),
              first: productLimit,
              emwProdIsInformational: {}
          }
        });
      }
    }
  }, [catId,window.location.search]);

  const clearFilters = () => {
    setAttributeFilters({});
  };

  // Default List view Enable 
  const [CategoryGridView, setCategoryGridView] = useState(true);

  // On Click Function for List View
  const onEnableCategoryListview = () => {
    setCategoryGridView(false)
  }

  // On Click Function for Grid View
  const onEnableCategoryGridview = () => {
    setCategoryGridView(true)
  }

  // Default List view Enable 
  const [ProductGridView, setProductGridView] = useState(true);

  // On Click Function for List View
  const onEnableProductListview = () => {
    setProductGridView(false)
  }

  // On Change Product Limit
  const onChangeProductLimit = (limit) => {
    setvariable({ ...variable, [`pageSize`]: limit });
  }
  // On Click Function for Grid View
  const onEnableProductGridview = () => {
    setProductGridView(true)
  }
  const onFiltersChange = (name, value) => {
    if (attributeFilters && attributeFilters.hasOwnProperty(name)) {
      if (attributeFilters[name].includes(value)) {
        if (filters.attributes[`${name}`].length === 1) {
          const att = { ...attributeFilters };
          delete att[`${name}`];
          setAttributeFilters({
            ...att,
          });
        } else {
          setAttributeFilters({
            ...attributeFilters,
            [`${name}`]: attributeFilters[`${name}`].filter(
              item => item !== value
            ),
          });
        }
      } else {
        setAttributeFilters({
          ...attributeFilters,
          [`${name}`]: [...attributeFilters[`${name}`], value],
        });
      }
    } else {
      setAttributeFilters({ ...attributeFilters, [`${name}`]: [value] });
    }
  };

  const [Prodafter, setProdafter] = useState("");
  const filters: IFiltersEMW = {
    after: Prodafter,
    pageSize: PRODUCTS_PER_PAGE,
    priceGte: null,
    priceLte: null,
    sortBy: sort || null,
  };

  const variables = {
    ...filters,
    id: (seoId) ? seoId : getGraphqlIdFromDBId(match.params.id, "EMWCategory"),
    sortBy: convertSortByFromString(filters.sortBy),
  };



  // Variable State 
  const [variable, setvariable] = useState(variables);
  const [categoryCatArray, setCategoryCatArray] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const { data, loading} = useQuery(emwCategoryProductsQuery, {
		variables: variable, fetchPolicy: "network-only", errorPolicy: 'all'});

  
  useEffect(() => {
    if(data){

      if(data && data.emwcategory){
        setCatId(data.emwcategory.emwCatId);
      } 
            
      let catArray = []
      // For first two level send get category products only 
      if (!loading && data.emwcategory.ancestors && data.emwcategory.ancestors.edges.length < 1) {
        catArray = [data.emwcategory.emwCatId]
      } else if (!loading && data.emwcategory.ancestors && data.emwcategory.ancestors.edges.length >= 1) {      
        // For other level send get category and its descendt category products only
        if(data && data.emwcategory && data.emwcategory.descendantIds !== null){
          catArray = data.emwcategory.descendantIds
          catArray.push(data.emwcategory.emwCatId)
        } else {
          catArray = [data.emwcategory.emwCatId]
        }
      }
      catArray = [...new Set(catArray)];
      setCategoryCatArray(catArray);

      EMWElasticCategoryProductsQuery({
        variables: {
          ...getFacetsFilters(facetsFilters, data && data.emwcategory && catArray, sort),
          first:productLimit,
          emwProdIsInformational: { value: false}
        }
      });
    }
  }, [data]);

  useEffect(() => {
    if(ElasticData){
      setProductsData({ data: ElasticData });
    }
  }, [ElasticData]);

  useEffect(() => {
    if(facetsFilters && data){
      EMWElasticCategoryProductsQuery({
        variables: {
          ...getFacetsFilters(facetsFilters, data && data.emwcategory && categoryCatArray, sort),
          first:productLimit,
          emwProdIsInformational: { value: false}
        }
      });
    }
  }, [facetsFilters]);


  useEffect(() => {
    setvariable(variables)
  }, [match && match.params,seoId]);

  const sortOptions = [
    {
      label: "Sort",
      value: null,
    },
    {
      label: "Price Low-High",
      value: "price",
    },
    {
      label: "Price High-Low",
      value: "-price",
    },
    // {
    //   label: "Name a to z",
    //   value: "name",
    // },
    // {
    //   label: "Name z to a",
    //   value: "-name",
    // }
  ];

  const setproductLimitHandler=(limit)=>{
    setproductLimit(limit);
    if(catId && !facetSelectedFlag){
      intialProductLoad({
        variables: {
            ...getFacetsFilters(facetsFilters, [catId] , sort),
            first: limit,
            emwProdIsInformational: {},
        }
      });
    }else if(catId && facetSelectedFlag){
      EMWElasticCategoryProductsQuery({
        variables: {
          ...getFacetsFilters(facetsFilters, data && data.emwcategory && categoryCatArray, sort),
          first: limit,
          emwProdIsInformational: { value: false}
        }
      });
    }
  }

  const sortOrderHandler=(value)=>{
    setSort(value);
    if(catId && !facetSelectedFlag){
      intialProductLoad({
        variables: {
            ...getFacetsFilters(facetsFilters, [catId] , value),
            first: productLimit,
            emwProdIsInformational: {}
        }
      });
    }else if(catId && facetSelectedFlag){
      EMWElasticCategoryProductsQuery({
        variables: {
          ...getFacetsFilters(facetsFilters, data && data.emwcategory && categoryCatArray, value),
          first: productLimit,
          emwProdIsInformational: { value: false}
        }
      });
    }
  }
  
  const handleLoadMore = (limit) =>{
    setcurrentPageNumber(currentPageNumber + 1)
    const varData = { 
        ...getFacetsFilters(facetsFilters, data && data.emwcategory && categoryCatArray, sort),
        first: limit,
        emwProdIsInformational: { value: false},
        after: productsData.data.emwElasticProductQueries.pageInfo.endCursor,
      };

    fetchMoreElasticQuery({
      query: emwElasticCatProductsQuery,
      variables: varData,
      updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
        return {
          ...previousResult,
          emwElasticProductQueries: {
            ...previousResult.emwElasticProductQueries,
            edges: fetchMoreResult.emwElasticProductQueries.edges,
            pageInfo: fetchMoreResult.emwElasticProductQueries.pageInfo,
          },
        };
      },
    });
  }

  const handleLoadPrevious = (limit) =>{
    setcurrentPageNumber(currentPageNumber - 1)
    const varData = { 
      ...getFacetsFilters(facetsFilters, data && data.emwcategory && categoryCatArray, sort),
      first: limit,
      emwProdIsInformational: { value: false},
      before: productsData.data.emwElasticProductQueries.pageInfo.startCursor,
    };
    fetchMoreElasticQuery({
      query: emwElasticCatProductsQuery,
      variables: varData,
      updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
        return {
          ...previousResult,
          emwElasticProductQueries: {
            ...previousResult.emwElasticProductQueries,
            edges: fetchMoreResult.emwElasticProductQueries.edges,
            pageInfo: fetchMoreResult.emwElasticProductQueries.pageInfo,
          },
        };
      },
    });
  }

  const productList = mapProductListElasticDataToNormal(productsData && productsData.data)
  let initProductList=null;
  if(!facetSelectedFlag){
    initProductList=mapProductListElasticDataToNormal(initialProducts)
  }

  return (
    <NetworkStatus>
      {isOnline => (
        <>
        {
        (loading || (productList==undefined)) 
        ?
        <CategoryPageFullSkeleton />
        :
        <MetaWrapper
          meta={{
            description: data.emwcategory.seoDescription,
            title: data.emwcategory.seoTitle,
            type: "product.category",
          }}
        >
          {
            (data && data.emwcategory === null) ?
              <NotFound />
            :
              (!isOnline) ?
              <OfflinePlaceholder />
              :
              <Page
                onFacetsChange={setFacetsFilters}
                vendorFacetsList={vendorFacetsList}
                setFacetSelectedFlag={setFacetSelectedFlag}
                intialProductFlag={facetSelectedFlag}
                setVendorFacetsList={setVendorFacetsList}
                productTypesFacetsList={productTypesFacetsList}
                setProductTypeFacetsList={setProductTypeFacetsList}
                facets={productList && productList.emwproducts.facets}
                productCountFacetedResults={productList && productList.emwproducts.totalCount}
                clearFilters={clearFilters}
                attributes={[]}
                onEnableCategoryListview={onEnableCategoryListview}
                onEnableCategoryGridview={onEnableCategoryGridview}
                onEnableProductListview={onEnableProductListview}
                onEnableProductGridview={onEnableProductGridview}
                onChangeProductLimit={onChangeProductLimit}
                category={data.emwcategory}
                CategoryGridView={CategoryGridView}
                ProductGridView={ProductGridView}
                showFilterMobile={false}
                displayLoader={ (!facetSelectedFlag) ? initialLoading : (productDataLoading) }
                hasNextPage={maybe(
                  () => (!facetSelectedFlag) ? initProductList.emwproducts.pageInfo.hasNextPage : productList && productList.emwproducts.pageInfo.hasNextPage,
                  false
                )}
                sortOptions={sortOptions}
                activeSortOption={filters.sortBy}
                filters={filters}
                products={(!facetSelectedFlag) ? initProductList && initProductList.emwproducts : productList && productList.emwproducts}
                onAttributeFiltersChange={onFiltersChange}
                onLoadMore={(!facetSelectedFlag) ? nextPage : handleLoadMore}
                onLoadPrev={ (!facetSelectedFlag) ? previousPage : handleLoadPrevious}
                // onLoadLimit={handlePageLimit}
                activeFilters={
                  filters!.attributes
                    ? Object.keys(filters!.attributes).length
                    : 0
                }
                onOrder={value => {
                  sortOrderHandler(value.value);
                }}
                productLimit={productLimit}
                setproductLimit ={setproductLimitHandler}
                pageInfo={maybe(
                  () => (!facetSelectedFlag) ? initProductList.emwElasticProductQueries.pageInfo : productsData.data.emwElasticProductQueries.pageInfo,
                  false
                )}
                currentPageNumber={currentPageNumber}
              />
        }
        </MetaWrapper>
      }
      </>         
      )}
    </NetworkStatus>
  );
};

export default View;
