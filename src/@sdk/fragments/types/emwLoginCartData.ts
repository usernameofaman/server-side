/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: emwLoginCartData
// ====================================================

export interface emwLoginCartData_lines_productOptions_productOption_emwOptOptgrpid {
  __typename: "EMWProductOptionGroup";
  id: string;
  emwOptgrpName: string | null;
}

export interface emwLoginCartData_lines_productOptions_productOption {
  __typename: "EMWProductOption";
  id: string;
  emwOptName: string | null;
  emwOptStocknumber: string | null;
  emwOptOptgrpid: emwLoginCartData_lines_productOptions_productOption_emwOptOptgrpid | null;
}

export interface emwLoginCartData_lines_productOptions {
  __typename: "EMWCheckoutProductoption";
  id: string;
  productOption: emwLoginCartData_lines_productOptions_productOption;
}

export interface emwLoginCartData_lines_product_mapPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface emwLoginCartData_lines_product_sellPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface emwLoginCartData_lines_product_emwProdImages_edges_node {
  __typename: "EMWProductImage";
  emwImageUrlPrfix: string | null;
  emwImageName: string | null;
}

export interface emwLoginCartData_lines_product_emwProdImages_edges {
  __typename: "EMWProductImageCountableEdge";
  node: emwLoginCartData_lines_product_emwProdImages_edges_node;
}

export interface emwLoginCartData_lines_product_emwProdImages {
  __typename: "EMWProductImageCountableConnection";
  edges: emwLoginCartData_lines_product_emwProdImages_edges[];
}

export interface emwLoginCartData_lines_product {
  __typename: "EMWProduct";
  name: string;
  emwProdImageUrl: string | null;
  emwProdVendorPartnumber: string | null;
  emwProdIsDynamicPricing: boolean;
  emwProdIsFreeship: boolean;
  minimumQuantity: number | null;
  mapPrice: emwLoginCartData_lines_product_mapPrice | null;
  sellPrice: emwLoginCartData_lines_product_sellPrice | null;
  emwProdImages: emwLoginCartData_lines_product_emwProdImages | null;
  id: string;
}

export interface emwLoginCartData_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
}

export interface emwLoginCartData_lines_totalPrice {
  __typename: "TaxedMoney";
  net: emwLoginCartData_lines_totalPrice_net;
}

export interface emwLoginCartData_lines_unitPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface emwLoginCartData_lines {
  __typename: "EMWCheckoutLine";
  id: string;
  quantity: number;
  productOptions: (emwLoginCartData_lines_productOptions | null)[] | null;
  product: emwLoginCartData_lines_product | null;
  totalPrice: emwLoginCartData_lines_totalPrice | null;
  unitPrice: emwLoginCartData_lines_unitPrice | null;
}

export interface emwLoginCartData_emwTotalPrice_totalItemPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface emwLoginCartData_emwTotalPrice {
  __typename: "EMWTaxedMoney";
  totalItemPrice: emwLoginCartData_emwTotalPrice_totalItemPrice;
}

export interface emwLoginCartData {
  __typename: "EMWCheckout";
  id: string;
  token: any;
  lines: (emwLoginCartData_lines | null)[] | null;
  emwTotalPrice: emwLoginCartData_emwTotalPrice | null;
}
