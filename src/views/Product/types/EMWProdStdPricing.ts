/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EMWProdStdPricing
// ====================================================

export interface EMWProdStdPricing_emwProdStdpricing_edges_node {
  __typename: "EMWProductStdPricing";
  id: string;
  emwStdpricingQuantity: number | null;
}

export interface EMWProdStdPricing_emwProdStdpricing_edges {
  __typename: "EMWProductStdPricingCountableEdge";
  node: EMWProdStdPricing_emwProdStdpricing_edges_node;
}

export interface EMWProdStdPricing_emwProdStdpricing {
  __typename: "EMWProductStdPricingCountableConnection";
  edges: EMWProdStdPricing_emwProdStdpricing_edges[];
}

export interface EMWProdStdPricing {
  __typename: "EMWProduct";
  emwProdStdpricing: EMWProdStdPricing_emwProdStdpricing | null;
}
