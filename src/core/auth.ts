import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { ErrorResponse, onError } from "apollo-link-error";
import * as React from "react";
import jwt from "jwt-simple";
import * as Sentry from "@sentry/react";

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem("token");
    let existingToken = localStorage.getItem("token");
    const decodedToken = jwt.decode(existingToken, "", true);
    decodedToken.RequestType = "Stroefront";
    decodedToken.Cart = "Cart local data";
    existingToken = jwt.encode(decodedToken, "x", 'HS256')
    return existingToken
  } catch {
    return null;
    const payload = { RequestType: 'Stroefront' };
    const secret = 'x';
    const newToken = jwt.encode(payload, secret, 'HS256')
    localStorage.setItem("token", newToken);
    return newToken
  }
}

export function setAuthToken(token: string): void {
  localStorage.setItem("token", token);
}

export function removeAuthToken(): void {
  localStorage.removeItem("token");
}

interface ResponseError extends ErrorResponse {
  networkError?: Error & {
    statusCode?: number;
    bodyText?: string;
  };
}

export const invalidTokenLinkWithTokenHandlerComponent = (
  component: React.ComponentClass
): { component: React.FC<any>; link: ApolloLink } => {
  // tslint:disable-next-line:no-empty
  let tokenExpirationCallback = () => {};

  const tokenExpirationHandler = callback => {
    tokenExpirationCallback = callback;
  };
  const extendedComponent = props => {
    return React.createElement(component, {
      ...props,
      tokenExpirationHandler,
    });
  };
  const link = onError((error: ResponseError) => {
    if (error.networkError && error.networkError.statusCode === 401) {
      tokenExpirationCallback();
    }else{
      if(error.graphQLErrors && error.graphQLErrors.length>0){
          const result = error.graphQLErrors.map(item => item.message);
          const stacktrace = error.graphQLErrors.map(item => item.extensions.exception.stacktrace);
          const queryName = error.graphQLErrors.map(item => item.extensions.query);
          (result.length>0 || stacktrace.length>0 || queryName.length>0 ) && Sentry.captureException(new Error(`GraphQl Response Error`), {
            extra: {
              graphQLErrorsMessage: result,
              strackTrace: stacktrace[0],
              queryName: queryName
            },
          });
      }
    }
  });
  return { component: extendedComponent, link };
};

export const authLink = setContext((_, context) => {
  const authToken = getAuthToken();
  if (authToken) {
    return {
      ...context,
      headers: {
        ...context.headers,
        Authorization: authToken ? `JWT ${authToken}` : null,
      },
    };
  } else {
    return context;
  }
});
