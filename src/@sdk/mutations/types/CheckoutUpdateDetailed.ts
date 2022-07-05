/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CheckoutUpdateDetailed
// ====================================================

export interface CheckoutUpdateDetailed_emwCheckout_lines_productOptions_productOption_emwOptPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CheckoutUpdateDetailed_emwCheckout_lines_productOptions_productOption_emwOptOptgrpid {
  __typename: "EMWProductOptionGroup";
  id: string;
  emwOptgrpName: string | null;
}

export interface CheckoutUpdateDetailed_emwCheckout_lines_productOptions_productOption {
  __typename: "EMWProductOption";
  id: string;
  emwOptName: string | null;
  emwOptPrice: CheckoutUpdateDetailed_emwCheckout_lines_productOptions_productOption_emwOptPrice | null;
  emwOptStocknumber: string | null;
  emwOptOptgrpid: CheckoutUpdateDetailed_emwCheckout_lines_productOptions_productOption_emwOptOptgrpid | null;
}

export interface CheckoutUpdateDetailed_emwCheckout_lines_productOptions {
  __typename: "EMWCheckoutProductoption";
  id: string;
  productOption: CheckoutUpdateDetailed_emwCheckout_lines_productOptions_productOption;
}

export interface CheckoutUpdateDetailed_emwCheckout_lines_product_mapPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CheckoutUpdateDetailed_emwCheckout_lines_product_sellPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CheckoutUpdateDetailed_emwCheckout_lines_product_aggregateMapPrice {
  __typename: "Money";
  amount: number;
}

export interface CheckoutUpdateDetailed_emwCheckout_lines_product_aggregateSellPrice {
  __typename: "Money";
  amount: number;
}

export interface CheckoutUpdateDetailed_emwCheckout_lines_product_emwProdImages_edges_node {
  __typename: "EMWProductImage";
  emwImageUrlPrfix: string | null;
  emwImageName: string | null;
}

export interface CheckoutUpdateDetailed_emwCheckout_lines_product_emwProdImages_edges {
  __typename: "EMWProductImageCountableEdge";
  node: CheckoutUpdateDetailed_emwCheckout_lines_product_emwProdImages_edges_node;
}

export interface CheckoutUpdateDetailed_emwCheckout_lines_product_emwProdImages {
  __typename: "EMWProductImageCountableConnection";
  edges: CheckoutUpdateDetailed_emwCheckout_lines_product_emwProdImages_edges[];
}

export interface CheckoutUpdateDetailed_emwCheckout_lines_product {
  __typename: "EMWProduct";
  name: string;
  emwProdImageUrl: string | null;
  emwProdVendorPartnumber: string | null;
  emwProdIsDynamicPricing: boolean;
  emwProdIsFreeship: boolean;
  emwProdIsFreight: boolean;
  minimumQuantity: number | null;
  mapPrice: CheckoutUpdateDetailed_emwCheckout_lines_product_mapPrice | null;
  sellPrice: CheckoutUpdateDetailed_emwCheckout_lines_product_sellPrice | null;
  aggregateMapPrice: CheckoutUpdateDetailed_emwCheckout_lines_product_aggregateMapPrice | null;
  aggregateSellPrice: CheckoutUpdateDetailed_emwCheckout_lines_product_aggregateSellPrice | null;
  emwProdImages: CheckoutUpdateDetailed_emwCheckout_lines_product_emwProdImages | null;
  id: string;
}

export interface CheckoutUpdateDetailed_emwCheckout_lines_unitPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CheckoutUpdateDetailed_emwCheckout_lines {
  __typename: "EMWCheckoutLine";
  id: string;
  quantity: number;
  productOptions: (CheckoutUpdateDetailed_emwCheckout_lines_productOptions | null)[] | null;
  product: CheckoutUpdateDetailed_emwCheckout_lines_product | null;
  unitPrice: CheckoutUpdateDetailed_emwCheckout_lines_unitPrice | null;
}

export interface CheckoutUpdateDetailed_emwCheckout_emwTotalPrice_totalItemPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CheckoutUpdateDetailed_emwCheckout_emwTotalPrice {
  __typename: "EMWTaxedMoney";
  totalItemPrice: CheckoutUpdateDetailed_emwCheckout_emwTotalPrice_totalItemPrice;
}

export interface CheckoutUpdateDetailed_emwCheckout {
  __typename: "EMWCheckout";
  id: string;
  token: any;
  lines: (CheckoutUpdateDetailed_emwCheckout_lines | null)[] | null;
  emwTotalPrice: CheckoutUpdateDetailed_emwCheckout_emwTotalPrice | null;
}

export interface CheckoutUpdateDetailed {
  __typename: "EMWCheckoutLinesAdd";
  emwCheckout: CheckoutUpdateDetailed_emwCheckout | null;
}
