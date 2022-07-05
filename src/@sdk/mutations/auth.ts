import gql from "graphql-tag";

import { userFragment, emwLoginCartFragment, emwUserFragment } from "../fragments/auth";

// export const tokenAuthMutation = gql`
//   ${userFragment}
//   mutation TokenAuth($email: String!, $password: String!) {
//     tokenCreate(email: $email, password: $password) {
//       token
//       errors {
//         field
//         message
//       }
//       user {
//         ...User
//       }
//     }
//   }
// `;

export const tokenAuthMutation = gql`
  ${emwUserFragment}
  ${emwLoginCartFragment}
  mutation TokenAuth($email: String!, $password: String!, $lines:  [EMWCheckoutLineInput]) {
    emwTokenCreate(email: $email, password: $password, lines: $lines) {
      token
      errors {
        field
        message
      }
      user {
        ...EMWUserDetail
        emwCheckout{
          ...emwLoginCartData
        }
        
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
        ...User
      }
    }
  }
`;
