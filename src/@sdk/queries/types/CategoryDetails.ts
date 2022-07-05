/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CategoryDetails
// ====================================================

export interface CategoryDetails_category_backgroundImage {
  __typename: "Image";
  url: string;
}

export interface CategoryDetails_category_ancestors_edges_node {
  __typename: "Category";
  id: string;
  name: string;
}

export interface CategoryDetails_category_ancestors_edges {
  __typename: "CategoryCountableEdge";
  node: CategoryDetails_category_ancestors_edges_node;
}

export interface CategoryDetails_category_ancestors {
  __typename: "CategoryCountableConnection";
  edges: CategoryDetails_category_ancestors_edges[];
}

export interface CategoryDetails_category {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  id: string;
  name: string;
  backgroundImage: CategoryDetails_category_backgroundImage | null;
  ancestors: CategoryDetails_category_ancestors | null;
}

export interface CategoryDetails {
  category: CategoryDetails_category | null;
}

export interface CategoryDetailsVariables {
  id: string;
}
