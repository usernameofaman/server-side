/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CheckoutMutation
// ====================================================

export interface CheckoutMutation_emwCheckoutCreate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_productOptions_productOption_emwOptPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_productOptions_productOption_emwOptOptgrpid {
  __typename: "EMWProductOptionGroup";
  id: string;
  emwOptgrpName: string | null;
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_productOptions_productOption {
  __typename: "EMWProductOption";
  id: string;
  emwOptName: string | null;
  emwOptPrice: CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_productOptions_productOption_emwOptPrice | null;
  emwOptStocknumber: string | null;
  emwOptOptgrpid: CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_productOptions_productOption_emwOptOptgrpid | null;
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_productOptions {
  __typename: "EMWCheckoutProductoption";
  id: string;
  productOption: CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_productOptions_productOption;
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_product_mapPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_product_sellPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_product_aggregateMapPrice {
  __typename: "Money";
  amount: number;
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_product_aggregateSellPrice {
  __typename: "Money";
  amount: number;
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_product_emwProdImages_edges_node {
  __typename: "EMWProductImage";
  emwImageUrlPrfix: string | null;
  emwImageName: string | null;
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_product_emwProdImages_edges {
  __typename: "EMWProductImageCountableEdge";
  node: CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_product_emwProdImages_edges_node;
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_product_emwProdImages {
  __typename: "EMWProductImageCountableConnection";
  edges: CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_product_emwProdImages_edges[];
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_product {
  __typename: "EMWProduct";
  name: string;
  emwProdImageUrl: string | null;
  emwProdVendorPartnumber: string | null;
  emwProdIsDynamicPricing: boolean;
  emwProdIsFreeship: boolean;
  emwProdIsFreight: boolean;
  minimumQuantity: number | null;
  mapPrice: CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_product_mapPrice | null;
  sellPrice: CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_product_sellPrice | null;
  aggregateMapPrice: CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_product_aggregateMapPrice | null;
  aggregateSellPrice: CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_product_aggregateSellPrice | null;
  emwProdImages: CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_product_emwProdImages | null;
  id: string;
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_unitPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout_lines {
  __typename: "EMWCheckoutLine";
  id: string;
  quantity: number;
  productOptions: (CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_productOptions | null)[] | null;
  product: CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_product | null;
  unitPrice: CheckoutMutation_emwCheckoutCreate_emwCheckout_lines_unitPrice | null;
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout_emwTotalPrice_totalItemPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout_emwTotalPrice {
  __typename: "EMWTaxedMoney";
  totalItemPrice: CheckoutMutation_emwCheckoutCreate_emwCheckout_emwTotalPrice_totalItemPrice;
}

export interface CheckoutMutation_emwCheckoutCreate_emwCheckout {
  __typename: "EMWCheckout";
  id: string;
  token: any;
  lines: (CheckoutMutation_emwCheckoutCreate_emwCheckout_lines | null)[] | null;
  emwTotalPrice: CheckoutMutation_emwCheckoutCreate_emwCheckout_emwTotalPrice | null;
}

export interface CheckoutMutation_emwCheckoutCreate {
  __typename: "EMWCheckoutCreate";
  errors: CheckoutMutation_emwCheckoutCreate_errors[] | null;
  emwCheckout: CheckoutMutation_emwCheckoutCreate_emwCheckout | null;
}

export interface CheckoutMutation {
  emwCheckoutCreate: CheckoutMutation_emwCheckoutCreate | null;
}

export interface CheckoutMutationVariables {
  quantity: number;
  prodId: string;
  optionsId?: (string | null)[] | null;
}
