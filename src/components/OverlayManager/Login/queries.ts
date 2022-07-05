import gql from "graphql-tag";

import { TypedMutation } from "../../../core/mutations";
import {
  RegisterAccount,
  RegisterAccountVariables
} from "./types/RegisterAccount";
import { TypedQuery } from "../../../core/queries";

export const accountRegisterMutation = gql`
  mutation RegisterAccount($email: String!, $password: String!, $redirectUrl: String!, $firstName:String, $lastName:String, $organizationName:String, $phoneNumber:String, $isTaxExempt: Boolean!, $tier: Int!) {
    accountRegister(input: { email: $email, password: $password, redirectUrl: $redirectUrl, firstName: $firstName, lastName: $lastName, organizationName: $organizationName, phoneNumber: $phoneNumber, isTaxExempt: $isTaxExempt, tier: $tier }) {
      errors {
        field
        message
      }
      requiresConfirmation
    }
  }
`;

const verifyEmail = gql`
  mutation VerifyEmail($code: String, $email: String!) {
    verifyEmail(code: $code, email: $email) {
      errors {
        field
        message
      }
      token
    }
  }
`

const resendEmailVerificationCode = gql`
  mutation ResendEmailVerificationCode($redirectUrl: String!, $email: String!) {
    resendEmailVerificationCode(redirectUrl: $redirectUrl, email: $email) {
      errors {
        field
        message
      } 
    }
  }
`
const uploadUserDocuments = gql`
  mutation UploadUserDocuments($input: UserDocumentInput!) {
    uploadUserDocuments(input: $input) {
      errors {
        field
        message
      }
    }
  }
`
const taxExemptCertificateUpload = gql`
  mutation TaxExemptCertificateUpload($taxExemptCertificate: String!) {
    taxExemptCertificateUpload(taxExemptCertificate: $taxExemptCertificate) {
      errors {
        field
        message
      }
    }
  }
`
const documentUploadLater = gql`
  mutation DocumentUploadLater($uplaodLater: Boolean!) {
    documentUploadLater(uplaodLater: $uplaodLater) {
      errors {
        field
        message
      }
    }
  }
`
export const getEMWTiers = gql`
query EMWtiers($first: Int) {
  emwTierTypes(first: $first) {
    edges {
      node {
        emwTiertypeName
        emwTiertypeId
        emwTiertypeIsActive
        id
        emwTiertypeIsDefault
      }
    }
  }
}
`

const getDocumentTypeId = gql`
query TierDocumentTypes($tier: ID!, $first: Int) {
  tierDocumentTypes( first: $first, tier: $tier) {
    edges {
      node {
        id
        documentType
      }
    }
  }
}
`

export const TypedAccountRegisterMutation = TypedMutation<
  RegisterAccount,
  RegisterAccountVariables
>(accountRegisterMutation);

export const TypedVerifyEmailMutation = TypedMutation(verifyEmail)

export const TypedResendEmailMutation = TypedMutation(resendEmailVerificationCode)

export const TypedUploadUserDocuments = TypedMutation(uploadUserDocuments)

export const TypedTaxExemptCertificateUpload = TypedMutation(taxExemptCertificateUpload)

export const TypedDocumentUploadLater = TypedMutation(documentUploadLater)

export const TypedTierDocumentTypes = TypedQuery<number, any>(getDocumentTypeId);
