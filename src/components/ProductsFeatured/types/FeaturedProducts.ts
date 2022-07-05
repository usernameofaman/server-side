/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FeaturedProducts
// ====================================================

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  gross: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  net: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  gross: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  net: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  start: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  stop: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  gross: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start_gross;
  net: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start_net;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  gross: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop_gross;
  net: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop_net;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  start: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start | null;
  stop: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop | null;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  onSale: boolean | null;
  priceRangeUndiscounted: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted | null;
  priceRange: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange | null;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: FeaturedProducts_shop_homepageCollection_products_edges_node_thumbnail | null;
  thumbnail2x: FeaturedProducts_shop_homepageCollection_products_edges_node_thumbnail2x | null;
  pricing: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing | null;
  category: FeaturedProducts_shop_homepageCollection_products_edges_node_category | null;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges {
  __typename: "ProductCountableEdge";
  node: FeaturedProducts_shop_homepageCollection_products_edges_node;
}

export interface FeaturedProducts_shop_homepageCollection_products {
  __typename: "ProductCountableConnection";
  edges: FeaturedProducts_shop_homepageCollection_products_edges[];
}

export interface FeaturedProducts_shop_homepageCollection {
  __typename: "Collection";
  id: string;
  products: FeaturedProducts_shop_homepageCollection_products | null;
}

export interface FeaturedProducts_shop {
  __typename: "Shop";
  homepageCollection: FeaturedProducts_shop_homepageCollection | null;
}

export interface FeaturedProducts {
  shop: FeaturedProducts_shop | null;
}
