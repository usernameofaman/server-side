import "./scss/index.scss";
import { IFilterAttributes, IFilters } from "@types";
// import { ProductListHeader } from "../../@next/components/molecules";
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Breadcrumbs,
  Categories,
  extractBreadcrumbs,
  // ProductsFeatured,
  ProductsList,
  Pagination
} from "../../components";

import CategoriesListView from "../../components/Categories/list";

import ProductsListView from '../../components/ProductsList/list'

import { Category_category, Category_products } from "./types/Category";

import { EMWCategory_emwcategory, EMWCategory_emwproducts } from "./types/EMWCategory";


// import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";
import { maybe } from "../../core/utils";


import gridImg from '../../images/gridView.svg';
import listImg from '../../images/listView.svg';
import sortingicoMob from '../../images/sorting-icoMob.svg';

// Active icon
import gridImgActive from '../../images/gridView-active.svg';
import listImgActive from '../../images/listView-active.svg';
import sortingicoMobActive from '../../images/sorting-icoMob-active.svg';

import ShapeIcon from '../../images/Shape.png'
import Shapewhite from '../../images/Shape-white.svg'

import listViewico from '../../images/listViewico.svg'
import gridViewico from '../../images/gridViewico.svg'
import sortingico from '../../images/sortingico.svg'

// Desktop active icon
import listViewicoActive from '../../images/listViewicoActive.svg'
import gridViewicoActive from '../../images/gridViewicoActive.svg'
import sortingicoActive from '../../images/sortingicoActive.svg'

// import product from '../../images/product.png'
import plusIcon from '../../images/plus-icon.png'
import close from '../../images/close.svg'
// import leftArrow from '../../images/left-arrow.svg'
// import rightArrow from '../../images/right-arrow.svg'


import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Grid from '@material-ui/core/Grid';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { DropdownSelect } from "@components/atoms";
import CategoryFacetsViewer from "@temp/components/Categories/facets/CategoryFacetsViewer";
import VendorFacetsViewer from "@temp/components/Categories/facets/VendorFacetsViewer";
import AttributeFacetsViewer from "@temp/components/Categories/facets/AttributeFacetsViewer";
import ProductTypeFacetsViewer from "@temp/components/Categories/facets/ProductTypeFacetsViewer";
import { sum } from "lodash";
import { Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../core/config";
import loader from '../../images/emw-loader.svg';
import ReactSVG from "react-svg";
import { GAImpression, GACustomEvent } from "../../utils/Google-Analytics";
import ReactGA from 'react-ga';

import Srcollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import closeImg from "../../images/login-close.svg";

// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import Fade from '@material-ui/core/Fade';

const notFoundMessage = "Your filter options are not showing a match.Try adjusting your filters"

interface ProductFacetsList {
  emw_prod_catid?: any[],
  dispprice?: any[],
  emw_prod_vendorid?: any[],
  atrvalsinprod?: any[],
  product_type_id: any[]
}

const getFacetsBuckets = (facets: GrapheneElasticFacetsEMWProductElasticCountableElasticConnectionBackendEnum): ProductFacetsList => {
  return Object.keys(
    facets
  ).reduce(
    (result, key) => {
      result[key] = facets[key] && facets[key].aggs && facets[key].aggs.buckets || []
      return result
    }, {}
  )
}

const getAttrFacetsBuckets = (facets: GrapheneElasticFacetsEMWProductElasticCountableElasticConnectionBackendEnum): ProductFacetsList => {
  return Object.keys(
    facets
  ).reduce(
    (result, key) => {
      result[key] = facets[key] && facets[key].aggs && facets[key].aggs.inner && facets[key].aggs.inner.buckets || []
      return result
    }, {}
  )
}

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> { }

interface PageProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  ProductGridView: boolean
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  showFilterMobile: boolean;
  products: EMWCategory_emwproducts;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: (limit) => void;
  onLoadLimit: (limit) => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
  onEnableProductListview: () => void;
  onEnableProductGridview: () => void;
  onChangeProductLimit: (limit: number) => void;
  facets: GrapheneElasticFacetsEMWProductElasticCountableElasticConnectionBackendEnum
  onFacetsChange: (facetsFilters: any) => void;
  vendorFacetsList: any[]
  setVendorFacetsList: (vendors: any[]) => void;
  productTypesFacetsList: any[];
  setProductTypeFacetsList: (productTypes: any[]) => void;
  searchText: string,
  setSearchText: any,
  qSearchText: string,
  productLimit: any;
  setproductLimit: any;
  pageInfo: any;
  currentPageNumber: any;
}

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


const Page: React.FC<PageProps> = ({
  activeSortOption,
  ProductGridView,
  displayLoader,
  hasNextPage,
  onLoadMore,
  onLoadLimit,
  products,
  onOrder,
  sortOptions,
  onEnableProductListview,
  onEnableProductGridview,
  onChangeProductLimit,
  onAttributeFiltersChange,
  onFacetsChange,
  facets,
  searchText,
  setSearchText,
  qSearchText,
  productLimit,
  setproductLimit,
  pageInfo,
  currentPageNumber,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  const hasProducts = canDisplayProducts && !!products.totalCount;
  // Filter Dropdown 

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showFilter = () => {
    this.showFilterMobile = true;
  };

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  /**
   * facets logic
   */

  const [selectedPrices, setPrices] = useState([])
  const [selectedCategories, setCategories] = useState([])
  const [selectedVendors, setVendors] = useState([])
  const [selectedAttributes, setAttributes] = useState([])
  const [selectedProductTypes, setProductTypes] = useState([])
  const [sidebarOpen, toggleSidebar] = useState(false)

  const isFilterSelected = sum([
    selectedPrices.length,
    selectedCategories.length,
    selectedVendors.length,
    selectedAttributes.length,
    selectedProductTypes.length,
    searchText.trim().length,
  ]) !== 0

  const { dispprice = [], emw_prod_vendorid = [], product_type_id = [] } = useMemo(() => {
    return getFacetsBuckets(facets)
  }, [facets]);

  const { atrvalsinprod = [] } = useMemo(() => {
    return getAttrFacetsBuckets(facets)
  }, [facets]);

  const disppriceWithName = dispprice.map(pricing => ({ ...pricing, name: pricing.key, type: "price" }))

  const toggleCategory = useCallback((category) => {
    if (selectedCategories.length) {
      const index = selectedCategories.findIndex(item => item.key === category.key)
      if (index > - 1) {
        const categoriesCopy = [...selectedCategories]
        categoriesCopy.splice(index, 1)
        setCategories([...categoriesCopy])
      } else {
        setCategories([...selectedCategories, category])
      }
    } else {
      setCategories([category])
    }
  }, [selectedCategories])

  const togglePrice = useCallback((price) => {
    if (selectedPrices.length) {
      const index = selectedPrices.findIndex(item => item.key === price.key)

      if (index > - 1) {
        const pricesCopy = [...selectedPrices]
        pricesCopy.splice(index, 1)
        setPrices([...pricesCopy])
      } else {
        setPrices([...selectedPrices, price])
      }

    } else {
      setPrices([price])
    }
  }, [selectedPrices])

  const toggleVendor = useCallback((vendor) => {
    if (selectedVendors.length) {
      const index = selectedVendors.findIndex(item => item.key === vendor.key)

      if (index > - 1) {
        const vendorsCopy = [...selectedVendors]
        vendorsCopy.splice(index, 1)
        setVendors([...vendorsCopy])
      } else {
        setVendors([...selectedVendors, vendor])
      }
    } else {
      setVendors([vendor])
    }
  }, [selectedVendors])

  const toggleProductTypes = useCallback((productType) => {
    if (selectedProductTypes.length) {
      const index = selectedProductTypes.findIndex(item => item.key === productType.key)

      if (index > - 1) {
        const productTypesCopy = [...selectedProductTypes]
        productTypesCopy.splice(index, 1)
        setProductTypes([...productTypesCopy])
      } else {
        setProductTypes([...selectedProductTypes, productType])
      }
    } else {
      setProductTypes([productType])
    }
  }, [selectedProductTypes])

  const toggleAttributes = useCallback((attribute) => {
    if (selectedAttributes.length) {
      const index = selectedAttributes.findIndex(item => item.key === attribute.key)

      if (index > - 1) {
        const attributesCopy = [...selectedAttributes]
        attributesCopy.splice(index, 1)
        setAttributes([...attributesCopy])
      } else {
        setAttributes([...selectedAttributes, attribute])
      }
    } else {
      setAttributes([attribute])
    }
  }, [selectedAttributes])

  const toggleSelected = useCallback(item => {
    switch (item.type) {
      case "vendor":
        toggleVendor(item);
        break;
      case "productType":
        toggleProductTypes(item);
        break;
      case "category":
        toggleCategory(item);
        break;
      case "attribute":
        toggleAttributes(item);
        break;
      case "price":
        togglePrice(item);
        break;
    }
  }, [toggleVendor, toggleProductTypes, toggleCategory, toggleAttributes, togglePrice])


  useEffect(() => {
    onFacetsChange({
      selectedVendors, selectedPrices, selectedCategories, selectedAttributes, selectedProductTypes, searchText,
    })
  }, [selectedVendors, selectedPrices, selectedCategories, selectedAttributes, selectedProductTypes, searchText, onFacetsChange])

  useEffect(() => {
    if (products && products.edges) {
      const items = products && products.edges;
      GAImpression(items, "", "Search Results", false);
    }

    // page load timings 
    if (window.performance) {
      const start = window.performance.getEntriesByName(`${location.pathname}_START`, "mark");
      if (start && start.length > 0) {
        const end = window.performance.mark(`${location.pathname}_END`);
        window.performance.measure('myMeasure', `${location.pathname}_START`, `${location.pathname}_END`);
        const entries = window.performance.getEntriesByType('measure');

        if (entries && entries.length > 0 && entries[0].duration) {
          // Sends the timing hit to Google Analytics.
          ReactGA.timing({
            category: 'Site Search Page Load Time',
            variable: `${location.pathname}`,
            value: Math.round(entries[0].duration), // in milliseconds
            label: window.location.pathname,
          });
        }
        // Finally, clean up the entries.
        performance.clearMarks();
        performance.clearMeasures();
      } else {
        const timeSincePageLoad = Math.round(performance.now());
        ReactGA.timing({
          category: 'Site Search Page Load Time',
          variable: `${location.pathname}`,
          value: timeSincePageLoad, // in milliseconds
          label: window.location.pathname,
        });
      }
    }
  }, [products])
  /**
   * Pagination Logic
   */
  /*
 Product Pagination Logic
*/
  const totalProduct = products.totalCount;
  // const totalProduct = 25
  const pageLimit = 5;
  const productsLimit = 5;
  const proFrom = 1;
  let proTo = 5;
  let enableProPre = false
  let enableProNxt = false
  let showProductPage = true
  if (totalProduct === 0) {
    showProductPage = false
  } else if (totalProduct > productsLimit) {
    if (totalProduct > (proTo * productsLimit)) {
      enableProNxt = true
      proTo = totalProduct % productsLimit > 0 || totalProduct / productsLimit > proTo ? proTo : (totalProduct / productsLimit)
    } else {
      proTo = totalProduct % productsLimit > 0 ? (totalProduct / productsLimit) + 1 : (totalProduct / productsLimit)
    }

  } else if (totalProduct < productsLimit) {
    enableProPre = false
    enableProNxt = false
    proTo = 1
  } else {
    enableProPre = false
    enableProNxt = false
    proTo = totalProduct % productsLimit > 0 || totalProduct / productsLimit > proTo ? proTo : (totalProduct / productsLimit)
  }
  const [totalProductCount, settotalProduct] = useState(totalProduct);
  const [showProductPagination, setshowProductPagination] = useState(showProductPage);
  const [productTo, setproductTo] = useState(proTo);
  const [productFrom, setproductFrom] = useState(proFrom);
  const [productActivePage, setproductActivePage] = useState(0);
  const [enablePPre, setenablePPre] = useState(enableProPre);
  const [enablePNxt, setenablePNxt] = useState(enableProNxt);
  const [lastPIndex, setlastPIndex] = useState(productsLimit);
  const [firstPIndex, setfirstPIndex] = useState(1);
  const [notFoundText, setNotFoundText] = useState(qSearchText)

  useEffect(() => {
    setNotFoundText(searchText)
  }, [setNotFoundText, searchText])

  useEffect(() => {
    settotalProduct(products.totalCount)

    // report GA Event for No Term Found
    if(!products.totalCount){
      GACustomEvent("Search Term With No Results",'Search',searchText);
    }

  }, [products])

  /**
   * Re-render Pagination When Product Props Changes
   */
  // let prevCategory = usePrevious(category);

  const onLimitChange = (e) => {
    const limit = e.value
    setproductLimit(limit)
    // onLoadLimit(pageLimit * limit)
  }


  const combinedSelectedFilters = [
    ...selectedProductTypes,
    ...selectedVendors,
    ...selectedAttributes,
    ...selectedCategories,
    ...selectedPrices,   
  ]

  const resetAllFilters = () => {
    setAttributes([])
    setPrices([])
    setVendors([])
    setAttributes([])
    setCategories([])
    setSearchText("")
  }

  const renderFilterBlock = (
    <div style={{
      display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between',
    }}>
      <div style={{
        flex: 1,
      }}>
        <p className="search-text-container">{searchText ? <>Search Results for "<span className="searchText">{searchText}</span>"</> : null}</p>
        <p className="results-container">{products.totalCount} Results Found</p>
      </div>
      <div style={{
        flex: 2,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}>
        <div className="filters-bx">
          <ul>
            <li onClick={onEnableProductGridview}>
              <img src={ProductGridView ? gridViewicoActive : gridViewico} alt="" />
            </li>
            <li onClick={onEnableProductListview}>
              <img src={ProductGridView ? listViewico : listViewicoActive} alt="" />
            </li>
          </ul>
        </div>
        <div className="pageCount-bx">
          <DropdownSelect
            onChange={onLimitChange}
            options={[{ label: "25", value: 25 }, { label: "50", value: 50 }, { label: "75", value: 75 }, { label: "100", value: 100 }]}
            value={{ label: productLimit, value: productLimit }}
          />
        </div>
        <div className="pageCount-bx">
          <DropdownSelect
            onChange={onOrder}
            options={sortOptions}
            value={sortOptions.find(
              option => option.value === activeSortOption
            )}
          />
        </div>
        {showProductPagination &&
          <Pagination
            onCategoryNext={onLoadMore}
            onCategoryPrevious={onLoadMore}
            enableCPre={false}
            enableCNxt={pageInfo.hasNextPage}
            productLimit={productLimit}
          />
        }
      </div>
    </div>
  )

  const breadCrumb = (
    <Breadcrumbs breadcrumbs={
      (searchText || qSearchText) ?
        [
          {
            link: window.location.href,
            value: `"${(searchText || qSearchText).toUpperCase()}"`,
          },
        ] :
        []
    }
    />
  )

  if (totalProductCount <= 0 && !displayLoader) {


    return (
      <div className="site-search">
        <div className="no-results-found-search container-fluid">
          {breadCrumb}
          <div className="productListWrapper">
            <div className="productListFilter-bx">
              <div style={{
                flex: 1,
              }}>
                <p className="search-text-container">No Results found for "<span className="searchText">{qSearchText}</span>"</p>
              </div>
            </div>
          </div>
          <div className="message-container">
            <h2 className="sorry-heading">Sorry, we couldn’t find "<span className="searchText">{qSearchText}</span>"</h2>
            <div className="info-container">

              <p className="info-text">But we are happy to help you find what you are looking for.</p>
              <p className="info-text">Please check spelling or item number entered and try the search again with adjustments.</p>
            </div>
            <div className="search-container">
              <form onSubmit={(e) => {
                setSearchText(notFoundText)
                e.preventDefault()
              }}>
                <input value={notFoundText} onChange={e => setNotFoundText(e.target.value)} type="text" />
              </form>
            </div>
            <div className="info-container">
              <p className="info-text">Sometimes its a good idea to start over and search by specs and our home page will present our primary categories to conduct a search by specs.</p>
              <p className="info-text">If you require further assitance, our staff will be happy to help by contacting us below.</p>
            </div>
            <div className="button-container">
              <Link to={BASE_URL}>
                <button>Home</button>
              </Link>
              {/* <Link to={BASE_URL}>
                <button>Get A Quote</button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="site-search">

      {/* Main Page started Here */}
      <section>
        {/* Mobile Filter Started Here */}
        <div className="mobile__filterbx" style={{ display: this.showFilterMobile ? 'block' : 'none' }}>
          <div className="mobile__filterbx__header">
            <div className="mobile__filterbx__header__search">
             <span className="refineText">REFINE YOUR SEARCH</span>
            </div>
            <span className="closeIcon">
              <img src={close} alt="" />
            </span>
          </div>
          <div className="mobile__filterbx__body">
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<img src={plusIcon} alt="ShapeIcon" />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="filter-header1"
                className="filter__collapsebx"
              >
                <h6>Horsepower</h6>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div color="textSecondary">
                  <span className="filterItem">100-900</span>
                  <span className="filterItem">800-1100</span>
                  <span className="filterItem selected">1000-1200</span>
                  <span className="filterItem">1300-1800</span>
                  <span className="filterItem selected">1000-2500</span>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<img src={plusIcon} alt="ShapeIcon" />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="filter-header2"
                className="filter__collapsebx"
              >
                <h6>RPM</h6>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div color="textSecondary">
                  <span className="filterItem">100-900</span>
                  <span className="filterItem">800-1100</span>
                  <span className="filterItem selected">1000-1200</span>
                  <span className="filterItem">1300-1800</span>
                  <span className="filterItem selected">1000-2500</span>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<img src={plusIcon} alt="ShapeIcon" />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="filter-header3"
                className="filter__collapsebx"
              >
                <h6>NEMA Frame Size</h6>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div color="textSecondary">
                  <span className="filterItem">100-900</span>
                  <span className="filterItem">800-1100</span>
                  <span className="filterItem selected">1000-1200</span>
                  <span className="filterItem">1300-1800</span>
                  <span className="filterItem selected">1000-2500</span>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<img src={plusIcon} alt="ShapeIcon" />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="filter-header4"
                className="filter__collapsebx"
              >
                <h6>Voltage</h6>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div color="textSecondary">
                  <span className="filterItem">100-900</span>
                  <span className="filterItem">800-1100</span>
                  <span className="filterItem selected">1000-1200</span>
                  <span className="filterItem">1300-1800</span>
                  <span className="filterItem selected">1000-2500</span>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<img src={plusIcon} alt="ShapeIcon" />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="filter-header5"
                className="filter__collapsebx"
              >
                <h6>Enclosure</h6>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div color="textSecondary">
                  <span className="filterItem">100-900</span>
                  <span className="filterItem">800-1100</span>
                  <span className="filterItem selected">1000-1200</span>
                  <span className="filterItem">1300-1800</span>
                  <span className="filterItem selected">1000-2500</span>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<img src={plusIcon} alt="ShapeIcon" />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="filter-header6"
                className="filter__collapsebx"
              >
                <h6>NEMA Mounting</h6>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div color="textSecondary">
                  <span className="filterItem">100-900</span>
                  <span className="filterItem">800-1100</span>
                  <span className="filterItem selected">1000-1200</span>
                  <span className="filterItem">1300-1800</span>
                  <span className="filterItem selected">1000-2500</span>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<img src={plusIcon} alt="ShapeIcon" />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="filter-header7"
                className="filter__collapsebx"
              >
                <h6>Application</h6>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div color="textSecondary">
                  <span className="filterItem">100-900</span>
                  <span className="filterItem">800-1100</span>
                  <span className="filterItem selected">1000-1200</span>
                  <span className="filterItem">1300-1800</span>
                  <span className="filterItem selected">1000-2500</span>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<img src={plusIcon} alt="ShapeIcon" />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="filter-header8"
                className="filter__collapsebx"
              >
                <h6>Efficiency</h6>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div color="textSecondary">
                  <span className="filterItem">100-900</span>
                  <span className="filterItem">800-1100</span>
                  <span className="filterItem selected">1000-1200</span>
                  <span className="filterItem">1300-1800</span>
                  <span className="filterItem selected">1000-2500</span>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
          <div className="mobile__filterbx__footer">
            <button className="resetBtn">RESET ALL</button>
            <button className="viewResultBtn">VIEW RESULTS</button>
          </div>
        </div>
        <div className="container-fluid top-space">
          {breadCrumb}
          </div>
          {/* Left Sidebar Started Here */}
          <div className="container-fluid">
          {
            (displayLoader) ?
              <div className="category_sidebar site-search-loader-wrapper">
                <ReactSVG path={loader} className="medium-size-loader" />
              </div>
              :
              <Srcollbar className={`category_sidebar ${sidebarOpen ? "open" : ""} ${!totalProduct && !isFilterSelected ? "visibility-hidden" : ""}`}>
                <div className="category_sidebar__searchbx">
                  {/* <input type="text" disabled readOnly={true} placeholder="Refine Your Search" onChange={e => setSearchText(e.target.value)} /> */}
                  <span className="refineText">REFINE YOUR SEARCH</span>
                  <span className="close-sidebar-icon" onClick={() => toggleSidebar(false)}><ReactSVG
                path={closeImg}
                className="overlay__header__close-icon"
              /></span>
                </div>
                <div className="mobile-filter-actions">
                  <button onClick={resetAllFilters} className="resetBtn">RESET ALL</button>
                  <button onClick={() => toggleSidebar(false)} className="viewResultBtn">VIEW RESULTS</button>
                </div>
                <div className="applyFilter-wrapper emw-filter-bg">
                  {
                    combinedSelectedFilters.map(
                      (item) => {
                        return <span key={item.key} className={`filterItem selected filterblock`} onClick={() => toggleSelected(item)}>{item.name} <span key={item.key} className="closeIcon">x</span></span>
                      }
                    )
                  }
                </div>
                {/* <div className="applyFilter-wrapper">
                  {
                    disppriceWithName.map(
                      (pricing) => {
                        const selected = selectedPrices.find(item => item.key === pricing.key)
                        return <span key={pricing.key} className={`filterItem ${selected ? "selected" : ""}`} onClick={() => togglePrice(pricing)}>{pricing.key}</span>
                      }
                    )
                  }
                </div> */}
                {/* <CategoryFacetsViewer
              categories={category.emwChildren.edges.map(edge => ({
                ...edge.node,
                key: edge.node.emwCatId
              }))}
              selectedCategories={selectedCategories}
              onSelect={toggleCategory}
            /> */}
              <ProductTypeFacetsViewer
                    productTypes={product_type_id || []}
                    selectedProductTypes={selectedProductTypes}
                    onSelect={toggleProductTypes}
                  />
                
                {product_type_id && (product_type_id.length === 1 || selectedProductTypes.length > 0) ?
                <>
                <VendorFacetsViewer
                  vendors={emw_prod_vendorid || []}
                  selectedVendors={selectedVendors}
                  onSelect={toggleVendor}
                />
                <AttributeFacetsViewer
                  attributes={atrvalsinprod}
                  selectedAttributes={selectedAttributes}
                  onSelect={toggleAttributes}
                />
                </>                
                : null }
                {
                  (selectedProductTypes && selectedProductTypes.length==0) &&  
                  <div className="emw-product-type-filter-msg">
                    Select a product type above to begin filtering results by product attributes.
                  </div>
                }
                <div className="mobile-filter-actions">
                  <button onClick={resetAllFilters} className="resetBtn">RESET ALL</button>
                  <button onClick={() => toggleSidebar(false)} className="viewResultBtn">VIEW RESULTS</button>
                </div>
              </Srcollbar>
          }
          {/* Left Sidebar Ended Here */}

          <div className="categoryWrapper">
            {(canDisplayProducts && totalProductCount > 0) ?

              <div className="productListWrapper">
                <div className="productListFilter-bx">
                  {renderFilterBlock}
                </div>

                {/* Mobile Product Filter */}
                <div className="mobileProductFilter">
                  <div style={{
                    flex: 1,
                  }}>
                    <p className="search-text-container">{searchText ? <>Search Results for "<span className="searchText">{searchText}</span>"</> : null}</p>
                    <p className="results-container">{products.totalCount} Results Found</p>
                  </div>
                </div>
                <div className="mobileProductFilter">
                  <div className="pageCount-bx">
                    <select onChange={(e) => onOrder(
                      sortOptions.find(
                        option => option.value === e.target.value
                      )
                    )} value={
                      (sortOptions.find(
                        option => option.value === activeSortOption
                      ) || {}).value
                    }>
                      {
                        sortOptions.map(sortOption => {
                          return <option key={Math.random()} value={sortOption.value}>{sortOption.label}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className="mobileProductFilter-rightIcon">
                    <ul>
                      <li onClick={onEnableProductListview}><a><img src={ProductGridView ? listImg : listImgActive} alt="list View Icon" /></a></li>
                      <li onClick={onEnableProductGridview}><a><img src={ProductGridView ? gridImgActive : gridImg} alt="Grid View Icon" /></a></li>
                    </ul>
                  </div>
                </div>

                <div className="productPagination-wrap">

                  <div className="pageCount-bx">
                    <DropdownSelect
                      onChange={onLimitChange}
                      options={[{ label: "25", value: 25 }, { label: "50", value: 50 }, { label: "75", value: 75 }, { label: "100", value: 100 }]}
                      value={{ label: productLimit, value: productLimit }}
                    />
                  </div>
                  {showProductPagination &&
                    <Pagination
                      onCategoryNext={onLoadMore}
                      onCategoryPrevious={onLoadMore}
                      enableCPre={false}
                      enableCNxt={pageInfo.hasNextPage}
                      productLimit={productLimit}
                    />
                  }
                </div>
                {canDisplayProducts && (
                  <>

                    {ProductGridView && (
                      <>
                        <ProductsList
                          firstPIndex={firstPIndex}
                          lastPIndex={lastPIndex}
                          displayLoader={displayLoader}
                          hasNextPage={hasNextPage}
                          onLoadMore={onLoadMore}
                          products={products.edges.map(edge => edge.node)}
                          totalCount={products.totalCount}
                          notFound={notFoundMessage}
                        />
                      </>
                    )}

                    {!ProductGridView && (
                      <>
                        <ProductsListView
                          firstPIndex={firstPIndex}
                          lastPIndex={lastPIndex}
                          displayLoader={displayLoader}
                          hasNextPage={hasNextPage}
                          onLoadMore={onLoadMore}
                          products={products.edges.map(edge => edge.node)}
                          totalCount={products.totalCount}
                          notFound={notFoundMessage}
                        />
                      </>
                    )}

                  </>
                )}

                <div className="productListFilter-bx productListFilter-bx-bottom">
                  {renderFilterBlock}
                </div>

                {/* Mobile pagination Bottom   */}
                <div className="productPagination-wrap">

                  <div className="pageCount-bx">
                    <DropdownSelect
                      onChange={onLimitChange}
                      options={[{ label: "25", value: 25 }, { label: "50", value: 50 }, { label: "75", value: 75 }, { label: "100", value: 100 }]}
                      value={{ label: productLimit, value: productLimit }}
                    />
                  </div>
                  {showProductPagination &&
                    <Pagination
                      onCategoryNext={onLoadMore}
                      onCategoryPrevious={onLoadMore}
                      enableCPre={false}
                      enableCNxt={pageInfo.hasNextPage}
                      productLimit={productLimit}
                    />
                  }
                </div>



                {/* Product Pagination Wrapper */}

                {/* Daynmic Product Grid Ended Here*/}

              </div> : null}
            {/* Product List Wrapper Started Here */}

          </div>
        </div>
      </section>

      <div className="container">

      </div>

      <Fab aria-label="add"
        className={`filter-fab-icon ${!totalProductCount && !isFilterSelected ? "hidden" : ""}`}
        onClick={() => toggleSidebar(true)}
      >
        <img src={sortingico} alt="" />
      </Fab>
    </div>
  );
};

export default Page;
