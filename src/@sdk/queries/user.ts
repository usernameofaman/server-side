import gql from "graphql-tag";

import { userFragment,emwUserFragment } from "../fragments/auth";
import { orderDetailFragment } from "../fragments/user";

export const orderDetailsByTokenQuery = gql`
  ${orderDetailFragment}
  query OrderByToken($token: UUID!) {
    orderByToken(token: $token) {
      ...OrderDetail
    }
  }
`;

export const EMWTaxExemptDefault = gql`
query {
  emwTaxExemptDefault
}
`

export const getUserDetailsQuery = gql`
  ${emwUserFragment}
  query UserDetails {
    me {
      ...EMWUserDetail
    }
  }
`;

export const EMWUserAccountQuery = gql`
query EMWUserAccountQuery($id: ID!) {
  storefrontUser(id: $id) {
      id
      accountNumber
      firstName
      lastName    
      email
      organizationName
      groupName
      branchId
      accountingEmail
      coEmail
      phoneNumber
      workNumber
      extension
      faxNumber
      isTaxExempt
      taxExemptCertificate
      taxExemptCertificateUploadDate
      taxExemptDocumentState
      taxExemptDetails{
        certificateId
        taxIdNumber
        state
      }
      lastLogin
      tier{
        emwUsertierTierid{
          emwTierdefId
          emwTierdefName
          emwTierdefType{
            emwTiertypeId
            emwTiertypeName
          }
        }
      }
      documents(first:10){
        edges{
          node {
            id
            document
            createdAt
            documentState
            documentType{
              id
              documentType
            }
          }
        }
      }
      customerNotes(first:10){
        edges{
          node{
            id
            postedBy{
              firstName
            }
            note
            createdAt
          }
        }
      }
      qcustomerdetails{
        id
        custEmail
        orgName
        phoneNumber
        totalQuoteOrders
        accountType
        accountTier
        totalQuotes
        totalQuoteOrders
        quoteConversionRate
        ytdValue{
          amount
          localized
        }
        lifetimeValue{
          amount
          localized
        }
        customPricing(first:20){        
          edges{
            node{
              id
              emwQuantity
              emwCost{
                amount
              }
              emwSellprice{
                amount
              }
              emwAddlHandling{
                amount
              }
              emwExpiresAt
              emwProdid{   
                id
                shipAdder{
                  amount
                }
                emwProdVendorPartnumber
                name
                emwProdVendorid{
                  emwVendorName
                }
                aggregateSellPrice{
                  amount
                  localized
                }              
              }
            }
          }
        }      
      }      
  }
}
`;
