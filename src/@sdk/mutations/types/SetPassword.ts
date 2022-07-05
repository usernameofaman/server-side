/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: SetPassword
// ====================================================

export interface SetPassword_setPassword_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface SetPassword_setPassword_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
}

export interface SetPassword_setPassword_accountErrors {
  __typename: "AccountError";
  field: string | null;
  message: string | null;
  code: AccountErrorCode | null;
}

export interface SetPassword_setPassword {
  __typename: "SetPassword";
  errors: (SetPassword_setPassword_errors | null)[];
  token: string | null;
  user: SetPassword_setPassword_user | null;
  accountErrors: SetPassword_setPassword_accountErrors[] | null;
}

export interface SetPassword {
  setPassword: SetPassword_setPassword | null;
}

export interface SetPasswordVariables {
  token: string;
  email: string;
  password: string;
}
