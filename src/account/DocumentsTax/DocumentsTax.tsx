import React from "react";
import "./scss/index.scss";
import { AlertManager, useAlert } from "react-alert";
import TaxExemptForm from "./TaxExemptForm";
import { useQuery } from '@apollo/react-hooks';
import { EMWUserAccountQuery } from '@sdk/queries/user';
import DocumentUpload from "./DocumentsUpload";

const DocumentsTax: React.FC<{
}> = ({ }) => {
    const [openForm, setOpenForm] = React.useState(false)
    const [taxExemptState, setTaxExemptState] = React.useState("")
    const [certificateId, setCertificateId] = React.useState("")
    const [taxIdNumber, setTaxIdNumber] = React.useState("")
    const [taxIssueStates, setTaxIssueStates] = React.useState("")
    const [currentUser, setCurrentUser] = React.useState({})
    const alert = useAlert();

    const { loading, error, data, refetch, fetchMore } = useQuery(EMWUserAccountQuery, {
        variables: {
            id: localStorage.getItem("emwUserId")
        },
        fetchPolicy: "no-cache"
    });

    if (!loading && data && data.storefrontUser) {
        if (taxExemptState === "") {
            if (data.storefrontUser.taxExemptDetails &&
                data.storefrontUser.taxExemptDetails.certificateId && data.storefrontUser.isTaxExempt)
                setTaxExemptState("SUCCESS")
            else
                setTaxExemptState("UNREGISTERED")
        }
        if (data.storefrontUser.taxExemptDetails &&
            data.storefrontUser.taxExemptDetails.certificateId &&
            certificateId !== data.storefrontUser.taxExemptDetails.certificateId) {
            setTaxExemptState("SUCCESS")
            setCertificateId(data.storefrontUser.taxExemptDetails.certificateId)
            setTaxIdNumber(data.storefrontUser.taxExemptDetails.taxIdNumber)
            setTaxIssueStates(data.storefrontUser.taxExemptDetails.state)
        }
    }


    return (
        <div className="document-tax-container">
            <div className="header">
                Documents & Tax
            </div>
            <span>You can shop tax-free on our storefront upon completion of Tax Exemption Registration.</span>
            <div className="tax-exemption-container">
                <div className="tax-exemption-title">
                    Tax Exemption
                </div>
                {taxExemptState === "UNREGISTERED" &&
                    <>
                        {!openForm &&
                            <>
                                <div className="pre-registration-message">
                                    Ensure you complete registration below prior to order placement if you business is tax exempt.
                                    All orders completed prior to registration are taxable sales and taxes collected on taxable sales can not be refunded.
                                </div>
                                <div className="action-container">
                                    <div className="tax-exemption-desc">
                                        You have not completed the Tax Exemption Registration. Please begin application below.
                                    </div>
                                    <button className="register" onClick={() => setOpenForm(true)}>
                                        Register Now
                                    </button>
                                </div>
                            </>
                        }
                    </>
                }
                {
                    taxExemptState === "PENDING" &&
                    <>
                        <div className="pending-state-banner">
                            Your application is pending.
                        </div>
                        <div className="tax-exemption-desc">
                            Please check back here for updated status. If your request has been in pending state for more than 24 hours,
                            please contact customer service or use the live chat function to follow up.
                        </div>
                    </>
                }
                {
                    taxExemptState === "SUCCESS" && !openForm &&
                    <>
                        <div className="success-state-banner">
                            Congratulations, you are Tax Exempt!
                        </div>
                        <div className="action-container">
                            <div className="tax-exemption-desc">
                                You have successfully completed registration for tax exempt shopping directly on the Electric Motor Wholesale Inc storefront and will not be charged tax while checking out on our website.
                                <br />
                                <br />
                                Exemption Certificate ID #:<span className="bold-para-text"> &#123; “CertificateID”: {certificateId} &#125; </span>
                                <br />
                                <br />
                                Registered EIN:<span className="bold-para-text"> &#123; “IDNumber”: {taxIdNumber}  &#125; </span>
                                <br />
                                <br />
                                Exempt States: <span className="bold-para-text"> &#123; “StateAbbr”: {taxIssueStates} &#125; </span>
                                <br />
                                <br />

                                If any information is incorrect or is changed, you can reapply with new/correct information at any time to resolve error on tax exemption.
                                <br />
                                <br />
                                {/* Your tax exemption Certificate ID# <span className="bold-para-text">{certificateId}; </span>
                                and is registered with EIN # <span className="bold-para-text">{taxIdNumber}</span>
                                <br />
                                <br />
                                If your EIN changes for any reason, it will be your responsibility to reapply with the new EIN to ensure your exemption
                                registration is valid and current.
                                <br />
                                <br /> */}
                                <button className="register" style={{ minWidth: "166px" }} onClick={() => setOpenForm(true)}>
                                    Re-Register
                                </button>
                            </div>
                        </div>
                    </>
                }
                {openForm && <TaxExemptForm closeForm={() => setOpenForm(false)} refetch={refetch} />}
            </div>
            <DocumentUpload user={data && data.storefrontUser} refetch={refetch} />
        </div>

    );
};

export default DocumentsTax;
