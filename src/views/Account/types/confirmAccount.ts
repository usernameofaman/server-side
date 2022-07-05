/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: confirmAccount
// ====================================================

export interface confirmAccount_confirmAccount_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface confirmAccount_confirmAccount {
  __typename: "ConfirmAccount";
  errors: confirmAccount_confirmAccount_errors[] | null;
}

export interface confirmAccount {
  confirmAccount: confirmAccount_confirmAccount | null;
}

export interface confirmAccountVariables {
  email: string;
  token: string;
}
