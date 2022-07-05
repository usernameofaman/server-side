import "./scss/index.scss";
// Comment For Design
// import classNames from "classnames";
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import { Button, Loader, ProductsFeatured } from "../../components";
// import { generateEMWCategorySeoUrl } from "../../core/utils";

import {
  ProductsList_emwcategories,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./types/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

import emwLogoImg from "../../images/main-banner.svg"
import Grid from '@material-ui/core/Grid';
import ReactGA from 'react-ga';
// import CatalogSection from './CatalogSection';
import VendorSection from './VendorSection';
import AdvantageMemberSection from './AdvantageMemberSection';

const Page: React.FC<{
  shop: any;
}> = ({ shop }) => {
  useEffect(() => {
    // page timings 
    if (window.performance) {
      const start = window.performance.getEntriesByName(`${location.pathname}_START`, "mark");
      if (start && start.length > 0) {
        const end = window.performance.mark(`${location.pathname}_END`);
        window.performance.measure('myMeasure', `${location.pathname}_START`, `${location.pathname}_END`);
        const entries = window.performance.getEntriesByType('measure');

        if (entries && entries.length > 0 && entries[0].duration) {
          // Sends the timing hit to Google Analytics.
          ReactGA.timing({
            category: 'Home Page Load Time',
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
          category: 'Home Page Load Time',
          variable: `${location.pathname}`,
          value: timeSincePageLoad, // in milliseconds
          label: window.location.pathname,
        });
      }
    }
  }, [])

  return (
    <>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
      <div
        className="home-page__hero"
        style={
          true
            ? { backgroundImage: `url(${emwLogoImg})` }
            : null
        }
      >
        <div className="home-page__hero-action">
              <div className="emw-homepage-detail-box">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <p className="main-heading">Welcome to Electric Motor Wholesale, Inc.</p>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <h1 className="sub-heading emw-detail-text">
                    Electric Motor Wholesale, Inc. established in Jan, 2001 is a USA premium e-commerce company providing brand name electric motors and related support products.
                    </h1>
                  </Grid>
                </Grid>
              </div>
        </div>
      </div>
      

      {/* EMW HomaPage Sections */}
      {/* <CatalogSection categoriesList={categories}/> */}

      <VendorSection />
      <AdvantageMemberSection />


      {/* {categoriesExist() && (
        <React.Fragment>
          <div className="home-page__categoriesemwtitle">
            <h3>Shop our most popular categories</h3>
          </div>
          <div className="home-page__categories">
            <div className="container">
              <div className="home-page__categories__list">
                <Grid container spacing={3}>
                  {categories.edges.map(({ node: category }) => (
                    <Grid item md={4} sm={3} xs={6} key={category.id}>
                      <Card key={category.id} style={{ backgroundColor: '#f3f3f3', padding: '15px' }}>
                        <Link
                          to={generateEMWCategorySeoUrl(category.name, category.emwCatSesurl)}
                          key={category.id}
                        >
                          <h3>{category.name}</h3>
                          <div className="home-page__categories__list__image">
                            {
                              category.emwCatImageUrl
                                ? <img src={process.env.REACT_APP_CLOUDFRONT_URL + category.emwCatImageUrl} /> : <img src={noPhotoImg} />
                            }
                          </div>

                        </Link>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
      <ProductsFeatured /> */}
    </>
  );
};

export default Page;
