import gql from "graphql-tag";

export const GetBillingAddressQuery = gql`
query OrderTracking(
    $orderNum: String
    $email: String
)
{
    emwOrder(ordernum: $orderNum,email: $email) {
      id
      emwOrderId
      orderCheckouts {
        shippingType
        orderTracking {
          trackingNumber
          service
          packageStatus
          pickupDate
          deliveryDate
          trackingUrl
          error
        }
        shippingAddress {
          firstName
          lastName
          email
          streetAddress1
          streetAddress2
          city
          countryArea
          postalCode
          country {
            code
            country
          }
        }
        lines {
          product {
            name
          }
          lineTracking {
            trackingNumber
            service
            packageStatus
            pickupDate
            deliveryDate
            trackingUrl
            error
          }
          tracking {
            trackingNumber
            service
            packageStatus
            pickupDate
            deliveryDate
            trackingUrl
            error
          }
        }
      }
    }
  }
`;



