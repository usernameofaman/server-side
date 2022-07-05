import * as React from "react";

import { META_DEFAULTS } from "../../core/config";
import { default as MetaConsumer } from "./consumer";
import { MetaContextInterface, Provider as MetaProvider } from "./context";
import { useQuery } from '@apollo/react-hooks';
import { shopName } from '../../views/Account/queries';

const removeEmpty = obj => {
  const newObj = {};
  Object.keys(obj).forEach(prop => {
    if (obj[prop] && obj[prop] !== "") {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};

interface MetaWrapperProps {
  meta: MetaContextInterface;
  children: React.ReactNode;
}

const MetaWrapper: React.FC<MetaWrapperProps> = ({ children, meta }) => {
  const { data: shopNameData } = useQuery(shopName, { fetchPolicy: "cache-first" });
  let shopNamed="";
  if(shopNameData && shopNameData.shop && shopNameData.shop.name){
    shopNamed=shopNameData.shop.name;
  }
  const defaults={...META_DEFAULTS,title: shopNamed};
  return(
  <MetaProvider value={{ ...defaults, ...removeEmpty(meta)  }}>
    <MetaConsumer>{children}</MetaConsumer>
  </MetaProvider>
  );
};

export default MetaWrapper;
