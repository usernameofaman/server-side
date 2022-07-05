/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CheckoutUpdateMutation
// ====================================================

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_productOptions_productOption_emwOptPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_productOptions_productOption_emwOptOptgrpid {
  __typename: "EMWProductOptionGroup";
  id: string;
  emwOptgrpName: string | null;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_productOptions_productOption {
  __typename: "EMWProductOption";
  id: string;
  emwOptName: string | null;
  emwOptPrice: CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_productOptions_productOption_emwOptPrice | null;
  emwOptStocknumber: string | null;
  emwOptOptgrpid: CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_productOptions_productOption_emwOptOptgrpid | null;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_productOptions {
  __typename: "EMWCheckoutProductoption";
  id: string;
  productOption: CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_productOptions_productOption;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_product_mapPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_product_sellPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_product_aggregateMapPrice {
  __typename: "Money";
  amount: number;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_product_aggregateSellPrice {
  __typename: "Money";
  amount: number;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_product_emwProdImages_edges_node {
  __typename: "EMWProductImage";
  emwImageUrlPrfix: string | null;
  emwImageName: string | null;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_product_emwProdImages_edges {
  __typename: "EMWProductImageCountableEdge";
  node: CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_product_emwProdImages_edges_node;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_product_emwProdImages {
  __typename: "EMWProductImageCountableConnection";
  edges: CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_product_emwProdImages_edges[];
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_product {
  __typename: "EMWProduct";
  name: string;
  emwProdImageUrl: string | null;
  emwProdVendorPartnumber: string | null;
  emwProdIsDynamicPricing: boolean;
  emwProdIsFreeship: boolean;
  emwProdIsFreight: boolean;
  minimumQuantity: number | null;
  mapPrice: CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_product_mapPrice | null;
  sellPrice: CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_product_sellPrice | null;
  aggregateMapPrice: CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_product_aggregateMapPrice | null;
  aggregateSellPrice: CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_product_aggregateSellPrice | null;
  emwProdImages: CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_product_emwProdImages | null;
  id: string;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_unitPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines {
  __typename: "EMWCheckoutLine";
  id: string;
  quantity: number;
  productOptions: (CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_productOptions | null)[] | null;
  product: CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_product | null;
  unitPrice: CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines_unitPrice | null;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_emwTotalPrice_totalItemPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_emwTotalPrice {
  __typename: "EMWTaxedMoney";
  totalItemPrice: CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_emwTotalPrice_totalItemPrice;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout {
  __typename: "EMWCheckout";
  id: string;
  token: any;
  lines: (CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_lines | null)[] | null;
  emwTotalPrice: CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout_emwTotalPrice | null;
}

export interface CheckoutUpdateMutation_emwCheckoutLinesAdd {
  __typename: "EMWCheckoutLinesAdd";
  errors: CheckoutUpdateMutation_emwCheckoutLinesAdd_errors[] | null;
  emwCheckout: CheckoutUpdateMutation_emwCheckoutLinesAdd_emwCheckout | null;
}

export interface CheckoutUpdateMutation {
  emwCheckoutLinesAdd: CheckoutUpdateMutation_emwCheckoutLinesAdd | null;
}

export interface CheckoutUpdateMutationVariables {
  checkOutId: string;
  quantity: number;
  prodId: string;
  optionsId?: (string | null)[] | null;
}
