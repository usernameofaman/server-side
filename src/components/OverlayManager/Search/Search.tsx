import "./scss/index.scss";

import classNames from "classnames";
import { stringify } from "query-string";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ReactSVG from "react-svg";

import {
  Button,
  Loader,
  OfflinePlaceholder,
  Overlay,
  OverlayContextInterface,
  OverlayType,
} from "../..";
import { maybe } from "../../../core/utils";
import { searchUrl, siteSearchUrl } from "../../../routes";
import { DebouncedTextField } from "../../Debounce";
import { Error } from "../../Error";
import NetworkStatus from "../../NetworkStatus";
import NothingFound from "./NothingFound";
import ProductItem from "./ProductItem";
import { TypedSearchResults } from "./queries";
import { SearchResults } from "./types/SearchResults";

import searchImg from "../../../images/search-mobile.svg";
import closeImg from "../../../images/x.svg";
import EMWSearchBox from "./EMWSearchBox";

interface SearchProps extends RouteComponentProps {
  overlay: OverlayContextInterface;
}

interface SearchState {
  search: string;
  inputFocused: boolean;
}

class Search extends React.Component<SearchProps, SearchState> {
  state = { search: "", inputFocused: false };
  submitBtnRef = React.createRef<HTMLButtonElement>();

  get hasSearchPhrase() {
    return this.state.search.length > 0;
  }

  get redirectTo() {
    return { pathname: searchUrl, search: `?${this.searchQs}` };
  }

  get searchQs() {
    return stringify({ term: this.state.search });
  }

  hasResults = (data: SearchResults) =>
    maybe(() => !!data.products.edges.length);

  handleSubmit = (evt: React.FormEvent) => {
    if (this.hasSearchPhrase) {
      this.props.overlay.hide();
      this.props.history.push(`${siteSearchUrl}?${this.searchQs}`);
    }

    evt.preventDefault();
  };

  handleInputBlur = () => {
    // if (!this.hasSearchPhrase) {
    //   this.props.overlay.hide();
    // }
    this.props.overlay.hide();
  };

  componentDidUpdate(_prevProps: SearchProps, prevState: SearchState) {
    if (
      !!prevState.search.length &&
      this.props.overlay.type !== OverlayType.search
    ) {
      this.setState({ search: "" });
    }
  }

  render() {
    return (
      <Overlay context={this.props.overlay} className="overlay--no-background">
        <EMWSearchBox hideOverlay={this.handleInputBlur}/>
        {/* <form
          className={classNames("search", {
            "search--has-results": this.hasSearchPhrase,
          })}
          onClick={e => e.stopPropagation()}
          onSubmit={this.handleSubmit}
        >
          <div className="search__input emw-mobile-seach">
            <DebouncedTextField
              onChange={evt => this.setState({ search: evt.target.value })}
              value={this.state.search}
              // iconLeft={
              //   <ReactSVG path={closeImg} onClick={this.props.overlay.hide} />
              // }
              iconRight={<ReactSVG path={searchImg} onClick={this.handleSubmit} />}
              autoFocus={true}
              placeholder="Search"
              onBlur={this.handleInputBlur}
            />
          </div>
          <div>
          </div>
        </form> */}
      </Overlay>
    );
  }
}

// Workaround ATM for:
// withRouter(Search): Function components do not support contextType
export default withRouter(
  (props: RouteComponentProps & { overlay: OverlayContextInterface }) => (
    <Search {...props} />
  )
);
