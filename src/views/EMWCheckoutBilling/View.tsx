import "./scss/index.scss";

import * as React from "react";
import Page from "./Page";
import { useUserDetails } from "@sdk/react";

interface ViewProps {
  nextStep:()=> void,
  setInactiveNext: (status) => void;
  billingTrigger: boolean,
  isSupplimental: boolean,
  supplementalParams: any,
}

const View: React.SFC<ViewProps> = (props) => {
  const userDetails= useUserDetails(); 
  const { nextStep,setInactiveNext,billingTrigger, isSupplimental, supplementalParams }= props;
  return (
    <>
      <Page
        userDetails={userDetails}
        nextStep={nextStep}
        setInactiveNext={setInactiveNext}
        billingTrigger={billingTrigger}
        isSupplimental={isSupplimental}
        supplementalParams={supplementalParams}
      />
    </>
  );
};

export default View;
