/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { EMWQuoteCreateInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: QuoteMutation
// ====================================================

export interface QuoteMutation_emwQuoteCreate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface QuoteMutation_emwQuoteCreate_emwQuote {
  __typename: "EMWQuote";
  id: string;
  token: any;
}

export interface QuoteMutation_emwQuoteCreate {
  __typename: "EMWQuoteCreate";
  errors: QuoteMutation_emwQuoteCreate_errors[] | null;
  emwQuote: QuoteMutation_emwQuoteCreate_emwQuote | null;
}

export interface QuoteMutation {
  emwQuoteCreate: QuoteMutation_emwQuoteCreate | null;
}

export interface QuoteMutationVariables {
  input: EMWQuoteCreateInput;
}
