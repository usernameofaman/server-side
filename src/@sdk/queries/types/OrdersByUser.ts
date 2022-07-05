/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrdersByUser
// ====================================================

export interface OrdersByUser_me_orders_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface OrdersByUser_me_orders_edges_node_total_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrdersByUser_me_orders_edges_node_total_net {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface OrdersByUser_me_orders_edges_node_total {
  __typename: "TaxedMoney";
  gross: OrdersByUser_me_orders_edges_node_total_gross;
  net: OrdersByUser_me_orders_edges_node_total_net;
}

export interface OrdersByUser_me_orders_edges_node_lines_variant_product {
  __typename: "Product";
  name: string;
  id: string;
}

export interface OrdersByUser_me_orders_edges_node_lines_variant {
  __typename: "ProductVariant";
  id: string;
  product: OrdersByUser_me_orders_edges_node_lines_variant_product;
}

export interface OrdersByUser_me_orders_edges_node_lines_thumbnail {
  __typename: "Image";
  alt: string | null;
  url: string;
}

export interface OrdersByUser_me_orders_edges_node_lines_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface OrdersByUser_me_orders_edges_node_lines {
  __typename: "OrderLine";
  id: string;
  variant: OrdersByUser_me_orders_edges_node_lines_variant | null;
  thumbnail: OrdersByUser_me_orders_edges_node_lines_thumbnail | null;
  thumbnail2x: OrdersByUser_me_orders_edges_node_lines_thumbnail2x | null;
}

export interface OrdersByUser_me_orders_edges_node {
  __typename: "Order";
  id: string;
  token: string;
  number: string | null;
  statusDisplay: string | null;
  created: any;
  total: OrdersByUser_me_orders_edges_node_total | null;
  lines: (OrdersByUser_me_orders_edges_node_lines | null)[];
}

export interface OrdersByUser_me_orders_edges {
  __typename: "OrderCountableEdge";
  node: OrdersByUser_me_orders_edges_node;
}

export interface OrdersByUser_me_orders {
  __typename: "OrderCountableConnection";
  pageInfo: OrdersByUser_me_orders_pageInfo;
  edges: OrdersByUser_me_orders_edges[];
}

export interface OrdersByUser_me {
  __typename: "EMWUser";
  id: string;
  orders: OrdersByUser_me_orders | null;
}

export interface OrdersByUser {
  me: OrdersByUser_me | null;
}

export interface OrdersByUserVariables {
  perPage: number;
  after?: string | null;
}
