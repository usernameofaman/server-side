/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { EMWCheckoutUpdateShippingInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: emwCheckoutUpdateShipping
// ====================================================

export interface emwCheckoutUpdateShipping_emwCheckoutUpdateShipping_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface emwCheckoutUpdateShipping_emwCheckoutUpdateShipping_emwCheckout_shippingAddress {
  __typename: "EMWAddress";
  id: string;
}

export interface emwCheckoutUpdateShipping_emwCheckoutUpdateShipping_emwCheckout {
  __typename: "EMWCheckout";
  id: string;
  shippingAddress: emwCheckoutUpdateShipping_emwCheckoutUpdateShipping_emwCheckout_shippingAddress | null;
}

export interface emwCheckoutUpdateShipping_emwCheckoutUpdateShipping {
  __typename: "EMWCheckoutUpdateShipping";
  errors: emwCheckoutUpdateShipping_emwCheckoutUpdateShipping_errors[] | null;
  emwCheckout: emwCheckoutUpdateShipping_emwCheckoutUpdateShipping_emwCheckout | null;
}

export interface emwCheckoutUpdateShipping {
  emwCheckoutUpdateShipping: emwCheckoutUpdateShipping_emwCheckoutUpdateShipping | null;
}

export interface emwCheckoutUpdateShippingVariables {
  checkoutId: string;
  manualShipping?: boolean | null;
  shipping: EMWCheckoutUpdateShippingInput;
}
