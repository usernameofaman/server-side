import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import { EMWElasticCategoryProductsQuery, EMWElasticCategoryProductsQueryVariables } from "./types/EMWElasticCategoryProductsQuery"


export const emwElasticProductsQuery = gql`
query EMWElasticProductsQuery(
  $vendorIds: [String]
  $attrIds: [String]
  $prodTypeIds: [String]
  $priceFrom: Int,
  $priceTo: Int,
  $first: Int,
  $after: String,
  $before: String,
  $search: GrapheneElasticSearchEMWProductElasticCountableElasticConnectionBackendFilter
  $ordering: GrapheneElasticOrderingEMWProductElasticCountableElasticConnectionBackendFilter
) {
  emwElasticProductQueries(
    first: $first
    after: $after
    before: $before
    filter: {
      emwProdIsActive: {
        value: true
      }
      emwProdIsDeleted:{
        value: false
      }
      vendorId: {
        in: $vendorIds
      }
      productTypeId: {
        in: $prodTypeIds
      }
      emwProdListPriceAmount: {
        gte: { int: $priceFrom }
        lte: { int: $priceTo }
      }
    }
    nested: {
      atrvalsinprod: {
        in: $attrIds
      }
    }
    search: $search
    ordering: $ordering
  ) {
    totalCount
    facets
    edges {
      node {
        id
        name
        emwProdVendorPartnumber
        emwProdManufacturerPartnumber
        emwProdIsActive
        emwProdCatid
        emwProdIsInformational
        emwProdIsDiscontinued
        emwProdOnhandInventory
        emwProdAllocatedInventory
        emwProdIsFreeship
        emwProdIsDynamicPricing
        emwProdWeightcode
        prodstdpricing
        emwProdId
        emwProdWholesalePriceAmount
        emwProdVendorid
        emwProdImageUrl
        emwProdListPriceAmount
        emwProdShipAdderAmount
        prodimages
        emwProdHsCode
        emwProdSesurl
        disppricing
        atrvalsinprod
        prodoverrides
      }
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
  }
}
`;

export const TypedEMWElasticProductsQuery = TypedQuery<
  EMWElasticCategoryProductsQuery,
  EMWElasticCategoryProductsQueryVariables
>(emwElasticProductsQuery)
