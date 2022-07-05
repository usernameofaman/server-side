/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getBillingAddress
// ====================================================

export interface getBillingAddress_emwAddresses_edges_node_country {
    __typename: "CountryDisplay";
    country: string;
    code: string;
    }
    
    export interface getBillingAddress_emwAddresses_edges_node {
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
    country: getBillingAddress_emwAddresses_edges_node_country;
    }
    
    export interface getBillingAddress_emwAddresses_edges {
    __typename: "EMWAddressCountableEdge";
    node: getBillingAddress_emwAddresses_edges_node;
    }
    
    export interface getBillingAddress_emwAddresses {
    __typename: "EMWAddressCountableConnection";
    edges: getBillingAddress_emwAddresses_edges[];
    }
    
    export interface getBillingAddress {
    emwAddresses: getBillingAddress_emwAddresses | null;
    }