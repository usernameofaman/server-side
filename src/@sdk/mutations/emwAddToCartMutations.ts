import gql from "graphql-tag";
import { emwCheckoutFragment } from '../queries/emwAddToCartQueries';

export const fragmentCheckoutDetail = gql`
  fragment CheckoutDetailed on  EMWCheckoutCreate {
    emwCheckout {
      id
      token
      lines {
        id
        quantity
        productOptions{
          id
          productOption{
            id
            emwOptName
            emwOptPrice{
              currency
              amount
            }
            emwOptStocknumber
            emwOptOptgrpid{
              id
             emwOptgrpName 
            }
          }
        }
        product {
          name
          emwProdImageUrl
          emwProdVendorPartnumber
          emwProdIsDynamicPricing
          emwProdCatid{
            id
            name
          }
          emwProdIsFreeship
          emwProdIsFreight
          minimumQuantity
          mapPrice{
            amount
            currency
          }
          sellPrice(quantity: $quantity){
            currency
            amount
          }
          aggregateMapPrice {
            amount
          }
          aggregateSellPrice(quantity: $quantity){
            amount
          }
          emwProdImages(first: 20){
              edges{
                node{
                  emwImageUrlPrfix
                  emwImageName
                }
              }
            }
          }
          product {
            id
            name
          }
          unitPrice{
            currency
            amount
          }
      }
      emwTotalPrice{
        totalItemPrice{
          amount
          currency
        }
        totalShippingPrice{
          currency
          amount
        }
        totalTaxPrice{
          currency
          amount
        }
        grossTotalPrice{
          currency
          amount
        }
      }
    }
  }
`;

export const fragmentCheckoutUpdateDetail = gql`
  fragment CheckoutUpdateDetailed on  EMWCheckoutLinesAdd {
    emwCheckout {
      id
      token
      lines {
        id
        quantity
        productOptions{
          id
          productOption{
            id
            emwOptName
            emwOptPrice{
              currency
              amount
            }
            emwOptStocknumber
            emwOptOptgrpid{
              id
             emwOptgrpName 
            }
          }
        }
        product {
          name
          emwProdImageUrl
          emwProdVendorPartnumber
          emwProdIsDynamicPricing
          emwProdIsFreeship
          emwProdIsFreight
          weight{
            unit
            value
          }
          emwProdHeight{
            unit
            value
          }
          emwProdWidth{
            unit
            value
          }
          emwProdLength{
            unit
            value
          }
          category{
            name
          }
          emwProdSesurl
          emwProdCatid{
            id
            name
          }
          minimumQuantity
          mapPrice{
            amount
            currency
          }
          sellPrice(quantity: $quantity){
            currency
            amount
          }
          aggregateMapPrice {
            amount
          }
          aggregateSellPrice(quantity: $quantity){
            amount
          }
          emwProdImages(first: 20){
              edges{
                node{
                  emwImageUrlPrfix
                  emwImageName
                }
              }
            }
          }
          product {
            id
            name
          }
          unitPrice{
            currency
            amount
          }
      }
      emwTotalPrice(
        bypassTax : $bypassTax
        bypassShipping : $bypassShipping
        ){
        totalItemPrice{
          amount
          currency
        }
        totalShippingPrice{
          currency
          amount
        }
        totalTaxPrice{
          currency
          amount
        }
        grossTotalPrice{
          currency
          amount
        }
      }
    }
  }
`;

export const checkoutCreateMutation = gql`
${fragmentCheckoutDetail}
mutation CheckoutMutation($quantity: Int!, $prodId: ID!, $optionsId: [ID]) {
  emwCheckoutCreate(
    input: {
      email: "test@example.com"
      lines: [
        {
          quantity: $quantity
          productId: $prodId
          optionIds: $optionsId
        }
      ]
    }
  ) {
    errors {
      field
      message
    }
    ...CheckoutDetailed
  }
}`;


export const checkoutUpdateMutation = gql`
${fragmentCheckoutUpdateDetail}
mutation CheckoutUpdateMutation(
$checkOutId: ID!
$quantity: Int!
$prodId: ID!
$optionsId: [ID]
$bypassTax : Boolean
$bypassShipping : Boolean
){
  emwCheckoutLinesAdd(
    checkoutId: $checkOutId
    lines: [
      {
        quantity: $quantity
        productId: $prodId
        optionIds: $optionsId
      }
    ]
  ) {
    errors {
      field
      message
    }
    ...CheckoutUpdateDetailed
  }
}

`;

export const checkoutDeleteMutation = gql`
mutation CheckoutDeleteMutation(
$checkOutId: ID!
$lineId: ID
){
  emwChecoutLineDelete(
    checkoutId: $checkOutId
    lineId: $lineId
  ){
    errors{
      field
      message
    }
    emwCheckout {
      id
      token
      emwTotalPrice{
        totalItemPrice{
          amount
          currency
        }
        totalShippingPrice{
          currency
          amount
        }
        totalTaxPrice{
          currency
          amount
        }
        grossTotalPrice{
          currency
          amount
        }
      }
      lines {
        id
        quantity
        productOptions{
          id
          productOption{
            id
            emwOptName
            emwOptPrice{
              currency
              amount
            }
            emwOptStocknumber
            emwOptOptgrpid{
              id
             emwOptgrpName 
            }
          }
        }
        product {
          name
          emwProdImageUrl
          emwProdVendorPartnumber
          emwProdIsDynamicPricing
          emwProdCatid{
            id
            name
          }
          emwProdIsFreeship
          emwProdIsFreight
          minimumQuantity
          mapPrice{
            amount
            currency
          }
          sellPrice{
            currency
            amount
          }
          aggregateMapPrice {
            amount
          }
          aggregateSellPrice{
            amount
          }
          emwProdImages(first: 20){
              edges{
                node{
                  emwImageUrlPrfix
                  emwImageName
                }
              }
            }
          }
          product {
            id
            name
          }
          unitPrice{
            currency
            amount
          }
      }
    }
  }
  
}

`;

export const getSupplementalDetails = gql`
${emwCheckoutFragment}
mutation getSupplementalDetails(
  $ordernum: String!
  $token: String!
){
	emwPayByLink(
		orderNumber: $ordernum,
		token: $token,
	) {
		errors {
      field
			message
    }
    parentOrder{
      emwOrderId
      totalPrice{
        amount
      }
    }
		emwCheckout {
      id
      orderNumber
      totalDue{
        amount
      }
      totalPaidinAmount
      ...EmwCheckoutFragment
		}
	}
}`;
