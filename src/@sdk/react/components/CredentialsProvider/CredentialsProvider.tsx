import React from "react";

import { useSaleorClient, useSignIn } from "../..";
import { IProps } from "./types";

export function CredentialsProvider({
  children,
}: IProps): React.ReactElement<IProps> {
  const saleor = useSaleorClient();
  const [signIn] = useSignIn();

  const autoSignIn = async () => {
    const credentials = await navigator.credentials.get({
      password: true,
    });
    if (credentials) {
      await signIn({
        email: credentials.id,
        password: credentials.password,
      });
    }
  };

  React.useEffect(() => {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (!saleor.isLoggedIn() && window.PasswordCredential && isChrome && typeof(PublicKeyCredential) != "undefined") {
      autoSignIn();
    }
  }, []);

  return children;
}
