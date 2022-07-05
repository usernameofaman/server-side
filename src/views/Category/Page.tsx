import "./scss/index.scss";
import { IFilterAttributes, IFilters } from "@types";
// import { ProductListHeader } from "../../@next/components/molecules";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  Breadcrumbs,
  Categories,
  CategoriesMobile,
  extractBreadcrumbs,
  // ProductsFeatured,
  ProductsList,
  Pagination,
} from "../../components";
import { Helmet } from 'react-helmet'

import CategoriesListView from "../../components/Categories/list";

import ProductsListView from "../../components/ProductsList/list";

import { Category_category, Category_products } from "./types/Category";

import {
  EMWCategory_emwcategory,
  EMWCategory_emwproducts,
} from "./types/EMWCategory";

// import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";
import { maybe } from "../../core/utils";

import gridImg from "../../images/gridView.svg";
import listImg from "../../images/listView.svg";

// Active icon
import gridImgActive from "../../images/gridView-active.svg";
import listImgActive from "../../images/listView-active.svg";

import ShapeIcon from "../../images/Shape.png";
import Shapewhite from "../../images/Shape-white.svg";

import collapseIcon from "../../images/collapse.svg";
import expandIcon from "../../images/expand.svg";

import listViewico from "../../images/listViewico.svg";
import gridViewico from "../../images/gridViewico.svg";
import sortingico from "../../images/sortingico.svg";

// Desktop active icon
import listViewicoActive from "../../images/listViewicoActive.svg";
import gridViewicoActive from "../../images/gridViewicoActive.svg";
import sortingicoActive from "../../images/sortingicoActive.svg";

// import product from '../../images/product.png'
import plusIcon from "../../images/plus-icon.png";
import close from "../../images/close.svg";
// import leftArrow from '../../images/left-arrow.svg'
// import rightArrow from '../../images/right-arrow.svg'

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import Grid from '@material-ui/core/Grid';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { DropdownSelect } from "@components/atoms";
import CategoryFacetsViewer from "@temp/components/Categories/facets/CategoryFacetsViewer";
import VendorFacetsViewer from "@temp/components/Categories/facets/VendorFacetsViewer";
import AttributeFacetsViewer from "@temp/components/Categories/facets/AttributeFacetsViewer";
import ProductTypeFacetsViewer from "@temp/components/Categories/facets/ProductTypeFacetsViewer";
import { sum } from "lodash";
import { Fab } from "@material-ui/core";
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import Fade from '@material-ui/core/Fade';
import { GAImpression } from "../../utils/Google-Analytics";
import ReactGA from "react-ga";

import Srcollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import EMWFroalaViewer from "../../components/EMWFroalaViewer";
import ReactSVG from "react-svg";
import closeImg from "../../images/login-close.svg";
import loader from "../../images/emw-loader.svg";
import { history } from "../../history";
import qs from "query-string";
import Skeleton from "@material-ui/lab/Skeleton";
import CategoryProductSkeletons from "./CategoryProductSkeletons";

const notFoundMessage =
  "Your filter options are not showing a match.Try adjusting your filters";

interface ProductFacetsList {
  emw_prod_catid?: any[];
  dispprice?: any[];
  emw_prod_vendorid?: any[];
  atrvalsinprod?: any[];
  product_type_id: any[];
}

const getFacetsBuckets = (
  facets: GrapheneElasticFacetsEMWProductElasticCountableElasticConnectionBackendEnum
): ProductFacetsList => {
  return Object.keys(facets).reduce((result, key) => {
    result[key] =
      (facets[key] && facets[key].aggs && facets[key].aggs.buckets) || [];
    return result;
  }, {});
};

const getAttrFacetsBuckets = (
  facets: GrapheneElasticFacetsEMWProductElasticCountableElasticConnectionBackendEnum
): ProductFacetsList => {
  return Object.keys(facets).reduce((result, key) => {
    result[key] =
      (facets[key] &&
        facets[key].aggs &&
        facets[key].aggs.inner &&
        facets[key].aggs.inner.buckets) ||
      [];
    return result;
  }, {});
};

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  CategoryGridView: boolean;
  ProductGridView: boolean;
  category: EMWCategory_emwcategory;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  showFilterMobile: boolean;
  products: EMWCategory_emwproducts;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: (limit) => void;
  onLoadPrev: (limit) => void;
  // onLoadLimit: (limit) => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
  onEnableCategoryListview: () => void;
  onEnableCategoryGridview: () => void;
  onEnableProductListview: () => void;
  onEnableProductGridview: () => void;
  onChangeProductLimit: (limit: number) => void;
  facets: GrapheneElasticFacetsEMWProductElasticCountableElasticConnectionBackendEnum;
  onFacetsChange: (facetsFilters: any) => void;
  vendorFacetsList: any[];
  setVendorFacetsList: (vendors: any[]) => void;
  productTypesFacetsList: any[];
  setProductTypeFacetsList: (productTypes: any[]) => void;
  productLimit: any;
  setproductLimit: any;
  pageInfo: any;
  currentPageNumber: any;
  setFacetSelectedFlag: any;
  intialProductFlag: boolean;
  productCountFacetedResults: any;
}

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Page: React.FC<PageProps> = ({
  activeSortOption,
  CategoryGridView,
  ProductGridView,
  category,
  displayLoader,
  hasNextPage,
  onLoadMore,
  onLoadPrev,
  products,
  onOrder,
  sortOptions,
  onEnableCategoryListview,
  onEnableCategoryGridview,
  onEnableProductListview,
  onEnableProductGridview,
  onChangeProductLimit,
  onAttributeFiltersChange,
  onFacetsChange,
  vendorFacetsList,
  setVendorFacetsList,
  productTypesFacetsList,
  setProductTypeFacetsList,
  facets,
  productLimit,
  setproductLimit,
  pageInfo,
  currentPageNumber,
  setFacetSelectedFlag,
  intialProductFlag,
  productCountFacetedResults,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  const [CategoryDivVisible, setCategoryDivVisible] = React.useState(true);
  
  const hasProducts = canDisplayProducts && !!products.totalCount;
  const [] = React.useState(false);
  const subCategoriesExist = () => {
    return (
      category.emwChildren &&
      category.emwChildren.edges &&
      category.emwChildren.edges.length > 0
    );
  };

  useEffect(() => {
    // Page Load Timings
    if (window.performance) {
      const start = window.performance.getEntriesByName(
        `${location.pathname}_START`,
        "mark"
      );
      if (start && start.length > 0) {
        const end = window.performance.mark(`${location.pathname}_END`);
        window.performance.measure(
          "myMeasure",
          `${location.pathname}_START`,
          `${location.pathname}_END`
        );
        const entries = window.performance.getEntriesByType("measure");

        if (entries && entries.length > 0 && entries[0].duration) {
          // Sends the timing hit to Google Analytics.
          ReactGA.timing({
            category: "Category Page Load Time",
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
          category: "Category Page Load Time",
          variable: `${location.pathname}`,
          value: timeSincePageLoad, // in milliseconds
          label: window.location.pathname,
        });
      }
      ReactGA.ga("send", "pageview", {
        page: location.pathname + location.search,
        title: category.seoTitle,
      });
    }
  }, [category]);

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

  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  /**
   * facets logic
   */

  const [selectedPrices, setPrices] = useState([]);
  const [selectedCategories, setCategories] = useState([]);
  const [selectedVendors, setVendors] = useState([]);
  const [selectedAttributes, setAttributes] = useState([]);
  const [selectedProductTypes, setProductTypes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sidebarOpen, toggleSidebar] = useState(false);

  const isFilterSelected =
    sum([
      selectedPrices.length,
      selectedCategories.length,
      selectedVendors.length,
      selectedAttributes.length,
      selectedProductTypes.length,
      searchText.trim().length,
    ]) !== 0;

  useEffect(() => {
    const parsed = qs.parse(window.location.search);
    let productTypesArray = [];
    let vendorArray = [];
    let attributeArray = [];
    if (parsed && parsed["productType"]) {
      productTypesArray = JSON.parse(parsed["productType"]);
    }
    if (parsed && parsed["vendor"]) {
      vendorArray = JSON.parse(parsed["vendor"]);
    }
    if (parsed && parsed["attribute"]) {
      attributeArray = JSON.parse(parsed["attribute"]);
    }

    if (parsed["vendor"] || parsed["productType"] || parsed["attribute"]) {
      let savingFiltersObj = {
        selectedVendors: vendorArray,
        selectedPrices: [],
        selectedCategories: [],
        selectedAttributes: attributeArray,
        selectedProductTypes: productTypesArray,
        searchText: "",
      };
      setFacetFilterProducts();
      onFacetsChange(savingFiltersObj);
    }

    setPrices([]);
    setCategories([]);
    setVendors(vendorArray);
    setVendorFacetsList(null);
    setProductTypeFacetsList(null);
    setAttributes(attributeArray);
    setProductTypes(productTypesArray);
    setSearchText("");
  }, [category.emwCatId, window.location.search]);

  const {
    dispprice = [],
    emw_prod_vendorid = [],
    product_type_id = [],
  } = useMemo(() => {
    return getFacetsBuckets(facets);
  }, [facets]);

  const { atrvalsinprod = [] } = useMemo(() => {
    return getAttrFacetsBuckets(facets);
  }, [facets]);

  useEffect(() => {
    if (emw_prod_vendorid.length) {
      setVendorFacetsList(emw_prod_vendorid);
    }
  }, [emw_prod_vendorid, vendorFacetsList]);

  useEffect(() => {
    if (product_type_id.length) {
      setProductTypeFacetsList(product_type_id);
    }
  }, [product_type_id, productTypesFacetsList]);

  const disppriceWithName = dispprice.map(pricing => ({
    ...pricing,
    name: pricing.key,
    type: "price",
  }));

  const toggleCategory = useCallback(
    category => {
      if (selectedCategories.length) {
        const index = selectedCategories.findIndex(
          item => item.key === category.key
        );
        if (index > -1) {
          const categoriesCopy = [...selectedCategories];
          categoriesCopy.splice(index, 1);
          setCategories([...categoriesCopy]);
        } else {
          setCategories([...selectedCategories, category]);
        }
      } else {
        setCategories([category]);
      }
    },
    [selectedCategories]
  );

  const togglePrice = useCallback(
    price => {
      if (selectedPrices.length) {
        const index = selectedPrices.findIndex(item => item.key === price.key);

        if (index > -1) {
          const pricesCopy = [...selectedPrices];
          pricesCopy.splice(index, 1);
          setPrices([...pricesCopy]);
        } else {
          setPrices([...selectedPrices, price]);
        }
      } else {
        setPrices([price]);
      }
    },
    [selectedPrices]
  );

  const setFacetFilterProducts = () => {
    // set true to disable inital loaded products
    setFacetSelectedFlag(true);
  };
  const addFiltersInUrl = (selectedTypes, type) => {
    const parsed = qs.parse(window.location.search);
    let filterUrl = "";
    let filter = {};
    if (parsed && parsed["no-cache"]) {
      filter["no-cache"] = true;
    }
    if (parsed && parsed["productType"] && type !== "productType") {
      filter["productType"] = parsed["productType"];
    } else if (type == "productType" && selectedTypes.length > 0) {
      filter["productType"] = JSON.stringify(selectedTypes);
    }

    if (parsed && parsed["vendor"] && type !== "vendor") {
      filter["vendor"] = parsed["vendor"];
    } else if (type == "vendor" && selectedTypes.length > 0) {
      filter["vendor"] = JSON.stringify(selectedTypes);
    }

    if (parsed && parsed["attribute"] && type !== "attribute") {
      filter["attribute"] = parsed["attribute"];
    } else if (type == "attribute" && selectedTypes.length > 0) {
      filter["attribute"] = JSON.stringify(selectedTypes);
    }
    // console.log('persisted filterss obj--',filter);
    filterUrl = qs.stringify(filter);
    const pathname = window.location.pathname;
    history.push(`${pathname}?${filterUrl}`);
  };
  const toggleVendor = useCallback(
    vendor => {
      let selectedTypes = [];
      if (selectedVendors.length) {
        const index = selectedVendors.findIndex(
          item => item.key === vendor.key
        );
        setFacetFilterProducts();
        if (index > -1) {
          const vendorsCopy = [...selectedVendors];
          vendorsCopy.splice(index, 1);
          setVendors([...vendorsCopy]);
          selectedTypes = [...vendorsCopy];
        } else {
          setVendors([...selectedVendors, vendor]);
          selectedTypes = [...selectedVendors, vendor];
        }
      } else {
        setFacetFilterProducts();
        setVendors([vendor]);
        selectedTypes = [vendor];
      }
      addFiltersInUrl(selectedTypes, "vendor");
    },
    [selectedVendors]
  );

  const toggleProductTypes = useCallback(
    productType => {
      let selectedTypes = [];
      if (selectedProductTypes.length) {
        const index = selectedProductTypes.findIndex(
          item => item.key === productType.key
        );
        setFacetFilterProducts();
        if (index > -1) {
          const productTypesCopy = [...selectedProductTypes];
          productTypesCopy.splice(index, 1);
          selectedTypes = [...productTypesCopy];
          setProductTypes([...productTypesCopy]);
        } else {
          setProductTypes([...selectedProductTypes, productType]);
          selectedTypes = [...selectedProductTypes, productType];
        }
      } else {
        setFacetFilterProducts();

        setProductTypes([productType]);
        selectedTypes = [productType];
      }
      addFiltersInUrl(selectedTypes, "productType");
    },
    [selectedProductTypes]
  );

  const toggleAttributes = useCallback(
    attribute => {
      let selectedTypes = [];
      if (selectedAttributes.length) {
        const index = selectedAttributes.findIndex(
          item => item.key === attribute.key
        );
        setFacetFilterProducts();
        if (index > -1) {
          const attributesCopy = [...selectedAttributes];
          attributesCopy.splice(index, 1);
          setAttributes([...attributesCopy]);
          selectedTypes = [...attributesCopy];
        } else {
          setAttributes([...selectedAttributes, attribute]);
          selectedTypes = [...selectedAttributes, attribute];
        }
      } else {
        setFacetFilterProducts();
        setAttributes([attribute]);
        selectedTypes = [attribute];
      }
      addFiltersInUrl(selectedTypes, "attribute");
    },
    [selectedAttributes]
  );

  const toggleSelected = useCallback(
    item => {
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
    },
    [
      toggleVendor,
      toggleProductTypes,
      toggleCategory,
      toggleAttributes,
      togglePrice,
    ]
  );

  useEffect(() => {
    onFacetsChange({
      selectedVendors,
      selectedPrices,
      selectedCategories,
      selectedAttributes,
      selectedProductTypes,
      searchText,
    });
    if (
      selectedAttributes.length ||
      selectedVendors.length ||
      selectedProductTypes.length
    ) {
      setCategoryDivVisible(false);
    }
  }, [
    selectedVendors,
    selectedPrices,
    selectedCategories,
    selectedAttributes,
    selectedProductTypes,
    searchText,
    onFacetsChange,
  ]);

  useEffect(() => {
    if (category && category.name && products && products.edges) {
      const items = products && products.edges;
      GAImpression(items, category.name, "Category Listing", true);
    }
  }, [category, products]);
  /**
   * Pagination Logic
   */

  const totalCategory = category.emwChildren.edges.length;
  // const totalCategory = 12;
  const categoryLimit = 4;

  const [totalCategoryCount, settotalCategory] = useState(totalCategory);

  /**
   * Re-render Pagination When Category Props Changes
   */
  useEffect(() => {
    settotalCategory(totalCategoryCount);
  }, [category]);

  /*
 Product Pagination Logic
*/
  const totalProduct = products && products.totalCount;
  // const totalProduct = 25
  // const productsLimit = productLimit;
  // const proFrom = 1;
  // let proTo = 50;
  const enableProPre = false;
  const enableProNxt = false;
  const showProductPage = true;

  const [totalProductCount, settotalProduct] = useState(totalProduct);
  const [showProductPagination, setshowProductPagination] = useState(
    showProductPage
  );
  const [enablePPre, setenablePPre] = useState(enableProPre);
  const [enablePNxt, setenablePNxt] = useState(enableProNxt);
  // const [productLimit, setproductLimit] = useState(productsLimit);

  /**
   * Re-render Pagination When Product Props Changes
   */
  // let prevCategory = usePrevious(category);
  useEffect(() => {
    settotalProduct(totalProduct);
  }, [category.id, totalProduct]);

  const onLimitChange = e => {
    const limit = e.value;
    setproductLimit(limit);
    // onLoadLimit(pageLimit * limit)
  };

  const combinedSelectedFilters = [
    ...selectedProductTypes,
    ...selectedVendors,
    ...selectedAttributes,
    ...selectedPrices,
    ...selectedCategories,
  ];

  const resetAllFilters = () => {
    setAttributes([]);
    setPrices([]);
    setVendors([]);
    setAttributes([]);
    setCategories([]);
    setSearchText("");
  };

  return (
    <div className="category">
      <Helmet>
          <meta charSet="utf-8" />
          <link rel="canonical" href={process.env.REACT_APP_STOREFRONT_BASE_URL + window.location.pathname} />
        </Helmet>
      {/* Announcement box started here */}
      {/* <div className="announcementBanner">
            <div className="container">
              <h6>Announcement banner will appear here and push
                page content down a with ability to close ⓧ 
              </h6>
            </div>
          </div> */}
      {/* Announcement box ended here */}

      {/* Filter wrapper started here */}
      {/* <div className="filter-lightGray-Wrapper">
            <div className="container">
              <Breadcrumbs breadcrumbs={extractBreadcrumbs(category)} />
              <div className="filter-box">
                <div className="leftFilterbx">
                  <ul>
                    <li><a>Sort</a></li>
                    <li><a>Filter</a></li>
                  </ul>
                </div>
                <div className="rightFilterbx">
                  <ul>
                    <li><a><img src={listImg} alt="list View Icon"/></a></li>
                    <li><a><img src={gridImg} alt="Grid View Icon"/></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}

      {/* Main Page started Here */}
      <section className="category">
        {/* Mobile Filter Started Here */}
        <div
          className="mobile__filterbx"
          style={{ display: this.showFilterMobile ? "block" : "none" }}
        >
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
          <Breadcrumbs breadcrumbs={extractBreadcrumbs(category)} />
        </div>
        <div className="container-fluid">
          {/* Filter wrapper started here for Mobile */}
          {/* <div className="filter-lightGray-Wrapper">
            <div className="container">
              <div className="filter-box">
                <div className="leftFilterbx">
                  <ul>
                     <li><a aria-haspopup="true" className="dropdownItem" onClick={handleClick}>Sort</a>
                      <Menu
                      id="fade-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={open}
                      onClose={handleClose}

                      >
                      <MenuItem className="dropdownItem active" onClick={handleClose}>Price: Low-High</MenuItem>
                      <MenuItem className="dropdownItem" onClick={handleClose}>Price: High-Low</MenuItem>
                      <MenuItem className="dropdownItem" onClick={handleClose}>Name: A-Z</MenuItem>
                      <MenuItem className="dropdownItem" onClick={handleClose}>Name: Z-A</MenuItem>
                      </Menu>
                    </li> 
                    <li><a onClick={showFilter}>Filter</a></li>
                  </ul>
                </div>*/}

          {/* <div className="rightFilterbx">
                  <ul>
                    <li onClick={onEnableCategoryListview}><a><img src={listImg} alt="list View Icon" /></a></li>
                    <li onClick={onEnableCategoryGridview}><a><img src={gridImg} alt="Grid View Icon" /></a></li>
                  </ul>
                </div> 
              </div>*/}
          {/* <div className="mobile-applyFilter-Wrapper">
                <span className="resetBtn">Reset all</span>
                <span className="applyFilter-mobile">1300-1800 <a></a></span>
                <span className="applyFilter-mobile">900-1200 <a></a></span>
                <span className="applyFilter-mobile">1300-1800 <a></a></span>
                <span className="applyFilter-mobile">56 <a></a></span>
                <span className="applyFilter-mobile">56H <a></a></span>
              </div> 
            </div>
          </div>*/}

          {/* Left Sidebar Started Here */}
          {displayLoader && !intialProductFlag ? (
            <div className="category_sidebar category-mobile-facet-filter-skeleton">
              <Skeleton variant="text" animation="wave" height={25} />
              <Skeleton variant="text" animation="wave" height={25} />
              <Skeleton variant="text" animation="wave" height={25} />
              <Skeleton variant="text" animation="wave" height={25} />
              <Skeleton variant="text" animation="wave" height={25} />
              <Skeleton variant="text" animation="wave" height={25} />
              <Skeleton variant="text" animation="wave" height={25} />
              <Skeleton variant="text" animation="wave" height={25} />
              <Skeleton variant="text" animation="wave" height={25} />
              <Skeleton variant="text" animation="wave" height={25} />
              <Skeleton variant="text" animation="wave" height={25} />
            </div>
          ) : (
            <Srcollbar
              className={`category_sidebar ${sidebarOpen ? "open" : ""} ${
                !productCountFacetedResults && !isFilterSelected
                  ? "visibility-hidden"
                  : ""
              }`}
            >
              <div className="category_sidebar__searchbx">
                {/* <input type="text" disabled readOnly={true} placeholder="Refine Your Search" value={searchText} onChange={e => setSearchText(e.target.value)} /> */}
                <span className="refineText">REFINE YOUR SEARCH</span>
                <span
                  className="close-sidebar-icon"
                  onClick={() => toggleSidebar(false)}
                >
                  <ReactSVG
                    path={closeImg}
                    className="overlay__header__close-icon"
                  />
                </span>
              </div>
              <div className="mobile-filter-actions">
                <button onClick={resetAllFilters} className="resetBtn">
                  RESET ALL
                </button>
                <button
                  onClick={() => toggleSidebar(false)}
                  className="viewResultBtn"
                >
                  VIEW RESULTS
                </button>
              </div>
              <div className="applyFilter-wrapper emw-filter-bg">
                {combinedSelectedFilters.map(item => {
                  return (
                    <span
                      key={item.key}
                      className={`filterItem selected filterblock`}
                      onClick={() => toggleSelected(item)}
                    >
                      {item.name} <span className="closeIcon">x</span>
                    </span>
                  );
                })}
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
                productTypes={productTypesFacetsList || []}
                selectedProductTypes={selectedProductTypes}
                onSelect={toggleProductTypes}
              />

              {productTypesFacetsList &&
              (productTypesFacetsList.length === 1 ||
                selectedProductTypes.length > 0) ? (
                <>
                  <VendorFacetsViewer
                    vendors={vendorFacetsList || []}
                    selectedVendors={selectedVendors}
                    onSelect={toggleVendor}
                  />
                  <AttributeFacetsViewer
                    attributes={atrvalsinprod}
                    selectedAttributes={selectedAttributes}
                    onSelect={toggleAttributes}
                  />
                </>
              ) : null}

              {selectedProductTypes && selectedProductTypes.length == 0 && (
                <div className="emw-product-type-filter-msg">
                  Select a product type above to begin filtering results by
                  product attributes.
                </div>
              )}

              <div className="mobile-filter-actions">
                <button onClick={resetAllFilters} className="resetBtn">
                  RESET ALL
                </button>
                <button
                  onClick={() => toggleSidebar(false)}
                  className="viewResultBtn"
                >
                  VIEW RESULTS
                </button>
              </div>
            </Srcollbar>
          )}
          {/* Left Sidebar Ended Here */}

          <div className="categoryWrapper">
            {displayLoader && !intialProductFlag ? (
              <>
                <Skeleton
                  variant="rect"
                  animation="wave"
                  height={44}
                  className="category-header-skeleton"
                />
                <Skeleton
                  variant="rect"
                  animation="wave"
                  height={44}
                  className="category-header-skeleton"
                />
              </>
            ) : (
              <div className="categoryWrapper__toplistWrap">
                <div className="categoryWrapper__toplistWrap__header">
                  <h1>{category.name} </h1>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="filters-bx">
                      <ul>
                        <li onClick={onEnableCategoryGridview}>
                          <img
                            src={
                              CategoryGridView ? gridViewicoActive : gridViewico
                            }
                            alt=""
                          />
                        </li>
                        <li onClick={onEnableCategoryListview}>
                          <img
                            src={
                              CategoryGridView ? listViewico : listViewicoActive
                            }
                            alt=""
                          />
                        </li>
                        <li
                          onClick={() => {
                            setCategoryDivVisible(!CategoryDivVisible);
                          }}
                        >
                          <img
                            src={CategoryDivVisible ? collapseIcon : expandIcon}
                            alt="Grid View Icon"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {CategoryDivVisible ? (
                  <div className="categoryWrapper__toplistWrap__body">
                    <div className="category-mobile-Filterbx">
                      <div className="filters-bx">
                        <ul>
                          <li onClick={onEnableCategoryListview}>
                            <img
                              src={CategoryGridView ? listImg : listImgActive}
                              alt="list View Icon"
                            />
                          </li>
                          <li onClick={onEnableCategoryGridview}>
                            <img
                              src={CategoryGridView ? gridImgActive : gridImg}
                              alt="Grid View Icon"
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                    {category.description === null ? (
                      <p className="no-category-description">
                        Description Not Available.
                      </p>
                    ) : (
                      <div className="category-description-section">
                        <EMWFroalaViewer content={category.description} />
                      </div>
                    )}
                    {subCategoriesExist && CategoryGridView && (
                      <>
                        <Categories subCats={category.emwChildren} />
                      </>
                    )}
                    {subCategoriesExist && !CategoryGridView && (
                      <>
                        <CategoriesListView subCats={category.emwChildren} />
                      </>
                    )}
                    {/* <p dangerouslySetInnerHTML={{ __html: category.description === null ? "Description Not Available." : category.description}}>
                    </p> */}
                  </div>
                ) : null}

                {CategoryDivVisible ? (
                  <div className="categoryWrapper__toplistWrap__header emw-cat-bottom">
                    <h1>{category.name} </h1>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div className="filters-bx">
                        <ul>
                          <li
                            onClick={() => {
                              setCategoryDivVisible(!CategoryDivVisible);
                            }}
                          >
                            <img
                              src={
                                CategoryDivVisible ? collapseIcon : expandIcon
                              }
                              alt="Grid View Icon"
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {/*---------------------------- Mobile Category Design ------------------*/}
            <div className="categoryWrapper-mobile">
              {// (displayLoader && !intialProductFlag) ?
              displayLoader && !intialProductFlag ? (
                <>
                  <Skeleton
                    variant="rect"
                    animation="wave"
                    height={40}
                    className="category-mobile-skeleton-rounded"
                  />
                </>
              ) : (
                <div className="categoryName-bx">
                  <h1>{category.name}</h1>
                </div>
              )}
              {displayLoader && !intialProductFlag ? (
                <>
                  <Skeleton
                    variant="rect"
                    animation="wave"
                    height={40}
                    className="category-mobile-skeleton-rounded category-mobile-header-skeleton"
                  />
                </>
              ) : (
                <ExpansionPanel
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <ExpansionPanelSummary
                    expandIcon={<img src={Shapewhite} alt="ShapeIcon" />}
                    aria-label="Expand"
                    aria-controls="additional-actions3-content"
                    id="category-mobile2"
                    className="categoryMobile-collapse"
                  >
                    <h6>Subcategories</h6>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div className="subcat-wrap">
                      <div className="category-mobile-Filterbx">
                        {/* <div className="filters-bx">
                          <ul>
                            <li onClick={onEnableCategoryListview}>
                              <img src={CategoryGridView ? listImg : listImgActive} alt="list View Icon" />
                            </li>
                            <li onClick={onEnableCategoryGridview}>
                              <img src={CategoryGridView ? gridImgActive : gridImg} alt="Grid View Icon" />
                            </li>
                          </ul>
                        </div> */}
                      </div>
                      {subCategoriesExist && CategoryGridView && (
                        <>
                          <CategoriesMobile subCats={category.emwChildren} />
                        </>
                      )}
                      {subCategoriesExist && !CategoryGridView && (
                        <>
                          <CategoriesListView subCats={category.emwChildren} />
                        </>
                      )}
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )}
            </div>

            <div className="category-contentWrap">
              {displayLoader && !intialProductFlag ? (
                <>
                  <Skeleton
                    variant="rect"
                    animation="wave"
                    height={40}
                    className="category-mobile-skeleton-rounded"
                  />
                </>
              ) : (
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<img src={Shapewhite} alt="ShapeIcon" />}
                    aria-label="Expand"
                    aria-controls="additional-actions3-content"
                    id="category-mobile1"
                    className="categoryMobile-collapse"
                  >
                    <h6>Description</h6>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div className="subcat-wrap">
                      {/* <p dangerouslySetInnerHTML={{ __html: category.description === null ? "Description Not Available." : category.description}}>
                      </p> */}
                      {category.description === null ? (
                        <p>Description Not Available.</p>
                      ) : (
                        <div>
                          <EMWFroalaViewer content={category.description} />
                        </div>
                      )}
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )}
            </div>

            {/* Product List Wrapper Started Here */}

            {isFilterSelected ||
            (canDisplayProducts && totalProductCount > 0) ||
            (displayLoader && !isFilterSelected) ? (
              <div className="productListWrapper">
                {displayLoader && !intialProductFlag ? null : (
                  <div className="productListFilter-bx">
                    <div className="pageCount-bx category-result-section">
                      <DropdownSelect
                        dropdownClass={"category-list-dropdown-wrapper"}
                        onChange={onLimitChange}
                        options={[
                          { label: "25", value: 25 },
                          { label: "50", value: 50 },
                          { label: "75", value: 75 },
                          { label: "100", value: 100 },
                        ]}
                        value={{ label: productLimit, value: productLimit }}
                      />
                      {/* <span style={{marginLeft:"7px"}}>per page</span> */}
                      <div className="product-results-bx">
                        <span className="result-heading">Results:</span>
                        <span className="result-count">
                          {totalProductCount}
                        </span>
                      </div>
                    </div>

                    <div className="filters-bx">
                      <ul>
                        <li onClick={onEnableProductGridview}>
                          <img
                            src={
                              ProductGridView ? gridViewicoActive : gridViewico
                            }
                            alt=""
                          />
                        </li>
                        <li onClick={onEnableProductListview}>
                          <img
                            src={
                              ProductGridView ? listViewico : listViewicoActive
                            }
                            alt=""
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="filters-bx-Pagination">
                      <DropdownSelect
                        dropdownClass={"category-list-dropdown-wrapper"}
                        onChange={onOrder}
                        options={sortOptions}
                        value={sortOptions.find(
                          option => option.value === activeSortOption
                        )}
                      />
                      {showProductPagination && (
                        <Pagination
                          onCategoryNext={onLoadMore}
                          onCategoryPrevious={onLoadPrev}
                          enableCPre={currentPageNumber > 1 ? true : false}
                          enableCNxt={pageInfo.hasNextPage}
                          productLimit={productLimit}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Mobile Product Filter */}
                {displayLoader && !intialProductFlag ? (
                  <>
                    <Skeleton
                      variant="rect"
                      animation="wave"
                      height={60}
                      className="category-mobile-skeleton-rounded"
                    />
                  </>
                ) : (
                  <div className="mobileProductFilter ">
                    <div className="category-result-section">
                      <DropdownSelect
                        dropdownClass={"category-list-dropdown-wrapper"}
                        onChange={onOrder}
                        options={sortOptions}
                        value={sortOptions.find(
                          option => option.value === activeSortOption
                        )}
                      />
                      <div className="product-results-bx">
                        <span className="result-heading">Results:</span>
                        <span className="result-count">
                          {totalProductCount}
                        </span>
                      </div>
                    </div>
                    <div className="mobileProductFilter-rightIcon">
                      <ul>
                        <li onClick={onEnableProductListview}>
                          <a>
                            <img
                              src={ProductGridView ? listImg : listImgActive}
                              alt="list View Icon"
                            />
                          </a>
                        </li>
                        <li onClick={onEnableProductGridview}>
                          <a>
                            <img
                              src={ProductGridView ? gridImgActive : gridImg}
                              alt="Grid View Icon"
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {displayLoader && !intialProductFlag ? (
                  <>
                    <Skeleton
                      variant="rect"
                      animation="wave"
                      height={60}
                      className="category-mobile-skeleton-rounded category-mobile-header-skeleton category-mobile-bottom-space-skeleton"
                    />
                  </>
                ) : (
                  <div className="productPagination-wrap">
                    <div className="pageCount-bx">
                      <DropdownSelect
                        dropdownClass={"category-list-dropdown-wrapper"}
                        onChange={onLimitChange}
                        options={[
                          { label: "25", value: 25 },
                          { label: "50", value: 50 },
                          { label: "75", value: 75 },
                          { label: "100", value: 100 },
                        ]}
                        value={{ label: productLimit, value: productLimit }}
                      />
                      {/* <span style={{marginLeft:"7px"}}>per page</span> */}
                    </div>
                    {showProductPagination && (
                      <Pagination
                        onCategoryNext={onLoadMore}
                        onCategoryPrevious={onLoadPrev}
                        enableCPre={currentPageNumber > 1 ? true : false}
                        enableCNxt={pageInfo.hasNextPage}
                        productLimit={productLimit}
                      />
                    )}
                  </div>
                )}
                {displayLoader && !intialProductFlag ? (
                  <CategoryProductSkeletons ProductGridView={ProductGridView} />
                ) : (
                  canDisplayProducts && (
                    <>
                      {ProductGridView && (
                        <>
                          <ProductsList
                            firstPIndex={0}
                            lastPIndex={0}
                            displayLoader={displayLoader}
                            hasNextPage={hasNextPage}
                            onLoadMore={onLoadMore}
                            products={products.edges.map(edge => edge.node)}
                            totalCount={products.totalCount}
                            notFound={notFoundMessage}
                            isCategory={true}
                          />
                        </>
                      )}

                      {!ProductGridView && (
                        <>
                          <ProductsListView
                            firstPIndex={0}
                            lastPIndex={0}
                            displayLoader={displayLoader}
                            hasNextPage={hasNextPage}
                            onLoadMore={onLoadMore}
                            products={products.edges.map(edge => edge.node)}
                            totalCount={products.totalCount}
                            notFound={notFoundMessage}
                            isCategory={true}
                          />
                        </>
                      )}
                    </>
                  )
                )}
                {displayLoader && !intialProductFlag ? (
                  <Skeleton
                    variant="rect"
                    animation="wave"
                    height={44}
                    className="category-header-skeleton"
                  />
                ) : (
                  <div className="productListFilter-bx productListFilter-bx-bottom">
                    <div className="pageCount-bx category-result-section">
                      <DropdownSelect
                        dropdownClass={"category-list-dropdown-wrapper"}
                        onChange={onLimitChange}
                        options={[
                          { label: "25", value: 25 },
                          { label: "50", value: 50 },
                          { label: "75", value: 75 },
                          { label: "100", value: 100 },
                        ]}
                        value={{ label: productLimit, value: productLimit }}
                      />
                      {/* <span style={{marginLeft:"7px"}}>per page</span> */}
                      <div className="product-results-bx">
                        <span className="result-heading">Results:</span>
                        <span className="result-count">
                          {totalProductCount}
                        </span>
                      </div>
                    </div>
                    <div className="filters-bx">
                      <ul>
                        <li onClick={onEnableProductGridview}>
                          <img
                            src={
                              ProductGridView ? gridViewicoActive : gridViewico
                            }
                            alt=""
                          />
                        </li>
                        <li onClick={onEnableProductListview}>
                          <img
                            src={
                              ProductGridView ? listViewico : listViewicoActive
                            }
                            alt=""
                          />
                        </li>
                      </ul>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        maxWidth: "33.33%",
                        flex: "0 0 33.33%",
                        justifyContent: "flex-end",
                      }}
                    >
                      <DropdownSelect
                        dropdownClass={"category-list-dropdown-wrapper"}
                        onChange={onOrder}
                        options={sortOptions}
                        value={sortOptions.find(
                          option => option.value === activeSortOption
                        )}
                      />
                      {showProductPagination && (
                        <Pagination
                          onCategoryNext={onLoadMore}
                          onCategoryPrevious={onLoadPrev}
                          enableCPre={currentPageNumber > 1 ? true : false}
                          enableCNxt={pageInfo.hasNextPage}
                          productLimit={productLimit}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Mobile pagination Bottom   */}
                {displayLoader && !intialProductFlag ? (
                  <Skeleton
                    variant="rect"
                    animation="wave"
                    height={60}
                    className="category-mobile-skeleton-rounded category-mobile-header-skeleton"
                  />
                ) : (
                  <div className="productPagination-wrap">
                    <div className="pageCount-bx">
                      <DropdownSelect
                        dropdownClass={"category-list-dropdown-wrapper"}
                        onChange={onLimitChange}
                        options={[
                          { label: "25", value: 25 },
                          { label: "50", value: 50 },
                          { label: "75", value: 75 },
                          { label: "100", value: 100 },
                        ]}
                        value={{ label: productLimit, value: productLimit }}
                      />
                      {/* <span style={{marginLeft:"7px"}}>per page</span> */}
                    </div>
                    {showProductPagination && (
                      <Pagination
                        onCategoryNext={onLoadMore}
                        onCategoryPrevious={onLoadPrev}
                        enableCPre={currentPageNumber > 1 ? true : false}
                        enableCNxt={pageInfo.hasNextPage}
                        productLimit={productLimit}
                      />
                    )}
                  </div>
                )}

                {/* Product Pagination Wrapper */}

                {/* Daynmic Product Grid Ended Here*/}
              </div>
            ) : null}
            {/* Product List Wrapper Started Here */}
          </div>
        </div>
      </section>
      {/* Main Page Ended Here */}

      <div className="container">
        {/* <Breadcrumbs breadcrumbs={extractBreadcrumbs(category)} /> */}
        {/* {subCategoriesExist && (
        <>
        <Categories subCats={(category.emwChildren)} />
        </>
        )} */}
        {/* <FilterSidebar
          show={showFilters}
          hide={() => setShowFilters(false)}
          onAttributeFiltersChange={onAttributeFiltersChange}
          attributes={attributes}
          filters={filters}
        /> */}
        {/* <ProductListHeader
          activeSortOption={activeSortOption}
          openFiltersMenu={() => setShowFilters(true)}
          numberOfProducts={products ? products.totalCount : 0}
          activeFilters={activeFilters}
          clearFilters={clearFilters}
          sortOptions={sortOptions}
          onChange={onOrder}
        /> */}
      </div>

      {/* {canDisplayProducts && (
        <>
          <ProductsList
            displayLoader={displayLoader}
            hasNextPage={hasNextPage}
            onLoadMore={onLoadMore}
            products={products.edges.map(edge => edge.node)}
            totalCount={products.totalCount}
          />
        </>
      )} */}
      {/* {!hasProducts && <ProductsFeatured title="You might like" />} */}

      <Fab
        aria-label="add"
        className={`filter-fab-icon ${
          !productCountFacetedResults && !isFilterSelected ? "hidden" : ""
        }`}
        onClick={() => toggleSidebar(true)}
      >
        <img src={sortingico} alt="" />
      </Fab>
    </div>
  );
};

export default Page;
