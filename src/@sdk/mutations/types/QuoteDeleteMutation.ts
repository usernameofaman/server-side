/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: QuoteDeleteMutation
// ====================================================

export interface QuoteDeleteMutation_emwQuoteLineDelete_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface QuoteDeleteMutation_emwQuoteLineDelete_emwQuote {
  __typename: "EMWQuote";
  id: string;
  token: any;
}

export interface QuoteDeleteMutation_emwQuoteLineDelete {
  __typename: "EMWQuoteLineDelete";
  errors: QuoteDeleteMutation_emwQuoteLineDelete_errors[] | null;
  emwQuote: QuoteDeleteMutation_emwQuoteLineDelete_emwQuote | null;
}

export interface QuoteDeleteMutation {
  emwQuoteLineDelete: QuoteDeleteMutation_emwQuoteLineDelete | null;
}

export interface QuoteDeleteMutationVariables {
  quoteId: string;
  lineId?: string | null;
}
