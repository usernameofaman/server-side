/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CheckoutErrorCode } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: RemoveCheckoutPromoCode
// ====================================================

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_availablePaymentGateways_config {
  __typename: "GatewayConfigLine";
  field: string;
  value: string | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_availablePaymentGateways {
  __typename: "PaymentGateway";
  name: string;
  config: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_availablePaymentGateways_config[];
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_totalPrice {
  __typename: "TaxedMoney";
  gross: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_totalPrice_gross;
  net: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_totalPrice_net;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_subtotalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  gross: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_subtotalPrice_gross;
  net: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_subtotalPrice_net;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_billingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_availableShippingMethods_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_availableShippingMethods_price | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingMethod_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingMethod_price | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingPrice {
  __typename: "TaxedMoney";
  gross: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingPrice_gross;
  net: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingPrice_net;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  gross: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_totalPrice_gross;
  net: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_totalPrice_net;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_priceUndiscounted_gross;
  net: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  gross: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_price_gross;
  net: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_price_net;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_priceUndiscounted | null;
  price: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_price | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_product_thumbnail2x | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant {
  __typename: "ProductVariant";
  stockQuantity: number;
  id: string;
  name: string;
  pricing: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing | null;
  product: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_product;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_totalPrice | null;
  variant: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_discount {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout {
  __typename: "Checkout";
  availablePaymentGateways: (RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_availablePaymentGateways | null)[];
  token: any;
  id: string;
  totalPrice: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_totalPrice | null;
  subtotalPrice: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_subtotalPrice | null;
  billingAddress: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_billingAddress | null;
  shippingAddress: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_availableShippingMethods | null)[];
  shippingMethod: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingMethod | null;
  shippingPrice: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingPrice | null;
  lines: (RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines | null)[] | null;
  isShippingRequired: boolean;
  discount: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_discount | null;
  discountName: string | null;
  translatedDiscountName: string | null;
  voucherCode: string | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkoutErrors {
  __typename: "CheckoutError";
  field: string | null;
  message: string | null;
  code: CheckoutErrorCode | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode {
  __typename: "CheckoutRemovePromoCode";
  checkout: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout | null;
  errors: RemoveCheckoutPromoCode_checkoutRemovePromoCode_errors[] | null;
  checkoutErrors: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkoutErrors[] | null;
}

export interface RemoveCheckoutPromoCode {
  checkoutRemovePromoCode: RemoveCheckoutPromoCode_checkoutRemovePromoCode | null;
}

export interface RemoveCheckoutPromoCodeVariables {
  checkoutId: string;
  promoCode: string;
}
