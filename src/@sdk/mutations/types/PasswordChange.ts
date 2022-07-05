/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PasswordChange
// ====================================================

export interface PasswordChange_passwordChange_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface PasswordChange_passwordChange {
  __typename: "PasswordChange";
  errors: PasswordChange_passwordChange_errors[] | null;
}

export interface PasswordChange {
  passwordChange: PasswordChange_passwordChange | null;
}

export interface PasswordChangeVariables {
  newPassword: string;
  oldPassword: string;
}
