/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AttributeInput, ProductOrder } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: Category
// ====================================================

export interface Category_products_edges_node_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface Category_products_edges_node_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface Category_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Category_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Category_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  gross: Category_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  net: Category_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface Category_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Category_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Category_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  gross: Category_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  net: Category_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface Category_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  start: Category_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  stop: Category_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface Category_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Category_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Category_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  gross: Category_products_edges_node_pricing_priceRange_start_gross;
  net: Category_products_edges_node_pricing_priceRange_start_net;
}

export interface Category_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Category_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Category_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  gross: Category_products_edges_node_pricing_priceRange_stop_gross;
  net: Category_products_edges_node_pricing_priceRange_stop_net;
}

export interface Category_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  start: Category_products_edges_node_pricing_priceRange_start | null;
  stop: Category_products_edges_node_pricing_priceRange_stop | null;
}

export interface Category_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  onSale: boolean | null;
  priceRangeUndiscounted: Category_products_edges_node_pricing_priceRangeUndiscounted | null;
  priceRange: Category_products_edges_node_pricing_priceRange | null;
}

export interface Category_products_edges_node_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface Category_products_edges_node {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: Category_products_edges_node_thumbnail | null;
  thumbnail2x: Category_products_edges_node_thumbnail2x | null;
  pricing: Category_products_edges_node_pricing | null;
  category: Category_products_edges_node_category | null;
}

export interface Category_products_edges {
  __typename: "ProductCountableEdge";
  node: Category_products_edges_node;
}

export interface Category_products_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface Category_products {
  __typename: "ProductCountableConnection";
  totalCount: number | null;
  edges: Category_products_edges[];
  pageInfo: Category_products_pageInfo;
}

export interface Category_category_backgroundImage {
  __typename: "Image";
  url: string;
}

export interface Category_category_ancestors_edges_node {
  __typename: "Category";
  id: string;
  name: string;
}

export interface Category_category_ancestors_edges {
  __typename: "CategoryCountableEdge";
  node: Category_category_ancestors_edges_node;
}

export interface Category_category_ancestors {
  __typename: "CategoryCountableConnection";
  edges: Category_category_ancestors_edges[];
}

export interface Category_category_children_edges_node_backgroundImage {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface Category_category_children_edges_node {
  __typename: "Category";
  id: string;
  name: string;
  backgroundImage: Category_category_children_edges_node_backgroundImage | null;
}

export interface Category_category_children_edges {
  __typename: "CategoryCountableEdge";
  node: Category_category_children_edges_node;
}

export interface Category_category_children {
  __typename: "CategoryCountableConnection";
  totalCount: number | null;
  edges: Category_category_children_edges[];
}

export interface Category_category {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  id: string;
  name: string;
  backgroundImage: Category_category_backgroundImage | null;
  ancestors: Category_category_ancestors | null;
  children: Category_category_children | null;
}

export interface Category_attributes_edges_node_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  slug: string | null;
}

export interface Category_attributes_edges_node {
  __typename: "Attribute";
  id: string;
  name: string | null;
  slug: string | null;
  values: (Category_attributes_edges_node_values | null)[] | null;
}

export interface Category_attributes_edges {
  __typename: "AttributeCountableEdge";
  node: Category_attributes_edges_node;
}

export interface Category_attributes {
  __typename: "AttributeCountableConnection";
  edges: Category_attributes_edges[];
}

export interface Category {
  products: Category_products | null;
  category: Category_category | null;
  attributes: Category_attributes | null;
}

export interface CategoryVariables {
  id: string;
  attributes?: (AttributeInput | null)[] | null;
  after?: string | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  priceLte?: number | null;
  priceGte?: number | null;
}
