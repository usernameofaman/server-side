import gql from "graphql-tag";

export const AddBillingAddressMutation = gql`
mutation AddBillingAddress(
    $streetAddress1: String,
    $streetAddress2: String,
    $city: String,
    $countryArea: String,
    $postalCode: String,
    $isBilling: Boolean,
    $country: CountryCode,
    $useUnverified: Boolean
    $firstName: String
    $lastName: String
    $userEmail: String
    $orgName: String
){
    emwAddressCreate(
      userEmail: $userEmail,
      input:{
      firstName: $firstName
      lastName: $lastName
      streetAddress1: $streetAddress1
      streetAddress2: $streetAddress2
      city: $city
      countryArea: $countryArea
      postalCode:  $postalCode
      isBillingAddress: $isBilling
      country: $country
      useUnverified: $useUnverified
      companyName: $orgName
    }
    ){
      errors{
        field
        message
      }
      address{
        id
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        postalCode
        countryArea
      }
    }
  }
`;

export const UpdateBillingAddressMutation=gql`
mutation UpdateBillingAddress(
  $checkoutId: ID!,
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
  $firstName: String,
  $lastName: String,
  $onbehalfEmail: String,
  $phone: String,
  $email: String,
  $ccEmail: String,
  $phoneExtension: String
  $companyName: String
){
  emwCheckoutUpdateBilling(
    checkoutId: $checkoutId,
    onbehalfEmail: $onbehalfEmail,
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
      companyName: $companyName
      phone: $phone,
      email: $email,
      ccEmail: $ccEmail,
      phoneExtension: $phoneExtension,
    }
    billingAddressId: $billingAddressId
  }){
    errors{
      field
      message
    }
    emwCheckout{
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

