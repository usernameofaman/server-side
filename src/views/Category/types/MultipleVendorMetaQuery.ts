/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MultipleVendorMetaQuery
// ====================================================

export interface MultipleVendorMetaQuery_emwElasticVendorQueries_edges_node {
  __typename: "EMWVendorElastic";
  emwVendorId: number | null;
  emwVendorName: string | null;
}

export interface MultipleVendorMetaQuery_emwElasticVendorQueries_edges {
  __typename: "EMWVendorElasticCountableElasticEdge";
  node: MultipleVendorMetaQuery_emwElasticVendorQueries_edges_node;
}

export interface MultipleVendorMetaQuery_emwElasticVendorQueries {
  __typename: "EMWVendorElasticCountableElasticConnection";
  edges: MultipleVendorMetaQuery_emwElasticVendorQueries_edges[];
}

export interface MultipleVendorMetaQuery {
  emwElasticVendorQueries: MultipleVendorMetaQuery_emwElasticVendorQueries | null;
}

export interface MultipleVendorMetaQueryVariables {
  ids?: (string | null)[] | null;
}
