import gql from "graphql-tag";

export const QuoteDetailsQuery = gql`
 query emwQuote(
 $tokenId: UUID
 ){
  emwQuote(token: $tokenId) {
        id
        token
        orderNumber
        note
        nonCatalogReq
        lines {
          id
          quantity

          product {
            id
            emwProdId
            name
            emwProdSesurl
            emwProdStockPartnumber
            emwProdVendorPartnumber
            emwProdVendorid{
              id
              emwVendorName
            }
          }
        }
        shippingType
        billingAddress{
          id
          firstName
          lastName
          streetAddress1
          streetAddress2
          city
          postalCode
          countryArea
        }
        shippingAddress {
          id
          firstName
          lastName        
          streetAddress1
          streetAddress2
          city
          postalCode
          countryArea
        }
        files {
          id
          title
          fileurl
          uploadedBy
          uploadedOn
        }
        submittedOn
        expiresOn        
        quoteOwnerMerch {
          id
          firstName
          lastName
        }
        files {
          id
          title
          fileurl
          uploadedBy
        }
        quoteStatus
  }

}`;

export const GetEMWShippingMethods=gql`
query emwShippingMethodsquery
{
  emwShippingMethods
  {
    code
    name
  }
}
`;

export const GetEMWFreightShippingMethods=gql`
query emwFreightShippingMethodsquery
{
  emwFreightShippingMethods
  {
    code
    name
  }
}
`;

export const getProductSearchResult = gql`
  query GetProductSearchResult(
    $filter: EMWProductFilterInput!
  ) {    
    emwproducts (
      first: 10,
      filter: $filter,
      ) {
        edges{
          node{
            id
            name
            emwProdStockPartnumber
          }
        }        
      }
  }
`;