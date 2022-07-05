/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MultipleProductAttributeMetaQuery
// ====================================================

export interface MultipleProductAttributeMetaQuery_emwElasticProductAttrQueries_edges_node {
  __typename: "EMWProductAttributesElastic";
  emwAtrvalId: number | null;
  emwAtrvalAtrid: any | null;
  emwAtrvalValue: string | null;
  emwAtrvalSortorder: number | null;
}

export interface MultipleProductAttributeMetaQuery_emwElasticProductAttrQueries_edges {
  __typename: "EMWProductAttributesElasticCountableElasticEdge";
  node: MultipleProductAttributeMetaQuery_emwElasticProductAttrQueries_edges_node;
}

export interface MultipleProductAttributeMetaQuery_emwElasticProductAttrQueries {
  __typename: "EMWProductAttributesElasticCountableElasticConnection";
  edges: MultipleProductAttributeMetaQuery_emwElasticProductAttrQueries_edges[];
}

export interface MultipleProductAttributeMetaQuery {
  emwElasticProductAttrQueries: MultipleProductAttributeMetaQuery_emwElasticProductAttrQueries | null;
}

export interface MultipleProductAttributeMetaQueryVariables {
  ids?: (string | null)[] | null;
}
