/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUserCheckout
// ====================================================

export interface getUserCheckout_me_checkout_availablePaymentGateways_config {
  __typename: "GatewayConfigLine";
  field: string;
  value: string | null;
}

export interface getUserCheckout_me_checkout_availablePaymentGateways {
  __typename: "PaymentGateway";
  name: string;
  config: getUserCheckout_me_checkout_availablePaymentGateways_config[];
}

export interface getUserCheckout_me_checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getUserCheckout_me_checkout_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getUserCheckout_me_checkout_totalPrice {
  __typename: "TaxedMoney";
  gross: getUserCheckout_me_checkout_totalPrice_gross;
  net: getUserCheckout_me_checkout_totalPrice_net;
}

export interface getUserCheckout_me_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getUserCheckout_me_checkout_subtotalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getUserCheckout_me_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  gross: getUserCheckout_me_checkout_subtotalPrice_gross;
  net: getUserCheckout_me_checkout_subtotalPrice_net;
}

export interface getUserCheckout_me_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface getUserCheckout_me_checkout_billingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: getUserCheckout_me_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface getUserCheckout_me_checkout_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface getUserCheckout_me_checkout_shippingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: getUserCheckout_me_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface getUserCheckout_me_checkout_availableShippingMethods_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface getUserCheckout_me_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: getUserCheckout_me_checkout_availableShippingMethods_price | null;
}

export interface getUserCheckout_me_checkout_shippingMethod_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface getUserCheckout_me_checkout_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: getUserCheckout_me_checkout_shippingMethod_price | null;
}

export interface getUserCheckout_me_checkout_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getUserCheckout_me_checkout_shippingPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getUserCheckout_me_checkout_shippingPrice {
  __typename: "TaxedMoney";
  gross: getUserCheckout_me_checkout_shippingPrice_gross;
  net: getUserCheckout_me_checkout_shippingPrice_net;
}

export interface getUserCheckout_me_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getUserCheckout_me_checkout_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getUserCheckout_me_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  gross: getUserCheckout_me_checkout_lines_totalPrice_gross;
  net: getUserCheckout_me_checkout_lines_totalPrice_net;
}

export interface getUserCheckout_me_checkout_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getUserCheckout_me_checkout_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getUserCheckout_me_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: getUserCheckout_me_checkout_lines_variant_pricing_priceUndiscounted_gross;
  net: getUserCheckout_me_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface getUserCheckout_me_checkout_lines_variant_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getUserCheckout_me_checkout_lines_variant_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getUserCheckout_me_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  gross: getUserCheckout_me_checkout_lines_variant_pricing_price_gross;
  net: getUserCheckout_me_checkout_lines_variant_pricing_price_net;
}

export interface getUserCheckout_me_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: getUserCheckout_me_checkout_lines_variant_pricing_priceUndiscounted | null;
  price: getUserCheckout_me_checkout_lines_variant_pricing_price | null;
}

export interface getUserCheckout_me_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface getUserCheckout_me_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface getUserCheckout_me_checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: getUserCheckout_me_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: getUserCheckout_me_checkout_lines_variant_product_thumbnail2x | null;
}

export interface getUserCheckout_me_checkout_lines_variant {
  __typename: "ProductVariant";
  stockQuantity: number;
  id: string;
  name: string;
  pricing: getUserCheckout_me_checkout_lines_variant_pricing | null;
  product: getUserCheckout_me_checkout_lines_variant_product;
}

export interface getUserCheckout_me_checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: getUserCheckout_me_checkout_lines_totalPrice | null;
  variant: getUserCheckout_me_checkout_lines_variant;
}

export interface getUserCheckout_me_checkout_discount {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface getUserCheckout_me_checkout {
  __typename: "Checkout";
  availablePaymentGateways: (getUserCheckout_me_checkout_availablePaymentGateways | null)[];
  token: any;
  id: string;
  totalPrice: getUserCheckout_me_checkout_totalPrice | null;
  subtotalPrice: getUserCheckout_me_checkout_subtotalPrice | null;
  billingAddress: getUserCheckout_me_checkout_billingAddress | null;
  shippingAddress: getUserCheckout_me_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (getUserCheckout_me_checkout_availableShippingMethods | null)[];
  shippingMethod: getUserCheckout_me_checkout_shippingMethod | null;
  shippingPrice: getUserCheckout_me_checkout_shippingPrice | null;
  lines: (getUserCheckout_me_checkout_lines | null)[] | null;
  isShippingRequired: boolean;
  discount: getUserCheckout_me_checkout_discount | null;
  discountName: string | null;
  translatedDiscountName: string | null;
  voucherCode: string | null;
}

export interface getUserCheckout_me {
  __typename: "EMWUser";
  checkout: getUserCheckout_me_checkout | null;
}

export interface getUserCheckout {
  me: getUserCheckout_me | null;
}
