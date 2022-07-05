/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteUserAddress
// ====================================================

export interface DeleteUserAddress_accountAddressDelete_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface DeleteUserAddress_accountAddressDelete_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
}

export interface DeleteUserAddress_accountAddressDelete {
  __typename: "AccountAddressDelete";
  errors: DeleteUserAddress_accountAddressDelete_errors[] | null;
  user: DeleteUserAddress_accountAddressDelete_user | null;
}

export interface DeleteUserAddress {
  accountAddressDelete: DeleteUserAddress_accountAddressDelete | null;
}

export interface DeleteUserAddressVariables {
  addressId: string;
}
