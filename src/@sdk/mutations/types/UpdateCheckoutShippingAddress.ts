/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCheckoutShippingAddress
// ====================================================

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_availablePaymentGateways_config {
  __typename: "GatewayConfigLine";
  field: string;
  value: string | null;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_availablePaymentGateways {
  __typename: "PaymentGateway";
  name: string;
  config: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_availablePaymentGateways_config[];
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_totalPrice_gross;
  net: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_totalPrice_net;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_subtotalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_subtotalPrice_gross;
  net: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_subtotalPrice_net;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_billingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_availableShippingMethods_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_availableShippingMethods_price | null;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingMethod_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingMethod_price | null;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingPrice {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingPrice_gross;
  net: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingPrice_net;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_totalPrice_gross;
  net: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_totalPrice_net;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross;
  net: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_price_gross;
  net: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_price_net;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted | null;
  price: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing_price | null;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_product_thumbnail2x | null;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant {
  __typename: "ProductVariant";
  stockQuantity: number;
  id: string;
  name: string;
  pricing: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_pricing | null;
  product: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant_product;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_totalPrice | null;
  variant: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines_variant;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_discount {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout {
  __typename: "Checkout";
  availablePaymentGateways: (UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_availablePaymentGateways | null)[];
  token: any;
  id: string;
  totalPrice: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_totalPrice | null;
  subtotalPrice: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_subtotalPrice | null;
  billingAddress: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_billingAddress | null;
  shippingAddress: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_availableShippingMethods | null)[];
  shippingMethod: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingMethod | null;
  shippingPrice: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_shippingPrice | null;
  lines: (UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_lines | null)[] | null;
  isShippingRequired: boolean;
  discount: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout_discount | null;
  discountName: string | null;
  translatedDiscountName: string | null;
  voucherCode: string | null;
}

export interface UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate {
  __typename: "CheckoutShippingAddressUpdate";
  errors: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_errors[] | null;
  checkout: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate_checkout | null;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availablePaymentGateways_config {
  __typename: "GatewayConfigLine";
  field: string;
  value: string | null;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availablePaymentGateways {
  __typename: "PaymentGateway";
  name: string;
  config: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availablePaymentGateways_config[];
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice_gross;
  net: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice_net;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice_gross;
  net: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice_net;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_billingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availableShippingMethods_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availableShippingMethods_price | null;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingMethod_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingMethod_price | null;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice_gross;
  net: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice_net;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice_gross;
  net: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice_net;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross;
  net: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_price_gross;
  net: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_price_net;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted | null;
  price: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing_price | null;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail2x | null;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant {
  __typename: "ProductVariant";
  stockQuantity: number;
  id: string;
  name: string;
  pricing: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_pricing | null;
  product: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice | null;
  variant: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_discount {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout {
  __typename: "Checkout";
  availablePaymentGateways: (UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availablePaymentGateways | null)[];
  token: any;
  id: string;
  totalPrice: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice | null;
  subtotalPrice: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice | null;
  billingAddress: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_billingAddress | null;
  shippingAddress: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availableShippingMethods | null)[];
  shippingMethod: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingMethod | null;
  shippingPrice: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice | null;
  lines: (UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines | null)[] | null;
  isShippingRequired: boolean;
  discount: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout_discount | null;
  discountName: string | null;
  translatedDiscountName: string | null;
  voucherCode: string | null;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface UpdateCheckoutShippingAddress_checkoutEmailUpdate {
  __typename: "CheckoutEmailUpdate";
  checkout: UpdateCheckoutShippingAddress_checkoutEmailUpdate_checkout | null;
  errors: UpdateCheckoutShippingAddress_checkoutEmailUpdate_errors[] | null;
}

export interface UpdateCheckoutShippingAddress {
  checkoutShippingAddressUpdate: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate | null;
  checkoutEmailUpdate: UpdateCheckoutShippingAddress_checkoutEmailUpdate | null;
}

export interface UpdateCheckoutShippingAddressVariables {
  checkoutId: string;
  shippingAddress: AddressInput;
  email: string;
}
