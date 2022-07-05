/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Attributes
// ====================================================

export interface Attributes_attributes_edges_node_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  slug: string | null;
}

export interface Attributes_attributes_edges_node {
  __typename: "Attribute";
  id: string;
  name: string | null;
  slug: string | null;
  values: (Attributes_attributes_edges_node_values | null)[] | null;
}

export interface Attributes_attributes_edges {
  __typename: "AttributeCountableEdge";
  node: Attributes_attributes_edges_node;
}

export interface Attributes_attributes {
  __typename: "AttributeCountableConnection";
  edges: Attributes_attributes_edges[];
}

export interface Attributes {
  attributes: Attributes_attributes | null;
}

export interface AttributesVariables {
  id: string;
}
