import React, { useEffect } from "react";

import { AccountTile } from "./AccountTile";
import { PasswordTile } from "./PasswordTile";
import { UserDocuments } from "./UserDocuments";
import * as S from "./styles";
import Grid from '@material-ui/core/Grid';

import { useQuery } from '@apollo/react-hooks';
import { EMWUserAccountQuery } from '@sdk/queries/user';
import ReactSVG from "react-svg";
import loader from '../../../../images/emw-loader.svg'
import ReactGA from 'react-ga';

export const AccountTabTiles: React.FC = () => {

  const { loading, error, data, refetch, fetchMore } = useQuery(EMWUserAccountQuery, {
    variables: {
      id: localStorage.getItem("emwUserId")
    },
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    // Page Load Timings 
    if (window.performance) {
      const start = window.performance.getEntriesByName(`${location.pathname}_START`, "mark");
      if (start && start.length > 0) {
        const end = window.performance.mark(`${location.pathname}_END`);
        window.performance.measure('myMeasure', `${location.pathname}_START`, `${location.pathname}_END`);
        const entries = window.performance.getEntriesByType('measure');

        if (entries && entries.length > 0 && entries[0].duration) {
          // Sends the timing hit to Google Analytics.
          ReactGA.timing({
            category: 'Account Page Load Time',
            variable: `${location.pathname}`,
            value: Math.round(entries[0].duration), // in milliseconds
            label: window.location.pathname
          });
        }

        // Finally, clean up the entries.
        performance.clearMarks();
        performance.clearMeasures();
      } else {
        const timeSincePageLoad = Math.round(performance.now());
        ReactGA.timing({
          category: 'Account Page Load Time',
          variable: `${location.pathname}`,
          value: timeSincePageLoad, // in milliseconds
          label: window.location.pathname
        });
      }
    }
  }, [])

  return (
    <div className="accountTab">
      {loading ? <div className="product-page-details_block loader-wrapper">
        < ReactSVG path={loader} className="medium-size-loader" />
      </div > : <S.TileWrapper>
        <Grid container spacing={3}>
          <AccountTile user={data && data.storefrontUser} />
          <UserDocuments refetch={refetch} user={data && data.storefrontUser} />
        </Grid>
      </S.TileWrapper>}
    </div>
  );

};
