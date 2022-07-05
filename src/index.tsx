import { hot } from "react-hot-loader";
import { ThemeProvider } from "styled-components";

import { NotificationTemplate } from "@components/atoms";
import {
  I18nLoader,
  ServiceWorkerContext,
  ServiceWorkerProvider,
} from "@components/containers";
import { SaleorProvider, useAuth, useUserDetails } from "@sdk/react";
import { defaultTheme, GlobalStyle } from "@styles";

import { defaultDataIdFromObject, InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { RetryLink } from "apollo-link-retry";
import * as React from "react";
import { positions, Provider as AlertProvider, useAlert } from "react-alert";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

// import { App } from "./app";
import App from "./app/App";
import CheckoutApp from "./checkout";
import { CheckoutProvider } from "./checkout/CheckoutProvider";
import { CheckoutContext } from "./checkout/context";
import { baseUrl as checkoutBaseUrl } from "./checkout/routes";
import { apiUrl, serviceWorkerTimeout } from "./constants";
import { history } from "./history";

import { OverlayProvider, UserProvider } from "./components";

import CartProvider from "./components/CartProvider";
import EMWCartProvider from "./components/EMWCartProvider";
import ShopProvider from "./components/ShopProvider";

import {
  authLink,
  invalidTokenLinkWithTokenHandlerComponent,
} from "./core/auth";

import { languages } from "./languages";
import ReactGA from 'react-ga';

import { createHttpLink } from "apollo-link-http";
import useHotjar from 'react-use-hotjar';

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import  EMWErrorBoundary  from './components/EMWErrorBoundary';
import EMWIdleUser from './components/DetectIdleUser';
// import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { checkCachingQueries } from "./utils/checkCachingQueries";
import qs from "query-string";

const { link: invalidTokenLink } = invalidTokenLinkWithTokenHandlerComponent(
  UserProvider
);

const cachingMiddleware = new ApolloLink((operation, forward) => {
  const parsed = qs.parse(window.location.search)
  if(parsed && parsed['no-cache']){
    return forward(operation);
  }else{
    if(checkCachingQueries(operation.operationName)){
      operation.setContext(() => ({
        fetchOptions:{
          method: "GET"
        }
      }));
    }
  }
  return forward(operation);
})

const link = ApolloLink.from([
  // createPersistedQueryLink({ useGETForHashedQueries: true }),
  cachingMiddleware,
  invalidTokenLink,
  authLink,
  new RetryLink(),
  createHttpLink({ uri: apiUrl }),
]);

const cache = new InMemoryCache({
  dataIdFromObject: obj => {
    if (obj.__typename === "Shop") {
      return "shop";
    }
    return defaultDataIdFromObject(obj);
  },
});

const startApp = async () => {

  // init sentry error tracking
  Sentry.init({ 
    dsn: process.env.REACT_APP_SENTRY_CLIENT_KEY,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.10,
  });

  // await persistCache({
  //   cache,
  //   storage: window.localStorage,
  //   maxSize: false,
  // });

  const apolloClient = new ApolloClient({
    cache,
    link,
  });

  const notificationOptions = {
    position: positions.BOTTOM_RIGHT,
    timeout: 2500,
    containerStyle: {
      zIndex: 99999,
    },
  };
  
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_KEY,{
    gaOptions: {
      'siteSpeedSampleRate': 100
    }
  });
  ReactGA.ga('require', 'ec');
  ReactGA.ga('send', 'pageview', {
    'page': location.pathname+location.search,
    'title': "EMW e-commerce"
  });
  const Root = hot(module)(() => {
    const Notifications = () => {
      const alert = useAlert();
      const { initHotjar } = useHotjar();
      const { updateAvailable } = React.useContext(ServiceWorkerContext);

      React.useEffect(() => {
        if (updateAvailable) {
          location.reload();
          // alert.show(
          //   {
          //     actionText: "Refresh",
          //     content:
          //       "To update the application to the latest version, please refresh the page!",
          //     title: "New version is available!",
          //   },
          //   {
          //     onClose: () => {
          //       location.reload();
          //     },
          //     timeout: 0,
          //     type: "success",
          //   }
          // );
        }
      }, [updateAvailable]);

      React.useEffect(() => {
        initHotjar(parseInt(process.env.REACT_APP_HOTJAR_SITE_ID), parseInt(process.env.REACT_APP_HOTJAR_SNIPPET_VERSION));
      }, []);
      useAuth((authenticated: boolean) => {
        if (authenticated) {
          alert.show(
            {
              title: "You are now logged in",
            },
            { type: "success" }
          );
        } else {
          alert.show(
            {
              title: "You are now logged out",
            },
            { type: "success" }
          );
        }
      });
      return null;
    };

    const Checkout = ({ children }) => {
      const user = useUserDetails();
      return (
        <>
          <CheckoutProvider user={user}>{children}</CheckoutProvider>
        </>
      );
    };

    return (
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <ApolloProvider client={apolloClient}>
            <SaleorProvider client={apolloClient}>
              <ShopProvider>
                <OverlayProvider>
                  <Checkout>
                    <CheckoutContext.Consumer>
                      {checkout => (
                        <CartProvider
                          checkout={checkout}
                          apolloClient={apolloClient}
                        >
                          <EMWCartProvider>
                          <EMWIdleUser>
                          <Switch>
                            <Route
                              path={checkoutBaseUrl}
                              component={CheckoutApp}
                            />
                            <Route component={App} />
                          </Switch>
                          </EMWIdleUser>
                          <Notifications />
                          </EMWCartProvider>
                        </CartProvider>
                      )}
                    </CheckoutContext.Consumer>
                  </Checkout>
                </OverlayProvider>
              </ShopProvider>
            </SaleorProvider>
          </ApolloProvider>
        </QueryParamProvider>
      </Router>
    );
  });

  render(
    <ThemeProvider theme={defaultTheme}>
      <I18nLoader languages={languages}>
        <AlertProvider
          template={NotificationTemplate as any}
          {...notificationOptions}
        >
          <ServiceWorkerProvider timeout={serviceWorkerTimeout}>
            <GlobalStyle />
            <EMWErrorBoundary> 
              <Root />
            </EMWErrorBoundary>
          </ServiceWorkerProvider>
        </AlertProvider>
      </I18nLoader>
    </ThemeProvider>,
    document.getElementById("root")
  );

  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept();
  }
};

startApp();
