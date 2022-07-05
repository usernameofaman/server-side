/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getShippingAddress
// ====================================================

export interface getShippingAddress_emwAddresses_edges_node_country {
  __typename: "CountryDisplay";
  country: string;
  code: string;
}

export interface getShippingAddress_emwAddresses_edges_node {
  __typename: "EMWAddress";
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  companyName: string;
  countryArea: string;
  postalCode: string;
  country: getShippingAddress_emwAddresses_edges_node_country;
}

export interface getShippingAddress_emwAddresses_edges {
  __typename: "EMWAddressCountableEdge";
  node: getShippingAddress_emwAddresses_edges_node;
}

export interface getShippingAddress_emwAddresses {
  __typename: "EMWAddressCountableConnection";
  edges: getShippingAddress_emwAddresses_edges[];
}

export interface getShippingAddress {
  emwAddresses: getShippingAddress_emwAddresses | null;
}
