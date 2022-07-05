/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrderTracking
// ====================================================

export interface OrderTracking_emwOrder_emwOrderCheckoutid_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface OrderTracking_emwOrder_emwOrderCheckoutid_shippingAddress {
  __typename: "EMWAddress";
  firstName: string;
  lastName: string;
  email: string | null;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  countryArea: string;
  postalCode: string;
  country: OrderTracking_emwOrder_emwOrderCheckoutid_shippingAddress_country;
}

export interface OrderTracking_emwOrder_emwOrderCheckoutid_lines_product {
  __typename: "EMWProduct";
  name: string;
}

export interface OrderTracking_emwOrder_emwOrderCheckoutid_lines_tracking {
  __typename: "EMWTracking";
  trackingNumber: string | null;
  service: string | null;
  packageStatus: string | null;
  pickupDate: string | null;
  deliveryDate: string | null;
  trackingUrl: string | null;
  error: string | null;
}

export interface OrderTracking_emwOrder_emwOrderCheckoutid_lines {
  __typename: "EMWCheckoutLine";
  product: OrderTracking_emwOrder_emwOrderCheckoutid_lines_product | null;
  tracking: OrderTracking_emwOrder_emwOrderCheckoutid_lines_tracking | null;
}

export interface OrderTracking_emwOrder_emwOrderCheckoutid {
  __typename: "EMWCheckout";
  shippingAddress: OrderTracking_emwOrder_emwOrderCheckoutid_shippingAddress | null;
  lines: (OrderTracking_emwOrder_emwOrderCheckoutid_lines | null)[] | null;
}

export interface OrderTracking_emwOrder {
  __typename: "EMWOrder";
  id: string;
  emwOrderCheckoutid: OrderTracking_emwOrder_emwOrderCheckoutid | null;
}

export interface OrderTracking {
  emwOrder: OrderTracking_emwOrder | null;
}

export interface OrderTrackingVariables {
  orderNum?: string | null;
  email?: string | null;
}
