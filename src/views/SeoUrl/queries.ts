import gql from "graphql-tag";
export const CategoryOrProductBySeoUrlQuery = gql`
query CategoryOrProductBySeoUrl(
    $seoUrl: String!
){
    categoryOrProductBySeoUrl(seoUrl:$seoUrl) {
      id
      type
      dbId
    }
}
`;