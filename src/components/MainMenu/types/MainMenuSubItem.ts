/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MainMenuSubItem
// ====================================================

export interface MainMenuSubItem_emwcategory {
  __typename: "EMWCategory";
  id: string;
  name: string;
}

export interface MainMenuSubItem_collection {
  __typename: "Collection";
  id: string;
  name: string;
}

export interface MainMenuSubItem_page {
  __typename: "Page";
  slug: string;
}

export interface MainMenuSubItem_parent {
  __typename: "MenuItem";
  id: string;
}

export interface MainMenuSubItem {
  __typename: "MenuItem";
  id: string;
  name: string;
  children:any;
  emwcategory: MainMenuSubItem_emwcategory | null;
  url: string | null;
  collection: MainMenuSubItem_collection | null;
  page: MainMenuSubItem_page | null;
  parent: MainMenuSubItem_parent | null;
}
