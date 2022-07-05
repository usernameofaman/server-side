import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { TextField } from "../../../../components";
import { OrderTabel } from "@components/molecules";
import { IProps } from "./types";
import searchImg from "../../../../images/goldSearch.svg";
import ReactSVG from "react-svg";
import { useQuery } from "@apollo/react-hooks";
import { EMWOrderHistoryListQuery } from "@sdk/queries/emwOrderHistory";
import EMWOrderInvoice from "../../../../components/EMWOrderInvoice";
import ReactGA from "react-ga";

// interface OrderHistoryProps {
// }

export const OrdersHistory: React.FC<IProps> = ({ history }: IProps) => {
  const [open, setOpen] = useState(false);
  const [orderNum, setOrderNum] = useState(null);
  const { loading, error, data, refetch, fetchMore } = useQuery(
    EMWOrderHistoryListQuery,
    {
      // variables: queryVariables,
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    // Page Load Timings
    if (window.performance) {
      const start = window.performance.getEntriesByName(
        `${location.pathname}_START`,
        "mark"
      );
      if (start && start.length > 0) {
        const end = window.performance.mark(`${location.pathname}_END`);
        window.performance.measure(
          "myMeasure",
          `${location.pathname}_START`,
          `${location.pathname}_END`
        );
        const entries = window.performance.getEntriesByType("measure");

        if (entries && entries.length > 0 && entries[0].duration) {
          // Sends the timing hit to Google Analytics.
          ReactGA.timing({
            category: "Account Page Load Time",
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
          category: "Account Page Load Time",
          variable: `${location.pathname}`,
          value: timeSincePageLoad, // in milliseconds
          label: window.location.pathname,
        });
      }
    }
  }, []);

  const nextPage = () => {
    const endCursor = data.emwOrders.pageInfo.endCursor;
    const varData = { after: endCursor };

    fetchMore({
      query: EMWOrderHistoryListQuery,
      variables: varData,
      updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
        const previousEntry = previousResult.emwOrders.edges;
        const newEntry = fetchMoreResult.emwOrders.edges;
        const latestEntry = previousEntry.concat(newEntry);
        return {
          ...fetchMoreResult,
          emwOrders: {
            ...fetchMoreResult.emwOrders,
            edges: latestEntry,
          },
        };
      },
    });
  };


  const handleClickOpen = value => {
    setOrderNum(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="emwOrderHistorySection">
      <div className="header">
        <span className="deliver-heading">Order History</span>
        <p className="scroll-view-order">Logged in purchase history will appear below. Scroll to view all orders.</p>
        <div className="remove-mobile-view">
          {/* <div className='bg-white'>
                        <TextField
                            name="search"
                            type="text"
                            onChange={changedText}
                        />
                    </div>
                    <ReactSVG path={searchImg} /> */}
        </div>
      </div>
      <div className="inner-wrap">
        <div className="inner-title">
          <h4>Orders</h4>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} className="emwOrderHistoryTableScroll">
            <div className="emwOrderTableWrap">
              <OrderTabel
                orders={data}
                history={history}
                loading={loading}
                nextPage={nextPage}
                handleClickOpen={handleClickOpen}
              />
            </div>
          </Grid>
        </Grid>
        <EMWOrderInvoice
          open={open}
          handleClose={handleClose}
          orderNum={orderNum}
          orderEmail={""}
          typeModal={true}
        />
      </div>
    </div>
  );
};
