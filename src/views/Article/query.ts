import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { Article, ArticleVariables } from "./types/Article";

const articleQuery = gql`
  query Article($slug: String!) {
    page(slug: $slug) {
      contentJson
      id
      seoDescription
      seoTitle
      slug
      title
    }
    shop {
      homepageCollection {
        id
        backgroundImage {
          url
        }
      }
    }
  }
`;

export const emwarticleQuery = gql`
query EMWArticle(
  $slug: String!
  ){
  emwpageBySlug(slug: $slug) {
    id
    title
    slug
    content
    contentJson
    seoDescription
    seoTitle
    isPublished
    vendors (first: 20) {
      edges {
        node {
          emwVendorName,
          emwVendorImageUrl
        }
      }
    }
    categories(first: 20) {
      edges {
        node {
          id
          name
          emwCatSesurl
          emwCatImageUrl
        }
      }
    }
    products(first: 20) {
      edges {
        node {
          id
          emwProdId
          name
          emwProdSesurl
          aggregateSellPrice {
            amount
            currency
          }
          listPrice {
            amount
            currency
          }
          emwProdImages(first:20){
            edges{
              node{
                emwImageUrlPrfix
                emwImageName
              }
            }
          }
        }
      }
    }
  }
}
`;

export const TypedArticleQuery = TypedQuery<Article, ArticleVariables>(
  articleQuery
);
