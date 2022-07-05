import gql from "graphql-tag";

export const emwImpersonationCartFragment = gql`
  fragment emwImpersonationCartData on EMWCheckout  {
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
        minimumQuantity
        mapPrice{
          amount
          currency
        }
        sellPrice{
          currency
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
    }
    user {
      email
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
`;

export const emwLoginCartFragment = gql`
  fragment emwLoginCartData on EMWCheckout  {
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
        minimumQuantity
        mapPrice{
          amount
          currency
        }
        sellPrice{
          currency
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
    }
    billingAddress{
      id
      firstName
      lastName
      email
      ccEmail
      companyName
      streetAddress1
      streetAddress2
      city
      cityArea
      postalCode
      countryArea
      phone
      phoneExtension
    }
    shippingAddress{
      id
      firstName
      lastName
      email
      ccEmail
      companyName
      streetAddress1
      streetAddress2
      city
      cityArea
      postalCode
      countryArea
      phone
      phoneExtension
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
`;

export const emwImpersonatedCheckoutCreate = gql`
${emwLoginCartFragment}
mutation emwImpersonatedCheckoutCreate($customerEmail: String, $bypassTax : Boolean, $bypassShipping : Boolean){
  emwImpersonatedCheckoutCreate(
    input:{
      customerEmail: $customerEmail
    })
    {
      errors{
        field
        message
      }
      token
      user{
        email
        id
        emwCheckout{
          ...emwLoginCartData
        }
      }
    }
  }
`;

// emwCheckout{
//   ...emwImpersonationCartData
// }

export const emwSignoutToImpersonatedMode = gql`
${emwImpersonationCartFragment}
mutation emwCheckoutCreate($email: String){
  emwCheckoutCreate(
    input:{
      email:$email,
      lines:[]
    }) {
      errors{
        field
        message
      }
      emwCheckout {
        ...emwImpersonationCartData
      }
    }
  }
`