/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressInput } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: updateCheckoutBillingAddress
// ====================================================

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_availablePaymentGateways_config {
  __typename: "GatewayConfigLine";
  field: string;
  value: string | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_availablePaymentGateways {
  __typename: "PaymentGateway";
  name: string;
  config: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_availablePaymentGateways_config[];
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  gross: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_totalPrice_gross;
  net: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_totalPrice_net;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_subtotalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  gross: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_subtotalPrice_gross;
  net: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_subtotalPrice_net;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_billingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_availableShippingMethods_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_availableShippingMethods_price | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingMethod_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingMethod_price | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingPrice {
  __typename: "TaxedMoney";
  gross: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingPrice_gross;
  net: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingPrice_net;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  gross: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_totalPrice_gross;
  net: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_totalPrice_net;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross;
  net: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  gross: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_price_gross;
  net: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_price_net;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted | null;
  price: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_price | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_product_thumbnail2x | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant {
  __typename: "ProductVariant";
  stockQuantity: number;
  id: string;
  name: string;
  pricing: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_pricing | null;
  product: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_product;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_totalPrice | null;
  variant: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_discount {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout {
  __typename: "Checkout";
  availablePaymentGateways: (updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_availablePaymentGateways | null)[];
  token: any;
  id: string;
  totalPrice: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_totalPrice | null;
  subtotalPrice: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_subtotalPrice | null;
  billingAddress: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_billingAddress | null;
  shippingAddress: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_availableShippingMethods | null)[];
  shippingMethod: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingMethod | null;
  shippingPrice: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingPrice | null;
  lines: (updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines | null)[] | null;
  isShippingRequired: boolean;
  discount: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_discount | null;
  discountName: string | null;
  translatedDiscountName: string | null;
  voucherCode: string | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate {
  __typename: "CheckoutBillingAddressUpdate";
  errors: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_errors[] | null;
  checkout: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout | null;
}

export interface updateCheckoutBillingAddress {
  checkoutBillingAddressUpdate: updateCheckoutBillingAddress_checkoutBillingAddressUpdate | null;
}

export interface updateCheckoutBillingAddressVariables {
  checkoutId: string;
  billingAddress: AddressInput;
}
