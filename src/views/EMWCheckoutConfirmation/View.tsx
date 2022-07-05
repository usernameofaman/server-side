import "./scss/index.scss";

import * as React from "react";
import Page from "./Page";
import { useUserDetails } from "@sdk/react";

interface ViewProps{
  isSupplimental: boolean,
  supplementalParams: any,
  hide: any;
}
const View: React.FC<ViewProps> = (props) => {
  const { isSupplimental, supplementalParams, hide}=props;
  const userDetails= useUserDetails(); 
  return (
    <>
      <Page
        userDetails={userDetails}
        isSupplimental={isSupplimental}
        supplementalParams={supplementalParams}
        hide={hide}
      />
    </>
  );
};

export default View;
