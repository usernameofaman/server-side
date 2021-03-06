/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCheckout
// ====================================================

export interface getCheckout_checkout_availablePaymentGateways_config {
  __typename: "GatewayConfigLine";
  field: string;
  value: string | null;
}

export interface getCheckout_checkout_availablePaymentGateways {
  __typename: "PaymentGateway";
  name: string;
  config: getCheckout_checkout_availablePaymentGateways_config[];
}

export interface getCheckout_checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getCheckout_checkout_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getCheckout_checkout_totalPrice {
  __typename: "TaxedMoney";
  gross: getCheckout_checkout_totalPrice_gross;
  net: getCheckout_checkout_totalPrice_net;
}

export interface getCheckout_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getCheckout_checkout_subtotalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getCheckout_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  gross: getCheckout_checkout_subtotalPrice_gross;
  net: getCheckout_checkout_subtotalPrice_net;
}

export interface getCheckout_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface getCheckout_checkout_billingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: getCheckout_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface getCheckout_checkout_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface getCheckout_checkout_shippingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: getCheckout_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface getCheckout_checkout_availableShippingMethods_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface getCheckout_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: getCheckout_checkout_availableShippingMethods_price | null;
}

export interface getCheckout_checkout_shippingMethod_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface getCheckout_checkout_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: getCheckout_checkout_shippingMethod_price | null;
}

export interface getCheckout_checkout_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getCheckout_checkout_shippingPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getCheckout_checkout_shippingPrice {
  __typename: "TaxedMoney";
  gross: getCheckout_checkout_shippingPrice_gross;
  net: getCheckout_checkout_shippingPrice_net;
}

export interface getCheckout_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getCheckout_checkout_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getCheckout_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  gross: getCheckout_checkout_lines_totalPrice_gross;
  net: getCheckout_checkout_lines_totalPrice_net;
}

export interface getCheckout_checkout_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getCheckout_checkout_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getCheckout_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: getCheckout_checkout_lines_variant_pricing_priceUndiscounted_gross;
  net: getCheckout_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface getCheckout_checkout_lines_variant_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getCheckout_checkout_lines_variant_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getCheckout_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  gross: getCheckout_checkout_lines_variant_pricing_price_gross;
  net: getCheckout_checkout_lines_variant_pricing_price_net;
}

export interface getCheckout_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: getCheckout_checkout_lines_variant_pricing_priceUndiscounted | null;
  price: getCheckout_checkout_lines_variant_pricing_price | null;
}

export interface getCheckout_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface getCheckout_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface getCheckout_checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: getCheckout_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: getCheckout_checkout_lines_variant_product_thumbnail2x | null;
}

export interface getCheckout_checkout_lines_variant {
  __typename: "ProductVariant";
  stockQuantity: number;
  id: string;
  name: string;
  pricing: getCheckout_checkout_lines_variant_pricing | null;
  product: getCheckout_checkout_lines_variant_product;
}

export interface getCheckout_checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: getCheckout_checkout_lines_totalPrice | null;
  variant: getCheckout_checkout_lines_variant;
}

export interface getCheckout_checkout_discount {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface getCheckout_checkout {
  __typename: "Checkout";
  availablePaymentGateways: (getCheckout_checkout_availablePaymentGateways | null)[];
  token: any;
  id: string;
  totalPrice: getCheckout_checkout_totalPrice | null;
  subtotalPrice: getCheckout_checkout_subtotalPrice | null;
  billingAddress: getCheckout_checkout_billingAddress | null;
  shippingAddress: getCheckout_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (getCheckout_checkout_availableShippingMethods | null)[];
  shippingMethod: getCheckout_checkout_shippingMethod | null;
  shippingPrice: getCheckout_checkout_shippingPrice | null;
  lines: (getCheckout_checkout_lines | null)[] | null;
  isShippingRequired: boolean;
  discount: getCheckout_checkout_discount | null;
  discountName: string | null;
  translatedDiscountName: string | null;
  voucherCode: string | null;
}

export interface getCheckout {
  checkout: getCheckout_checkout | null;
}

export interface getCheckoutVariables {
  token: any;
}
