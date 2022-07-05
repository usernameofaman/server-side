

import React, { useState, useEffect, useRef } from "react";
import "./scss/index.scss";
import { useMutation } from '@apollo/react-hooks';
import { usertaxExemptCertificateUpload, deleteCustomerTaxExempt } from '../../@sdk/mutations/user';
import { EMWTaxExemptDefault } from "../../@sdk/queries/user";
import UploadW9 from './UploadW9'
import { useQuery } from "react-apollo";
import moment from "moment";
import loader from '../../images/emw-loader.svg'
import InfoIcon from '../../images/info-monospaced.svg'

const headerToken = process.env.REACT_APP_S3_HEADER_TOKEN

export const uploadFile = async (file: File) => {
    const url = process.env.REACT_APP_S3_PRESIGNED_URL + encodeURIComponent("files/" + new Date().getTime() + file.name);
    const formData = new FormData();
    formData.append('file', file);
    const urlSave = encodeURIComponent("files/" + new Date().getTime() + file.name);

    const response = await fetch(url, {
        method: 'PUT',
        body: formData,
        headers: { 'X-API-Key': headerToken },
    })

    return { response, urlSave }
}

const formatFileName = (unformattedName) => {
    let formattedName;
    if (unformattedName && typeof (unformattedName) === "string") {
        formattedName = unformattedName.replace("files%2F", "")
        formattedName = formattedName.slice(13)
        formattedName = formattedName.replaceAll("%20", " ")
        return formattedName
    }
    return unformattedName
}


const DocumentUpload: React.FC<{ user: any, refetch: any }> = ({ user, refetch }) => {
    const taxFileUploader = useRef<HTMLInputElement | null>(null)
    const [taxExemptCertificate, setTaxExemptCertificate] = useState<string | null>(null)
    const [taxExemptCertificateName, setTaxExemptCertificateName] = useState<string | null>(null)
    const [taxExemptCertificateLoading, setTaxExemptCertificateLoading] = useState<boolean>(false)
    const [taxExemptCertificateUrl, settaxExemptCertificateUrl] = useState<boolean>(false)
    const [disableButton, setDisableButton] = useState<boolean>(false)

    const { loading, error, data, refetch : refetchTaxExemptToggle, fetchMore } = useQuery(EMWTaxExemptDefault, {
        variables: {
            id: localStorage.getItem("emwUserId")
        },
        fetchPolicy: "no-cache"
    });
    const [showTaxExemptUploadSection, setTaxExemptUploadSecton] = useState(false)

    useEffect(() => {
        uploadDocument()
        if(!loading && data && data.emwTaxExemptDefault)
            setTaxExemptUploadSecton(data.emwTaxExemptDefault) 
    }, [taxExemptCertificateUrl ,data ])


    const uploadAndSetURL = async (file, updater, nameUpdater, loadingUpdater, uploadUrl) => {
        if (!file) {
            return
        }
        nameUpdater(file.name)

        const { urlSave } = await uploadFile(file)
        updater(urlSave)
        uploadUrl(urlSave)
        loadingUpdater(true)
    }


    const [uploadTaxExemptCertificate] = useMutation(usertaxExemptCertificateUpload, {
        onCompleted({ taxExemptCertificateUpload }) {
            if (taxExemptCertificateUpload.errors.length === 0) {
                console.log("success")
                setTaxExemptCertificateLoading(false)
                setDisableButton(false)
                refetch()
            }
        },
        onError(error) {
            console.log("error")
            setTaxExemptCertificateLoading(false)
            setDisableButton(false)
        }
    });

    const uploadDocument = () => {
        if (taxExemptCertificateUrl) {
            uploadTaxExemptCertificate({
                variables: {
                    taxExemptCertificate: taxExemptCertificateUrl,
                },
            })
        }
    }

    const [deleteTaxExemptCertificate] = useMutation(deleteCustomerTaxExempt, {
        onCompleted({ taxExemptCertificateDelete }) {
            if (taxExemptCertificateDelete.errors.length === 0) {
                console.log("success")
                setTaxExemptCertificateLoading(false)
                refetch()
            }
        },
        onError(error) {
            console.log("error")
            setTaxExemptCertificateLoading(false)
        }
    })

    const deleteTaxExemptTrigger = () => {
        deleteTaxExemptCertificate({
            variables: {
                user: user.id
            }
        })
    }

    if(user && user.taxExemptDetails && user.taxExemptDetails.certificateId && user.taxExemptDetails.certificateId !== "")
    return (
        <div className="tax-exemption-container">
            <input type="file" id="file" ref={taxFileUploader} style={{ display: "none" }}
                onChange={(e) => {
                    setDisableButton(true)
                    uploadAndSetURL(
                        e.target.files[0],
                        setTaxExemptCertificate,
                        setTaxExemptCertificateName,
                        setTaxExemptCertificateLoading,
                        (url) => {
                            console.log(url)
                            settaxExemptCertificateUrl(url)
                        }

                    )
                }
                } />
            <div className="tax-exemption-title">
                Documents
                <div className="document-upload-pre-message">
                    <img src={InfoIcon} className="document-upload-message-icon"/>
                    <div style={{padding:"0 10px 0 10px"}}>
                    Document upload is NOT required to register for tax exemption but is recommended after completion of above registration process to have documentation on record with Electric Motor Wholesale Inc.
                    </div>
                </div>
            </div>
            <UploadW9 user={user && user} refetch={refetch} formatFileName={formatFileName} />
            {/* <div className="divider-line"></div> */}

            {/* {false && 
            <div className="action-container">
                <div className="documents-title">
                    State Issued Tax Exemption Certificate
                </div>
                {user && user.taxExemptDocumentState === "NOT_UPLOADED" ?
                    <>
                        <div className="tax-exemption-desc">
                            No documents uploaded.

                        </div>
                        <button
                            onClick={() => {
                                taxFileUploader.current.click()
                            }}
                            disabled={disableButton}
                            style={{ maxWidth: "233px" }} className="register">
                            Upload Tax Exempt Certificate
                        </button>
                        {disableButton &&
                            <img className="loader-show" src={loader} alt="" />
                        }
                    </>
                    :
                    <>
                        <div className="documentName">
                            <div className="documentName color-green">
                                {user && formatFileName(user.taxExemptCertificate)}
                            </div>
                            {user && user.taxExemptCertificateUploadDate ?
                                moment(user.taxExemptCertificateUploadDate).format('MM/DD/YYYY') : ""
                            }
                        </div>
                        <button onClick={() => {
                            taxFileUploader.current.click()
                        }}
                            // disabled={disableButton}
                            style={{ maxWidth: "233px" }} className="register">
                            Change Tax Exempt Certificate
                        </button>
                        {disableButton &&
                            <img className="loader-show" src={loader} alt="" />
                        }
                        <div>
                            <button
                                onClick={deleteTaxExemptTrigger}
                                className="delete-document">
                                Delete Certificate
                            </button>
                            {disableButton &&
                                <img className="loader-show" src={loader} alt="" />
                            }
                        </div>

                    </>
                }
            </div> } */}
        </div>
    );
    else
        return ""
};

export default DocumentUpload;
