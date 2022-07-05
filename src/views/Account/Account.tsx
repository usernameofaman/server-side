import * as React from "react";
import Media from "react-responsive";
import { RouteComponentProps, withRouter } from "react-router";

import { useUserDetails } from "@sdk/react";
import { smallScreen } from "@styles/constants";
import AddressBook from "../../account/AddressBook/AddressBook";
import DocumentsTax from "../../account/DocumentsTax/DocumentsTax"
import { accountSettingOptions } from '../../constants';
import "./scss/index.scss";

import {
  accountUrl,
  addressBookUrl,
  signInPage,
  documentTaxUrl,
  orderHistoryUrl,
  paymentOptionsUrl
} from "../../routes";
import Select from 'react-select';
import { AccountMenu, AccountMenuMobile } from "@components/molecules";
import { AccountTab, OrdersHistory } from "@components/views";
import { Breadcrumbs, Loader, MetaWrapper } from "../../components";
import { Container } from "@material-ui/core";

const returnTab: any = (path: string, userDetails, history) => {
  let tabContent = <></>;
  switch (path) {
    case accountUrl: {
      tabContent = <AccountTab />;
      break;
    }
    case addressBookUrl: {
      tabContent = <AddressBook user={userDetails} />;
      break;
    }
    case orderHistoryUrl: {
      tabContent = <OrdersHistory {...{ history }} />;
      break;
    }
    case documentTaxUrl: {
      // This would help login page to open login sidebar if user is not loggedin
      if(!localStorage.getItem("loggedIn") && !localStorage.getItem("token"))
        localStorage.setItem("openLoginBar", "true")
      // --

      tabContent = <DocumentsTax user={userDetails} />;
      break;
    }
  }
  return tabContent;
};

const Account: React.FC<RouteComponentProps> = ({ history, match }) => {
  const { data: user, loading } = useUserDetails();
  const [accountSetting, setAccountSetting] = React.useState({});

  React.useEffect(() => {
    switch (match.path) {
      case accountUrl: {
        setAccountSetting({ value: accountUrl, label: "Account Information" })
        break;
      }
      case addressBookUrl: {
        setAccountSetting({ value: addressBookUrl, label: "Address Book" })
        break;
      }
      case orderHistoryUrl: {
        setAccountSetting({ value: orderHistoryUrl, label: "Order History" })
        break;
      }
      case documentTaxUrl: {
        setAccountSetting({ value: documentTaxUrl, label: "Documents and Tax" })
        break;
      }
    }
  }, [match]);

  const links = [
    accountUrl,
    orderHistoryUrl,
    addressBookUrl,
    // paymentOptionsUrl,
  ];

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    history.push(signInPage);
  }
  const onSelectChange = (value) => {
    setAccountSetting(value);
    history.push(`/${value.value}/`);
  }
  return (
    <MetaWrapper
      meta={{
        description: "",
      }}
    ><Container maxWidth="lg" >
        <div className="AccountInformationSelect">
          <p>You are logged in as {user && user.email}</p>
          <Select
            className="basic-single"
            minMenuHeight={49}
            placeholder="Account Setting"
            classNamePrefix="basicSingle"
            options={accountSettingOptions}
            value={accountSetting}
            onChange={(values) => onSelectChange(values)}
          />
        </div>
      </Container>

      <div className="container account-container">
        {/*<Breadcrumbs breadcrumbs={[{ link: match.path, value: "My Account" }]} />*/}

        <div className="account">
          {/*<Media minWidth={smallScreen}>
          <div className="account__menu">
            <AccountMenu links={links} active={match.path} />
          </div>
        </Media>
        <Media maxWidth={smallScreen - 1}>
          <div className="account__menu_mobile">
            <AccountMenuMobile links={links} active={match.path} />
          </div>
        </Media>*/}
          <div className="account__content">
            {returnTab(match.path, user, history)}
          </div>
        </div>
      </div>
    </MetaWrapper>
  );
};

export default withRouter(Account);
