import "./scss/index.scss";

import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../core/config";
import { contactUsUrl } from "../../routes"
import Button from "../Button";
import Frame_404_Part1 from "../../images/exploded-ac-motor.svg";
import Frame_404_Part2 from "../../images/Frame-404.svg";
import Frame_404_Part3 from "../../images/404-frame.svg";
import { Grid } from '@material-ui/core';
import EMWAutoCompleteSearchBox from "../EMWAutocompleteSearchBox"
import { MetaWrapper } from "../Meta";
import {Helmet} from 'react-helmet'


interface NotFoundProps {
  message: string;
}

const NotFound: React.FC<NotFoundProps> = () => (
  <>
    <MetaWrapper meta="404" />
    <div className="not-found-page">
    <Helmet>
          <meta charSet="utf-8" />
          <link rel="canonical" href={process.env.REACT_APP_STOREFRONT_BASE_URL + "not-found"} />
        </Helmet>
      <Grid container spacing={3} className="mobileRevers">
        <Grid sm={6} className="text-left" xs={12}>
          <img src={Frame_404_Part1} />
          <img src={Frame_404_Part3} className="showMobile" />
        </Grid>
        <Grid sm={6} className="text-left" xs={12}>
          <img src={Frame_404_Part2} />
          <img src={Frame_404_Part3} className="hideMobile" />
        </Grid>
      </Grid>
      <div className="not-found-page__message">
        <p className="font-bold">What could have caused this?</p>
        <p>We may have removed the page or the followed link was invalid, but don’t let that stop you!</p>
        <p className="font-bold">What you can do.</p>
        <p>You can go back to the Homepage, begin a new search here, or browse by category at the top of the page.</p>
      </div>
      <div className="not-found-page__button">
        <Link to={BASE_URL}>
          <Button secondary>
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H40V40H0V0Z" fill="#007CBA" />
              <path d="M22.35 27.25L15.1 20L22.35 12.75L23.2333 13.6333L16.8666 20L23.2333 26.3667L22.35 27.25Z" fill="white" />
            </svg>
            Back to home
          </Button>
        </Link>
      </div>
      <div className="not-found-page__message">
        <p>Part numbers will always yield the best results. If you would like to conduct a search by keyword, it is best to choose a category to search within first to narrow the results.</p>
      </div>
      <div className="not-found-search">
        <EMWAutoCompleteSearchBox />
      </div>
      <div className="not-found-page__message nextLink">
        <p>You may also <a href={contactUsUrl}>contact us</a> direcly for further inquiry.</p>
      </div>
    </div>

  </>
);

export default NotFound;
