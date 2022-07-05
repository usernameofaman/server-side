/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: emwQuotefileDeleteMutation
// ====================================================

export interface emwQuotefileDeleteMutation_emwQuotefileDelete_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface emwQuotefileDeleteMutation_emwQuotefileDelete_eMWQuoteFile {
  __typename: "EMWQuoteFile";
  id: string;
}

export interface emwQuotefileDeleteMutation_emwQuotefileDelete {
  __typename: "EMWQuoteFileDelete";
  errors: emwQuotefileDeleteMutation_emwQuotefileDelete_errors[] | null;
  eMWQuoteFile: emwQuotefileDeleteMutation_emwQuotefileDelete_eMWQuoteFile | null;
}

export interface emwQuotefileDeleteMutation {
  emwQuotefileDelete: emwQuotefileDeleteMutation_emwQuotefileDelete | null;
}

export interface emwQuotefileDeleteMutationVariables {
  id: string;
}
