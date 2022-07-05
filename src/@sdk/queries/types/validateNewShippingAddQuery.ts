/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { EMWAddressInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: validateNewShippingAddQuery
// ====================================================

export interface validateNewShippingAddQuery_validateAddressWithUps {
  __typename: "EMWAddressValidation";
  valid: boolean | null;
  candidates: any | null;
  error: string | null;
}

export interface validateNewShippingAddQuery {
  validateAddressWithUps: validateNewShippingAddQuery_validateAddressWithUps | null;
}

export interface validateNewShippingAddQueryVariables {
  address: EMWAddressInput;
  checkoutId?: string | null;
}
