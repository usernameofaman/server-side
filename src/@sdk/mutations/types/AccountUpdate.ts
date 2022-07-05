/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AccountInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AccountUpdate
// ====================================================

export interface AccountUpdate_accountUpdate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface AccountUpdate_accountUpdate_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
}

export interface AccountUpdate_accountUpdate {
  __typename: "AccountUpdate";
  errors: AccountUpdate_accountUpdate_errors[] | null;
  user: AccountUpdate_accountUpdate_user | null;
}

export interface AccountUpdate {
  accountUpdate: AccountUpdate_accountUpdate | null;
}

export interface AccountUpdateVariables {
  input: AccountInput;
}
