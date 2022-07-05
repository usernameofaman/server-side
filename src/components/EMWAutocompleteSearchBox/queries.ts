import gql from "graphql-tag";

export const SearchProductsQuery = gql`
query SearchProducts(
    $filter: EMWProductFilterInput
    $first: Int
){
    emwproducts(
        first: $first
        filter: $filter
    ){
      edges{
        node{
          name
          emwProdVendorPartnumber
          emwProdSesurl
          emwProdIsDeleted
          category{
            id
            name
          }
        }
      }
    }
}
`;

export const GetAllCategoriesQuery = gql`
query GetAllCategories(
    $level: Int
    $first: Int
){
    emwcategories(level: $level,first: $first){
      edges{
        node{
          id
          name
        }
      }
    }
}
`;

