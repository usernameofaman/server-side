import gql from "graphql-tag";

export const CreateOfflinePaymentMutation=gql`
mutation CreateOfflinePayment(
    $checkoutId: ID!
    $paymentMode: String!
    $customerPurchaseOrderNumber: String
    $customerNote: String
    $onBehalfEmail: String
    $bypassTax : Boolean
){
    emwOfflinePaymentCheckout(input:{
      checkoutId: $checkoutId,
      paymentMode: $paymentMode,
      customerPurchaseOrderNumber: $customerPurchaseOrderNumber,
      customerNote: $customerNote
      onBehalfEmail: $onBehalfEmail
      bypassTax : $bypassTax
    }){
      errors{
        field
        message
      }
      result
    }
}`;