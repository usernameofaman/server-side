/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AttributeInput, ProductOrder } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductList
// ====================================================

export interface ProductList_products_edges_node_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface ProductList_products_edges_node_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface ProductList_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductList_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductList_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  gross: ProductList_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  net: ProductList_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface ProductList_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductList_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductList_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  gross: ProductList_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  net: ProductList_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface ProductList_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  start: ProductList_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  stop: ProductList_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface ProductList_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductList_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductList_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  gross: ProductList_products_edges_node_pricing_priceRange_start_gross;
  net: ProductList_products_edges_node_pricing_priceRange_start_net;
}

export interface ProductList_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductList_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductList_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  gross: ProductList_products_edges_node_pricing_priceRange_stop_gross;
  net: ProductList_products_edges_node_pricing_priceRange_stop_net;
}

export interface ProductList_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  start: ProductList_products_edges_node_pricing_priceRange_start | null;
  stop: ProductList_products_edges_node_pricing_priceRange_stop | null;
}

export interface ProductList_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  onSale: boolean | null;
  priceRangeUndiscounted: ProductList_products_edges_node_pricing_priceRangeUndiscounted | null;
  priceRange: ProductList_products_edges_node_pricing_priceRange | null;
}

export interface ProductList_products_edges_node_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface ProductList_products_edges_node {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: ProductList_products_edges_node_thumbnail | null;
  thumbnail2x: ProductList_products_edges_node_thumbnail2x | null;
  pricing: ProductList_products_edges_node_pricing | null;
  category: ProductList_products_edges_node_category | null;
}

export interface ProductList_products_edges {
  __typename: "ProductCountableEdge";
  node: ProductList_products_edges_node;
}

export interface ProductList_products_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface ProductList_products {
  __typename: "ProductCountableConnection";
  totalCount: number | null;
  edges: ProductList_products_edges[];
  pageInfo: ProductList_products_pageInfo;
}

export interface ProductList {
  products: ProductList_products | null;
}

export interface ProductListVariables {
  id: string;
  attributes?: (AttributeInput | null)[] | null;
  after?: string | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  priceLte?: number | null;
  priceGte?: number | null;
}
