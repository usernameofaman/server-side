/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { EMWAddressInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: emwAddressUpdate
// ====================================================

export interface emwAddressUpdate_emwAddressUpdate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface emwAddressUpdate_emwAddressUpdate_address_country {
  __typename: "CountryDisplay";
  country: string;
  code: string;
}

export interface emwAddressUpdate_emwAddressUpdate_address {
  __typename: "EMWAddress";
  id: string;
  firstName: string;
  lastName: string;
  streetAddress1: string;
  city: string;
  country: emwAddressUpdate_emwAddressUpdate_address_country;
  countryArea: string;
  postalCode: string;
}

export interface emwAddressUpdate_emwAddressUpdate {
  __typename: "EMWAddressUpdate";
  errors: emwAddressUpdate_emwAddressUpdate_errors[] | null;
  address: emwAddressUpdate_emwAddressUpdate_address | null;
  candidates: any | null;
}

export interface emwAddressUpdate {
  emwAddressUpdate: emwAddressUpdate_emwAddressUpdate | null;
}

export interface emwAddressUpdateVariables {
  id: string;
  input: EMWAddressInput;
}
