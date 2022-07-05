import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  ProductDetails,
  ProductDetailsVariables,
} from "./types/ProductDetails";
import {
  EMWProductDetails,
  EMWProductDetailsVariables,
} from "./types/EMWProductDetails";
import { VariantList, VariantListVariables } from "./types/VariantList";
import { EMWProductIdQuery, EMWProductIdQueryVariables } from "./types/EMWProductIdQuery"

export const priceFragment = gql`
  fragment Price on TaxedMoney {
    gross {
      amount
      currency
      localized
    }
    net {
      amount
      currency
      localized
    }
  }
`;

export const basicProductFragment = gql`
  fragment BasicProductFields on Product {
    id
    name
    thumbnail {
      url
      alt
    }
    thumbnail2x: thumbnail(size: 510) {
      url
    }
  }
`;

export const productPricingFragment = gql`
  ${priceFragment}
  fragment ProductPricingField on Product {
    pricing {
      onSale
      priceRangeUndiscounted {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
      priceRange {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
    }
  }
`;

export const selectedAttributeFragment = gql`
  fragment SelectedAttributeFields on SelectedAttribute {
    attribute {
      id
      name
    }
    values {
      id
      name
    }
  }
`;

export const productVariantFragment = gql`
  ${priceFragment}
  fragment ProductVariantsFields on ProductVariant {
    id
    sku
    name
    stockQuantity
    isAvailable
    images {
      id
      url
      alt
    }
    pricing {
      onSale
      priceUndiscounted {
        ...Price
      }
      price {
        ...Price
      }
    }
    attributes {
      attribute {
        id
        name
      }
      values {
        id
        name
        value: name
      }
    }
  }
`;

export const productDetailsQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query ProductDetails($id: ID!) {
    product(id: $id) {
      ...BasicProductFields
      ...ProductPricingField
      descriptionJson
      category {
        id
        name
        products(first: 4) {
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
        }
      }
      images {
        id
        url
      }
      attributes {
        ...SelectedAttributeFields
      }
      variants {
        ...ProductVariantsFields
      }
      seoDescription
      seoTitle
      isAvailable
    }
  }
`;

export const FragmentEMWProdStdPricing = gql`
  fragment EMWProdStdPricing on EMWProduct {
    emwProdStdpricing(first: 20)
    {
      edges{
        node{
          id
          emwStdpricingQuantity
        }
      }
    }
  }
`;


// export const EMWproductDetailsQuery = gql`
//   ${FragmentEMWProdStdPricing}
//   query EMWProductDetails($id: ID!) {
//     emwproduct(id: $id) {
//       id
//       emwProdId
//       name
//       emwProdCreatedAt
//       emwProdUpdatedAt
//       emwProdUpdatedBy
//       description
//       descriptionJson
//       emwProdVendorPartnumber
//       emwProdManufacturerPartnumber
//       emwProdManufacturerModelnumber
//       weightPounds
//       emwProdVendorid{
//         id
//         emwVendorId
//         emwVendorName
//       }
//       emwProdImages(last: 50){
//         edges{
//           node{
//             emwImageUrlPrfix
//             emwImageName
//           }
//         }
//       }
//       emwProdHsCode
//       emwProdDisplayWeight
//       emwProdUpc
//       emwProdShowPartno
//       emwProdShowManufPartno
//       emwProdShowModelno
//       emwProdShowVendor
//       emwProdShowHscode
//       emwProdShowDispweight
//       emwProdShowUpc
//       emwProdIsMinimumQuantity
//       emwProdIsDynamicPricing
//       sellPrice {
//         amount
//         currency
//       }
//       wholesalePrice {
//         amount
//         currency
//       }
//       listPrice {
//         amount
//         currency
//       }
//       shipAdder {
//         amount
//         currency
//       }
//       emwProdAdditionalHandling {
//         amount
//         currency
//       }
//       emwProdCatid {
//         id
//         name
//         emwCatSesurl
//         ancestors(last: 10) {
//           edges {
//             node {
//               id
//               name
//               emwCatSesurl
//             }
//           }
//         }

//       }
//       emwProdAdditionalCats (last:20) {
//         edges {
//           node {
//             id
//             emwProdcatCatid {
//               emwCatId
//               name
//             }
//           }
//         }
//       }
//       emwProdIsActive
//       emwProdIsInformational
//       emwProdOnhandInventory
//       emwProdAllocatedInventory
//       emwProdIsDiscontinued
//       emwProdReplacementProd {
//         id
//         emwProdId
//         emwProdSesurl
//         name
//       }
//       minimumQuantity
//       mapPrice{
//         amount
//         currency
//       }
//       aggregateMapPrice {
//         amount
//       }
//       aggregateSellPrice{
//         amount
//       }
//       usertierName
//       usertierColorcode
//       emwProdIsNonreturnable
//       emwProdIsFreeship
//       emwProdIsFreight
//       weight {
//         value
//         unit
//       }
//       emwProdWidth {
//         value
//         unit
//       }
//       emwProdLength {
//         value
//         unit
//       }
//       emwProdHeight {
//         value
//         unit
//       }
//       seoTitle
//       emwProdSeoTitle
//       seoDescription
//       emwProdSeoDescription
//       emwProdSesurl
//       emwProdSesurlExt
//       emwProdFileicon
//       emwProdImageUrl
//       emwProdImageCaption
//       emwProdIsGetQuote
//       emwProdOrderingNotesMessage
//       emwProdReplacementUrl
//       ...EMWProdStdPricing
//       emwProdFiles (last: 20) {
//         edges {
//           node {
//             emwFileDescription
//             emwFileProdfile
//           }
//         }
//       }
//       emwProdTabs (last: 20) {
//         edges {
//           node {
//             emwTabTitle
//             emwTabContent,
//             emwTabContentJson,
//             emwTabIsActive
//           }
//         }
//       }

//       emwProdatrOverrides {
//         id
//         emwPaoAtrid {
//           emwAtrId
//           emwAtrName
//         }
//         emwPaoIsOverride
//         emwPaoDisplayValue
//       }

//       emwProdAttributeValues (last:50) {
//         edges {
//           node {
//             id
//             emwProdatrvalValue {
//               id
//               emwAtrvalValue
//               emwAtrvalAtrid {
//                 id
//                 emwAtrName
//                 emwAtrSortOrder
//               }
//             }
//           }
//         }
//       }
//       emwProdOptgrps (last:20) {
//         edges {
//           node {
//             id
//             emwOptgrpName
//             emwOptgrpIsActive
//             emwOptgrpType
//             emwOptgrpDefaultOption
//             emwOptgrpIsRequired
//             prodoptions{
//               id
//               emwOptName
//               emwOptId
//               emwOptStocknumber
//               emwOptPrice {
//                 amount
//                 currency
//               }
//               emwOptCost {
//                 amount
//                 currency
//               }
//               emwOptWeight {
//                 value
//                 unit
//               }
//               emwOptWidth {
//                 value
//                 unit
//               }
//               emwOptLength {
//                 value
//                 unit
//               }
//               emwOptHeight {
//                 value
//                 unit
//               }
//               emwOptOptgrpid {
//                 id
//                 emwOptgrpName
//               }
//               emwOptImageUrl
//               emwOptInventory
//               emwOptSellifoutofstock
//               emwOptIsActive
//               emwOptSortorder
//             }
//           }
//         }
//       }
//       relatedGroups{
//         emwRelgrpName
//         id
//         emwRelgrpIsActive
//         relprods(activeOnly: true) {
//               id
//               emwRelatedSortorder
//               emwRelatedProdid {
//                 id
//                 emwProdId
//                 name
//                 emwProdSesurl
//                 aggregateSellPrice {
//                   amount
//                   currency
//                 }
//                 sellPrice {
//                   amount
//                   currency
//                 }
//                 listPrice {
//                   amount
//                   currency
//                 }
//                 prodImages {
//                   id
//                   emwImageUrlPrfix
//                   emwImageName
//                 }
//               }
//             }
//       }
//     }
//   }
// `;

export const ProductInfoFragment = gql`
  fragment ProductInfo on EMWProduct {
    id
    emwProdId
    name
    descriptionJson
    description
    emwProdImages(last:50){
      edges{
        node{
          emwImageUrlPrfix
          emwImageName
        }
      }
    }
    emwProdHsCode
    emwProdDisplayWeight
    emwProdUpc
    emwProdShowVendor
    emwProdShowHscode
    emwProdShowDispweight
    emwProdShowUpc
    emwProdIsActive
    emwProdOnhandInventory
    emwProdAllocatedInventory
    emwProdIsFreeship
    seoTitle
    emwProdSeoTitle
    seoDescription
    emwProdSesurl
    emwProdOrderingNotesMessage
    emwProdReplacementUrl
    emwProdVendorid{
      id
      emwVendorId
      emwVendorName
    }
    emwProdCatid{
      id
      name
      emwCatSesurl
      ancestors(last:10){
        edges{
          node{
            id
            name
            emwCatSesurl
          }
        }
      }
    }
  }
`;

export const ProductPriceInfoFragment = gql`
  fragment ProductPriceInfo on EMWProduct {
    minimumQuantity (email: $email)
    usertierName (email: $email)
    usertierColorcode (email: $email)
    aggregateSellPrice (email: $email){
    amount
    currency
  }
    sellPrice (email: $email){
      amount
      currency
    }
    listPrice{
      amount
      currency
    }
    aggregateMapPrice{
      amount
    }
  }
`;

export const ProductAdditionalInfoFragment = gql`
  fragment ProductAdditionalInfo on EMWProduct {
      emwProdFiles(last:20){
        edges {
          node {
            emwFileDescription
            emwFileProdfile
          }
        }
      }
      emwProdTabs(last:20){
        edges{
          node{
            emwTabTitle
            emwTabContent,
            emwTabContentJson,
            emwTabIsActive
          }
        }
      }
      emwProdatrOverrides{
        id
        emwPaoAtrid{
          emwAtrId
          emwAtrName
        }
        emwPaoIsOverride
        emwPaoDisplayValue
      }
      emwProdAttributeValues(last:200){
        edges{
          node{
            id
            emwProdatrvalValue{
              id
              emwAtrvalValue
              emwAtrvalAtrid{
                id
                emwAtrName
                emwAtrSortOrder
              }
            }
          }
        }
      }
  }
`;

export const EMWproductDetailsQuery = gql`
  ${ProductInfoFragment}
  ${ProductPriceInfoFragment}
  ${ProductAdditionalInfoFragment}
  query EMWProductDetails($id:ID!,$email: String){
    emwproduct(id:$id){
      ...ProductInfo
      ...ProductPriceInfo
      ...ProductAdditionalInfo
      relatedGroups{
        emwRelgrpName
        id
        emwRelgrpIsActive
        relprods(activeOnly:true){
          id
          emwRelatedSortorder
          emwRelatedProdid {
            id
            emwProdId
            name
            emwProdSesurl
            aggregateSellPrice{
              amount
              currency
            }
            sellPrice{
              amount
              currency
            }
            listPrice{
              amount
              currency
            }
            prodImages{
              id
              emwImageUrlPrfix
              emwImageName
            }
          }
        }
      }
    }
  }
`;

// FIXME: Check how to handle pagination of `productVariants` in the UI.
// We need allow the user view  all cart items regardless of pagination.
export const productVariantsQuery = gql`
  ${basicProductFragment}
  ${productVariantFragment}
  query VariantList($ids: [ID!]) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          ...ProductVariantsFields
          stockQuantity
          product {
            ...BasicProductFields
          }
        }
      }
    }
  }
`;

export const emwProductIdQuery = gql`
  query EMWProductIdQuery (
    $emwProductId: Int
  ) {
    emwproductByProductId(emwProductId: $emwProductId) {
      id,
      name,
      emwProdSesurl,
      aggregateSellPrice {
        amount
      }
    }
  }
`;

export const emwProductIdOnlyQuery = gql`
  query EMWProductIdOnlyQuery (
    $emwProductId: Int
  ) {
    emwproductByProductId(emwProductId: $emwProductId) {
      id
    }
  }
`;

export const TypedProductDetailsQuery = TypedQuery<
  ProductDetails,
  ProductDetailsVariables
>(productDetailsQuery);

export const TypedEMWProductDetailsQuery = TypedQuery<
  EMWProductDetails,
  EMWProductDetailsVariables
>(EMWproductDetailsQuery);

export const TypedProductVariantsQuery = TypedQuery<
  VariantList,
  VariantListVariables
>(productVariantsQuery);

export const TypedEMWProductIdQuery = TypedQuery<
  EMWProductIdQuery,
  EMWProductIdQueryVariables
>(emwProductIdQuery);
