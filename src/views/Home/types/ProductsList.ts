/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductsList
// ====================================================

export interface ProductsList_shop_homepageCollection_backgroundImage {
  __typename: "Image";
  url: string;
}

export interface ProductsList_shop_homepageCollection {
  __typename: "Collection";
  id: string;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage | null;
  name: string;
}

export interface ProductsList_shop {
  __typename: "Shop";
  description: string | null;
  name: string;
  homepageCollection: ProductsList_shop_homepageCollection | null;
}

export interface ProductsList_emwcategories_edges_node_backgroundImage {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface ProductsList_emwcategories_edges_node {
  __typename: "EMWCategory";
  id: string;
  name: string;
  backgroundImage: ProductsList_emwcategories_edges_node_backgroundImage | null;
}

export interface ProductsList_emwcategories_edges {
  __typename: "EMWCategoryCountableEdge";
  node: ProductsList_emwcategories_edges_node;
}

export interface ProductsList_emwcategories {
  __typename: "EMWCategoryCountableConnection";
  edges: ProductsList_emwcategories_edges[];
}

export interface ProductsList {
  shop: ProductsList_shop | null;
  emwcategories: ProductsList_emwcategories | null;
}
