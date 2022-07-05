/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { EMWQuoteShippingType } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: emwQuote
// ====================================================

export interface emwQuote_emwQuote_lines_product_emwProdVendorid {
  __typename: "EMWVendor";
  id: string;
  emwVendorName: string | null;
}

export interface emwQuote_emwQuote_lines_product {
  __typename: "EMWProduct";
  id: string;
  name: string;
  emwProdStockPartnumber: string | null;
  emwProdVendorPartnumber: string | null;
  emwProdVendorid: emwQuote_emwQuote_lines_product_emwProdVendorid | null;
}

export interface emwQuote_emwQuote_lines {
  __typename: "EMWQuoteLine";
  id: string;
  quantity: number;
  product: emwQuote_emwQuote_lines_product | null;
}

export interface emwQuote_emwQuote_shippingAddress {
  __typename: "EMWAddress";
  streetAddress1: string;
  postalCode: string;
}

export interface emwQuote_emwQuote_files {
  __typename: "EMWQuoteFile";
  id: string;
  title: string | null;
  fileurl: string | null;
  uploadedBy: string | null;
  uploadedOn: any | null;
}

export interface emwQuote_emwQuote_lifetimeValue {
  __typename: "Money";
  amount: number;
}

export interface emwQuote_emwQuote_quoteOwnerMerch {
  __typename: "EMWUser";
  id: string;
  firstName: string;
  lastName: string;
}

export interface emwQuote_emwQuote {
  __typename: "EMWQuote";
  id: string;
  token: any;
  orderNumber: string | null;
  note: string;
  lines: (emwQuote_emwQuote_lines | null)[] | null;
  shippingType: EMWQuoteShippingType | null;
  shippingAddress: emwQuote_emwQuote_shippingAddress | null;
  files: (emwQuote_emwQuote_files | null)[] | null;
  lifetimeValue: emwQuote_emwQuote_lifetimeValue | null;
  submittedOn: any | null;
  expiresOn: any | null;
  userDetails: string | null;
  quoteOwnerMerch: emwQuote_emwQuote_quoteOwnerMerch | null;
  quoteStatus: string | null;
}

export interface emwQuote {
  emwQuote: emwQuote_emwQuote | null;
}

export interface emwQuoteVariables {
  tokenId?: any | null;
}
