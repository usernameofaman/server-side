import React, { useCallback, useEffect, useState } from 'react';
import { Checkbox } from '@material-ui/core';
import { TextField } from "../..";
import { TypedVerifyEmailMutation, TypedResendEmailMutation } from './queries';
import { Link } from "react-router-dom";
import { accountUrl } from '../../../routes';
import { propTypes } from 'react-addons-css-transition-group';
import qs from "query-string"
import { TypedAccountConfirmMutation } from '../../../views/Account/queries';
import Loader from '../../Loader';
import { useSaleorClient } from '../../../@sdk/react';

interface VerificationProps {
    email: string,
    nextStep: () => void
    changeActiveTab: (activeTab: string) => void
}

const Verification: React.FC<VerificationProps> = ({
    email,
    nextStep,
    changeActiveTab,
}: VerificationProps) => {

    const [verifiedEmail, setVerifiedEmail] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [localEmail, setLocalEmail] = useState<string | null>(null)

    useEffect(() => {
        if (verifiedEmail) {
            nextStep()
        }
    }, [verifiedEmail])
    
    const redirectUrl = window.location.origin; 
    const onClickResend = (resendCode) =>{ 
        resendCode({
            variables: {
                redirectUrl,
                email,
            },
        })
        setError("")
    }

    const onError = error => { 
        const { graphQLErrors = [] } = error 
        if (graphQLErrors.length) {
            setError(graphQLErrors[0].message)
        }
    }

    const saleor = useSaleorClient();
    const isLoggedIn = !!saleor.isLoggedIn()

    return (
        <>  
            <p className="account__heading">{ verifiedEmail ? "ACCOUNT CREATED" : "VERIFICATION" }</p>
            { !verifiedEmail && 
                <span className="account__info__text">
                    In order to receive future updates, verify the information below
                </span>
}           
            <TypedAccountConfirmMutation
                onCompleted={(data) => {
                    if (data.confirmAccount && data.confirmAccount.errors && data.confirmAccount.errors.length) {
                        return setError(data.confirmAccount.errors[0].message)
                    }

                    setVerifiedEmail(true)
                }}
            >
                {
                    (confirm, { loading }) => {

                        useEffect(() => {
                            const parsed = qs.parse(window.location.search)
                            const isAccountSetup= (window.location.pathname!=="/reset-password/") ? true : false;
                            if (parsed.email && parsed.token && isAccountSetup) {
                                setLocalEmail(parsed.email)
                                confirm({
                                    variables: { email: parsed.email, token: parsed.token },
                                })
                            }
                        }, [])

                        return (
                            <>
                                <div className="upload__checkbox">
                                    <Checkbox style={{ cursor: "initial" }} disableRipple checked={verifiedEmail} />
                                    <p className="account__info__small__label">
                                        Verify Email (Required)
                                    </p>
                                </div>
                                <p className="account__info__text">
                                    { verifiedEmail ? 
                                        "You will now receive order status updates to this email address." :
                                        "Please check your email for the verification code."
                                    } 
                                </p>
                                <div className="verification-prefilled-container">
                                    <p className="emw-verification-label">Email</p>
                                    <p className="emw-verification-prefilled-label">
                                        {localEmail || email}
                                    </p>
                                </div>

                                {
                                    loading ?
                                        <Loader /> :
                                        null
                                }

                                { verifiedEmail ? null :
                                    <div className="verification-input-field">

                                        <div className="error_text">
                                            {error ? error : ""}
                                        </div>
                                        <div className="success_text">
                                            {success ? success : ""}
                                        </div>
                                        <div className="verification-button-container"> 
                                            <TypedResendEmailMutation
                                                onError={onError}
                                                onCompleted={(data) => {
                                                    if (data.resendEmailVerificationCode && data.resendEmailVerificationCode.errors && data.resendEmailVerificationCode.errors.length) {
                                                        return setError(data.resendEmailVerificationCode.errors[0].message)
                                                    }
                                                    setSuccess("Resent email successfully")
                                                }}
                                            >
                                                {
                                                    (resendCode, { loading }) => {
                                                        return (
                                                            <button onClick={()=> {
                                                                setSuccess("")
                                                                onClickResend(resendCode)
                                                            }} className="upload__section__button upload__section__button--big upload__section__button--small">
                                                                {loading ? "RESENDING...": "RESEND"}
                                                            </button>  
                                                        )
                                                    }
                                                }
                                            </TypedResendEmailMutation>
                                        </div> 
                                    </div>
                                }
                            </>
                        )
                    }
                }
            </TypedAccountConfirmMutation>
            { verifiedEmail ?
                isLoggedIn ? 
                    <Link to={accountUrl}>
                        <button className="verification-finish">
                            FINISH AND GO TO MY ACCOUNT
                        </button>
                    </Link> : 
                    <button onClick={() => changeActiveTab("login")} className="verification-finish">
                        CLICK HERE TO LOGIN
                    </button> :
                null
            }
        </>
    )
}

export default Verification
