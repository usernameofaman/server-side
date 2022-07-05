/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MultipleCategoryMetaQuery
// ====================================================

export interface MultipleCategoryMetaQuery_emwElasticCatQueries_edges_node {
  __typename: "EMWCategoryElastic";
  emwCatId: number | null;
  name: string | null;
}

export interface MultipleCategoryMetaQuery_emwElasticCatQueries_edges {
  __typename: "EMWCategoryElasticCountableElasticEdge";
  node: MultipleCategoryMetaQuery_emwElasticCatQueries_edges_node;
}

export interface MultipleCategoryMetaQuery_emwElasticCatQueries {
  __typename: "EMWCategoryElasticCountableElasticConnection";
  edges: MultipleCategoryMetaQuery_emwElasticCatQueries_edges[];
}

export interface MultipleCategoryMetaQuery {
  emwElasticCatQueries: MultipleCategoryMetaQuery_emwElasticCatQueries | null;
}

export interface MultipleCategoryMetaQueryVariables {
  ids?: (string | null)[] | null;
}
