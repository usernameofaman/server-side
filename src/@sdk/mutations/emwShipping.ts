import gql from "graphql-tag";



export const addNewShippingAddMutation = gql`
  mutation emwAddressCreate($input: EMWAddressInput!, $userEmail: String) {
    emwAddressCreate(input: $input, userEmail: $userEmail) {
      errors {
        field
        message
      }
      address {
        id
        streetAddress1
        city
        country{
          country
          code
        }
        countryArea
        postalCode
      }
      candidates
    }
  }
`;


export const emwCheckoutUpdateShippingMutation = gql`
  mutation emwCheckoutUpdateShipping($checkoutId: ID!, $onbehalfEmail: String, $manualShipping: Boolean, $shipping:EMWCheckoutUpdateShippingInput!, $bypassTax : Boolean, $bypassShipping: Boolean) {
    emwCheckoutUpdateShipping(checkoutId: $checkoutId, onbehalfEmail: $onbehalfEmail, manualShipping: $manualShipping, shipping:$shipping, bypassShipping: $bypassShipping) {
      errors {
        field
        message
      }
      emwCheckout {
        id
        shippingAddress{
          id
        }
        emwTotalPrice(
          bypassTax : $bypassTax
          bypassShipping : $bypassShipping
        ){
          totalItemPrice{
            amount
            currency
          }
        }
      }
    }
  }
`;

export const updateNewShippingAddMutation = gql`
  mutation emwAddressUpdate($id: ID!, $input: EMWAddressInput!, $userEmail: String) {
    emwAddressUpdate(id: $id, input: $input, userEmail: $userEmail) {
      errors {
        field
        message
      }
      address {
        id
        firstName
        lastName
        streetAddress1
        city
        country{
          country
          code
        }
        countryArea
        postalCode
      }
      candidates
    }
  }
`;

export const setDefaultShippingAddressMutation = gql`
  mutation setDefaultShippingAddressMutation($addressId: ID!) {
    setDefaultAddress(addressId: $addressId){
      errors{
        field
        message
      }
    }
  }
`

export const deleteAddressMutation = gql`
  mutation emwAddressDelete($addressId: ID!) {
    emwAddressDelete(id: $addressId){
      errors{
        field
        message
      }
      address {
        id
      }
    }
  }
`