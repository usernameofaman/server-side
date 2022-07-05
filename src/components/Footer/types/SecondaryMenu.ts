/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SecondaryMenu
// ====================================================

export interface SecondaryMenu_shop_navigation_secondary_items_emwcategory {
  __typename: "EMWCategory";
  id: string;
  name: string;
}

export interface SecondaryMenu_shop_navigation_secondary_items_collection {
  __typename: "Collection";
  id: string;
  name: string;
}

export interface SecondaryMenu_shop_navigation_secondary_items_page {
  __typename: "Page";
  slug: string;
}

export interface SecondaryMenu_shop_navigation_secondary_items_children_emwcategory {
  __typename: "EMWCategory";
  id: string;
  name: string;
}

export interface SecondaryMenu_shop_navigation_secondary_items_children_collection {
  __typename: "Collection";
  id: string;
  name: string;
}

export interface SecondaryMenu_shop_navigation_secondary_items_children_page {
  __typename: "Page";
  slug: string;
}

export interface SecondaryMenu_shop_navigation_secondary_items_children {
  __typename: "MenuItem";
  id: string;
  name: string;
  emwcategory: SecondaryMenu_shop_navigation_secondary_items_children_emwcategory | null;
  url: string | null;
  collection: SecondaryMenu_shop_navigation_secondary_items_children_collection | null;
  page: SecondaryMenu_shop_navigation_secondary_items_children_page | null;
}

export interface SecondaryMenu_shop_navigation_secondary_items {
  __typename: "MenuItem";
  id: string;
  name: string;
  emwcategory: SecondaryMenu_shop_navigation_secondary_items_emwcategory | null;
  url: string | null;
  collection: SecondaryMenu_shop_navigation_secondary_items_collection | null;
  page: SecondaryMenu_shop_navigation_secondary_items_page | null;
  children: (SecondaryMenu_shop_navigation_secondary_items_children | null)[] | null;
}

export interface SecondaryMenu_shop_navigation_secondary {
  __typename: "Menu";
  items: (SecondaryMenu_shop_navigation_secondary_items | null)[] | null;
}

export interface SecondaryMenu_shop_navigation {
  __typename: "Navigation";
  secondary: SecondaryMenu_shop_navigation_secondary | null;
}

export interface SecondaryMenu_shop {
  __typename: "Shop";
  navigation: SecondaryMenu_shop_navigation | null;
}

export interface SecondaryMenu {
  shop: SecondaryMenu_shop | null;
}
