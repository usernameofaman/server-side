/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MultipleAttributeMetaQuery
// ====================================================

export interface MultipleAttributeMetaQuery_emwElasticAttrQueries_edges_node {
  __typename: "EMWAttributesElastic";
  emwAtrId: number | null;
  emwAtrName: string | null;
}

export interface MultipleAttributeMetaQuery_emwElasticAttrQueries_edges {
  __typename: "EMWAttributesElasticCountableElasticEdge";
  node: MultipleAttributeMetaQuery_emwElasticAttrQueries_edges_node;
}

export interface MultipleAttributeMetaQuery_emwElasticAttrQueries {
  __typename: "EMWAttributesElasticCountableElasticConnection";
  edges: MultipleAttributeMetaQuery_emwElasticAttrQueries_edges[];
}

export interface MultipleAttributeMetaQuery {
  emwElasticAttrQueries: MultipleAttributeMetaQuery_emwElasticAttrQueries | null;
}

export interface MultipleAttributeMetaQueryVariables {
  ids?: (string | null)[] | null;
}
