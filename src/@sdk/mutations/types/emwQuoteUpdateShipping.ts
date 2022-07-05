/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { EMWQuoteUpdateShippingInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: emwQuoteUpdateShipping
// ====================================================

export interface emwQuoteUpdateShipping_emwQuoteUpdateShipping_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface emwQuoteUpdateShipping_emwQuoteUpdateShipping_emwQuote_shippingAddress {
  __typename: "EMWAddress";
  id: string;
}

export interface emwQuoteUpdateShipping_emwQuoteUpdateShipping_emwQuote {
  __typename: "EMWQuote";
  id: string;
  shippingAddress: emwQuoteUpdateShipping_emwQuoteUpdateShipping_emwQuote_shippingAddress | null;
}

export interface emwQuoteUpdateShipping_emwQuoteUpdateShipping {
  __typename: "EMWQuoteUpdateShipping";
  errors: emwQuoteUpdateShipping_emwQuoteUpdateShipping_errors[] | null;
  emwQuote: emwQuoteUpdateShipping_emwQuoteUpdateShipping_emwQuote | null;
}

export interface emwQuoteUpdateShipping {
  emwQuoteUpdateShipping: emwQuoteUpdateShipping_emwQuoteUpdateShipping | null;
}

export interface emwQuoteUpdateShippingVariables {
  quoteId: string;
  manualShipping?: boolean | null;
  shipping: EMWQuoteUpdateShippingInput;
}
