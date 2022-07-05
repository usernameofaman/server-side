import gql from "graphql-tag";

export const addPaymentAdyen=gql`
mutation AddPamentAdyen(
  $paymentType: String!
  $encryptedCardnumber: String!
  $encryptedExpirymonth: String!
  $encryptedExpiryyear: String!
  $encryptedSecuritycode: String!
  $holderName: String!
  $checkoutId: ID!
  $storefrontBaseUrl: String
  $customerNote: String
  $customerPurchaseOrderNumber: String
  $onBehalfEmail : String
  $bypassTax : Boolean
  ){
  emwCheckoutAddPayment(
    input:{
      paymentType: $paymentType
      encryptedCardnumber: $encryptedCardnumber
      encryptedExpirymonth: $encryptedExpirymonth
      encryptedExpiryyear: $encryptedExpiryyear
      encryptedSecuritycode: $encryptedSecuritycode
      holderName: $holderName
      checkoutId: $checkoutId
      storefrontBaseUrl: $storefrontBaseUrl
      customerNote: $customerNote
      customerPurchaseOrderNumber: $customerPurchaseOrderNumber
      onBehalfEmail: $onBehalfEmail
      bypassTax: $bypassTax
    }
  ){
    errors{
      field
      message
    }
    result
  }
}`;