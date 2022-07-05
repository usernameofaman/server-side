import gql from "graphql-tag";


// export const fragmentQuoteDetail = gql`
//   fragment QuoteDetailed on  EMWQuote {
//       emwQuotes {
//             id
//             token
//             orderNumber
//             note
//             lines {
//               id
//               quantity
//             }
//             shippingType
//             shippingAddress {
//               streetAddress1
//               postalCode
//             }
//             files {
//               id
//               title
//               fileurl
//               uploadedBy
//               uploadedOn
//             }
//             lifetimeValue {
//               amount
//             }
//             submittedOn
//             expiresOn
//             userDetails
//             quoteOwnerMerch {
//               id
//               firstName
//               lastName
//             }
//             files {
//               id
//               title
//               fileurl
//               uploadedBy
//             }
//             quoteStatus
//           }    
//   }
// `;

export const quoteCreateMutation = gql`
mutation QuoteMutation($input: EMWQuoteCreateInput!) {
  emwQuoteCreate(
    input: $input
  ) {
    errors {
      field
      message
    }
    emwQuote{
      id
      token
    }
  }
}`;

export const QuoteUpdateMutation = gql`
mutation QuoteUpdateLineMutation(
$quantity: Int!
$productId: ID!
$optionIds:[ID]
$quoteId: ID!
){
  emwQuoteLinesAdd(
    quoteId: $quoteId
    lines: [
      {
        quantity: $quantity
        productId: $productId
        optionIds: $optionIds
      }
    ]
  ) {
    errors {
      field
      message
    }
    emwQuote{
      id 
      token
    }
  }
}

`;


export const quoteDeleteMutation = gql`
mutation QuoteDeleteMutation( 
$quoteId: ID!
$lineId: ID
){
  emwQuoteLineDelete(
    quoteId: $quoteId
    lineId: $lineId
  ){
    errors{
      field
      message
    }
    emwQuote {
      id
      token
      }
  }
  
}

`;


export const quoteCommentUpdateMutation = gql`
mutation emwQuoteUpdateMutation(
$id: ID!
$input: EMWQuoteUpdateInput!
){
  emwQuoteUpdate(
    id:$id,
    input:$input
  )  
   {
    errors {
      field
      message
    }
    quote{
      id
    }
  }
}

`;

export const quoteFileCreateMutation = gql`
mutation emwQuotefileCreateMutation(
$quote: ID!
$input: EMWQuoteFileCreateInput!
){
  emwQuotefileCreate(
    quote:$quote,
    input:$input
  )  
   {
    errors {
      field
      message
    }
    eMWQuoteFile{
      id
    }
  }
}

`;


export const quoteFileDeleteMutation = gql`
mutation emwQuotefileDeleteMutation(
$id: ID!
){
  emwQuotefileDelete(
    id:$id
  )  
   {
    errors {
      field
      message
    }
    eMWQuoteFile{
      id
    }
  }
}

`;

export const quoteSubmitMutation = gql`
mutation emwQuoteSubmitMutation(
$id: ID!
){
  emwQuoteSubmit(
    id:$id
  )  
   {
    errors {
      field
      message
    }
    quote{
      id
    }
  }
}

`;


export const emwQuoteUpdateShippingMutation = gql`
  mutation emwQuoteUpdateShipping($quoteId: ID!, $manualShipping: Boolean, $shipping:EMWQuoteUpdateShippingInput!) {
    emwQuoteUpdateShipping(quoteId: $quoteId, manualShipping: $manualShipping, shipping:$shipping) {
      errors {
        field
        message
      }
      emwQuote {
        id
        shippingAddress{
          id
        }
      }
    }
  }
`;


export const UpdateQuoteBillingAddressMutation=gql`
mutation UpdateQuoteBillingAddress(
  $quoteId: ID!,
  $newAddress: Boolean!,
  $billingAddressId: ID,
  $streetAddress1: String,
  $streetAddress2: String,
  $city: String,
  $countryArea: String,
  $postalCode: String,
  $country: CountryCode,
  $useUnverified: Boolean,
  $isBillingAddress: Boolean,
  $firstName: String
  $lastName: String
){
  emwQuoteUpdateBilling(
    quoteId: $quoteId,
    billing: {
    newAddress: $newAddress
    billingAddress:{
      firstName: $firstName
      lastName: $lastName
      streetAddress1: $streetAddress1
      streetAddress2: $streetAddress2
      city: $city
      countryArea: $countryArea
      postalCode:  $postalCode
      country: $country
      useUnverified: $useUnverified
      isBillingAddress: $isBillingAddress
    }
    billingAddressId: $billingAddressId
  }){
    errors{
      field
      message
    }
    emwQuote{
      billingAddress{
        id
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        postalCode
        country{
          code
          country
        }
        countryArea
      }
    }
  }
}`;