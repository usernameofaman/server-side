/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUserAddress
// ====================================================

export interface CreateUserAddress_accountAddressCreate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface CreateUserAddress_accountAddressCreate_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
}

export interface CreateUserAddress_accountAddressCreate {
  __typename: "AccountAddressCreate";
  errors: CreateUserAddress_accountAddressCreate_errors[] | null;
  user: CreateUserAddress_accountAddressCreate_user | null;
}

export interface CreateUserAddress {
  accountAddressCreate: CreateUserAddress_accountAddressCreate | null;
}

export interface CreateUserAddressVariables {
  input: AddressInput;
}
