import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import { MainMenu } from "./types/MainMenu";

export const mainMenu = gql`
  fragment MainMenuSubItem on MenuItem {
    id
    name
    emwcategory {
      id
      name
      emwCatImageUrl
      emwCatSesurl
    }
    url
    collection {
      id
      name
    }
    page {
      slug
    }
    parent {
      id
    }
  }

  query MainMenu {
    shop {
      navigation {
        main {
          id
          items {
            ...MainMenuSubItem
            children {
              ...MainMenuSubItem
              children {
                ...MainMenuSubItem
              }
            }
          }
        }
      }
    }
  }
`;

export const TypedMainMenuQuery = TypedQuery<MainMenu, {}>(mainMenu);


export const mainEMWMenu = gql`
  fragment MainMenuSubItem on MenuItem {
    id
    name
    emwcategory {
      id
      name
      emwCatImageUrl
      emwCatSesurl
    }
    url
    collection {
      id
      name
    }
    page {
      slug
    }
    parent {
      id
    }
  }

  query MainMenu {
    shop {
      navigation {
        main {
          id
          items {
            ...MainMenuSubItem
            children {
              ...MainMenuSubItem
            }
          }
        }
      }
    }
  }
`;

export const TypedMainEMWMenuQuery = TypedQuery<MainMenu, {}>(mainEMWMenu);