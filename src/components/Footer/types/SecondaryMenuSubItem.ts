/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SecondaryMenuSubItem
// ====================================================

export interface SecondaryMenuSubItem_emwcategory {
  __typename: "EMWCategory";
  id: string;
  name: string;
}

export interface SecondaryMenuSubItem_collection {
  __typename: "Collection";
  id: string;
  name: string;
}

export interface SecondaryMenuSubItem_page {
  __typename: "Page";
  slug: string;
}

export interface SecondaryMenuSubItem {
  __typename: "MenuItem";
  id: string;
  name: string;
  emwcategory: SecondaryMenuSubItem_emwcategory | null;
  url: string | null;
  collection: SecondaryMenuSubItem_collection | null;
  page: SecondaryMenuSubItem_page | null;
}
