import * as React from "react";
import Page from "./Page";

interface ViewProps {
  data: any,
  nextStep:()=> void,
  setErrorStatus: any,
  additionalDetails: any,
  setTermsError: any,
  termsCheckbox: boolean,
  executeScroll: any,
};

const View: React.SFC<ViewProps> = (props) => {
  return (
    <Page checkoutData={props.data}  nextStep={props.nextStep} setErrorStatus={props.setErrorStatus} customerDetails={props.additionalDetails} setTermsError={props.setTermsError} termsCheckbox={props.termsCheckbox} executeScroll={props.executeScroll}/>
  );
};

export default View;
