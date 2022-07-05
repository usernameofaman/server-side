/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PaymentChargeStatusEnum, OrderStatus } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: OrderByToken
// ====================================================

export interface OrderByToken_orderByToken_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface OrderByToken_orderByToken_shippingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: OrderByToken_orderByToken_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_gross;
  net: OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_net;
}

export interface OrderByToken_orderByToken_lines_variant_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderByToken_orderByToken_lines_variant_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderByToken_orderByToken_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  gross: OrderByToken_orderByToken_lines_variant_pricing_price_gross;
  net: OrderByToken_orderByToken_lines_variant_pricing_price_net;
}

export interface OrderByToken_orderByToken_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted | null;
  price: OrderByToken_orderByToken_lines_variant_pricing_price | null;
}

export interface OrderByToken_orderByToken_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface OrderByToken_orderByToken_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface OrderByToken_orderByToken_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: OrderByToken_orderByToken_lines_variant_product_thumbnail | null;
  thumbnail2x: OrderByToken_orderByToken_lines_variant_product_thumbnail2x | null;
}

export interface OrderByToken_orderByToken_lines_variant {
  __typename: "ProductVariant";
  id: string;
  name: string;
  pricing: OrderByToken_orderByToken_lines_variant_pricing | null;
  product: OrderByToken_orderByToken_lines_variant_product;
}

export interface OrderByToken_orderByToken_lines_unitPrice_gross {
  __typename: "Money";
  amount: number;
}

export interface OrderByToken_orderByToken_lines_unitPrice {
  __typename: "TaxedMoney";
  currency: string;
  gross: OrderByToken_orderByToken_lines_unitPrice_gross;
}

export interface OrderByToken_orderByToken_lines {
  __typename: "OrderLine";
  productName: string;
  quantity: number;
  variant: OrderByToken_orderByToken_lines_variant | null;
  unitPrice: OrderByToken_orderByToken_lines_unitPrice | null;
}

export interface OrderByToken_orderByToken_subtotal_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderByToken_orderByToken_subtotal_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderByToken_orderByToken_subtotal {
  __typename: "TaxedMoney";
  gross: OrderByToken_orderByToken_subtotal_gross;
  net: OrderByToken_orderByToken_subtotal_net;
}

export interface OrderByToken_orderByToken_total_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderByToken_orderByToken_total_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderByToken_orderByToken_total {
  __typename: "TaxedMoney";
  gross: OrderByToken_orderByToken_total_gross;
  net: OrderByToken_orderByToken_total_net;
}

export interface OrderByToken_orderByToken_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderByToken_orderByToken_shippingPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderByToken_orderByToken_shippingPrice {
  __typename: "TaxedMoney";
  gross: OrderByToken_orderByToken_shippingPrice_gross;
  net: OrderByToken_orderByToken_shippingPrice_net;
}

export interface OrderByToken_orderByToken {
  __typename: "Order";
  userEmail: string | null;
  paymentStatus: PaymentChargeStatusEnum | null;
  paymentStatusDisplay: string | null;
  status: OrderStatus;
  statusDisplay: string | null;
  id: string;
  number: string | null;
  shippingAddress: OrderByToken_orderByToken_shippingAddress | null;
  lines: (OrderByToken_orderByToken_lines | null)[];
  subtotal: OrderByToken_orderByToken_subtotal | null;
  total: OrderByToken_orderByToken_total | null;
  shippingPrice: OrderByToken_orderByToken_shippingPrice | null;
}

export interface OrderByToken {
  orderByToken: OrderByToken_orderByToken | null;
}

export interface OrderByTokenVariables {
  token: any;
}
