import gql from "graphql-tag";

export const GetStatesQuery = gql`
query GetStates{
    states{
      code
      name
    }
  }
`;