import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
} from "../Product/queries";
import { Category, CategoryVariables } from "./types/Category";
import { EMWCategory, EMWCategoryVariables } from "./types/EMWCategory";
import { EMWElasticCategoryProductsQuery, EMWElasticCategoryProductsQueryVariables } from "./types/EMWElasticCategoryProductsQuery"
import {
  MultipleVendorMetaQuery,
  MultipleVendorMetaQueryVariables
} from "./types/MultipleVendorMetaQuery"
import {
  MultipleCategoryMetaQuery,
  MultipleCategoryMetaQueryVariables
} from "./types/MultipleCategoryMetaQuery"
import {
  MultipleProductAttributeMetaQuery,
  MultipleProductAttributeMetaQueryVariables
} from "./types/MultipleProductAttributeMetaQuery"
import {
  MultipleProductTypeMetaQuery,
  MultipleProductTypeMetaQueryVariables
} from "./types/MultipleProductTypeMetaQuery"

export const multipleCategoryMetaQuery = gql`
  query MultipleCategoryMetaQuery(
    $ids: [String],
  ) {
    emwElasticCatQueries(
      filter: {
        emwCatId: {
          in: $ids
        }
      }
    ) {
      edges {
        node {
          emwCatId,
          name
        }
      }
    }
  }
`

export const multipleVendorMetaQuery = gql`
  query MultipleVendorMetaQuery(
    $ids: [String],
  ) {
    emwElasticVendorQueries(
      filter: {
        emwVendorId: {
          in: $ids
        }
      }
    ) {
      edges {
        node {
          emwVendorId,
          emwVendorName
        }
      }
    }
  }
`

export const multipleProductAttributeMetaQuery = gql`
  query MultipleProductAttributeMetaQuery(
    $ids: [String],
  ) {
    emwElasticProductAttrQueries(
      filter:{
        emwAtrvalId: {
          in: $ids
        }
      }
    ) {
      edges{
        node{
          emwAtrvalId
          emwAtrvalAtrid
          emwAtrvalValue
          emwAtrvalSortorder
        }
      }
    }
  }
`

export const multipleProductTypeMetaQuery = gql`
  query MultipleProductTypeMetaQuery (
    $ids: [String]
    $first: Int
  ) {
    emwElasticProdtypeQueries(
      first: $first
      filter: {
        emwProdtypeId: {
          in: $ids
        }
      }
    ){
      edges{
        node{
          emwProdtypeId
          emwProdtypeName
        }
      }
    }
  }
`

export const categoryProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query Category(
    $id: ID!
    $attributes: [AttributeInput]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    products(
      after: $after
      first: $pageSize
      sortBy: $sortBy
      filter: {
        attributes: $attributes
        categories: [$id]
        minimalPrice: { gte: $priceGte, lte: $priceLte }
      }
    ) {
      totalCount
      edges {
        node {
          ...BasicProductFields
          ...ProductPricingField
          category {
            id
            name
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
    category(id: $id) {
      seoDescription
      seoTitle
      id
      name
      backgroundImage {
        url
      }
      ancestors(last: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
      children(last:15){
        totalCount
        edges {
          node {
            id
            name
            backgroundImage {
              url
              alt
            }
          }
        }
      }
    }
    attributes(filter: { inCategory: $id }, first: 100) {
      edges {
        node {
          id
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export const TypedCategoryProductsQuery = TypedQuery<
  Category,
  CategoryVariables
>(categoryProductsQuery);


export const emwElasticCategoryProductsQuery = gql`query EMWElasticCategoryProductsQuery($ids:[String],$vendorIds:[String],$attrIds:[String],$prodTypeIds:[String],$priceFrom:Int,$priceTo:Int,$first:Int,$after:String,$before:String,$search:GrapheneElasticSearchEMWProductElasticCountableElasticConnectionBackendFilter,$ordering:GrapheneElasticOrderingEMWProductElasticCountableElasticConnectionBackendFilter,$emwProdIsInformational:GrapheneElasticFilterEMWProductElasticCountableElasticConnectionEmwProdIsInformational){emwElasticProductQueries(first:$first,after:$after,before:$before,filter:{emwProdIsActive:{value: true},emwProdIsDeleted:{value:false}categoryId:{in:$ids}vendorId:{in:$vendorIds}productTypeId:{in:$prodTypeIds}emwProdListPriceAmount:{gte:{int:$priceFrom}lte:{int:$priceTo}}emwProdIsInformational:$emwProdIsInformational}nested:{atrvalsinprod:{in:$attrIds}}search:$search,ordering:$ordering){totalCount,facets,edges{node{id,name,emwProdVendorPartnumber,emwProdManufacturerPartnumber,emwProdIsActive,emwProdCatid,emwProdIsInformational,emwProdIsDiscontinued,emwProdOnhandInventory,emwProdAllocatedInventory,emwProdIsFreeship,emwProdIsDynamicPricing,emwProdWeightcode,prodstdpricing,emwProdId,emwProdWholesalePriceAmount,emwProdVendorid,emwProdImageUrl,emwProdListPriceAmount,emwProdShipAdderAmount,prodimages,emwProdHsCode,emwProdSesurl,disppricing,atrvalsinprod,prodoverrides,emwProdShowVendor,emwProdShowDispweight,emwProdShowHscode,emwProdShowUpc}}pageInfo{hasPreviousPage,hasNextPage,startCursor,endCursor}}}`;

export const emwCategoryProductsQuery = gql`
   query EMWCategory(
     $id: ID!
   ) {
     emwcategory(id: $id) {
       emwCatId
       seoDescription
       description
       descriptionJson
       seoTitle
       emwCatSesurl
       id
       name
       ancestors(first:10){
         edges{
           node{
             id
             name
             emwCatSesurl
           }
         }
       }
       backgroundImage {
         url
       }
       descendantIds
       emwChildren(last:100){
        totalCount
         edges {
           node {
             id
             name
             emwCatSesurl
             emwCatImageUrl
             emwCatId
             backgroundImage {
               url
               alt
             }
           }
         }
       }     
       children(last:15){
        totalCount
         edges {
           node {
             id
             name
             backgroundImage {
               url
               alt
             }
           }
         }
       }
     }
   }
 `;

export const TypedEMWCategoryProductsQuery = TypedQuery<
  EMWCategory,
  EMWCategoryVariables
>(emwCategoryProductsQuery);

export const TypedEMWElasticCategoryProductsQuery = TypedQuery<
  EMWElasticCategoryProductsQuery,
  EMWElasticCategoryProductsQueryVariables
>(emwElasticCategoryProductsQuery)

export const TypedMultipleCategoryMetaQuery = TypedQuery<
  MultipleCategoryMetaQuery,
  MultipleCategoryMetaQueryVariables
>(multipleCategoryMetaQuery)

export const TypedMultipleVendorMetaQuery = TypedQuery<
  MultipleVendorMetaQuery,
  MultipleVendorMetaQueryVariables
>(multipleVendorMetaQuery)

export const TypedMultipleProductAttributeMetaQuery = TypedQuery<
  MultipleProductAttributeMetaQuery,
  MultipleProductAttributeMetaQueryVariables
>(multipleProductAttributeMetaQuery)

export const TypedMultipleProductTypeMetaQuery = TypedQuery<
  MultipleProductTypeMetaQuery,
  MultipleProductTypeMetaQueryVariables
>(multipleProductTypeMetaQuery)