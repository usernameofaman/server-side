/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CheckoutCreateInput } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: createCheckout
// ====================================================

export interface createCheckout_checkoutCreate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface createCheckout_checkoutCreate_checkout_availablePaymentGateways_config {
  __typename: "GatewayConfigLine";
  field: string;
  value: string | null;
}

export interface createCheckout_checkoutCreate_checkout_availablePaymentGateways {
  __typename: "PaymentGateway";
  name: string;
  config: createCheckout_checkoutCreate_checkout_availablePaymentGateways_config[];
}

export interface createCheckout_checkoutCreate_checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_totalPrice {
  __typename: "TaxedMoney";
  gross: createCheckout_checkoutCreate_checkout_totalPrice_gross;
  net: createCheckout_checkoutCreate_checkout_totalPrice_net;
}

export interface createCheckout_checkoutCreate_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_subtotalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  gross: createCheckout_checkoutCreate_checkout_subtotalPrice_gross;
  net: createCheckout_checkoutCreate_checkout_subtotalPrice_net;
}

export interface createCheckout_checkoutCreate_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface createCheckout_checkoutCreate_checkout_billingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: createCheckout_checkoutCreate_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface createCheckout_checkoutCreate_checkout_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface createCheckout_checkoutCreate_checkout_shippingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: createCheckout_checkoutCreate_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface createCheckout_checkoutCreate_checkout_availableShippingMethods_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: createCheckout_checkoutCreate_checkout_availableShippingMethods_price | null;
}

export interface createCheckout_checkoutCreate_checkout_shippingMethod_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: createCheckout_checkoutCreate_checkout_shippingMethod_price | null;
}

export interface createCheckout_checkoutCreate_checkout_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_shippingPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_shippingPrice {
  __typename: "TaxedMoney";
  gross: createCheckout_checkoutCreate_checkout_shippingPrice_gross;
  net: createCheckout_checkoutCreate_checkout_shippingPrice_net;
}

export interface createCheckout_checkoutCreate_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  gross: createCheckout_checkoutCreate_checkout_lines_totalPrice_gross;
  net: createCheckout_checkoutCreate_checkout_lines_totalPrice_net;
}

export interface createCheckout_checkoutCreate_checkout_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: createCheckout_checkoutCreate_checkout_lines_variant_pricing_priceUndiscounted_gross;
  net: createCheckout_checkoutCreate_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface createCheckout_checkoutCreate_checkout_lines_variant_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_lines_variant_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  gross: createCheckout_checkoutCreate_checkout_lines_variant_pricing_price_gross;
  net: createCheckout_checkoutCreate_checkout_lines_variant_pricing_price_net;
}

export interface createCheckout_checkoutCreate_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: createCheckout_checkoutCreate_checkout_lines_variant_pricing_priceUndiscounted | null;
  price: createCheckout_checkoutCreate_checkout_lines_variant_pricing_price | null;
}

export interface createCheckout_checkoutCreate_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface createCheckout_checkoutCreate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface createCheckout_checkoutCreate_checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: createCheckout_checkoutCreate_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: createCheckout_checkoutCreate_checkout_lines_variant_product_thumbnail2x | null;
}

export interface createCheckout_checkoutCreate_checkout_lines_variant {
  __typename: "ProductVariant";
  stockQuantity: number;
  id: string;
  name: string;
  pricing: createCheckout_checkoutCreate_checkout_lines_variant_pricing | null;
  product: createCheckout_checkoutCreate_checkout_lines_variant_product;
}

export interface createCheckout_checkoutCreate_checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: createCheckout_checkoutCreate_checkout_lines_totalPrice | null;
  variant: createCheckout_checkoutCreate_checkout_lines_variant;
}

export interface createCheckout_checkoutCreate_checkout_discount {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface createCheckout_checkoutCreate_checkout {
  __typename: "Checkout";
  availablePaymentGateways: (createCheckout_checkoutCreate_checkout_availablePaymentGateways | null)[];
  token: any;
  id: string;
  totalPrice: createCheckout_checkoutCreate_checkout_totalPrice | null;
  subtotalPrice: createCheckout_checkoutCreate_checkout_subtotalPrice | null;
  billingAddress: createCheckout_checkoutCreate_checkout_billingAddress | null;
  shippingAddress: createCheckout_checkoutCreate_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (createCheckout_checkoutCreate_checkout_availableShippingMethods | null)[];
  shippingMethod: createCheckout_checkoutCreate_checkout_shippingMethod | null;
  shippingPrice: createCheckout_checkoutCreate_checkout_shippingPrice | null;
  lines: (createCheckout_checkoutCreate_checkout_lines | null)[] | null;
  isShippingRequired: boolean;
  discount: createCheckout_checkoutCreate_checkout_discount | null;
  discountName: string | null;
  translatedDiscountName: string | null;
  voucherCode: string | null;
}

export interface createCheckout_checkoutCreate {
  __typename: "CheckoutCreate";
  errors: createCheckout_checkoutCreate_errors[] | null;
  checkout: createCheckout_checkoutCreate_checkout | null;
}

export interface createCheckout {
  checkoutCreate: createCheckout_checkoutCreate | null;
}

export interface createCheckoutVariables {
  checkoutInput: CheckoutCreateInput;
}
