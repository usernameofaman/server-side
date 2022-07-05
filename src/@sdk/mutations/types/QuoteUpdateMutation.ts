/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: QuoteUpdateMutation
// ====================================================

export interface QuoteUpdateMutation_emwQuoteLinesAdd_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface QuoteUpdateMutation_emwQuoteLinesAdd_emwQuote {
  __typename: "EMWQuote";
  id: string;
  token: any;
}

export interface QuoteUpdateMutation_emwQuoteLinesAdd {
  __typename: "EMWQuoteLinesAdd";
  errors: QuoteUpdateMutation_emwQuoteLinesAdd_errors[] | null;
  emwQuote: QuoteUpdateMutation_emwQuoteLinesAdd_emwQuote | null;
}

export interface QuoteUpdateMutation {
  emwQuoteLinesAdd: QuoteUpdateMutation_emwQuoteLinesAdd | null;
}

export interface QuoteUpdateMutationVariables {
  quantity: number;
  productId: string;
  optionIds?: (string | null)[] | null;
  quoteId: string;
}
