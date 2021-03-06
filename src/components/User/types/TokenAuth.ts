/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TokenAuth
// ====================================================

export interface TokenAuth_tokenCreate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface TokenAuth_tokenCreate_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
}

export interface TokenAuth_tokenCreate {
  __typename: "CreateToken";
  token: string | null;
  errors: (TokenAuth_tokenCreate_errors | null)[];
  user: TokenAuth_tokenCreate_user | null;
}

export interface TokenAuth {
  tokenCreate: TokenAuth_tokenCreate | null;
}

export interface TokenAuthVariables {
  email: string;
  password: string;
}
