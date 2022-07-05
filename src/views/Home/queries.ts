import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { ProductsList } from "./types/ProductsList";

export const homePageQuery = gql`
  query ProductsList {
    shop {
      description
      name
    }
  }
`;

export const TypedHomePageQuery = TypedQuery<ProductsList, {}>(homePageQuery);
