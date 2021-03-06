import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient, ApolloError, ObservableQuery } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { RetryLink } from "apollo-link-retry";
import { GraphQLError } from "graphql";
import urljoin from "url-join";

import { TokenAuth } from "../components/User/types/TokenAuth";
import { authLink, getAuthToken, invalidTokenLink, setAuthToken, setAuthUserId } from "./auth";
import { MUTATIONS } from "./mutations";
import { QUERIES } from "./queries";
import { RequireAtLeastOne } from "./tsHelpers";
import {
  InferOptions,
  MapFn,
  QueryShape,
  WatchMapFn,
  WatchQueryData,
} from "./types";
import {
  getErrorsFromData,
  getMappedData,
  isDataEmpty,
  mergeEdges,
} from "./utils";

import { UserDetails } from "./queries/types/UserDetails";
import ReactGA from 'react-ga';

import { createHttpLink } from "apollo-link-http";


const { invalidLink } = invalidTokenLink();
const getLink = (url?: string) =>
  ApolloLink.from([
    invalidLink,
    authLink,
    new RetryLink(),
    createHttpLink({ uri: urljoin(url || "/", "/graphql/") }),
  ]);

export const createSaleorClient = (url?: string, cache = new InMemoryCache()) =>
  new ApolloClient({
    cache,
    defaultOptions: {
      mutate: {
        errorPolicy: "all",
      },
      query: {
        errorPolicy: "all",
        fetchPolicy: "network-only",
      },
      watchQuery: {
        errorPolicy: "all",
        // fetchPolicy: "cache-and-network",
        fetchPolicy: "network-only",
      },
    },
    link: getLink(url),
  });

export class SaleorAPI {
  getAttributes = this.watchQuery(QUERIES.Attributes, data => data.attributes);

  getCheckoutDetails = this.watchQuery(
    QUERIES.CheckoutDetails,
    data => data.checkout
  );

  getProductDetails = this.watchQuery(
    QUERIES.ProductDetails,
    data => data.product
  );

  getProductList = this.watchQuery(QUERIES.ProductList, data => data.products);

  getCategoryDetails = this.watchQuery(
    QUERIES.CategoryDetails,
    data => data.category
  );

  getOrdersByUser = this.watchQuery(QUERIES.OrdersByUser, data =>
    data.me ? data.me.orders : null
  );

  getOrderDetails = this.watchQuery(
    QUERIES.OrderDetails,
    data => data.orderByToken
  );

  getUserCheckout = this.watchQuery(QUERIES.UserCheckoutDetails, data =>
    data.me ? data.me.checkout : null
  );

  getVariantsProducts = this.watchQuery(
    QUERIES.VariantsProducts,
    data => data.productVariants
  );

  setUserDefaultAddress = this.fireQuery(
    MUTATIONS.AddressTypeUpdate,
    data => data!.accountSetDefaultAddress
  );

  setCreateCheckout = this.fireQuery(
    MUTATIONS.CreateCheckout,
    data => data!.checkoutCreate
  );

  setCheckoutShippingAddress = this.fireQuery(
    MUTATIONS.UpdateCheckoutShippingAddress,
    data => data!.checkoutShippingAddressUpdate
  );

  setAddCheckoutPromoCode = this.fireQuery(
    MUTATIONS.AddCheckoutPromoCode,
    data => data!.checkoutAddPromoCode
  );

  setRemoveCheckoutPromoCode = this.fireQuery(
    MUTATIONS.RemoveCheckoutPromoCode,
    data => data!.checkoutRemovePromoCode
  );

  setDeleteUserAddress = this.fireQuery(
    MUTATIONS.DeleteUserAddress,
    data => data!.accountAddressDelete
  );

  setCreateUserAddress = this.fireQuery(
    MUTATIONS.CreateUserAddress,
    data => data!.accountAddressCreate
  );

  setUpdateuserAddress = this.fireQuery(
    MUTATIONS.UpdateUserAddress,
    data => data!.accountAddressUpdate
  );

  setCheckoutBillingAddress = this.fireQuery(
    MUTATIONS.UpdateCheckoutBillingAddress,
    data => data!.checkoutBillingAddressUpdate
  );

  setAccountUpdate = this.fireQuery(
    MUTATIONS.AccountUpdate,
    data => data!.accountUpdate
  );

  setPasswordChange = this.fireQuery(MUTATIONS.PasswordChange, data => data);

  setPassword = this.fireQuery(MUTATIONS.SetPassword, data => data);

  private client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  getUserDetails = (
    variables: InferOptions<QUERIES["UserDetails"]>["variables"],
    options: Omit<InferOptions<QUERIES["UserDetails"]>, "variables"> & {
      onUpdate: (data: UserDetails["me"] | null) => void;
    }
  ) => {
    if (this.isLoggedIn()) {
      return this.watchQuery(QUERIES.UserDetails, data => data.me)(
        variables,
        options
      );
    }
    if (options.onUpdate) {
      options.onUpdate(null);
    }
    return {
      refetch: () =>
        new Promise<{ data: UserDetails["me"] }>((resolve, _reject) => {
          resolve({ data: null });
        }),
      unsubscribe: () => undefined,
    };
  };

  signIn = (
    variables: InferOptions<MUTATIONS["TokenAuth"]>["variables"],
    options?: Omit<InferOptions<MUTATIONS["TokenAuth"]>, "variables">
  ) =>
    new Promise<{ data: TokenAuth["emwTokenCreate"] }>(async (resolve, reject) => {
      try {
        const data = await this.fireQuery(
          MUTATIONS.TokenAuth,
          data => data!.emwTokenCreate
        )(variables, {
          ...options,
          update: (proxy, data) => {
            const handledData = handleDataErrors(
              (data: any) => data.emwTokenCreate,
              data.data,
              data.errors
            );
            if (!handledData.errors && handledData.data) {
              // set new cart object 
              const lines=handledData.data.user.emwCheckout && handledData.data.user.emwCheckout.lines;
              const subTotalPrice=handledData.data.user.emwCheckout && handledData.data.user.emwCheckout.emwTotalPrice && handledData.data.user.emwCheckout.emwTotalPrice.totalItemPrice && handledData.data.user.emwCheckout.emwTotalPrice.totalItemPrice.amount; 

              // GA Login Event
              ReactGA.event({
                category: 'User',
                action: 'Logged In',
                label: 'SuccessFully Logged In',
              });

              if(lines)
              {
                localStorage.setItem('EMWCart', JSON.stringify(handledData.data.user.emwCheckout));
              }
              if(options && options.setLines)
              {
                if(lines)
                {
                  options.setLines(handledData.data.user.emwCheckout.lines,subTotalPrice);
                }
                else{
                  options.setLines([],0);
                }
              }
              setAuthToken(handledData.data.token);
              setAuthUserId(handledData.data.user.id);
              const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
              if (window.PasswordCredential && variables && isChrome && typeof(PublicKeyCredential) != "undefined") {
                navigator.credentials.store(
                  new window.PasswordCredential({
                    id: variables.email,
                    password: variables.password,
                  })
                );
              }
            }
            if (options && options.update) {
              options.update(proxy, data);
            }
          },
        });

        resolve(data);
      } catch (e) {
        reject(e);
      }
    });

  attachAuthListener = (callback: (authenticated: boolean) => void) => {
    const eventHandler = () => {
      callback(this.isLoggedIn());
    };

    addEventListener("auth", eventHandler);

    return () => {
      removeEventListener("auth", eventHandler);
    };
  };

  isLoggedIn = () => {
    return !!getAuthToken();
  };

  private watchQuery<T extends QueryShape, TResult>(
    query: T,
    mapFn: WatchMapFn<T, TResult>
  ) {
    return <
      TVariables extends InferOptions<T>["variables"],
      TOptions extends Omit<InferOptions<T>, "variables">
    >(
      variables: TVariables,
      options: TOptions & {
        skip?: boolean;
        onComplete?: () => void;
        onError?: (error: ApolloError) => void;
        onUpdate: (data: ReturnType<typeof mapFn> | null) => void;
      }
    ) => {
      const { onComplete, onError, onUpdate, ...apolloClientOptions } = options;

      const observable: ObservableQuery<WatchQueryData<T>, TVariables> = query(
        this.client,
        {
          ...apolloClientOptions,
          variables,
        }
      );

      if (options.skip) {
        return {
          refetch: (_variables?: TVariables) => {
            return new Promise((resolve, _reject) => {
              resolve({ data: null });
            });
          },
          unsubscribe: null,
        };
      }

      const subscription = observable.subscribe(
        result => {
          const { data, errors: apolloErrors } = result;
          const errorHandledData = handleDataErrors(
            mapFn,
            data as any,
            apolloErrors
          );
          if (onUpdate) {
            if (errorHandledData.errors) {
              if (onError) {
                onError(errorHandledData.errors);
              }
            } else {
              onUpdate(errorHandledData.data as TResult);
              if (onComplete) {
                onComplete();
              }
            }
          }
        },
        error => {
          if (onError) {
            onError(error);
          }
        }
      );

      return {
        loadMore: (
          extraVariables: RequireAtLeastOne<TVariables>,
          mergeResults: boolean = true
        ) => {
          observable.fetchMore({
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                // returning previousResult doesn't trigger observable `next`
                onUpdate(mapFn(previousResult));
                return previousResult;
              }

              if (mergeResults) {
                const prevResultRef = mapFn(previousResult) as any;
                const newResultRef = mapFn(fetchMoreResult) as any;

                if (!prevResultRef || !newResultRef) {
                  onUpdate(prevResultRef);
                  return previousResult;
                }

                const mergedEdges = mergeEdges(
                  prevResultRef.edges,
                  newResultRef.edges
                );

                // use new result for metadata and mutate existing data
                Object.keys(prevResultRef).forEach(key => {
                  prevResultRef[key] = newResultRef[key];
                });
                prevResultRef.edges = mergedEdges;

                return previousResult;
              }

              return fetchMoreResult;
            },
            variables: { ...variables, ...extraVariables },
          });
        },
        refetch: (variables?: TVariables) => {
          if (variables) {
            observable.setVariables(variables);
            const cachedResult = observable.currentResult();
            const errorHandledData = handleDataErrors(mapFn, cachedResult.data);
            if (errorHandledData.data) {
              onUpdate(errorHandledData.data as TResult);
            }
          }

          return this.firePromise(() => observable.refetch(variables), mapFn);
        },
        setOptions: (options: TOptions) =>
          this.firePromise(() => observable.setOptions(options), mapFn),
        unsubscribe: subscription.unsubscribe.bind(subscription),
      };
    };
  }

  private fireQuery<T extends QueryShape, TResult>(
    query: T,
    mapFn: MapFn<T, TResult>
  ) {
    return (
      variables: InferOptions<T>["variables"],
      options?: Omit<InferOptions<T>, "variables">
    ) =>
      this.firePromise(
        () =>
          query(this.client, {
            ...options,
            variables,
          }),
        mapFn
      );
  }

  // Promise wrapper to catch errors
  private firePromise<T extends QueryShape, TResult>(
    promise: () => Promise<any>,
    mapFn: MapFn<T, TResult> | WatchMapFn<T, TResult>
  ) {
    return new Promise<{ data: ReturnType<typeof mapFn> | null }>(
      async (resolve, reject) => {
        try {
          const { data, errors: apolloErrors } = await promise();
          const errorHandledData = handleDataErrors(mapFn, data, apolloErrors);

          if (errorHandledData.errors) {
            reject(errorHandledData.errors);
          }

          resolve({ data: errorHandledData.data });
        } catch (error) {
          reject(error);
        }
      }
    );
  }
}

// error handler
const handleDataErrors = <T extends QueryShape, TData>(
  mapFn: MapFn<T, TData> | WatchMapFn<T, TData>,
  data: TData,
  apolloErrors?: readonly GraphQLError[]
) => {
  // INFO: user input errors will be moved to graphql errors
  const userInputErrors = getErrorsFromData(data);
  const errors =
    apolloErrors || userInputErrors
      ? new ApolloError({
          extraInfo: userInputErrors,
          graphQLErrors: apolloErrors,
        })
      : null;

  if (errors && isDataEmpty(data)) {
    return { errors };
  }

  const result = getMappedData(mapFn, data);

  return { data: result };
};
