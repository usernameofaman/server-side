/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AttributeInput, ProductOrder } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: Collection
// ====================================================

export interface Collection_collection_backgroundImage {
  __typename: "Image";
  url: string;
}

export interface Collection_collection {
  __typename: "Collection";
  id: string;
  slug: string;
  name: string;
  seoDescription: string | null;
  seoTitle: string | null;
  backgroundImage: Collection_collection_backgroundImage | null;
}

export interface Collection_products_edges_node_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface Collection_products_edges_node_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface Collection_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Collection_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Collection_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  gross: Collection_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  net: Collection_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface Collection_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Collection_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Collection_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  gross: Collection_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  net: Collection_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface Collection_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  start: Collection_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  stop: Collection_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface Collection_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Collection_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Collection_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  gross: Collection_products_edges_node_pricing_priceRange_start_gross;
  net: Collection_products_edges_node_pricing_priceRange_start_net;
}

export interface Collection_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Collection_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Collection_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  gross: Collection_products_edges_node_pricing_priceRange_stop_gross;
  net: Collection_products_edges_node_pricing_priceRange_stop_net;
}

export interface Collection_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  start: Collection_products_edges_node_pricing_priceRange_start | null;
  stop: Collection_products_edges_node_pricing_priceRange_stop | null;
}

export interface Collection_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  onSale: boolean | null;
  priceRangeUndiscounted: Collection_products_edges_node_pricing_priceRangeUndiscounted | null;
  priceRange: Collection_products_edges_node_pricing_priceRange | null;
}

export interface Collection_products_edges_node_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface Collection_products_edges_node {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: Collection_products_edges_node_thumbnail | null;
  thumbnail2x: Collection_products_edges_node_thumbnail2x | null;
  pricing: Collection_products_edges_node_pricing | null;
  category: Collection_products_edges_node_category | null;
}

export interface Collection_products_edges {
  __typename: "ProductCountableEdge";
  node: Collection_products_edges_node;
}

export interface Collection_products_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface Collection_products {
  __typename: "ProductCountableConnection";
  totalCount: number | null;
  edges: Collection_products_edges[];
  pageInfo: Collection_products_pageInfo;
}

export interface Collection_attributes_edges_node_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  slug: string | null;
}

export interface Collection_attributes_edges_node {
  __typename: "Attribute";
  id: string;
  name: string | null;
  slug: string | null;
  values: (Collection_attributes_edges_node_values | null)[] | null;
}

export interface Collection_attributes_edges {
  __typename: "AttributeCountableEdge";
  node: Collection_attributes_edges_node;
}

export interface Collection_attributes {
  __typename: "AttributeCountableConnection";
  edges: Collection_attributes_edges[];
}

export interface Collection {
  collection: Collection_collection | null;
  products: Collection_products | null;
  attributes: Collection_attributes | null;
}

export interface CollectionVariables {
  id: string;
  attributes?: (AttributeInput | null)[] | null;
  after?: string | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  priceLte?: number | null;
  priceGte?: number | null;
}
