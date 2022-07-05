import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { baseUrl, contactUsUrl } from "../../routes";
import NavItem, { INavItem } from "./NavItem";

import backImg from "../../images/arrow-back.svg";
import logoImg from "../../images/logo.svg";
import userImg from "../../images/emw-user.svg";
import homeImg from "../../images/home.svg";
import contactImg from "../../images/contact.svg";
import trackImg from "../../images/track.svg";
import GetAQuoteMenu from "../../views/EMWAddToCart/GetAQuoteMenu"
import closeImg from "../../images/login-close.svg";

interface NavListProps {
  items: INavItem[];
  hideOverlay(): void;
}

interface NavListState {
  parent: INavItem | null;
  displayedItems: INavItem[];
}

class NavList extends React.PureComponent<NavListProps, NavListState> {
  state: NavListState = {
    displayedItems: this.props.items,
    parent: null,
  };

  handleShowSubItems = (item: INavItem) => {
    this.setState({ parent: item, displayedItems: item.children });
  };

  handleGoBack = () => {
    const grandparent = this.state.parent.parent;

    if (!grandparent) {
      this.setState({ parent: null, displayedItems: this.props.items });
    } else {
      const newParent = this.findItemById(grandparent.id);
      this.setState({
        displayedItems: newParent.children,
        parent: newParent,
      });
    }
  };

  findItemById(id: string): INavItem {
    let match = null;
    function find(item) {
      if (item.id === id) {
        match = item;
        return true;
      }
      return item.children && item.children.some(find);
    }
    this.props.items.some(find);
    return match;
  }

  render() {
    const { hideOverlay } = this.props;
    const { displayedItems, parent } = this.state;
    return (
      <ul>
        <>
          <li className="side-nav__menu-item side-nav__menu-item--parent">
            <Link
              to={baseUrl}
              className="side-nav__menu-item-link"
              onClick={hideOverlay}
            >
              <ReactSVG className="emw-menu-img" path={homeImg} /> <span className="sidebar-text">Home</span>
            </Link>
            {/* <span className="side-nav__menu-item-close" onClick={hideOverlay}>
             
            </span> */}
            <ReactSVG
                path={closeImg}
                onClick={hideOverlay}
                className="overlay__header__close-icon"
              />
          </li>
          <li className="side-nav__menu-item side-nav__menu-item--parent">
            <Link
              to={'/account'}
              className="side-nav__menu-item-link"
              onClick={hideOverlay}
            >
              <ReactSVG className="emw-menu-img" path={userImg} /> <span className="sidebar-text">Account</span>
            </Link>
          </li>
          <li className="side-nav__menu-item side-nav__menu-item--parent">
            <Link
              to={contactUsUrl}
              className="side-nav__menu-item-link"
              onClick={hideOverlay}
            >
              <ReactSVG className="emw-menu-img" path={contactImg} /><span className="sidebar-text">Contact Us</span>
            </Link>
          </li>
          <li className="side-nav__menu-item side-nav__menu-item--parent">           
              <GetAQuoteMenu mainMenu={false} />
          </li>
          <li className="side-nav__menu-item side-nav__menu-item--parent">
            <Link
              to={'/orders'}
              className="side-nav__menu-item-link"
              onClick={hideOverlay}
            >
              <ReactSVG className="emw-menu-img" path={trackImg} /><span className="sidebar-text">Track Shipment</span>
            </Link>
          </li>
          {parent ? (
            <li className="side-nav__menu-item side-nav__menu-item-back">
              <span onClick={this.handleGoBack} className="emw-cat-menu-item">
                <ReactSVG path={backImg} /> <img></img>{parent.name}
              </span>
            </li>
          ) : (
              <li className="side-nav__menu-item ">
                <Link
                  to={baseUrl}
                  className="side-nav__menu-item-link emw-cat-menu-item"
                  onClick={hideOverlay}
                >
                  Shop by category
          </Link>
              </li>
            )}

        </>


        {displayedItems.map(item => (
          <NavItem
            key={item.id}
            hideOverlay={hideOverlay}
            showSubItems={this.handleShowSubItems}
            {...item}
          />
        ))}
      </ul>
    );
  }
}

export default NavList;
