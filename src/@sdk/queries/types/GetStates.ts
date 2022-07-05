/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetStates
// ====================================================

export interface GetStates_states {
  __typename: "EMWState";
  code: string | null;
  name: string | null;
}

export interface GetStates {
  states: (GetStates_states | null)[] | null;
}
