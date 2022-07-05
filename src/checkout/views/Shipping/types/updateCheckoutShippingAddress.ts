/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressInput } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: updateCheckoutShippingAddress
// ====================================================

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_availablePaymentGateways_config {
  __typename: "GatewayConfigLine";
  field: string;
  value: string | null;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_availablePaymentGateways {
  __typename: "PaymentGateway";
  name: string;
  config: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_availablePaymentGateways_config[];
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  gross: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_totalPrice_gross;
  net: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_totalPrice_net;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_subtotalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  gross: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_subtotalPrice_gross;
  net: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_subtotalPrice_net;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_billingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_availableShippingMethods_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_availableShippingMethods_price | null;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingMethod_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingMethod_price | null;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingPrice {
  __typename: "TaxedMoney";
  gross: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingPrice_gross;
  net: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingPrice_net;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  gross: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_totalPrice_gross;
  net: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_totalPrice_net;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross;
  net: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  gross: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_price_gross;
  net: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_price_net;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted | null;
  price: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_price | null;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_product_thumbnail2x | null;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant {
  __typename: "ProductVariant";
  stockQuantity: number;
  id: string;
  name: string;
  pricing: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing | null;
  product: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_product;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_totalPrice | null;
  variant: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_discount {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout {
  __typename: "Checkout";
  availablePaymentGateways: (updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_availablePaymentGateways | null)[];
  token: any;
  id: string;
  totalPrice: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_totalPrice | null;
  subtotalPrice: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_subtotalPrice | null;
  billingAddress: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_billingAddress | null;
  shippingAddress: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_availableShippingMethods | null)[];
  shippingMethod: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingMethod | null;
  shippingPrice: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingPrice | null;
  lines: (updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines | null)[] | null;
  isShippingRequired: boolean;
  discount: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_discount | null;
  discountName: string | null;
  translatedDiscountName: string | null;
  voucherCode: string | null;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate {
  __typename: "CheckoutShippingAddressUpdate";
  errors: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_errors[] | null;
  checkout: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availablePaymentGateways_config {
  __typename: "GatewayConfigLine";
  field: string;
  value: string | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availablePaymentGateways {
  __typename: "PaymentGateway";
  name: string;
  config: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availablePaymentGateways_config[];
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  gross: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice_gross;
  net: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice_net;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  gross: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice_gross;
  net: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice_net;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_billingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availableShippingMethods_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availableShippingMethods_price | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingMethod_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingMethod_price | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice {
  __typename: "TaxedMoney";
  gross: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice_gross;
  net: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice_net;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  gross: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice_gross;
  net: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice_net;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross;
  net: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  gross: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_price_gross;
  net: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_price_net;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted | null;
  price: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_price | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail2x | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant {
  __typename: "ProductVariant";
  stockQuantity: number;
  id: string;
  name: string;
  pricing: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing | null;
  product: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice | null;
  variant: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_discount {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout {
  __typename: "Checkout";
  availablePaymentGateways: (updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availablePaymentGateways | null)[];
  token: any;
  id: string;
  totalPrice: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice | null;
  subtotalPrice: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice | null;
  billingAddress: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_billingAddress | null;
  shippingAddress: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availableShippingMethods | null)[];
  shippingMethod: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingMethod | null;
  shippingPrice: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice | null;
  lines: (updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines | null)[] | null;
  isShippingRequired: boolean;
  discount: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_discount | null;
  discountName: string | null;
  translatedDiscountName: string | null;
  voucherCode: string | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate {
  __typename: "CheckoutEmailUpdate";
  checkout: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout | null;
  errors: updateCheckoutShippingAddress_checkoutEmailUpdate_errors[] | null;
}

export interface updateCheckoutShippingAddress {
  checkoutShippingAddressUpdate: updateCheckoutShippingAddress_checkoutShippingAddressUpdate | null;
  checkoutEmailUpdate: updateCheckoutShippingAddress_checkoutEmailUpdate | null;
}

export interface updateCheckoutShippingAddressVariables {
  checkoutId: string;
  shippingAddress: AddressInput;
  email: string;
}
