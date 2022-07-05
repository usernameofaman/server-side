/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { EMWQuoteFileCreateInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: emwQuotefileCreateMutation
// ====================================================

export interface emwQuotefileCreateMutation_emwQuotefileCreate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface emwQuotefileCreateMutation_emwQuotefileCreate_eMWQuoteFile {
  __typename: "EMWQuoteFile";
  id: string;
}

export interface emwQuotefileCreateMutation_emwQuotefileCreate {
  __typename: "EMWQuoteFileCreate";
  errors: emwQuotefileCreateMutation_emwQuotefileCreate_errors[] | null;
  eMWQuoteFile: emwQuotefileCreateMutation_emwQuotefileCreate_eMWQuoteFile | null;
}

export interface emwQuotefileCreateMutation {
  emwQuotefileCreate: emwQuotefileCreateMutation_emwQuotefileCreate | null;
}

export interface emwQuotefileCreateMutationVariables {
  quote: string;
  input: EMWQuoteFileCreateInput;
}
