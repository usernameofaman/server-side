import gql from "graphql-tag";

export const GetBillingAddressQuery = gql`
query GetBillingAddress(
    $first: Int,
    $email : String
){
    emwAddresses(first: $first, email: $email)
    {
      edges{
        node{
          id
          firstName
          lastName
          email
          ccEmail
          companyName
          phone
          phoneExtension
          streetAddress1
          streetAddress2
          city
          postalCode
          countryArea
          isDefaultAddress
          country{
            code
            country
          }
        }
      }
    }
  }
`;

export const verifyEmailAddress = gql`
query getEmwCustomerLevel($customerEmail: String!){
  emwCustomerLevel(customerEmail: $customerEmail)
}
`;

export const CustomInformationModalQuery = gql`
{
  customInformationForCustomer{
    message
    screenPlacement
    displayLocation
    allowClose
    textAlignment
    messageHeader
    buttonText
    isActive
  }
}
`