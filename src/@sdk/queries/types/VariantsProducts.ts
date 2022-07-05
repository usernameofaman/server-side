/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VariantsProducts
// ====================================================

export interface VariantsProducts_productVariants_edges_node_product_productType {
  __typename: "ProductType";
  isShippingRequired: boolean;
}

export interface VariantsProducts_productVariants_edges_node_product {
  __typename: "Product";
  id: string;
  productType: VariantsProducts_productVariants_edges_node_product_productType;
}

export interface VariantsProducts_productVariants_edges_node {
  __typename: "ProductVariant";
  id: string;
  product: VariantsProducts_productVariants_edges_node_product;
}

export interface VariantsProducts_productVariants_edges {
  __typename: "ProductVariantCountableEdge";
  node: VariantsProducts_productVariants_edges_node;
}

export interface VariantsProducts_productVariants {
  __typename: "ProductVariantCountableConnection";
  edges: VariantsProducts_productVariants_edges[];
}

export interface VariantsProducts {
  productVariants: VariantsProducts_productVariants | null;
}

export interface VariantsProductsVariables {
  ids?: (string | null)[] | null;
}
