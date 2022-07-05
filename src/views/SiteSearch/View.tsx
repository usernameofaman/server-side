import React, { useState, useEffect, Children } from 'react';

import { RouteComponentProps } from "react-router";

import { IFiltersEMW } from "@types";
import { StringParam, useQueryParam } from "use-query-params";
import { MetaWrapper, OfflinePlaceholder } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import {
  convertSortByFromString,
  getGraphqlIdFromDBId,
  maybe,
} from "../../core/utils";
import Page from "./Page";
import { TypedEMWElasticProductsQuery } from "./queries";
import { minBy, maxBy, filter } from 'lodash';
import { OrderDirection } from 'types/globalTypes';

const getFacetsFilters = (
  facets,
  id,
  sort,
  searchText1
) => {

  const filters: any = {}
  if(!Object.keys(facets).length){
    if (searchText1 !== "") {
      filters.search = {
        query: searchText1,
      }

      return filters
    }
  }

  const { selectedVendors = [], selectedPrices = [], selectedCategories = [], selectedAttributes = [], selectedProductTypes = [], searchText = "" } = facets

  let categories = []

  if (id) {
    categories = [{ key: id }]
  }

  if (selectedCategories.length) {
    categories = selectedCategories
  }

  if (categories.length) {
    filters.ids = categories.map(cat => String(cat.key))
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
      query: searchText,
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

export const View: React.FC<ViewProps> = ({ match }) => {
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [searchText, setSearchText] = useQueryParam("term", StringParam);
  const [searchTextTemp, setSearchTextTemp] = useState(searchText);
  const [facetsFilters, setFacetsFilters] = useState({})
  const [productLimit, setproductLimit] = useState(25);
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );

  useEffect(() => {
    setSearchTextTemp(searchText)
  }, [searchText])

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
    id: getGraphqlIdFromDBId(match.params.id, "EMWCategory"),
    sortBy: convertSortByFromString(filters.sortBy),
  };

  // Variable State 
  const [variable, setvariable] = useState(variables);

  useEffect(() => {
    setvariable(variables)
  }, [match.params]);

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

  return (
    <NetworkStatus>
      {isOnline => {
        if (!isOnline) {
          return <OfflinePlaceholder />;
        }

        return (
          <TypedEMWElasticProductsQuery
            loaderFull
            variables={{
              ...getFacetsFilters(facetsFilters, null, sort, searchText),
              first:productLimit,
            }}
            onCompleted={() => {
              setSearchText(searchTextTemp)
            }}
          >
            {
              (productsData) => {
                const productList = mapProductListElasticDataToNormal(productsData.data)
                const handleLoadMore = (limit) =>
                  // setProdafter(data.emwproducts.pageInfo.endCursor)
                  productsData.loadMore(
                    (prev, next) => ({
                      ...prev,
                      emwElasticProductQueries: {
                        ...prev.emwElasticProductQueries,
                        edges: next.emwElasticProductQueries.edges,
                        pageInfo: next.emwElasticProductQueries.pageInfo,
                      },
                    }),
                    { after: productsData.data.emwElasticProductQueries.pageInfo.endCursor, first: limit }
                  );
                const handlePageLimit = (limit) =>
                  // setProdafter(data.emwElasticProductQueries.pageInfo.endCursor)
                  productsData.loadMore(
                    (prev, next) => ({
                      ...prev,
                      emwElasticProductQueries: {
                        ...next.emwElasticProductQueries,
                        edges: [...next.emwElasticProductQueries.edges],
                        pageInfo: next.emwElasticProductQueries.pageInfo,
                      },
                    }),
                    { first: limit }
                  );
                return (
                  <MetaWrapper
                    meta={{
                      description: "Product search",
                      title: "Search",
                      type: "product",
                    }}
                  >
                    <Page
                      onFacetsChange={setFacetsFilters}
                      facets={productList.emwproducts.facets}
                      clearFilters={clearFilters}
                      attributes={[]}
                      searchText={searchTextTemp || ""}
                      qSearchText={searchText || ""}
                      setSearchText={setSearchTextTemp}
                      onEnableProductListview={onEnableProductListview}
                      onEnableProductGridview={onEnableProductGridview}
                      onChangeProductLimit={onChangeProductLimit}
                      ProductGridView={ProductGridView}
                      showFilterMobile={false}
                      displayLoader={productsData.loading}
                      hasNextPage={maybe(
                        () => productList.emwproducts.pageInfo.hasNextPage,
                        false
                      )}
                      sortOptions={sortOptions}
                      activeSortOption={filters.sortBy}
                      filters={filters}
                      products={productList.emwproducts}
                      onAttributeFiltersChange={onFiltersChange}
                      onLoadMore={handleLoadMore}
                      onLoadLimit={handlePageLimit}
                      activeFilters={
                        filters!.attributes
                          ? Object.keys(filters!.attributes).length
                          : 0
                      }
                      onOrder={value => {
                        setSort(value.value);
                      }}
                      productLimit={productLimit}
                      setproductLimit ={setproductLimit}
                      pageInfo={productsData && productsData.data.emwElasticProductQueries.pageInfo}
                      currentPageNumber={1}
                    />
                  </MetaWrapper>
                );
              }
            }
          </TypedEMWElasticProductsQuery>
        )
      }}
    </NetworkStatus>
  );
};

export default View;
