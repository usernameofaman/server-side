import * as React from "react";
import { Link } from "react-router-dom";
import noPhotoImg from "../../images/no-photo.svg";
import {
  generateEMWCategoryUrl,
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
import { Thumbnail } from "../../@next/components/molecules";

interface NavLinkCatProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  sidebar:any;
  item:
    | MainMenu_shop_navigation_main_items
    | MainMenuSubItem
    | SecondaryMenu_shop_navigation_secondary_items
    | SecondaryMenu_shop_navigation_secondary_items_children;
}
export const NavLinkCat: React.FC<NavLinkCatProps> = ({ sidebar, item, ...props }) => {  
  const { name, url, emwcategory, collection, page } = item;
  const link = (url: string) => (
    sidebar ? 
    <React.Fragment>   
      <div className="emw-menu">   
      <Link to={url} {...props}>      
      {/* {emwcategory.emwCatImageUrl !== null ? <img className="emw-menu-img" src={process.env.REACT_APP_CLOUDFRONT_URL + emwcategory.emwCatImageUrl} /> : <img className="emw-menu-img" src={noPhotoImg} />} */}
      {
        emwcategory.emwCatImageUrl !== null ? 
          <Thumbnail source={{thumbnail: {url : process.env.REACT_APP_CLOUDFRONT_URL + emwcategory.emwCatImageUrl, alt: "" }}}/>
        :
          <Thumbnail source={emwcategory} /> 
      }
      {name}
    </Link>  
    </div>  
    </React.Fragment> : <React.Fragment>
      <div className="emw-menu">
      {/* {emwcategory.emwCatImageUrl !== null ? <img className="emw-menu-img" src={process.env.REACT_APP_CLOUDFRONT_URL + emwcategory.emwCatImageUrl} /> : <img className="emw-menu-img" src={noPhotoImg} />} */}
      {
        emwcategory.emwCatImageUrl !== null ? 
          <Thumbnail source={{thumbnail: {url : process.env.REACT_APP_CLOUDFRONT_URL + emwcategory.emwCatImageUrl, alt: "" }}}/>
        :
          <Thumbnail source={emwcategory} /> 
      }
      <Link to={url} {...props}>      
        {name}
      </Link>    
    </div>
    </React.Fragment> 
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
