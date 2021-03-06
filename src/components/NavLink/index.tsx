import * as React from "react";
import { Link } from "react-router-dom";

import {
  generateEMWCategorySeoUrl,
  generateCollectionUrl,
  generatePageUrl
} from "../../core/utils";
import {
  SecondaryMenu_shop_navigation_secondary_items,
  SecondaryMenu_shop_navigation_secondary_items_children
} from "../Footer/types/SecondaryMenu";
import { MainMenu_shop_navigation_main_items } from "../MainMenu/types/MainMenu";
import { MainMenuSubItem } from "../MainMenu/types/MainMenuSubItem";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  item:
    | MainMenu_shop_navigation_main_items
    | MainMenuSubItem
    | SecondaryMenu_shop_navigation_secondary_items
    | SecondaryMenu_shop_navigation_secondary_items_children;
}
export const NavLink: React.FC<NavLinkProps> = ({ item, ...props }) => {
  const { name, url, emwcategory, collection, page } = item;
  const link = (url: string) => (
    // <Link to={url.replace(/\/$/, "")} {...props}>
    <Link to={url} {...props} onClick={(e)=>e.stopPropagation()}>
      {name}
    </Link>
  );

  if (url) {
    return (
      <a href={url} {...props}>
        {name}
      </a>
    );
  } else if (emwcategory) {
    return link(generateEMWCategorySeoUrl(emwcategory.name, emwcategory.emwCatSesurl));
  } else if (collection) {
    return link(generateCollectionUrl(collection.id, collection.name));
  } else if (page) {
    return link(generatePageUrl(page.slug));
  }

  return <span {...props}>{name}</span>;
};
