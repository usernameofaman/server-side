import "./scss/index.scss";

import * as React from "react";

import { Button, Form, TextField } from "../..";
import { maybe } from "../../../core/utils";
import { getEMWTiers, TypedAccountRegisterMutation, TypedEMWTiers, TypedTierDocumentTypes } from "./queries";
import { RegisterAccount } from "./types/RegisterAccount";

import { AlertManager, useAlert } from "react-alert";
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import qs from "query-string"

import { useSignIn } from "@sdk/react";
import EMWModal from "../../EMWModal/EMWModal";
import UploadDocuments from "./UploadDocuments";
import { Checkbox } from "@material-ui/core";
import Verification from "./Verification";
import Steps, { Step } from "./Steps";
import { loadingIndicatorCSS } from "react-select/lib/components/indicators";
import { useQuery } from "react-apollo";
import EMWPhoneNumber from "../../EMWPhoneNumber";
import SuccessIcon from '../../../images/successIcon.svg';
import ErrorIcon from '../../../images/error-icon.svg';
import { OverlayContext, OverlayTheme, OverlayType, } from '../../index';


interface AccountType {
  label: string,
  value: string
}

enum ACCOUNT_WIZARD {
  CREATE = "create",
  //UPLOAD = "upload",
  //VERIFICATION = "verification",
  //CREATED = "created",
  COMPLETE = 'complete',
}

const accountSteps = [
  {
    label: "1",
    value: ACCOUNT_WIZARD.CREATE,
    activeLabel: "Basic Information",
  },
  {
    label: "2",
    value: ACCOUNT_WIZARD.COMPLETE,
    activeLabel: "Complete",
  },
  // {
  //   label: "2",
  //   value: ACCOUNT_WIZARD.UPLOAD,
  //   activeLabel: "Upload Documents",
  // },
  // {
  //   label: "3",
  //   value: ACCOUNT_WIZARD.VERIFICATION,
  //   activeLabel: "Verification",
  // },
  // {
  //   label: "4",
  //   value: ACCOUNT_WIZARD.CREATED,
  //   activeLabel: "Account Created",
  // },
]

const showSuccessNotification = async (
  data: RegisterAccount,
  hide: () => void,
  alert: AlertManager,
  setemailError: (err) => void,
  email: string,
  password: string,
  signIn: any,
  setviewShipping: (shp) => void
) => {
  const successful = maybe(() => !data.accountRegister.errors.length);
  if (successful) {
    // setviewShipping(true)
    const isLocalData = JSON.parse(localStorage.getItem('EMWCart'));
    const lines = [];
    if (isLocalData && isLocalData.lines) {
      isLocalData.lines.map(item => {
        const productOptions = [];
        if (item.productOptions && item.productOptions.length > 0) {
          item.productOptions.map(optionItem => {
            productOptions.push(optionItem.productOption.id);
          });
        }

        const createLineData = {
          quantity: item.quantity,
          productId: item.product.id,
          optionIds: productOptions,
        }
        return lines.push(createLineData);
      });
    }
    const authenticated = await signIn({ email, password, lines }, null);
    if (authenticated && authenticated.data.token) {
      setviewShipping(true)
    }
    // hide();

    // alert.show(
    //   {
    //     title: data.accountRegister.requiresConfirmation
    //       ? "We just sent you an email. Please confirm your email to activate your account."
    //       : "New user has been created",
    //   },
    //   { type: "success", timeout: 5000 }
    // );
  } else {
    if (data.accountRegister.errors[0].message === "User with this Email already exists.") {
      setemailError(true)
    }
  }
};



const RegisterForm: React.FC<{ hide: () => void, changeActiveTab: (tab) => void }> = ({ hide, changeActiveTab }) => {
  const [business, setBusiness] = React.useState("");
  const [accountTypeId, setaccountTypeId] = React.useState("");
  const [isTaxExempt, setIsTaxExempt] = React.useState(false)
  const alert = useAlert();
  const [emailError, setemailError] = React.useState(false);
  const [userEmail, setuserEmail] = React.useState("");
  const [userPass, setuserPass] = React.useState("");
  const [signIn, { loading: signInLoading, error }] = useSignIn();
  const [btnActive, setbtnActive] = React.useState(false);
  const [confirmBtnActive, setConfirmBtnActive] = React.useState(false);
  const [phoneNum, setPhoneNum] = React.useState("");
  const [viewShipping, setviewShipping] = React.useState(false);
  const [accountCreated, setAccountCreated] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<Step>(accountSteps[0])
  const [createValues, setcreateValues] = React.useState({
    firstName: "",
    lastName: "",
    organizationName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const overlayContext = React.useContext(OverlayContext);
  const ischeckedIn = localStorage.getItem('ischeckedIn');

  React.useEffect(() => {
    chkBtnActive()
  }, [createValues, business]);

  React.useEffect(() => {
    const parsed = qs.parse(window.location.search)
    const isAccountSetup = (window.location.pathname !== "/reset-password/") ? true : false;
    if (parsed.email && parsed.token && isAccountSetup) {
      setActiveTab(accountSteps[2])
    }
  }, [])

  // React.useEffect(() => {
  //   console.log("data", data)
  // }, [emailError]);

  const handleOnChangeNum = (value) => {
    setPhoneNum(value);
    setcreateValues({ ...createValues, "phoneNumber": (value == undefined) ? "" : value });
  }

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if (name === "email")
      setemailError(false)
    setcreateValues({ ...createValues, [name]: value });
  };

  const { data } = useQuery(getEMWTiers, {
    variables: { first: 50 }, fetchPolicy: "no-cache"
  });

  let accountTypes = []

  if (data) {
    accountTypes = data.emwTierTypes.edges.map(edge => edge.node)
  }

  const selectedType = accountTypes && accountTypes.find(type => type.emwTiertypeId === business)

  const chkBtnActive = () => {

    console.log(business, activeTab)

    if (!business) {
      setConfirmBtnActive(false)
    } else {
      if (selectedType && selectedType.emwTiertypeName === "Business") {
        if (createValues.firstName === "" || createValues.lastName === "" || createValues.organizationName === "" || createValues.email === "" || createValues.phoneNumber === "" || createValues.password === "") {
          setConfirmBtnActive(false)
        } else {
          setConfirmBtnActive(true)
        }
      } else if (createValues.firstName === "" || createValues.lastName === "" || createValues.email === "" || createValues.phoneNumber === "" || createValues.password === "") {
        setConfirmBtnActive(false)
      } else {
        setConfirmBtnActive(true)
      }
    }
  
    if (activeTab.label === "1") {
      console.log("Here")
      if (createValues.firstName === "" || createValues.lastName === "" || createValues.email === "" || createValues.phoneNumber === "" || createValues.password === "") {
        console.log("Here if")
        setbtnActive(false)
      } else {
        console.log("Here else")
        setbtnActive(true)
      }
    }
  }

  return (
    <React.Fragment>
      <TypedAccountRegisterMutation
        onCompleted={data => showSuccessNotification(data, hide, alert, setemailError, userEmail, userPass, signIn, () => {
          setAccountCreated(true);
        })}
      >
        {(registerCustomer, { loading, data }) => {

          const CreateAccountTab = (
            <>
              <p className="account__heading">Create an account</p>
              <span className="account__info__text  account_normal_text">To create your account and receive advantage pricing, please provide us with the information below</span>
              {/* <p className="account__heading">Basic Information</p> */}
              <Form>
                {/*{emailError ? <span className="emw-form-error">The email you have entered is already associated with an existing account. You can choose to <a onClick={() => changeActiveTab("login")}>login</a> or retry with another email address.</span> : null}*/}
                <label className="emw-label">First Name</label>
                <TextField
                  name="firstName"
                  autoComplete="First Name"
                  placeholder="First Name"
                  type="text"
                  required
                  value={createValues.firstName || ''}
                  onChange={handleOnChange}
                />
                <label className="emw-label">Last Name</label>
                <TextField
                  name="lastName"
                  autoComplete="Last Name"
                  placeholder="Last Name"
                  type="text"
                  required
                  value={createValues.lastName || ''}
                  onChange={handleOnChange}
                />

                <label className="emw-label">Email</label>
                <TextField
                  name="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  type="email"
                  value={createValues.email || ''}
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  required
                  onChange={handleOnChange}
                />

                <React.Fragment>
                  <label className="emw-label">Organization Name</label>
                  <TextField
                    name="organizationName"
                    autoComplete="Organization Name"
                    placeholder="Organization Name"
                    type="Text"
                    value={createValues.organizationName || ''}
                    onChange={handleOnChange}
                  /> </React.Fragment>

                <div className='add-bottom-gap'>
                  <label className="emw-label ">Phone Number</label>
                  <EMWPhoneNumber
                    defaultCountry="us"
                    name="phoneNumber"
                    value={createValues.phoneNumber || ''}
                    required={true}
                    phoneNum={phoneNum}
                    handleOnChangeNum={handleOnChangeNum}
                  />
                </div>
                <label className="emw-label">Password</label>
                <TextField
                  name="password"
                  autoComplete="password"
                  placeholder="Password"
                  type="password"
                  value={createValues.password || ''}
                  pattern="(?=.{8,}$)(?=.*\W).*"
                  title="Eight or more characters"
                  required
                  msg={true}
                  onChange={handleOnChange}
                />

                <div className="login__content__button">
                  <Button disabled={btnActive ? false : true} onClick={() => setActiveTab(accountSteps[1])}>
                    {"Continue"}
                  </Button>
                </div>
              </Form>
            </>
          )
          const FinalTab = (
            <>
              <Form
                errors={maybe(() => emailError ? data.accountRegister.errors : [], [])}
                onSubmit={(event, { organizationName }) => {
                  event.preventDefault();
                  const redirectUrl = window.location.origin;
                  setuserEmail(createValues.email)
                  setuserPass(createValues.password)
                  registerCustomer({
                    variables: {
                      firstName: createValues.firstName, lastName: createValues.lastName,
                      email: createValues.email, password: createValues.password, organizationName: createValues.organizationName, redirectUrl, tier: parseInt(business), "phoneNumber": phoneNum, isTaxExempt
                    }
                  })
                }}
              >
                {/*{emailError ? setActiveTab(accountSteps[0]) : ""}*/}
                <span className="account__info__label">Choose the option that best describes you:</span>

                <div className="account__type__container">
                  {
                    accountTypes.map((type) => {
                      if (type.emwTiertypeIsDefault && !business)
                        setBusiness(type.emwTiertypeId); setaccountTypeId(type.id)
                      return (
                        (type.emwTiertypeIsActive == true) ?
                          <div
                            key={type.id}
                            onClick={() => { setBusiness(type.emwTiertypeId); setaccountTypeId(type.id) }}
                            className={`account__type__button ${parseInt(business) === parseInt(type.emwTiertypeId) ? "account__type__button--active" : ""}`}
                          >{type.emwTiertypeName}</div>
                          :
                          null
                      );
                    })
                  }
                </div>

                {/* <div className="account__checkbox">
                  <Checkbox value={isTaxExempt} onChange={(_, checked) => setIsTaxExempt(checked)} />
                  <p className="account__info__small__label">
                    <span>I am tax exempt</span>
                    <br />

                    <span>(Requires tax exempt certificate)</span>
                  </p>
                </div> */}

                {selectedType && selectedType.emwTiertypeName === "Business" && (<React.Fragment>
                  <label className="emw-label">Organization Name</label>
                  <TextField
                    name="organizationName"
                    autoComplete="Organization Name"
                    placeholder="Organization Name"
                    type="Text"
                    required
                    value={createValues.organizationName || ''}
                    onChange={handleOnChange}
                  /> </React.Fragment>)}

                {accountCreated &&
                  <Box display="flex" className="account-success-msg">
                    <Box>
                      <img src={SuccessIcon} />
                    </Box>
                    <Box className="account-success-msg-text">
                      <p>Your Account has been successfully created.</p>
                    </Box>
                  </Box>}
                {emailError &&
                  <Box display="flex" className="account-exist-msg">
                    <Box className="account-exist-msg-icon">
                      <img src={ErrorIcon} />
                    </Box>
                    <Box className="account-exist-msg-text">
                      <p>An account with the email already exists.</p>
                    </Box>
                  </Box>}
                <div className="login__content__button">
                  {!accountCreated && !emailError ? <Button disabled={confirmBtnActive ? false : true} className="viewBtn"
                    type="submit" {...((loading || signInLoading) && { disabled: true })}>
                    {(loading || signInLoading) ? "Loading" : "CREATE ACCOUNT"}
                  </Button> : (accountCreated && !emailError) ? <Button className="viewBtn" type="button" onClick={() => {
                    overlayContext.show(
                      OverlayType.account,
                      OverlayTheme.right
                    )
                  }}>VIEW ACCOUNT</Button> : (accountCreated || emailError) && <Button className="viewBtn" type="button" onClick={() => changeActiveTab("login")}>LOGIN TO ACCOUNT</Button>}
                  {!emailError ? <Button type="button" onClick={hide} className="cancleBtn">Continue Shopping</Button> : <Button type="button" onClick={() => setActiveTab(accountSteps[0])} className="cancleBtn">use another email</Button>}
                </div>
              </Form>
            </>
          )

          const renderTab = () => {
            switch (activeTab.value) {
              case ACCOUNT_WIZARD.CREATE:
                return CreateAccountTab;
              case ACCOUNT_WIZARD.COMPLETE:
                return FinalTab;
              // case ACCOUNT_WIZARD.UPLOAD:
              //   return (
              //     <TypedTierDocumentTypes
              //       variables={{
              //         first: 10,
              //         tier: accountTypeId,
              //       }}
              //     >
              //       {
              //         ({ data }) => {
              //           return <UploadDocuments tierData={data} nextStep={() => setActiveTab(accountSteps[2])} accountType={business} isTaxExempt={isTaxExempt}/>
              //         }
              //       }  
              //     </TypedTierDocumentTypes>
              //   )
              // case ACCOUNT_WIZARD.VERIFICATION:
              // case ACCOUNT_WIZARD.CREATED:
              //   return <Verification changeActiveTab={changeActiveTab} email={userEmail} nextStep={() => setActiveTab(accountSteps[3])} />
              default:
                return CreateAccountTab
            }
          }

          return (
            <div>
              <Steps
                steps={accountSteps}
                currentStep={activeTab}
              />
              {renderTab()}
            </div>
          )
        }}
      </TypedAccountRegisterMutation>
      {ischeckedIn === "true" ? <EMWModal step={1} Mopen={viewShipping} hide={() => setviewShipping(false)} /> : null}
    </React.Fragment>
  );
};

export default RegisterForm;
