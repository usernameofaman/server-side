/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSellPriceQuery
// ====================================================

export interface GetSellPriceQuery_emwproduct_aggregateSellPrice {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface GetSellPriceQuery_emwproduct {
  __typename: "EMWProduct";
  id: string;
  aggregateSellPrice: GetSellPriceQuery_emwproduct_aggregateSellPrice | null;
}

export interface GetSellPriceQuery {
  emwproduct: GetSellPriceQuery_emwproduct | null;
}

export interface GetSellPriceQueryVariables {
  id: string;
  quantity?: number | null;
}
