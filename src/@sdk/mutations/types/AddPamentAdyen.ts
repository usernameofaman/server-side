/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddPamentAdyen
// ====================================================

export interface AddPamentAdyen_emwCheckoutAddPayment_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface AddPamentAdyen_emwCheckoutAddPayment {
  __typename: "EMWAddPaymentForCheckout";
  errors: AddPamentAdyen_emwCheckoutAddPayment_errors[] | null;
  result: string | null;
}

export interface AddPamentAdyen {
  emwCheckoutAddPayment: AddPamentAdyen_emwCheckoutAddPayment | null;
}

export interface AddPamentAdyenVariables {
  paymentType: string;
  encryptedCardnumber: string;
  encryptedExpirymonth: string;
  encryptedExpiryyear: string;
  encryptedSecuritycode: string;
  holderName: string;
  checkoutId: string;
  storefrontBaseUrl?: string | null;
}
