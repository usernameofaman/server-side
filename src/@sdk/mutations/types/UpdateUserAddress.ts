/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserAddress
// ====================================================

export interface UpdateUserAddress_accountAddressUpdate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface UpdateUserAddress_accountAddressUpdate_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
}

export interface UpdateUserAddress_accountAddressUpdate {
  __typename: "AccountAddressUpdate";
  errors: UpdateUserAddress_accountAddressUpdate_errors[] | null;
  user: UpdateUserAddress_accountAddressUpdate_user | null;
}

export interface UpdateUserAddress {
  accountAddressUpdate: UpdateUserAddress_accountAddressUpdate | null;
}

export interface UpdateUserAddressVariables {
  input: AddressInput;
  id: string;
}
