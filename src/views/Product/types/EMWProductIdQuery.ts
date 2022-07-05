/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EMWProductIdQuery
// ====================================================

export interface EMWProductIdQuery_emwproductByProductId_aggregateSellPrice {
  __typename: "Money";
  amount: number;
}

export interface EMWProductIdQuery_emwproductByProductId {
  __typename: "EMWProduct";
  id: string;
  name: string;
  emwProdSesurl: string | null;
  aggregateSellPrice: EMWProductIdQuery_emwproductByProductId_aggregateSellPrice | null;
}

export interface EMWProductIdQuery {
  emwproductByProductId: EMWProductIdQuery_emwproductByProductId | null;
}

export interface EMWProductIdQueryVariables {
  emwProductId?: number | null;
}
