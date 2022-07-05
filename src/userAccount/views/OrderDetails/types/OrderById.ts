/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PaymentChargeStatusEnum, OrderStatus } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: OrderById
// ====================================================

export interface OrderById_order_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface OrderById_order_shippingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: OrderById_order_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface OrderById_order_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderById_order_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderById_order_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: OrderById_order_lines_variant_pricing_priceUndiscounted_gross;
  net: OrderById_order_lines_variant_pricing_priceUndiscounted_net;
}

export interface OrderById_order_lines_variant_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderById_order_lines_variant_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderById_order_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  gross: OrderById_order_lines_variant_pricing_price_gross;
  net: OrderById_order_lines_variant_pricing_price_net;
}

export interface OrderById_order_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: OrderById_order_lines_variant_pricing_priceUndiscounted | null;
  price: OrderById_order_lines_variant_pricing_price | null;
}

export interface OrderById_order_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface OrderById_order_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface OrderById_order_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: OrderById_order_lines_variant_product_thumbnail | null;
  thumbnail2x: OrderById_order_lines_variant_product_thumbnail2x | null;
}

export interface OrderById_order_lines_variant {
  __typename: "ProductVariant";
  id: string;
  name: string;
  pricing: OrderById_order_lines_variant_pricing | null;
  product: OrderById_order_lines_variant_product;
}

export interface OrderById_order_lines_unitPrice_gross {
  __typename: "Money";
  amount: number;
}

export interface OrderById_order_lines_unitPrice {
  __typename: "TaxedMoney";
  currency: string;
  gross: OrderById_order_lines_unitPrice_gross;
}

export interface OrderById_order_lines {
  __typename: "OrderLine";
  productName: string;
  quantity: number;
  variant: OrderById_order_lines_variant | null;
  unitPrice: OrderById_order_lines_unitPrice | null;
}

export interface OrderById_order_subtotal_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderById_order_subtotal_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderById_order_subtotal {
  __typename: "TaxedMoney";
  gross: OrderById_order_subtotal_gross;
  net: OrderById_order_subtotal_net;
}

export interface OrderById_order_total_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderById_order_total_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderById_order_total {
  __typename: "TaxedMoney";
  gross: OrderById_order_total_gross;
  net: OrderById_order_total_net;
}

export interface OrderById_order_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderById_order_shippingPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrderById_order_shippingPrice {
  __typename: "TaxedMoney";
  gross: OrderById_order_shippingPrice_gross;
  net: OrderById_order_shippingPrice_net;
}

export interface OrderById_order {
  __typename: "Order";
  userEmail: string | null;
  paymentStatus: PaymentChargeStatusEnum | null;
  paymentStatusDisplay: string | null;
  status: OrderStatus;
  statusDisplay: string | null;
  id: string;
  number: string | null;
  shippingAddress: OrderById_order_shippingAddress | null;
  lines: (OrderById_order_lines | null)[];
  subtotal: OrderById_order_subtotal | null;
  total: OrderById_order_total | null;
  shippingPrice: OrderById_order_shippingPrice | null;
}

export interface OrderById {
  order: OrderById_order | null;
}

export interface OrderByIdVariables {
  id: string;
}
