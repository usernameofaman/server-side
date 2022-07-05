/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductVariant
// ====================================================

export interface ProductVariant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductVariant_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: ProductVariant_pricing_priceUndiscounted_gross;
  net: ProductVariant_pricing_priceUndiscounted_net;
}

export interface ProductVariant_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductVariant_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductVariant_pricing_price {
  __typename: "TaxedMoney";
  gross: ProductVariant_pricing_price_gross;
  net: ProductVariant_pricing_price_net;
}

export interface ProductVariant_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: ProductVariant_pricing_priceUndiscounted | null;
  price: ProductVariant_pricing_price | null;
}

export interface ProductVariant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface ProductVariant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface ProductVariant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: ProductVariant_product_thumbnail | null;
  thumbnail2x: ProductVariant_product_thumbnail2x | null;
}

export interface ProductVariant {
  __typename: "ProductVariant";
  id: string;
  name: string;
  pricing: ProductVariant_pricing | null;
  product: ProductVariant_product;
}
