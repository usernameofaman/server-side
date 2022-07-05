/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EMWCategory
// ====================================================

export interface EMWCategory_emwcategory_backgroundImage {
  __typename: "Image";
  url: string;
}

export interface EMWCategory_emwcategory_emwChildren_edges_node_backgroundImage {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface EMWCategory_emwcategory_emwChildren_edges_node {
  __typename: "EMWCategory";
  id: string;
  name: string;
  emwCatImageUrl: string | null;
  emwCatId: number;
  backgroundImage: EMWCategory_emwcategory_emwChildren_edges_node_backgroundImage | null;
}

export interface EMWCategory_emwcategory_emwChildren_edges {
  __typename: "EMWCategoryCountableEdge";
  node: EMWCategory_emwcategory_emwChildren_edges_node;
}

export interface EMWCategory_emwcategory_emwChildren {
  __typename: "EMWCategoryCountableConnection";
  totalCount: number | null;
  edges: EMWCategory_emwcategory_emwChildren_edges[];
}

export interface EMWCategory_emwcategory_children_edges_node_backgroundImage {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface EMWCategory_emwcategory_children_edges_node {
  __typename: "Category";
  id: string;
  name: string;
  backgroundImage: EMWCategory_emwcategory_children_edges_node_backgroundImage | null;
}

export interface EMWCategory_emwcategory_children_edges {
  __typename: "CategoryCountableEdge";
  node: EMWCategory_emwcategory_children_edges_node;
}

export interface EMWCategory_emwcategory_children {
  __typename: "CategoryCountableConnection";
  totalCount: number | null;
  edges: EMWCategory_emwcategory_children_edges[];
}

export interface EMWCategory_emwcategory {
  __typename: "EMWCategory";
  emwCatId: number;
  seoDescription: string | null;
  description: string;
  descriptionJson: any;
  seoTitle: string | null;
  id: string;
  name: string;
  backgroundImage: EMWCategory_emwcategory_backgroundImage | null;
  emwChildren: EMWCategory_emwcategory_emwChildren | null;
  children: EMWCategory_emwcategory_children | null;
}

export interface EMWCategory {
  emwcategory: EMWCategory_emwcategory | null;
}

export interface EMWCategoryVariables {
  id: string;
}
