import gql from "graphql-tag";
import { userFragment, emwUserFragment } from "../fragments/auth";

export const changeUserPassword = gql`
  mutation PasswordChange($newPassword: String!, $oldPassword: String!) {
    passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
      errors {
        field
        message
      }
    }
  }
`;

export const accountUpdate = gql`
  ${userFragment}
  mutation AccountUpdate($input: AccountInput!) {
    accountUpdate(input: $input) {
      errors {
        field
        message
      }
      user {
        ...User
      }
    }
  }
`;

export const setPassword = gql`
  ${emwUserFragment}
  mutation SetPassword($token: String!, $email: String!, $password: String!) {
    setPassword(token: $token, email: $email, password: $password) {
      errors {
        field
        message
      }
      token
      user {
        ...EMWUserDetail
      }
      accountErrors {
        field
        message
        code
      }
    }
  }
`;


export const customerUpdateMutation = gql`
  mutation customerUpdateMutation($id: ID!, $input: CustomerInput!) {
    customerUpdate(id: $id, input: $input) {
      errors {
        field
        message
      }
      user {
        id
      }
    }
  }
`;
export const EMWchangeUserTier = gql`
  mutation EMWchangeUserTierMutation($tiertype: Int!, $user: ID!) {
    changeUserTier(tiertype: $tiertype, user: $user) {
      user {
        id
      }
      errors {
        field
        message
      }
    }
  }
`;

export const usertaxExemptCertificateUpload = gql`
  mutation UserTaxExemptCertificateUpload($taxExemptCertificate: String!) {
    taxExemptCertificateUpload(taxExemptCertificate: $taxExemptCertificate) {
      errors {
        field
        message
      }
    }
  }
`;

export const emwuploadUserDocuments = gql`
  mutation EMWUploadUserDocuments($input: UserDocumentInput!) {
    uploadUserDocuments(input: $input) {
      errors {
        field
        message
      }
    }
  }
`;

export const taxExemptDetailsUpdate = gql`
  mutation taxExemptDetailsUpdate($input: TaxExemptDetailsInput!) {
    taxExemptDetailsUpdate(input: $input) {
      errors {
        field
        message
      }
    }
  }
`;

export const deleteCustomerDocuments = gql`
mutation deleteCustomerDocument($document: ID!, $user: ID! ){
  deleteCustomerDocument(document: $document 
    , user: $user){
    errors{
      message
    }
  }
}
`

export const deleteCustomerTaxExempt = gql`
mutation deleteCustomerTaxExempt($user: ID! ){
  taxExemptCertificateDelete(user:$user){
    errors{
      message
    }
  }
}
`