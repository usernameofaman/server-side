/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { EMWQuoteUpdateInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: emwQuoteUpdateMutation
// ====================================================

export interface emwQuoteUpdateMutation_emwQuoteUpdate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface emwQuoteUpdateMutation_emwQuoteUpdate_quote {
  __typename: "EMWQuote";
  id: string;
}

export interface emwQuoteUpdateMutation_emwQuoteUpdate {
  __typename: "EMWQuoteUpdate";
  errors: emwQuoteUpdateMutation_emwQuoteUpdate_errors[] | null;
  quote: emwQuoteUpdateMutation_emwQuoteUpdate_quote | null;
}

export interface emwQuoteUpdateMutation {
  emwQuoteUpdate: emwQuoteUpdateMutation_emwQuoteUpdate | null;
}

export interface emwQuoteUpdateMutationVariables {
  id: string;
  input: EMWQuoteUpdateInput;
}
