/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getVariantsProducts
// ====================================================

export interface getVariantsProducts_productVariants_edges_node_product_productType {
  __typename: "ProductType";
  isShippingRequired: boolean;
}

export interface getVariantsProducts_productVariants_edges_node_product {
  __typename: "Product";
  id: string;
  productType: getVariantsProducts_productVariants_edges_node_product_productType;
}

export interface getVariantsProducts_productVariants_edges_node {
  __typename: "ProductVariant";
  id: string;
  product: getVariantsProducts_productVariants_edges_node_product;
}

export interface getVariantsProducts_productVariants_edges {
  __typename: "ProductVariantCountableEdge";
  node: getVariantsProducts_productVariants_edges_node;
}

export interface getVariantsProducts_productVariants {
  __typename: "ProductVariantCountableConnection";
  edges: getVariantsProducts_productVariants_edges[];
}

export interface getVariantsProducts {
  productVariants: getVariantsProducts_productVariants | null;
}

export interface getVariantsProductsVariables {
  ids?: (string | null)[] | null;
}
