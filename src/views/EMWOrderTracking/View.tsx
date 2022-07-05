import "./scss/index.scss";

import * as React from "react";
import Page from "./Page";
import { RouteComponentProps } from "react-router";
import { useUserDetails } from "@sdk/react";
import { MetaWrapper } from '../../components';

const View: React.SFC<RouteComponentProps<{ slug: string }>> = ({ match }) => {
  const paramId=match.params.slug;
  const userDetails = useUserDetails();
  return (
    <>
    <MetaWrapper
      meta={{
        description: "",
      }}
    >
      <Page
        orderId={paramId}
        userDetails={userDetails}
      />
    </MetaWrapper>
    </>
  );
};

export default View;
