/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressTypeEnum } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: SetCustomerDefaultAddress
// ====================================================

export interface SetCustomerDefaultAddress_accountSetDefaultAddress_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface SetCustomerDefaultAddress_accountSetDefaultAddress_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
}

export interface SetCustomerDefaultAddress_accountSetDefaultAddress {
  __typename: "AccountSetDefaultAddress";
  errors: SetCustomerDefaultAddress_accountSetDefaultAddress_errors[] | null;
  user: SetCustomerDefaultAddress_accountSetDefaultAddress_user | null;
}

export interface SetCustomerDefaultAddress {
  accountSetDefaultAddress: SetCustomerDefaultAddress_accountSetDefaultAddress | null;
}

export interface SetCustomerDefaultAddressVariables {
  id: string;
  type: AddressTypeEnum;
}
