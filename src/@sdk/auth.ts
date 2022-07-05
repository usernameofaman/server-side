import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { ErrorResponse, onError } from "apollo-link-error";
import ReactGA from 'react-ga';

// export const authEvent = new Event("auth");

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem("token");
  } catch {
    return null;
  }
}

export function setAuthToken(token: string) {
  localStorage.setItem("token", token);
  localStorage.setItem("loggedIn", true);
  localStorage.removeItem("EMWQuote");
  localStorage.removeItem("contactInfoTemp");
  localStorage.removeItem("anonumousLoginIn");
  localStorage.removeItem("loggedInUserEmail");
  //dispatchEvent(authEvent);
}

export function setAuthUserId(id: string) {
  localStorage.setItem("emwUserId", id);
}

export function removeAuthToken(cartActions) {
  // GA Logout Event
  ReactGA.event({
    category: 'User',
    action: 'Logout',
    label: 'SuccessFully Logged Out',
  });

  localStorage.removeItem("token");
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("EMWCart");
  localStorage.removeItem("EMWQuote");
  localStorage.removeItem("emwUserId");
  localStorage.removeItem("shippingtemp");
  localStorage.removeItem("ValidAddressID");
  localStorage.removeItem("isStaff");
  localStorage.removeItem("ImpersonatedCustomerEmail");
  localStorage.removeItem("anonumousLoginIn");
  localStorage.removeItem("loggedInUserEmail");
  localStorage.removeItem("unverifiedShippingObject");
  cartActions.setLines([]);
  // dispatchEvent(authEvent);
}

interface ResponseError extends ErrorResponse {
  networkError?: Error & {
    statusCode?: number;
    bodyText?: string;
  };
}

// possibly remove callback here and use event emitter
export const invalidTokenLink = (): { invalidLink: ApolloLink } => {
  const invalidLink = onError((error: ResponseError) => {
    if (error.networkError && error.networkError.statusCode === 401) {
      removeAuthToken();
    }
  });
  return { invalidLink };
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
