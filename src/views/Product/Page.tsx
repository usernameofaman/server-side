import { smallScreen } from "../../globalStyles/scss/variables.scss";
import * as React from "react";

import { CachedImage, Thumbnail } from "@components/molecules";

import { Breadcrumbs, ProductDescription } from "../../components";
import { generateEMWProductSeoUrl } from "../../core/utils";
import { EMWProductDetails_emwproduct } from "./types/EMWProductDetails";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import inValidico from "../../images/inValid-icon.svg";
import shippingIco from "../../images/shippingIco.svg";
import toggleDown from "../../images/toggleDown.svg";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import collapseIcon from "../../images/minus-sign.png";
import expandIcon from "../../images/plus.png";
import { Helmet } from 'react-helmet';

// Single Collapse
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

// import { EMWAddToCartPage } from '../EMWAddToCart/';
import ReactGA from "react-ga";
import noPhotoImg from "../../images/no-photo.svg";
import { extractBreadcrumbs } from "../../components";

import EMWFroalaViewer from "../../components/EMWFroalaViewer";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/third_party/embedly.min.css";
import styled from "styled-components";

const EMWAddToCartPage = React.lazy(() => import("../EMWAddToCart/"));


const Icon = styled(props => (
  <div {...props}>
    <div className="product-accordion-control expanded-icon">
      <img src={expandIcon} width="12" />
    </div>
    <div className="product-accordion-control collapse-icon">
      <img src={collapseIcon} width="12" />
    </div>
  </div>
))`
  & > .expanded-icon {
    display: block;
  }
  & > .collapse-icon {
    display: none;
  }
  .Mui-expanded & > .collapse-icon {
    display: block;
  }
  .Mui-expanded & > .expanded-icon {
    display: none;
  }
`;


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function SimpleRelatedProductsTabs(data) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return data.rProd && data.rProd.length > 0 ? (
    <div className="productTab relatedproductTab">
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            {data.rProd &&
              data.rProd.map((rProdTab, index) => {
                return rProdTab.emwRelgrpIsActive ? (
                  <Tab
                    key={index}
                    label={rProdTab.emwRelgrpName}
                    {...a11yProps(index)}
                  />
                ) : null;
              })}
          </Tabs>
        </AppBar>
        {data.rProd &&
          data.rProd.map((rProdtab, index) => {
            return rProdtab.emwRelgrpIsActive ? (
              <TabPanel value={value} index={index} key={Math.random()}>
                <div className="productListWrapper" key={Math.random()}>
                  <Grid container spacing={3} key={Math.random()}>
                    {rProdtab.relprods.length ? (
                      rProdtab.relprods.map((prod, index) => {
                        return (
                          <React.Fragment key={Math.random()}>
                            {prod.emwRelatedProdid === null ? null : (
                              <Grid
                                item
                                lg={3}
                                md={4}
                                sm={6}
                                xs={6}
                                key={Math.random()}
                              >
                                <Link
                                  to={generateEMWProductSeoUrl(
                                    prod.emwRelatedProdid.emwProdId,
                                    prod.emwRelatedProdid.name,
                                    prod.emwRelatedProdid.emwProdSesurl
                                  )}
                                  key={prod.emwRelatedProdid.id}
                                >
                                  <Card
                                    className="productListWrapper__product"
                                    key={Math.random()}
                                  >
                                    <h4>{prod.emwRelatedProdid.name}</h4>
                                    <div className="productListWrapper__product__image image-vertical-fix">
                                      {prod.emwRelatedProdid.prodImages
                                        .length !== 0 ? (
                                        <Thumbnail
                                          source={{
                                            thumbnail: {
                                              url:
                                                process.env
                                                  .REACT_APP_CLOUDFRONT_URL +
                                                prod.emwRelatedProdid
                                                  .prodImages[0]
                                                  .emwImageUrlPrfix +
                                                prod.emwRelatedProdid
                                                  .prodImages[0].emwImageName,
                                            },
                                          }}
                                        />
                                      ) : (
                                        <Thumbnail
                                          source={{ thumbnail: { url: "" } }}
                                        />
                                      )}
                                    </div>
                                    <div className="productListWrapper__product__pricebx">
                                      <div className="productListWrapper__product__pricebx__cutPricebx">
                                        {
                                          <span>
                                            MSRP:{" "}
                                            <del>
                                              {/* ${prod.emwRelatedProdid.listPrice.amount} */}
                                              {prod.emwRelatedProdid.listPrice
                                                ? "$" +
                                                prod.emwRelatedProdid.listPrice.amount.toFixed(
                                                  2
                                                )
                                                : "N/A"}
                                            </del>
                                          </span>
                                        }
                                      </div>
                                      <div className="productListWrapper__product__pricebx__price">
                                        <h4>
                                          {prod.emwRelatedProdid
                                            .aggregateSellPrice
                                            ? "$" +
                                            prod.emwRelatedProdid.aggregateSellPrice.amount.toFixed(
                                              2
                                            )
                                            : "N/A"}
                                        </h4>
                                        {/* {<h4>${prod.emwRelatedProdid.aggregateSellPrice.amount}</h4>} */}
                                      </div>
                                    </div>
                                  </Card>
                                </Link>
                              </Grid>
                            )}
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <span>No product found.</span>
                    )}
                  </Grid>
                </div>
              </TabPanel>
            ) : null;
          })}
      </div>
    </div>
  ) : null;
}

class Page extends React.PureComponent<
  {
    product: EMWProductDetails_emwproduct;
    loggedIn: boolean;
    productDataLoading: boolean;
    selectedIndex: any;
    setSelectedIndex: any;
  },
  { variantId: string; pageDescVisible: boolean }
> {
  fixedElement: React.RefObject<HTMLDivElement> = React.createRef();
  productGallery: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      variantId: "",
      pageDescVisible: false,
    };
  }

  populateBreadcrumbs = product => {
    const temp = extractBreadcrumbs(product.emwProdCatid);
    const tempOne = {
      link: generateEMWProductSeoUrl(
        product.emwProdId,
        product.name,
        product.emwProdSesurl
      ),
      value: product.name,
    };

    temp.push(tempOne);
    return temp;
  };

  componentDidMount() {
    //  GA Screen Measurement
    ReactGA.ga("send", "screenview", {
      appName: "EMW",
      screenName: "Product Detailed Page",
    });

    // Page Timings
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
            category: "Product Detail Page Load Time",
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
          category: "Product Detail Page Load Time",
          variable: `${location.pathname}`,
          value: timeSincePageLoad, // in milliseconds
          label: window.location.pathname,
        });
      }
    }
  }

  iconHandler = fileName => {
    const length = fileName.split(".").length;
    let fileType = fileName.split(".")[length - 1];
    const s3FileIconUrl =
      process.env.REACT_APP_CLOUDFRONT_URL + "store-logic/icons/";
    if (fileType === "cad") {
      fileType = "CAD.svg";
    } else if (fileType === "pdf") {
      fileType = "PDF.svg";
    } else if (fileType === "zip") {
      fileType = "ZIP.svg";
    } else {
      fileType = "DOCX.svg";
    }
    return <img src={s3FileIconUrl + fileType} alt="" />;
  };

  render() {
    const { product, loggedIn, productDataLoading, selectedIndex, setSelectedIndex } = this.props;
    const attrbutesTemp = [];
    const attrbutesDisplayTemp = [];
    const tempSortedAttributesList = [];
    if (
      product.emwProdAttributeValues &&
      product.emwProdAttributeValues.edges.length
    ) {
      product.emwProdAttributeValues.edges.map((attr, index) => {
        tempSortedAttributesList.push({
          name: attr.node.emwProdatrvalValue.emwAtrvalAtrid.emwAtrName,
          sortOrder:
            attr.node.emwProdatrvalValue.emwAtrvalAtrid.emwAtrSortOrder,
        });

        if (attr.node.emwProdatrvalValue.emwAtrvalIsDisplayOverride) {
          attrbutesTemp[
            attr.node.emwProdatrvalValue.emwAtrvalAtrid.emwAtrName
          ] = [attr.node.emwProdatrvalValue.emwAtrvalDisplayValue];
        } else {
          if (
            attrbutesTemp.hasOwnProperty(
              attr.node.emwProdatrvalValue.emwAtrvalAtrid.emwAtrName
            )
          ) {
            attrbutesTemp[
              attr.node.emwProdatrvalValue.emwAtrvalAtrid.emwAtrName
            ].push(attr.node.emwProdatrvalValue.emwAtrvalValue);
          } else {
            attrbutesTemp[
              attr.node.emwProdatrvalValue.emwAtrvalAtrid.emwAtrName
            ] = [attr.node.emwProdatrvalValue.emwAtrvalValue];
          }
        }
      });

      product.emwProdatrOverrides.map((attr, index) => {
        if (attr.emwPaoIsOverride) {
          attrbutesDisplayTemp[attr.emwPaoAtrid.emwAtrName] = [
            attr.emwPaoDisplayValue,
          ];
        }
      });
    }

    let TempArr = [];
    function sort_by_key(array, key) {
      return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }
    function reducer(accumulator, currentValue) {
      if (!accumulator.find(obj => obj.name === currentValue.name)) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }
    const removedDuplicatedAttributes = tempSortedAttributesList.reduce(
      reducer,
      []
    );

    const sortedAttributes = sort_by_key(
      removedDuplicatedAttributes,
      "sortOrder"
    );
    TempArr = sortedAttributes.map(item => item.name);
    console.log("productproduct", product);

    return (
      <div className="product-page">
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="canonical" href={process.env.REACT_APP_STOREFRONT_BASE_URL + window.location.pathname} />
        </Helmet>
        <div className="container">
          <Breadcrumbs breadcrumbs={this.populateBreadcrumbs(product)} />

          <div className="product-page-product-container">
            <div className="product-page-product-container-left">
              <div className="product-page-details-container">
                <div className="product-page-details-container-header">
                  <h1>{product.name}</h1>
                </div>
                <div className="product-page-details-container-details emw-product-details-mobile-fix">
                  <div className="emw-product-detail-image-section">
                    <div className="product-page-details-container-image image-vertical-fix">
                      {product.emwProdImages &&
                        product.emwProdImages.edges.length ? (
                        <Thumbnail
                          source={{
                            thumbnail: {
                              url:
                                process.env.REACT_APP_CLOUDFRONT_URL +
                                product.emwProdImages.edges[0].node
                                  .emwImageUrlPrfix +
                                product.emwProdImages.edges[0].node
                                  .emwImageName,
                            },
                          }}
                        />
                      ) : (
                        <Thumbnail source={product} />
                      )}
                    </div>
                    <div className="product-image-caption">
                      <p>* Image for reference only</p>
                    </div>
                  </div>
                  <div className="emw-product-container-detail-wrapper">
                    <div className="product-page-details-container-detailText">
                      <div className="product-description" onClick={() =>
                        this.setState({
                          ...this.state,
                          pageDescVisible: !this.state.pageDescVisible,
                        })
                      }>
                        <div
                          className={"product-dec-control"}
                        >
                          <img
                            src={
                              this.state.pageDescVisible
                                ? collapseIcon
                                : expandIcon
                            }
                            width={12}
                            alt="Grid View Icon"
                          />
                        </div>
                        <h4>Product Description</h4>
                      </div>
                      {this.state.pageDescVisible ? (
                        <span>{product.seoDescription}</span>
                      ) : null}
                    </div>
                    <div className="product-page-details-container-detailText emw-product-container-detail-section">
                      {product.emwProdShowVendor && (
                        <div className="product-details-individual-detail">
                          <div className="product-properties">
                            <span>Manufacturer</span>
                          </div>
                          <div className="product-values">
                            <span>
                              {product.emwProdVendorid === null
                                ? "N/A"
                                : product.emwProdVendorid.emwVendorName}
                            </span>
                          </div>
                        </div>
                      )}
                      {product.emwProdShowDispweight && (
                        <div className="product-details-individual-detail">
                          <div className="product-properties">
                            <span>Weight</span>
                          </div>
                          <div className="product-values">
                            <span>
                              {product.emwProdDisplayWeight === null ||
                                product.emwProdDisplayWeight === ""
                                ? "N/A"
                                : `${product.emwProdDisplayWeight} lbs`}{" "}
                            </span>
                          </div>
                        </div>
                      )}
                      {product.emwProdShowHscode && (
                        <div className="product-details-individual-detail">
                          <div className="product-properties">
                            <span>HS Code</span>
                          </div>
                          <div className="product-values">
                            <span>
                              {product.emwProdHsCode === null ||
                                product.emwProdHsCode === ""
                                ? "N/A"
                                : product.emwProdHsCode}
                            </span>
                          </div>
                        </div>
                      )}
                      {product.emwProdShowUpc && (
                        <div className="product-details-individual-detail">
                          <div className="product-properties">
                            <span>UPC Number</span>
                          </div>
                          <div className="product-values">
                            <span>
                              {product.emwProdUpc === null ||
                                product.emwProdUpc === ""
                                ? "N/A"
                                : product.emwProdUpc}{" "}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    {(product.emwProdShowUpc ||
                      product.emwProdShowHscode ||
                      product.emwProdShowDispweight ||
                      product.emwProdShowVendor) &&
                      TempArr.length > 0 && (
                        <div className="product-page-attribute-gap-border product-page-attribute-gap-margin"></div>
                      )}
                    <div className="emw-attribute-section">
                      <div className="product-page-details-container-detailText emw-product-container-detail-section">
                        {TempArr.slice(0, Math.ceil(TempArr.length / 2)).map(
                          (attr, index) => {
                            return (
                              <div
                                className="product-details-individual-detail product-details-individual-detail__mobileHide"
                                key={Math.random()}
                              >
                                <div key={index} className="product-properties">
                                  <span>{attr}</span>
                                </div>
                                <div
                                  className="product-values"
                                  key={Math.random()}
                                >
                                  <span key={Math.random()}>
                                    {Object.keys(attrbutesDisplayTemp).length &&
                                      attrbutesDisplayTemp[attr] &&
                                      attrbutesDisplayTemp[attr].length > 0
                                      ? attrbutesDisplayTemp[attr][0]
                                      : Array.isArray(attrbutesTemp[attr]) &&
                                      attrbutesTemp[attr].map(
                                        (val, index) => {
                                          return Object.keys(
                                            attrbutesDisplayTemp
                                          ).length &&
                                            attrbutesDisplayTemp[attr] &&
                                            attrbutesDisplayTemp[attr]
                                              .length > 0
                                            ? attrbutesDisplayTemp[attr][0]
                                            : attrbutesTemp[attr].length >
                                              1 &&
                                              index !==
                                              attrbutesTemp[attr].length - 1
                                              ? val + ", "
                                              : val;
                                        }
                                      )}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                      <div className="product-page-details-container-detailText emw-product-container-detail-section">
                        {TempArr.slice(
                          Math.ceil(TempArr.length / 2),
                          TempArr.length
                        ).map((attr, index) => {
                          return (
                            <div
                              className="product-details-individual-detail product-details-individual-detail__mobileHide"
                              key={Math.random()}
                            >
                              <div key={index} className="product-properties">
                                <span>{attr}</span>
                              </div>
                              <div
                                className="product-values"
                                key={Math.random()}
                              >
                                <span key={Math.random()}>
                                  {Object.keys(attrbutesDisplayTemp).length &&
                                    attrbutesDisplayTemp[attr] &&
                                    attrbutesDisplayTemp[attr].length > 0
                                    ? attrbutesDisplayTemp[attr][0]
                                    : Array.isArray(attrbutesTemp[attr]) &&
                                    attrbutesTemp[attr].map((val, index) => {
                                      return Object.keys(attrbutesDisplayTemp)
                                        .length &&
                                        attrbutesDisplayTemp[attr] &&
                                        attrbutesDisplayTemp[attr].length > 0
                                        ? attrbutesDisplayTemp[attr][0]
                                        : attrbutesTemp[attr].length > 1 &&
                                          index !==
                                          attrbutesTemp[attr].length - 1
                                          ? val + ", "
                                          : val;
                                    })}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-page-details-container-detailText__showMobile">
                  {TempArr.slice(0, TempArr.length).map((attr, index) => {
                    return (
                      <div
                        className="product-details-individual-detail"
                        key={Math.random()}
                      >
                        <div key={index} className="product-properties">
                          <span>{attr}</span>
                        </div>
                        <div className="product-values" key={Math.random()}>
                          <span key={Math.random()}>
                            {Object.keys(attrbutesDisplayTemp).length &&
                              attrbutesDisplayTemp[attr] &&
                              attrbutesDisplayTemp[attr].length > 0
                              ? attrbutesDisplayTemp[attr][0]
                              : attrbutesTemp[attr].map((val, index) => {
                                return Object.keys(attrbutesDisplayTemp)
                                  .length &&
                                  attrbutesDisplayTemp[attr] &&
                                  attrbutesDisplayTemp[attr].length > 0
                                  ? attrbutesDisplayTemp[attr][0]
                                  : attrbutesTemp[attr].length > 1 &&
                                    index !== attrbutesTemp[attr].length - 1
                                    ? val + ", "
                                    : val;
                              })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {product.emwProdTabs &&
                product.emwProdTabs.edges.map((tab, index) => {
                  if (
                    tab.node.emwTabTitle === "Ordering Notes" ||
                    tab.node.emwTabTitle === "Order Notes"
                  ) {
                    return (
                      <div
                        className="product-page_warning mb-fix-20 d-none"
                        key={Math.random()}
                      >
                        <div
                          className="product-page_warning-image_block"
                          key={Math.random()}
                        >
                          <img
                            className="product-page_warning-image"
                            src={inValidico}
                            alt="emw"
                          />
                        </div>
                        <div
                          className="product-page_warning-description-block"
                          key={Math.random()}
                        >
                          <p
                            className="product-page_warning-description"
                            dangerouslySetInnerHTML={{
                              __html: tab.node.emwTabContent,
                            }}
                          ></p>
                        </div>
                      </div>
                    );
                  }
                })}
              {product.emwProdFiles && product.emwProdFiles.edges.length > 0 ? (
                <div className="product-page-documents">
                  <h4>Product Documentation</h4>
                  {product.emwProdFiles &&
                    product.emwProdFiles.edges.map((file, index) => {
                      return (
                        file.node.emwFileProdfile && (
                          <a
                            href={
                              process.env.REACT_APP_CLOUDFRONT_URL +
                              "files/" +
                              file.node.emwFileProdfile
                            }
                            key={Math.random()}
                          >
                            <div key={index} className="individual-documents">
                              {this.iconHandler(file.node.emwFileProdfile)}
                              <p>{file.node.emwFileDescription}</p>
                            </div>
                          </a>
                        )
                      );
                    })}
                </div>
              ) : null}

              {product.emwProdTabs !== null ? (
                <div className="emw-desktopTabAccordions">
                  {product.emwProdTabs &&
                    product.emwProdTabs.edges.map((tab, index) => {
                      return tab.node.emwTabIsActive ? (
                        <ExpansionPanel key={Math.random()} expanded={selectedIndex[index]}>
                          <ExpansionPanelSummary
                            expandIcon={<Icon />}
                            // expandIcon={<div className="product-accordion-control"><img src={selectedIndex[index] ? collapseIcon : expandIcon} width="12" /></div>}
                            aria-controls="panel1c-content"
                            id="panel1Mob-header"
                            key={Math.random()}
                          >
                            {tab.node.emwTabTitle}
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails key={Math.random()}>
                            {tab.node.emwTabContent &&
                              tab.node.emwTabContent !== null && (
                                <EMWFroalaViewer
                                  content={tab.node.emwTabContent}
                                />
                              )}
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      ) : null;
                    })}
                </div>
              ) : null}
            </div>

            <div className="product-page-product-container-right">
              {product.emwProdOrderingNotesMessage &&
                product.emwProdOrderingNotesMessage.trim() !== "" ? (
                <div className="product-page_warning warning-box ordering-notes">
                  {/* <div className="product-page_warning-image_block">
                    <img className="product-page_warning-image" src={inValidico} alt="emw" />
                  </div>
                  <div className="product-page_warning-description-block">
                    <p className="warning-text">{product.emwProdOrderingNotesMessage}</p>
                    
                  </div> */}
                  <EMWFroalaViewer
                    content={product.emwProdOrderingNotesMessage}
                  />
                </div>
              ) : null}
              {product.emwProdIsFreeship && !product.emwProdIsInformational ? (
                <div className="product-page_shipping mt-fix-0">
                  <div className="product-page_shipping-image_block">
                    <img
                      className="product-page_shipping-image"
                      src={shippingIco}
                    />
                  </div>
                  <div className="product-page_shipping-description-block">
                    <p className="product-page_shipping-description">
                      FREE Ground Shipping to Continental USA!
                    </p>
                  </div>
                </div>
              ) : null}

              <EMWAddToCartPage
                data={product}
                loggedIn={loggedIn}
                productDataLoading={productDataLoading}
              />
            </div>
          </div>

          <div className="product-mobileTabAccordions">
            {product.emwProdTabs &&
              product.emwProdTabs.edges.map((tab, index) => {
                return tab.node.emwTabIsActive ? (
                  <ExpansionPanel key={Math.random()} expanded={selectedIndex[index]}>
                    <ExpansionPanelSummary
                    expandIcon={<Icon/>}
                      // expandIcon={<div className="product-accordion-control"><img src={selectedIndex[index] ? collapseIcon : expandIcon} width="12" /></div>}
                      aria-controls="panel1c-content"
                      id="panel1Mob-header"
                      key={Math.random()}
                    >
                      {tab.node.emwTabTitle}x
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails key={Math.random()}>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: tab.node.emwTabContent,
                        }}
                      ></p>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ) : null;
              })}
          </div>

          {product.emwProdFiles && product.emwProdFiles.edges.length > 0 ? (
            <div className="product-page-documents product-page-documents-mobile">
              <h4>Product Documentation</h4>
              {product.emwProdFiles &&
                product.emwProdFiles.edges.map((file, index) => {
                  return (
                    <a
                      key={index}
                      href={
                        process.env.REACT_APP_CLOUDFRONT_URL +
                        "files/" +
                        file.node.emwFileProdfile
                      }
                    >
                      <div key={index} className="individual-documents">
                        {this.iconHandler(file.node.emwFileProdfile)}
                        <p>{file.node.emwFileDescription}</p>
                      </div>
                    </a>
                  );
                })}
            </div>
          ) : null}

          {/* related group mobile ui */}
          <div className="product-mobileTabAccordions">
            {product.relatedGroups &&
              product.relatedGroups.map((rProd: any, index) => {
                return rProd.emwRelgrpIsActive &&
                  rProd.relprods &&
                  rProd.relprods.length > 0 ? (
                  // <div className="product-page-relatedAndFunctional-products">
                  <div key={Math.random()}>
                    <ExpansionPanel key={Math.random()}>
                      <ExpansionPanelSummary
                        expandIcon={<img src={toggleDown} width="20" />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                        key={Math.random()}
                      >
                        <div key={Math.random()}>
                          <p>{rProd.emwRelgrpName}</p>
                        </div>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails key={Math.random()}>
                        <div className="productListWrapper" key={Math.random()}>
                          <Grid container spacing={3} key={Math.random()}>
                            {rProd.relprods &&
                              rProd.relprods.map((prod, index) => {
                                return (
                                  <React.Fragment key={Math.random()}>
                                    {prod.emwRelatedProdid === null ? null : (
                                      <Grid
                                        item
                                        lg={3}
                                        md={4}
                                        sm={6}
                                        xs={6}
                                        key={prod.emwRelatedProdid.id}
                                      >
                                        <Link
                                          to={generateEMWProductSeoUrl(
                                            prod.emwRelatedProdid.emwProdId,
                                            prod.emwRelatedProdid.name,
                                            prod.emwRelatedProdid.emwProdSesurl
                                          )}
                                          key={prod.emwRelatedProdid.id}
                                        >
                                          <Card
                                            className="productListWrapper__product"
                                            key={prod.emwRelatedProdid.id}
                                          >
                                            <h4>
                                              {prod.emwRelatedProdid.name}
                                            </h4>
                                            <div className="productListWrapper__product__image image-vertical-fix">
                                              {prod.emwRelatedProdid.prodImages
                                                .length !== 0 ? (
                                                <Thumbnail
                                                  source={{
                                                    thumbnail: {
                                                      url:
                                                        process.env
                                                          .REACT_APP_CLOUDFRONT_URL +
                                                        prod.emwRelatedProdid
                                                          .prodImages[0]
                                                          .emwImageUrlPrfix +
                                                        prod.emwRelatedProdid
                                                          .prodImages[0]
                                                          .emwImageName,
                                                    },
                                                  }}
                                                />
                                              ) : (
                                                <Thumbnail
                                                  source={{
                                                    thumbnail: { url: "" },
                                                  }}
                                                />
                                              )}
                                            </div>
                                            <div className="productListWrapper__product__pricebx">
                                              <div className="productListWrapper__product__pricebx__cutPricebx">
                                                {
                                                  <span>
                                                    MSRP:{" "}
                                                    <del>
                                                      {/* ${prod.emwRelatedProdid.listPrice.amount} */}
                                                      {prod.emwRelatedProdid
                                                        .listPrice
                                                        ? "$" +
                                                        prod.emwRelatedProdid.listPrice.amount.toFixed(
                                                          2
                                                        )
                                                        : "N/A"}
                                                    </del>
                                                  </span>
                                                }
                                              </div>
                                              <div className="productListWrapper__product__pricebx__price">
                                                <h4>
                                                  {prod.emwRelatedProdid
                                                    .aggregateSellPrice
                                                    ? "$" +
                                                    prod.emwRelatedProdid.aggregateSellPrice.amount.toFixed(
                                                      2
                                                    )
                                                    : "N/A"}
                                                </h4>
                                                {/* {<h4>${prod.emwRelatedProdid.aggregateSellPrice.amount}</h4>} */}
                                              </div>
                                            </div>
                                          </Card>
                                        </Link>
                                      </Grid>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                          </Grid>
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                ) : (
                  <div className="add-bottom-space"></div>
                );
              })}
          </div>

          {product.relatedGroups !== null ? (
            <SimpleRelatedProductsTabs rProd={product.relatedGroups} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Page;
