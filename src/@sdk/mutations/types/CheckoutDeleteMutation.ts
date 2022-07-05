/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CheckoutDeleteMutation
// ====================================================

export interface CheckoutDeleteMutation_emwChecoutLineDelete_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_emwTotalPrice_totalItemPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_emwTotalPrice {
  __typename: "EMWTaxedMoney";
  totalItemPrice: CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_emwTotalPrice_totalItemPrice;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_productOptions_productOption_emwOptPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_productOptions_productOption_emwOptOptgrpid {
  __typename: "EMWProductOptionGroup";
  id: string;
  emwOptgrpName: string | null;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_productOptions_productOption {
  __typename: "EMWProductOption";
  id: string;
  emwOptName: string | null;
  emwOptPrice: CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_productOptions_productOption_emwOptPrice | null;
  emwOptStocknumber: string | null;
  emwOptOptgrpid: CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_productOptions_productOption_emwOptOptgrpid | null;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_productOptions {
  __typename: "EMWCheckoutProductoption";
  id: string;
  productOption: CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_productOptions_productOption;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_product_mapPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_product_sellPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_product_aggregateMapPrice {
  __typename: "Money";
  amount: number;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_product_aggregateSellPrice {
  __typename: "Money";
  amount: number;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_product_emwProdImages_edges_node {
  __typename: "EMWProductImage";
  emwImageUrlPrfix: string | null;
  emwImageName: string | null;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_product_emwProdImages_edges {
  __typename: "EMWProductImageCountableEdge";
  node: CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_product_emwProdImages_edges_node;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_product_emwProdImages {
  __typename: "EMWProductImageCountableConnection";
  edges: CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_product_emwProdImages_edges[];
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_product {
  __typename: "EMWProduct";
  name: string;
  emwProdImageUrl: string | null;
  emwProdVendorPartnumber: string | null;
  emwProdIsDynamicPricing: boolean;
  emwProdIsFreeship: boolean;
  emwProdIsFreight: boolean;
  minimumQuantity: number | null;
  mapPrice: CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_product_mapPrice | null;
  sellPrice: CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_product_sellPrice | null;
  aggregateMapPrice: CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_product_aggregateMapPrice | null;
  aggregateSellPrice: CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_product_aggregateSellPrice | null;
  emwProdImages: CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_product_emwProdImages | null;
  id: string;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_unitPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines {
  __typename: "EMWCheckoutLine";
  id: string;
  quantity: number;
  productOptions: (CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_productOptions | null)[] | null;
  product: CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_product | null;
  unitPrice: CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines_unitPrice | null;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout {
  __typename: "EMWCheckout";
  id: string;
  token: any;
  emwTotalPrice: CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_emwTotalPrice | null;
  lines: (CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout_lines | null)[] | null;
}

export interface CheckoutDeleteMutation_emwChecoutLineDelete {
  __typename: "EMWCheckoutLineDelete";
  errors: CheckoutDeleteMutation_emwChecoutLineDelete_errors[] | null;
  emwCheckout: CheckoutDeleteMutation_emwChecoutLineDelete_emwCheckout | null;
}

export interface CheckoutDeleteMutation {
  emwChecoutLineDelete: CheckoutDeleteMutation_emwChecoutLineDelete | null;
}

export interface CheckoutDeleteMutationVariables {
  checkOutId: string;
  lineId?: string | null;
}
