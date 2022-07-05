/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CountryCode } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateBillingAddress
// ====================================================

export interface UpdateBillingAddress_emwCheckoutUpdateBilling_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface UpdateBillingAddress_emwCheckoutUpdateBilling_emwCheckout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface UpdateBillingAddress_emwCheckoutUpdateBilling_emwCheckout_billingAddress {
  __typename: "EMWAddress";
  id: string;
  firstName: string;
  lastName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: UpdateBillingAddress_emwCheckoutUpdateBilling_emwCheckout_billingAddress_country;
  countryArea: string;
}

export interface UpdateBillingAddress_emwCheckoutUpdateBilling_emwCheckout {
  __typename: "EMWCheckout";
  billingAddress: UpdateBillingAddress_emwCheckoutUpdateBilling_emwCheckout_billingAddress | null;
}

export interface UpdateBillingAddress_emwCheckoutUpdateBilling {
  __typename: "EMWCheckoutUpdateBilling";
  errors: UpdateBillingAddress_emwCheckoutUpdateBilling_errors[] | null;
  emwCheckout: UpdateBillingAddress_emwCheckoutUpdateBilling_emwCheckout | null;
}

export interface UpdateBillingAddress {
  emwCheckoutUpdateBilling: UpdateBillingAddress_emwCheckoutUpdateBilling | null;
}

export interface UpdateBillingAddressVariables {
  checkoutId: string;
  newAddress: boolean;
  billingAddressId?: string | null;
  streetAddress1?: string | null;
  streetAddress2?: string | null;
  city?: string | null;
  countryArea?: string | null;
  postalCode?: string | null;
  country?: CountryCode | null;
  useUnverified?: boolean | null;
  isBillingAddress?: boolean | null;
  firstName?: string | null;
  lastName?: string | null;
}
