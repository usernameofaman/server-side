/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: emwQuoteSubmitMutation
// ====================================================

export interface emwQuoteSubmitMutation_emwQuoteSubmit_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface emwQuoteSubmitMutation_emwQuoteSubmit_quote {
  __typename: "EMWQuote";
  id: string;
}

export interface emwQuoteSubmitMutation_emwQuoteSubmit {
  __typename: "EMWQuoteSubmit";
  errors: emwQuoteSubmitMutation_emwQuoteSubmit_errors[] | null;
  quote: emwQuoteSubmitMutation_emwQuoteSubmit_quote | null;
}

export interface emwQuoteSubmitMutation {
  emwQuoteSubmit: emwQuoteSubmitMutation_emwQuoteSubmit | null;
}

export interface emwQuoteSubmitMutationVariables {
  id: string;
}
