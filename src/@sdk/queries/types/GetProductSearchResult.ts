/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { EMWProductFilterInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: GetProductSearchResult
// ====================================================

export interface GetProductSearchResult_emwproducts_edges_node {
  __typename: "EMWProduct";
  id: string;
  name: string;
  emwProdStockPartnumber: string | null;
}

export interface GetProductSearchResult_emwproducts_edges {
  __typename: "EMWProductCountableEdge";
  node: GetProductSearchResult_emwproducts_edges_node;
}

export interface GetProductSearchResult_emwproducts {
  __typename: "EMWProductCountableConnection";
  edges: GetProductSearchResult_emwproducts_edges[];
}

export interface GetProductSearchResult {
  emwproducts: GetProductSearchResult_emwproducts | null;
}

export interface GetProductSearchResultVariables {
  filter: EMWProductFilterInput;
}
