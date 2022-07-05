import gql from "graphql-tag";

import { checkoutAddressFragment } from "./checkout";

export const userFragment = gql`
  ${checkoutAddressFragment}
  fragment User on User {
    id
    email
    firstName
    lastName
    isStaff
    canImpersonate
    defaultShippingAddress {
      ...Address
    }
    defaultBillingAddress {
      ...Address
    }
    addresses {
      ...Address
    }
  }
`;

export const emwUserFragment = gql`
  ${checkoutAddressFragment}
  fragment EMWUserDetail on EMWUser {
    id
    email
    firstName
    lastName
    isStaff
    canImpersonate
    tier{
      id
      emwUsertierTierid{
        emwTierdefId
      }
    }
    defaultShippingAddress {
      ...Address
    }
    defaultBillingAddress {
      ...Address
    }
    addresses {
      ...Address
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