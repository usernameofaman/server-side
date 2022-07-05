/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword_requestPasswordReset_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface ResetPassword_requestPasswordReset {
  __typename: "RequestPasswordReset";
  errors: ResetPassword_requestPasswordReset_errors[] | null;
}

export interface ResetPassword {
  requestPasswordReset: ResetPassword_requestPasswordReset | null;
}

export interface ResetPasswordVariables {
  email: string;
  redirectUrl: string;
}
