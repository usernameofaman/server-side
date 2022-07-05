import React from "react";
import { register, unregister } from "register-service-worker";
import * as Sentry from "@sentry/react";

export const useServiceWorker = ({ timeout = 1000 }) => {
  const [updateAvailable, setUpdateAvailable] = React.useState<boolean>(false);
  const [registration, setRegistration] = React.useState<any>(null);

  React.useEffect(() => {
    const interval: number = setInterval(() => {
      if (registration) {
        registration.update();
      }
    }, timeout);
    return () => clearInterval(interval);
  }, [registration]);

  const registered = (registration: any) => setRegistration(registration);
  const updated = () => setUpdateAvailable(true);
  const error= (error)=> {
    Sentry.captureException(new Error(error));
  }
  React.useEffect(() => {
    register("/service-worker.js", { registered, updated, error });
    return () => unregister();
  }, []);

  return { updateAvailable };
};
