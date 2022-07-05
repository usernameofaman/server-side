import "../globalStyles/scss/index.scss";

import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";

import { Footer, MainMenu, MetaConsumer, OverlayContext, OverlayManager } from "../components";
import { isPath } from "../core/utils";
import { orderConfirmationUrl, Routes } from "../routes";
import { useUserDetails } from "../@sdk/react";
import useHotjar from 'react-use-hotjar';

const App: React.FC<RouteComponentProps> = ({
  history: {
    location: { pathname },
  },
}) => {
  const orderConfirmationPage = isPath(pathname, orderConfirmationUrl);
  const user: any = useUserDetails();
  const { identifyHotjar } = useHotjar();
  useEffect(() => {
    if(user && user.data && user.data.email){
      var userId = user.data.id || null; // Replace your_user_id with your own if available.
      identifyHotjar(userId,{
        'email': user.data.email,
      });
  }
  }, [user && user.data && user.data.email]);
  return (
    <>
      <MetaConsumer />
      <header>
      <OverlayContext.Consumer>
        {(OverlayManager) => <MainMenu pathname={pathname} overlay={OverlayManager} />}
      </OverlayContext.Consumer>
      </header>
      <Routes />
      {!orderConfirmationPage && <Footer />}
      <OverlayManager />
    </>
  );
};

export default App;
