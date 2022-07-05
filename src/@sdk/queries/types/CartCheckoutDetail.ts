/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { EMWCheckoutShippingType } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: CartCheckoutDetail
// ====================================================

export interface CartCheckoutDetail_emwCheckout_shipping_price {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CartCheckoutDetail_emwCheckout_shipping {
  __typename: "EMWShipping";
  name: string | null;
  code: string | null;
  price: CartCheckoutDetail_emwCheckout_shipping_price | null;
  occurence: number | null;
}

export interface CartCheckoutDetail_emwCheckout_lines_productOptions_productOption_emwOptPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CartCheckoutDetail_emwCheckout_lines_productOptions_productOption_emwOptOptgrpid {
  __typename: "EMWProductOptionGroup";
  id: string;
  emwOptgrpName: string | null;
}

export interface CartCheckoutDetail_emwCheckout_lines_productOptions_productOption {
  __typename: "EMWProductOption";
  id: string;
  emwOptName: string | null;
  emwOptPrice: CartCheckoutDetail_emwCheckout_lines_productOptions_productOption_emwOptPrice | null;
  emwOptStocknumber: string | null;
  emwOptOptgrpid: CartCheckoutDetail_emwCheckout_lines_productOptions_productOption_emwOptOptgrpid | null;
}

export interface CartCheckoutDetail_emwCheckout_lines_productOptions {
  __typename: "EMWCheckoutProductoption";
  id: string;
  productOption: CartCheckoutDetail_emwCheckout_lines_productOptions_productOption;
}

export interface CartCheckoutDetail_emwCheckout_lines_product_emwProdVendorid {
  __typename: "EMWVendor";
  id: string;
  emwVendorName: string | null;
}

export interface CartCheckoutDetail_emwCheckout_lines_product_emwProdImages_edges_node {
  __typename: "EMWProductImage";
  emwImageUrlPrfix: string | null;
  emwImageName: string | null;
}

export interface CartCheckoutDetail_emwCheckout_lines_product_emwProdImages_edges {
  __typename: "EMWProductImageCountableEdge";
  node: CartCheckoutDetail_emwCheckout_lines_product_emwProdImages_edges_node;
}

export interface CartCheckoutDetail_emwCheckout_lines_product_emwProdImages {
  __typename: "EMWProductImageCountableConnection";
  edges: CartCheckoutDetail_emwCheckout_lines_product_emwProdImages_edges[];
}

export interface CartCheckoutDetail_emwCheckout_lines_product_mapPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CartCheckoutDetail_emwCheckout_lines_product_sellPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CartCheckoutDetail_emwCheckout_lines_product_aggregateMapPrice {
  __typename: "Money";
  amount: number;
}

export interface CartCheckoutDetail_emwCheckout_lines_product_aggregateSellPrice {
  __typename: "Money";
  amount: number;
}

export interface CartCheckoutDetail_emwCheckout_lines_product {
  __typename: "EMWProduct";
  name: string;
  emwProdImageUrl: string | null;
  emwProdStockPartnumber: string | null;
  emwProdVendorPartnumber: string | null;
  emwProdIsDynamicPricing: boolean;
  emwProdIsFreeship: boolean;
  emwProdIsFreight: boolean;
  emwProdVendorid: CartCheckoutDetail_emwCheckout_lines_product_emwProdVendorid | null;
  emwProdImages: CartCheckoutDetail_emwCheckout_lines_product_emwProdImages | null;
  mapPrice: CartCheckoutDetail_emwCheckout_lines_product_mapPrice | null;
  sellPrice: CartCheckoutDetail_emwCheckout_lines_product_sellPrice | null;
  aggregateMapPrice: CartCheckoutDetail_emwCheckout_lines_product_aggregateMapPrice | null;
  aggregateSellPrice: CartCheckoutDetail_emwCheckout_lines_product_aggregateSellPrice | null;
  minimumQuantity: number | null;
  id: string;
}

export interface CartCheckoutDetail_emwCheckout_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
}

export interface CartCheckoutDetail_emwCheckout_lines_totalPrice {
  __typename: "TaxedMoney";
  net: CartCheckoutDetail_emwCheckout_lines_totalPrice_net;
}

export interface CartCheckoutDetail_emwCheckout_lines_unitPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CartCheckoutDetail_emwCheckout_lines_lineshipping {
  __typename: "EMWLineShipping";
  id: string;
  name: string | null;
  method: string | null;
  cost: number | null;
  residentialSurcharge: number | null;
}

export interface CartCheckoutDetail_emwCheckout_lines {
  __typename: "EMWCheckoutLine";
  id: string;
  quantity: number;
  productOptions: (CartCheckoutDetail_emwCheckout_lines_productOptions | null)[] | null;
  product: CartCheckoutDetail_emwCheckout_lines_product | null;
  totalPrice: CartCheckoutDetail_emwCheckout_lines_totalPrice | null;
  unitPrice: CartCheckoutDetail_emwCheckout_lines_unitPrice | null;
  lineshipping: (CartCheckoutDetail_emwCheckout_lines_lineshipping | null)[] | null;
}

export interface CartCheckoutDetail_emwCheckout_billingAddress {
  __typename: "EMWAddress";
  id: string;
  firstName: string;
  lastName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  countryArea: string;
}

export interface CartCheckoutDetail_emwCheckout_shippingAddress {
  __typename: "EMWAddress";
  id: string;
  firstName: string;
  lastName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  countryArea: string;
}

export interface CartCheckoutDetail_emwCheckout_emwTotalPrice_totalItemPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CartCheckoutDetail_emwCheckout_emwTotalPrice_totalShippingPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CartCheckoutDetail_emwCheckout_emwTotalPrice_totalTaxPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CartCheckoutDetail_emwCheckout_emwTotalPrice_grossTotalPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface CartCheckoutDetail_emwCheckout_emwTotalPrice {
  __typename: "EMWTaxedMoney";
  totalItemPrice: CartCheckoutDetail_emwCheckout_emwTotalPrice_totalItemPrice;
  totalShippingPrice: CartCheckoutDetail_emwCheckout_emwTotalPrice_totalShippingPrice;
  totalTaxPrice: CartCheckoutDetail_emwCheckout_emwTotalPrice_totalTaxPrice;
  grossTotalPrice: CartCheckoutDetail_emwCheckout_emwTotalPrice_grossTotalPrice;
}

export interface CartCheckoutDetail_emwCheckout {
  __typename: "EMWCheckout";
  id: string;
  token: any;
  note: string;
  shipping: (CartCheckoutDetail_emwCheckout_shipping | null)[] | null;
  lines: (CartCheckoutDetail_emwCheckout_lines | null)[] | null;
  billingAddress: CartCheckoutDetail_emwCheckout_billingAddress | null;
  shippingAddress: CartCheckoutDetail_emwCheckout_shippingAddress | null;
  paymentTypes: string | null;
  shippingType: EMWCheckoutShippingType | null;
  emwTotalPrice: CartCheckoutDetail_emwCheckout_emwTotalPrice | null;
  shippingStatus: string | null;
  taxesStatus: string | null;
  orderNumber: string | null;
}

export interface CartCheckoutDetail {
  emwCheckout: CartCheckoutDetail_emwCheckout | null;
}

export interface CartCheckoutDetailVariables {
  tokenId?: any | null;
}
