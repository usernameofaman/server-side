import "./scss/index.scss";

import * as React from "react";

import { MetaWrapper } from "../../components";
import Page from "./Page";
import { homePageMetaDescription } from '../../constants';

const View: React.FC = () => (
  <div className="home-page">
    <MetaWrapper
      meta={{
        description: homePageMetaDescription,
      }}
    >
      <Page
        shop={{description: homePageMetaDescription}}

      />
    </MetaWrapper>
  </div>
);

export default View;
