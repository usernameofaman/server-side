import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { DebouncedTextField } from "../../Debounce";
import ReactSVG from "react-svg";

import searchImg from "../../../images/search.svg";
import closeImg from "../../../images/x.svg";
import { searchUrl, siteSearchUrl } from "../../../routes";
interface IHeaderSearch {
  note: string;
  quoteCommentUpdate: any;
  }

const HeaderSearch: React.FC<IHeaderSearch> = ({
  note,
  quoteCommentUpdate
}) => {

  const [search, setsearch] = useState("");

  const handleSubmit = (evt: React.FormEvent) => {
    if (search!=="") {
      // this.props.history.push(`${siteSearchUrl}?${search}`);
    }

    evt.preventDefault();
  };
  return (<div className="search__input">
    <form
          onClick={e => e.stopPropagation()}
          onSubmit={handleSubmit}
        >
            <DebouncedTextField  
              onChange={evt => setsearch(evt.target.value)}
              value={search}
              iconRight={<ReactSVG path={searchImg} />}
              autoFocus={true}
              placeholder="Search"
            />
                </form>
          </div>
  );
};

export default HeaderSearch;
