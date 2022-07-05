/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MultipleProductTypeMetaQuery
// ====================================================

export interface MultipleProductTypeMetaQuery_emwElasticProdtypeQueries_edges_node {
  __typename: "EMWProductTypesElastic";
  emwProdtypeId: number | null;
  emwProdtypeName: string | null;
}

export interface MultipleProductTypeMetaQuery_emwElasticProdtypeQueries_edges {
  __typename: "EMWProductTypesElasticCountableElasticEdge";
  node: MultipleProductTypeMetaQuery_emwElasticProdtypeQueries_edges_node;
}

export interface MultipleProductTypeMetaQuery_emwElasticProdtypeQueries {
  __typename: "EMWProductTypesElasticCountableElasticConnection";
  edges: MultipleProductTypeMetaQuery_emwElasticProdtypeQueries_edges[];
}

export interface MultipleProductTypeMetaQuery {
  emwElasticProdtypeQueries: MultipleProductTypeMetaQuery_emwElasticProdtypeQueries | null;
}

export interface MultipleProductTypeMetaQueryVariables {
  ids?: (string | null)[] | null;
  first?: number | null;
}
