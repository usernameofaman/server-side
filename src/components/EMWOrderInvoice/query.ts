import gql from "graphql-tag";

export const GetOrderDetailQuery = gql`
query GetOrderDetail(
    $ordernum: String,
    $email: String
){
    emwOrder(ordernum: $ordernum, email: $email) {
      id
      emwOrderId
      isSupplementalOrder
      emwLinkedOrderId
      parentOrder{
        totalPaid{
          amount
        }
      }
      createdAt
      orderStatus
      customerPurchaseOrderNumber
      paymentMethod
      paymentTerms
      shipmentTerms
      customerStats{
        orgName
      }
      orderCheckouts {
        shippingType
        shipping{
          name
          residentialSurcharge{
            amount
          }
          price{
            amount
          }
        }
        orderTracking{
          trackingUrl
          trackingNumber
        }
        shippingAddress {
          firstName
          lastName
          companyName
          streetAddress1
          streetAddress2
          city
          countryArea
          postalCode
          country {
            country
          }
        }
        billingAddress {
          firstName
          lastName
          companyName
          streetAddress1
          streetAddress2
          city
          countryArea
          postalCode
          country {
            country
          }
        }
        lines {
          product {
            emwProdVendorPartnumber
            name
          }
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
          quantity
          totalLineUnitPrice {
            amount
          }
          totalLinePrice {
            amount
          }
          lineshipping {
            name
            method
            cost
            residentialSurcharge
          }
          lineTracking {
            trackingNumber
            trackingUrl
          }
          tracking {
            trackingNumber
            trackingUrl
          }
        }
      }
      customerNote
      totalItemprice {
        amount
      }
      totalPrice {
        amount
      }
      totalShippingCharges {
        amount
      }
      totalTaxes {
        amount
      }
      totalPrice {
        amount
      }
      totalDue {
        amount
      }
      totalPaid {
        amount
      }
    }
  }
`;