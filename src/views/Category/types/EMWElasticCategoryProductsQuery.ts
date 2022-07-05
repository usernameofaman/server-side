/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GrapheneElasticSearchEMWProductElasticCountableElasticConnectionBackendFilter, GrapheneElasticOrderingEMWProductElasticCountableElasticConnectionBackendFilter } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: EMWElasticCategoryProductsQuery
// ====================================================

export interface EMWElasticCategoryProductsQuery_emwElasticProductQueries_edges_node {
  __typename: "EMWProductElastic";
  id: string;
  name: string | null;
  emwProdVendorPartnumber: string | null;
  emwProdManufacturerPartnumber: string | null;
  emwProdIsActive: boolean | null;
  emwProdCatid: any | null;
  emwProdIsInformational: boolean | null;
  emwProdOnhandInventory: number | null;
  emwProdAllocatedInventory: number | null;
  emwProdIsFreeship: boolean | null;
  emwProdIsDynamicPricing: boolean | null;
  emwProdWeightcode: any | null;
  prodstdpricing: any | null;
  emwProdId: number | null;
  emwProdWholesalePriceAmount: number | null;
  emwProdVendorid: any | null;
  emwProdImageUrl: string | null;
  emwProdListPriceAmount: number | null;
  emwProdShipAdderAmount: number | null;
  prodimages: any | null;
  emwProdHsCode: string | null;
}

export interface EMWElasticCategoryProductsQuery_emwElasticProductQueries_edges {
  __typename: "EMWProductElasticCountableElasticEdge";
  node: EMWElasticCategoryProductsQuery_emwElasticProductQueries_edges_node;
}

export interface EMWElasticCategoryProductsQuery_emwElasticProductQueries_pageInfo {
  __typename: "PageInfo";
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface EMWElasticCategoryProductsQuery_emwElasticProductQueries {
  __typename: "EMWProductElasticCountableElasticConnection";
  totalCount: number | null;
  facets: any | null;
  edges: EMWElasticCategoryProductsQuery_emwElasticProductQueries_edges[];
  pageInfo: EMWElasticCategoryProductsQuery_emwElasticProductQueries_pageInfo;
}

export interface EMWElasticCategoryProductsQuery {
  emwElasticProductQueries: EMWElasticCategoryProductsQuery_emwElasticProductQueries | null;
}

export interface EMWElasticCategoryProductsQueryVariables {
  ids?: (string | null)[] | null;
  vendorIds?: (string | null)[] | null;
  attrIds?: (string | null)[] | null;
  prodTypeIds?: (string | null)[] | null;
  priceFrom?: number | null;
  priceTo?: number | null;
  first?: number | null;
  search?: GrapheneElasticSearchEMWProductElasticCountableElasticConnectionBackendFilter | null;
  ordering?: GrapheneElasticOrderingEMWProductElasticCountableElasticConnectionBackendFilter | null;
}
