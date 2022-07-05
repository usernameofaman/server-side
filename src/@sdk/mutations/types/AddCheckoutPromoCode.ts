/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CheckoutErrorCode } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AddCheckoutPromoCode
// ====================================================

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_availablePaymentGateways_config {
  __typename: "GatewayConfigLine";
  field: string;
  value: string | null;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_availablePaymentGateways {
  __typename: "PaymentGateway";
  name: string;
  config: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_availablePaymentGateways_config[];
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_totalPrice {
  __typename: "TaxedMoney";
  gross: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_totalPrice_gross;
  net: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_totalPrice_net;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_subtotalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  gross: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_subtotalPrice_gross;
  net: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_subtotalPrice_net;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_billingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_shippingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_availableShippingMethods_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_availableShippingMethods_price | null;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_shippingMethod_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_shippingMethod_price | null;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_shippingPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_shippingPrice {
  __typename: "TaxedMoney";
  gross: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_shippingPrice_gross;
  net: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_shippingPrice_net;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  gross: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_totalPrice_gross;
  net: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_totalPrice_net;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_pricing_priceUndiscounted_gross;
  net: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  gross: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_pricing_price_gross;
  net: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_pricing_price_net;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_pricing_priceUndiscounted | null;
  price: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_pricing_price | null;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_product_thumbnail2x | null;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant {
  __typename: "ProductVariant";
  stockQuantity: number;
  id: string;
  name: string;
  pricing: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_pricing | null;
  product: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant_product;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_totalPrice | null;
  variant: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines_variant;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout_discount {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkout {
  __typename: "Checkout";
  availablePaymentGateways: (AddCheckoutPromoCode_checkoutAddPromoCode_checkout_availablePaymentGateways | null)[];
  token: any;
  id: string;
  totalPrice: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_totalPrice | null;
  subtotalPrice: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_subtotalPrice | null;
  billingAddress: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_billingAddress | null;
  shippingAddress: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (AddCheckoutPromoCode_checkoutAddPromoCode_checkout_availableShippingMethods | null)[];
  shippingMethod: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_shippingMethod | null;
  shippingPrice: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_shippingPrice | null;
  lines: (AddCheckoutPromoCode_checkoutAddPromoCode_checkout_lines | null)[] | null;
  isShippingRequired: boolean;
  discount: AddCheckoutPromoCode_checkoutAddPromoCode_checkout_discount | null;
  discountName: string | null;
  translatedDiscountName: string | null;
  voucherCode: string | null;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode_checkoutErrors {
  __typename: "CheckoutError";
  field: string | null;
  message: string | null;
  code: CheckoutErrorCode | null;
}

export interface AddCheckoutPromoCode_checkoutAddPromoCode {
  __typename: "CheckoutAddPromoCode";
  checkout: AddCheckoutPromoCode_checkoutAddPromoCode_checkout | null;
  errors: AddCheckoutPromoCode_checkoutAddPromoCode_errors[] | null;
  checkoutErrors: AddCheckoutPromoCode_checkoutAddPromoCode_checkoutErrors[] | null;
}

export interface AddCheckoutPromoCode {
  checkoutAddPromoCode: AddCheckoutPromoCode_checkoutAddPromoCode | null;
}

export interface AddCheckoutPromoCodeVariables {
  checkoutId: string;
  promoCode: string;
}
