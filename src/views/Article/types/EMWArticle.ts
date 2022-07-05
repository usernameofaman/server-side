/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EMWArticle
// ====================================================

export interface EMWArticle_emwpageBySlug_vendors_edges_node {
  __typename: "EMWVendor";
  emwVendorName: string | null;
  emwVendorImageUrl: string | null;
}

export interface EMWArticle_emwpageBySlug_vendors_edges {
  __typename: "EMWVendorCountableEdge";
  node: EMWArticle_emwpageBySlug_vendors_edges_node;
}

export interface EMWArticle_emwpageBySlug_vendors {
  __typename: "EMWVendorCountableConnection";
  edges: EMWArticle_emwpageBySlug_vendors_edges[];
}

export interface EMWArticle_emwpageBySlug_categories_edges_node {
  __typename: "EMWCategory";
  id: string;
  name: string;
  emwCatImageUrl: string | null;
}

export interface EMWArticle_emwpageBySlug_categories_edges {
  __typename: "EMWCategoryCountableEdge";
  node: EMWArticle_emwpageBySlug_categories_edges_node;
}

export interface EMWArticle_emwpageBySlug_categories {
  __typename: "EMWCategoryCountableConnection";
  edges: EMWArticle_emwpageBySlug_categories_edges[];
}

export interface EMWArticle_emwpageBySlug_products_edges_node_aggregateSellPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface EMWArticle_emwpageBySlug_products_edges_node_listPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface EMWArticle_emwpageBySlug_products_edges_node_emwProdImages_edges_node {
  __typename: "EMWProductImage";
  emwImageUrlPrfix: string | null;
  emwImageName: string | null;
}

export interface EMWArticle_emwpageBySlug_products_edges_node_emwProdImages_edges {
  __typename: "EMWProductImageCountableEdge";
  node: EMWArticle_emwpageBySlug_products_edges_node_emwProdImages_edges_node;
}

export interface EMWArticle_emwpageBySlug_products_edges_node_emwProdImages {
  __typename: "EMWProductImageCountableConnection";
  edges: EMWArticle_emwpageBySlug_products_edges_node_emwProdImages_edges[];
}

export interface EMWArticle_emwpageBySlug_products_edges_node {
  __typename: "EMWProduct";
  id: string;
  emwProdId: number;
  name: string;
  aggregateSellPrice: EMWArticle_emwpageBySlug_products_edges_node_aggregateSellPrice | null;
  listPrice: EMWArticle_emwpageBySlug_products_edges_node_listPrice | null;
  emwProdImages: EMWArticle_emwpageBySlug_products_edges_node_emwProdImages | null;
}

export interface EMWArticle_emwpageBySlug_products_edges {
  __typename: "EMWProductCountableEdge";
  node: EMWArticle_emwpageBySlug_products_edges_node;
}

export interface EMWArticle_emwpageBySlug_products {
  __typename: "EMWProductCountableConnection";
  edges: EMWArticle_emwpageBySlug_products_edges[];
}

export interface EMWArticle_emwpageBySlug {
  __typename: "EMWPage";
  id: string;
  title: string;
  slug: string;
  contentJson: any;
  seoDescription: string | null;
  seoTitle: string | null;
  isPublished: boolean;
  vendors: EMWArticle_emwpageBySlug_vendors | null;
  categories: EMWArticle_emwpageBySlug_categories | null;
  products: EMWArticle_emwpageBySlug_products | null;
}

export interface EMWArticle {
  emwpageBySlug: EMWArticle_emwpageBySlug | null;
}

export interface EMWArticleVariables {
  slug: string;
}
