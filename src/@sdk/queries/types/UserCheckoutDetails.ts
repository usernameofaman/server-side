/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserCheckoutDetails
// ====================================================

export interface UserCheckoutDetails_me_checkout_availablePaymentGateways_config {
  __typename: "GatewayConfigLine";
  field: string;
  value: string | null;
}

export interface UserCheckoutDetails_me_checkout_availablePaymentGateways {
  __typename: "PaymentGateway";
  name: string;
  config: UserCheckoutDetails_me_checkout_availablePaymentGateways_config[];
}

export interface UserCheckoutDetails_me_checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UserCheckoutDetails_me_checkout_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UserCheckoutDetails_me_checkout_totalPrice {
  __typename: "TaxedMoney";
  gross: UserCheckoutDetails_me_checkout_totalPrice_gross;
  net: UserCheckoutDetails_me_checkout_totalPrice_net;
}

export interface UserCheckoutDetails_me_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UserCheckoutDetails_me_checkout_subtotalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UserCheckoutDetails_me_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  gross: UserCheckoutDetails_me_checkout_subtotalPrice_gross;
  net: UserCheckoutDetails_me_checkout_subtotalPrice_net;
}

export interface UserCheckoutDetails_me_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface UserCheckoutDetails_me_checkout_billingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: UserCheckoutDetails_me_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface UserCheckoutDetails_me_checkout_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface UserCheckoutDetails_me_checkout_shippingAddress {
  __typename: "Address";
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: UserCheckoutDetails_me_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface UserCheckoutDetails_me_checkout_availableShippingMethods_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface UserCheckoutDetails_me_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: UserCheckoutDetails_me_checkout_availableShippingMethods_price | null;
}

export interface UserCheckoutDetails_me_checkout_shippingMethod_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface UserCheckoutDetails_me_checkout_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: UserCheckoutDetails_me_checkout_shippingMethod_price | null;
}

export interface UserCheckoutDetails_me_checkout_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UserCheckoutDetails_me_checkout_shippingPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UserCheckoutDetails_me_checkout_shippingPrice {
  __typename: "TaxedMoney";
  gross: UserCheckoutDetails_me_checkout_shippingPrice_gross;
  net: UserCheckoutDetails_me_checkout_shippingPrice_net;
}

export interface UserCheckoutDetails_me_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UserCheckoutDetails_me_checkout_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UserCheckoutDetails_me_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  gross: UserCheckoutDetails_me_checkout_lines_totalPrice_gross;
  net: UserCheckoutDetails_me_checkout_lines_totalPrice_net;
}

export interface UserCheckoutDetails_me_checkout_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UserCheckoutDetails_me_checkout_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UserCheckoutDetails_me_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: UserCheckoutDetails_me_checkout_lines_variant_pricing_priceUndiscounted_gross;
  net: UserCheckoutDetails_me_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface UserCheckoutDetails_me_checkout_lines_variant_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UserCheckoutDetails_me_checkout_lines_variant_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UserCheckoutDetails_me_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  gross: UserCheckoutDetails_me_checkout_lines_variant_pricing_price_gross;
  net: UserCheckoutDetails_me_checkout_lines_variant_pricing_price_net;
}

export interface UserCheckoutDetails_me_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: UserCheckoutDetails_me_checkout_lines_variant_pricing_priceUndiscounted | null;
  price: UserCheckoutDetails_me_checkout_lines_variant_pricing_price | null;
}

export interface UserCheckoutDetails_me_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface UserCheckoutDetails_me_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface UserCheckoutDetails_me_checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: UserCheckoutDetails_me_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: UserCheckoutDetails_me_checkout_lines_variant_product_thumbnail2x | null;
}

export interface UserCheckoutDetails_me_checkout_lines_variant {
  __typename: "ProductVariant";
  stockQuantity: number;
  id: string;
  name: string;
  pricing: UserCheckoutDetails_me_checkout_lines_variant_pricing | null;
  product: UserCheckoutDetails_me_checkout_lines_variant_product;
}

export interface UserCheckoutDetails_me_checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: UserCheckoutDetails_me_checkout_lines_totalPrice | null;
  variant: UserCheckoutDetails_me_checkout_lines_variant;
}

export interface UserCheckoutDetails_me_checkout_discount {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface UserCheckoutDetails_me_checkout {
  __typename: "Checkout";
  availablePaymentGateways: (UserCheckoutDetails_me_checkout_availablePaymentGateways | null)[];
  token: any;
  id: string;
  totalPrice: UserCheckoutDetails_me_checkout_totalPrice | null;
  subtotalPrice: UserCheckoutDetails_me_checkout_subtotalPrice | null;
  billingAddress: UserCheckoutDetails_me_checkout_billingAddress | null;
  shippingAddress: UserCheckoutDetails_me_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (UserCheckoutDetails_me_checkout_availableShippingMethods | null)[];
  shippingMethod: UserCheckoutDetails_me_checkout_shippingMethod | null;
  shippingPrice: UserCheckoutDetails_me_checkout_shippingPrice | null;
  lines: (UserCheckoutDetails_me_checkout_lines | null)[] | null;
  isShippingRequired: boolean;
  discount: UserCheckoutDetails_me_checkout_discount | null;
  discountName: string | null;
  translatedDiscountName: string | null;
  voucherCode: string | null;
}

export interface UserCheckoutDetails_me {
  __typename: "EMWUser";
  id: string;
  checkout: UserCheckoutDetails_me_checkout | null;
}

export interface UserCheckoutDetails {
  me: UserCheckoutDetails_me | null;
}
