/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CheckoutLineInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCheckoutLine
// ====================================================

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_gross;
  net: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_net;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross;
  net: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price_gross;
  net: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price_net;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted | null;
  price: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail2x | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant {
  __typename: "ProductVariant";
  stockQuantity: number;
  id: string;
  name: string;
  pricing: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing | null;
  product: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice | null;
  variant: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_gross;
  net: UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_net;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  gross: UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_gross;
  net: UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_net;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout {
  __typename: "Checkout";
  id: string;
  lines: (UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines | null)[] | null;
  totalPrice: UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice | null;
  subtotalPrice: UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice | null;
  isShippingRequired: boolean;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate {
  __typename: "CheckoutLinesUpdate";
  checkout: UpdateCheckoutLine_checkoutLinesUpdate_checkout | null;
  errors: UpdateCheckoutLine_checkoutLinesUpdate_errors[] | null;
}

export interface UpdateCheckoutLine {
  checkoutLinesUpdate: UpdateCheckoutLine_checkoutLinesUpdate | null;
}

export interface UpdateCheckoutLineVariables {
  checkoutId: string;
  lines: (CheckoutLineInput | null)[];
}
