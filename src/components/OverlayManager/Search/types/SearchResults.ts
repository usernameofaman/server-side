/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchResults
// ====================================================

export interface SearchResults_products_edges_node_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface SearchResults_products_edges_node_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface SearchResults_products_edges_node_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface SearchResults_products_edges_node {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: SearchResults_products_edges_node_thumbnail | null;
  thumbnail2x: SearchResults_products_edges_node_thumbnail2x | null;
  url: string;
  category: SearchResults_products_edges_node_category | null;
}

export interface SearchResults_products_edges {
  __typename: "ProductCountableEdge";
  node: SearchResults_products_edges_node;
}

export interface SearchResults_products_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface SearchResults_products {
  __typename: "ProductCountableConnection";
  edges: SearchResults_products_edges[];
  pageInfo: SearchResults_products_pageInfo;
}

export interface SearchResults {
  products: SearchResults_products | null;
}

export interface SearchResultsVariables {
  query: string;
}
