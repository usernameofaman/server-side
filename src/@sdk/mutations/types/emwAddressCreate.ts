/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { EMWAddressInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: emwAddressCreate
// ====================================================

export interface emwAddressCreate_emwAddressCreate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface emwAddressCreate_emwAddressCreate_address_country {
  __typename: "CountryDisplay";
  country: string;
  code: string;
}

export interface emwAddressCreate_emwAddressCreate_address {
  __typename: "EMWAddress";
  id: string;
  streetAddress1: string;
  city: string;
  country: emwAddressCreate_emwAddressCreate_address_country;
  countryArea: string;
  postalCode: string;
}

export interface emwAddressCreate_emwAddressCreate {
  __typename: "EMWAddressCreate";
  errors: emwAddressCreate_emwAddressCreate_errors[] | null;
  address: emwAddressCreate_emwAddressCreate_address | null;
  candidates: any | null;
}

export interface emwAddressCreate {
  emwAddressCreate: emwAddressCreate_emwAddressCreate | null;
}

export interface emwAddressCreateVariables {
  input: EMWAddressInput;
}
