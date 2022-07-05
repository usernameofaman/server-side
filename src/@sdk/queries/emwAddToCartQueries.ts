import gql from "graphql-tag";

export const emwCheckoutFragment = gql`
  fragment EmwCheckoutFragment on EMWCheckout {
    token
      note
      orderNumber
      user{
        id
        email
      }
      email
      shipping{
        name
        code
        price{
          currency
          amount
        }
        residentialSurcharge{
          currency
          amount
        }
        occurence
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
          emwProdStockPartnumber
          emwProdCatid{
            id
            name
          }
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
          emwProdVendorid{
            emwVendorName
          }
          emwProdSesurl
          emwProdVendorPartnumber
          emwProdIsDynamicPricing
          emwProdIsFreeship
          emwProdIsInformational
          emwProdIsFreight
          emwProdVendorid{
            id
            emwVendorName
          }
          emwProdImages(first: 20){
            edges{
              node{
                emwImageUrlPrfix
                emwImageName
              }
            }
          }
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
          minimumQuantity
        }
        totalPrice {
          net {
            amount
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
        lineshipping{
          id
          name
          method
          cost
          residentialSurcharge
        }
      }
      billingAddress{
        id
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        postalCode
        countryArea
        phone
        email
        ccEmail
        phoneExtension
        companyName
      }
      shippingAddress {
        id
        firstName
        lastName        
        streetAddress1
        streetAddress2
        city
        postalCode
        countryArea
        phone
        email
        ccEmail
        phoneExtension
        companyName
      }
      paymentTypes
      
      shippingType
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
      shippingStatus
      taxesStatus
      orderNumber
  }
`;

export const CartCheckoutDetailsQuery = gql`
${emwCheckoutFragment}
 query CartCheckoutDetail(
 $tokenId: UUID
 $bypassTax : Boolean
 $bypassShipping : Boolean
 ){
  emwCheckout(token: $tokenId) {
    id
    ...EmwCheckoutFragment
    }  
}`;

export const GetSellPrice=gql`
query GetSellPriceQuery(
  $id: ID!
  $quantity: Int
)
{
  emwproduct(id: $id)
  {
    id
    aggregateSellPrice(quantity: $quantity)
    {
      currency
      amount
    }
    listPrice{
      amount
      currency
    }
    aggregateMapPrice{
      amount
    }
  }
}
`;


export const ATCQuery=gql`
query AddToCartQuery(
  $id: ID!
  $quantity: Int
)
{
  emwproduct(id: $id)
  {
    id
    emwProdShowPartno
    emwProdVendorPartnumber
    emwProdShowManufPartno
    emwProdManufacturerPartnumber
    emwProdShowModelno
    emwProdManufacturerModelnumber
    weight{
      value
      unit
    }
    minimumQuantity
    emwProdIsDiscontinued
    emwProdReplacementProd{
      id
      emwProdId
      emwProdSesurl
      name
    }
    usertierColorcode
    usertierName
    emwProdIsGetQuote
    emwProdOrderingNotesMessage
    emwProdIsInformational
    aggregateSellPrice(quantity: $quantity)
    {
      currency
      amount
    }
    listPrice{
      amount
      currency
    }
    aggregateMapPrice{
      amount
    }
    emwProdOptgrps(first: 20){
      edges{
        node{
          id
          emwOptgrpName
          emwOptgrpIsActive
          emwOptgrpType
          emwOptgrpDefaultOption
          emwOptgrpIsRequired
          prodoptions{
            id
            emwOptName
            emwOptId
            emwOptStocknumber
            emwOptPrice{
              amount
              currency
            }
            emwOptIsActive
          }
        }
      }
    }
  }
}
`;
