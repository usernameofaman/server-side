/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CountryCode } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AddBillingAddress
// ====================================================

export interface AddBillingAddress_emwAddressCreate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface AddBillingAddress_emwAddressCreate_address {
  __typename: "EMWAddress";
  id: string;
  firstName: string;
  lastName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  countryArea: string;
}

export interface AddBillingAddress_emwAddressCreate {
  __typename: "EMWAddressCreate";
  errors: AddBillingAddress_emwAddressCreate_errors[] | null;
  address: AddBillingAddress_emwAddressCreate_address | null;
}

export interface AddBillingAddress {
  emwAddressCreate: AddBillingAddress_emwAddressCreate | null;
}

export interface AddBillingAddressVariables {
  streetAddress1?: string | null;
  streetAddress2?: string | null;
  city?: string | null;
  countryArea?: string | null;
  postalCode?: string | null;
  isBilling?: boolean | null;
  country?: CountryCode | null;
  useUnverified?: boolean | null;
  firstName?: string | null;
  lastName?: string | null;
}
