import "./scss/index.scss";

import React, { useEffect, useState  } from "react";
import Page from "./Page";
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { ATCQuery } from '../../@sdk/queries/emwAddToCartQueries';
import { useAlert } from "react-alert";

interface ViewProps {
  data: any,
  loggedIn: boolean,
  productDataLoading: boolean,
}

const View: React.SFC<ViewProps> = (props) => {
  const { data,loggedIn, productDataLoading }= props;
  const [productData,setProductData]=useState(null);
	const alert = useAlert();
  
  const [getSellPrice, { loading: dataLoading }] = useLazyQuery(ATCQuery, {
		fetchPolicy: 'network-only',
		onCompleted(data) {
      setProductData(data)
		},
		onError(error) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
		},
	});

  useEffect(() => {
		if (data && data.id) {
			getSellPrice({
				variables: {
					id: data.id,
					quantity: null,
				},
			})
		}
	}, [data && data.id,loggedIn]);

  return (
    <>
      <Page
      data={data}
      loggedIn={loggedIn}
      productDataLoading={(dataLoading)}
      productData={productData && productData.emwproduct}
      />
    </>
  );
};

export default View;
