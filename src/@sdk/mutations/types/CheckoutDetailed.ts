/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CheckoutDetailed
// ====================================================

export interface CheckoutDetailed_emwCheckout_lines_productOptions_productOption_emwOptPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CheckoutDetailed_emwCheckout_lines_productOptions_productOption_emwOptOptgrpid {
  __typename: "EMWProductOptionGroup";
  id: string;
  emwOptgrpName: string | null;
}

export interface CheckoutDetailed_emwCheckout_lines_productOptions_productOption {
  __typename: "EMWProductOption";
  id: string;
  emwOptName: string | null;
  emwOptPrice: CheckoutDetailed_emwCheckout_lines_productOptions_productOption_emwOptPrice | null;
  emwOptStocknumber: string | null;
  emwOptOptgrpid: CheckoutDetailed_emwCheckout_lines_productOptions_productOption_emwOptOptgrpid | null;
}

export interface CheckoutDetailed_emwCheckout_lines_productOptions {
  __typename: "EMWCheckoutProductoption";
  id: string;
  productOption: CheckoutDetailed_emwCheckout_lines_productOptions_productOption;
}

export interface CheckoutDetailed_emwCheckout_lines_product_mapPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CheckoutDetailed_emwCheckout_lines_product_sellPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CheckoutDetailed_emwCheckout_lines_product_aggregateMapPrice {
  __typename: "Money";
  amount: number;
}

export interface CheckoutDetailed_emwCheckout_lines_product_aggregateSellPrice {
  __typename: "Money";
  amount: number;
}

export interface CheckoutDetailed_emwCheckout_lines_product_emwProdImages_edges_node {
  __typename: "EMWProductImage";
  emwImageUrlPrfix: string | null;
  emwImageName: string | null;
}

export interface CheckoutDetailed_emwCheckout_lines_product_emwProdImages_edges {
  __typename: "EMWProductImageCountableEdge";
  node: CheckoutDetailed_emwCheckout_lines_product_emwProdImages_edges_node;
}

export interface CheckoutDetailed_emwCheckout_lines_product_emwProdImages {
  __typename: "EMWProductImageCountableConnection";
  edges: CheckoutDetailed_emwCheckout_lines_product_emwProdImages_edges[];
}

export interface CheckoutDetailed_emwCheckout_lines_product {
  __typename: "EMWProduct";
  name: string;
  emwProdImageUrl: string | null;
  emwProdVendorPartnumber: string | null;
  emwProdIsDynamicPricing: boolean;
  emwProdIsFreeship: boolean;
  emwProdIsFreight: boolean;
  minimumQuantity: number | null;
  mapPrice: CheckoutDetailed_emwCheckout_lines_product_mapPrice | null;
  sellPrice: CheckoutDetailed_emwCheckout_lines_product_sellPrice | null;
  aggregateMapPrice: CheckoutDetailed_emwCheckout_lines_product_aggregateMapPrice | null;
  aggregateSellPrice: CheckoutDetailed_emwCheckout_lines_product_aggregateSellPrice | null;
  emwProdImages: CheckoutDetailed_emwCheckout_lines_product_emwProdImages | null;
  id: string;
}

export interface CheckoutDetailed_emwCheckout_lines_unitPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CheckoutDetailed_emwCheckout_lines {
  __typename: "EMWCheckoutLine";
  id: string;
  quantity: number;
  productOptions: (CheckoutDetailed_emwCheckout_lines_productOptions | null)[] | null;
  product: CheckoutDetailed_emwCheckout_lines_product | null;
  unitPrice: CheckoutDetailed_emwCheckout_lines_unitPrice | null;
}

export interface CheckoutDetailed_emwCheckout_emwTotalPrice_totalItemPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CheckoutDetailed_emwCheckout_emwTotalPrice {
  __typename: "EMWTaxedMoney";
  totalItemPrice: CheckoutDetailed_emwCheckout_emwTotalPrice_totalItemPrice;
}

export interface CheckoutDetailed_emwCheckout {
  __typename: "EMWCheckout";
  id: string;
  token: any;
  lines: (CheckoutDetailed_emwCheckout_lines | null)[] | null;
  emwTotalPrice: CheckoutDetailed_emwCheckout_emwTotalPrice | null;
}

export interface CheckoutDetailed {
  __typename: "EMWCheckoutCreate";
  emwCheckout: CheckoutDetailed_emwCheckout | null;
}
