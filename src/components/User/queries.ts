import gql from "graphql-tag";

import { checkoutAddressFragment } from "../../checkout/queries";
import { TypedMutation } from "../../core/mutations";
import { TokenAuth, TokenAuthVariables } from "./types/TokenAuth";

export const userFragment = gql`
  fragment UserInfo on User {
    id
    email
    firstName
    lastName
    isStaff
    canImpersonate
  }
`;

export const tokenAuthMutation = gql`
  ${userFragment}
  mutation TokenAuth($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      errors {
        field
        message
      }
      user {
        ...UserInfo
      }
    }
  }
`;

export const tokenVeryficationMutation = gql`
  ${userFragment}
  mutation VerifyToken($token: String!) {
    tokenVerify(token: $token) {
      payload
      user {
        ...UserInfo
      }
    }
  }
`;

export const TypedTokenAuthMutation = TypedMutation<
  TokenAuth,
  TokenAuthVariables
>(tokenAuthMutation);
