import * as React from 'react';

import leftArrow from '../../images/left-arrow.svg'
import rightArrow from '../../images/right-arrow.svg'

interface PaginationProps {
  categoryTo: number;
  categoryFrom: number;
  categoryActivePage: number;
  onCategoryNext: (to) => void;
  onCategoryPrevious: (from) => void;
  onCategoryPageClick: (i) => void;
  enableCNxt: boolean;
  enableCPre: boolean;
  productLimit: any;
}

const createpage = (from, to, currentActive, onCategoryPageClick) => {
  const listing = []
  for (let i = from; i <= to; i++) {
    const active = currentActive === i ? true : false
    listing.push(<li key={i} onClick={() => onCategoryPageClick(i)}>
      <a className={active ? "active" : ""}>{i}</a>
    </li>)
  }
  return listing
};

export const Pagination: React.FC<PaginationProps> = ({
  onCategoryNext,
  onCategoryPrevious,
  enableCNxt,
  enableCPre,
  productLimit,

}) => {
  // const [count, setCount] = React.useState(0);
  return (
    <div className="custompagination">
      <ul>
        {enableCPre && <li className="prev-pagerbtn" onClick={() => onCategoryPrevious(productLimit)}>
          <a href="#">
            <img src={leftArrow} />
          </a>
        </li>}
        {enableCNxt && <li  className="next-pagerBtn" onClick={() => onCategoryNext(productLimit)}>
          <a href="#">
            <img src={rightArrow} />
          </a>
        </li>}
      </ul>
    </div>
  );
};