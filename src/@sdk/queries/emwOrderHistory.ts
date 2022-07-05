import gql from "graphql-tag";

export const EMWOrderHistoryListQuery = gql`
query EMWOrderHistoryList(
  $after: String
  ){
    emwOrders(first: 20, after: $after){
      pageInfo{
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
      edges {
        node {
          emwOrderId
          totalPrice{
            currency
            amount
          }
          totalTaxes {
            currency
            amount
          }
          totalShippingCharges {
            currency
            amount
          }
          createdAt
          totalQuantity
          printInvoice
          orderCheckouts {
            shippingType
            shippingAddress {
              streetAddress1
              streetAddress2
              city
              countryArea
            }
            orderTracking {
              error
              service
              pickupDate
              trackingUrl
              trackingNumber
            }
            lines {
              tracking {
                service
                pickupDate
                trackingUrl
                trackingNumber
              }
              lineTracking {
                error
                service
                pickupDate
                trackingUrl
                trackingNumber
              }
            }
          }
        }
      }
    }
  }
`;