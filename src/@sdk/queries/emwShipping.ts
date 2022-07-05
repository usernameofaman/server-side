import gql from "graphql-tag";

export const getShippingAddress=gql`
query getShippingAddress($email : String)
{
  emwAddresses( last: 20, email: $email)
  {
    edges{
      node{
        id
        firstName
        lastName
        email
        ccEmail
        phoneExtension
        phone
        streetAddress1
        streetAddress2
        city
        isDefaultAddress
        companyName
        countryArea
        postalCode
        country{
          country
          code
        }
      }
    }
  }
}
`;


export const getOrderByshippingPricesForCheckout=gql`
query getshippingPricesForCheckout($id: ID!, $address:EMWAddressInput!, $bypassShipping: Boolean )
{
  shippingPricesForCheckout( id: $id, address:$address, bypassShipping: $bypassShipping )
  {
      code
      name
      price{
        amount
        localized
      }
      occurence
      businessDaysInTransit
      residentialSurcharge{
        amount
      }
  }
}
`;


export const getshippingPricesForCheckout=gql`
query getshippingPricesForCheckout($id: ID!, $address:EMWAddressInput!, $bypassShipping: Boolean )
{
  shippingPricesForCheckoutByItem( id: $id, address:$address, bypassShipping: $bypassShipping )
  {
    line{
      id
      quantity
      lineshipping{
        residentialSurcharge
      }
      product{
        id
        name
        emwProdIsFreeship
        emwProdIsFreight
      }
    }
    shipping{
      code
      name
      price{
        amount
        localized
      }
      occurence
      businessDaysInTransit
      residentialSurcharge{
        amount
      }
    }
  }
}
`;

export const getshippingPricesForQuote=gql`
query getshippingPricesForQuote($id: ID!, $address:EMWAddressInput! )
{
  shippingPricesForQuote( id: $id, address:$address )
  {
    code
    name
    price{
      amount
    }
    occurence
    businessDaysInTransit
  }
}
`;

export const validateNewShippingAddQuery=gql`
query validateNewShippingAddQuery($address:EMWAddressInput!, $checkoutId:ID )
{
  validateAddressWithUps(address:$address, checkoutId:$checkoutId )
  {
    valid
    candidates
    error
  }
}
`;

export const validateQuoteShippingAddQuery=gql`
query validateQuoteShippingAddQuery($address:EMWAddressInput!, $quoteId:ID )
{
  validateQuoteAddressWithUps(address:$address, quoteId:$quoteId )
  {
    valid
    candidates
    error
  }
}
`;

export const getBillingAddress=gql`
query getBillingAddress($email : String)
{
  emwAddresses(billing: true, last: 20, email: $email)
  {
    edges{
      node{
        id
        firstName
        lastName
        email
        email
        ccEmail
        phoneExtension
        phone
        streetAddress1
        streetAddress2
        city
        companyName
        countryArea
        postalCode
        country{
          country
          code
        }
      }
    }
  }
}
`;