

import React, { useState, useEffect, useRef, createRef } from "react";
import "./scss/index.scss";
import { useMutation } from '@apollo/react-hooks';
import { emwuploadUserDocuments, deleteCustomerDocuments } from '../../@sdk/mutations/user';
import moment from "moment";
import loader from '../../images/emw-loader.svg'
import Dialog from '@material-ui/core/Dialog';




const headerToken = process.env.REACT_APP_S3_HEADER_TOKEN

export const uploadFile = async (file: File) => {
    const url = process.env.REACT_APP_S3_PRESIGNED_URL + encodeURIComponent("files/" + new Date().getTime() + file.name);
    const formData = new FormData();
    formData.append('file', file);
    const saveUrl = encodeURIComponent("files/" + new Date().getTime() + file.name);

    const response = await fetch(url, {
        method: 'PUT',
        body: formData,
        headers: { 'X-API-Key': headerToken },
    })

    return { response, saveUrl }
}

const UploadW9: React.FC<{ user: any, refetch: any, formatFileName: any }> = ({ user, refetch, formatFileName }) => {
    const taxFileUploader = useRef([])
    const [elRefs, setElRefs] = React.useState([]);
    const [taxExemptCertificate, setTaxExemptCertificate] = useState<string | null>(null)
    const [taxExemptCertificateName, setTaxExemptCertificateName] = useState<string | null>(null)
    const [taxExemptCertificateLoading, setTaxExemptCertificateLoading] = useState<boolean>(false)
    const [taxExemptCertificateUrl, settaxExemptCertificateUrl] = useState<any>(false)
    const [documentIdToDelete, setDocumentIdToDelete] = useState<String>("")
    useEffect(() => {
        setElRefs((elRefs) =>
            Array(user && user.documents.edges.length)
                .fill()
                .map((_, i) => elRefs[i] || createRef()),
        );
    }, [taxExemptCertificate])

    const uploadAndSetURL = async (file, updater, nameUpdater, loadingUpdater, uploadUrl, docId) => {
        loadingUpdater(true)
        if (!file) {
            return
        }
        nameUpdater(file.name)

        const { saveUrl } = await uploadFile(file)
        updater(saveUrl)
        uploadUrl(docId, saveUrl)
    }

    const [uploadTaxExemptCertificate] = useMutation(emwuploadUserDocuments, {
        onCompleted({ uploadUserDocuments }) {
            if (uploadUserDocuments.errors.length === 0) {
                console.log("success")
                setTaxExemptCertificateLoading(false)
                refetch()
            }
        },
        onError(error) {
            console.log("error")
        }
    });

    const [deleteTaxExemptCertificate] = useMutation(deleteCustomerDocuments, {
        onCompleted({ deleteCustomerDocument }) {
            if (deleteCustomerDocument.errors.length === 0) {
                console.log("success")
                setTaxExemptCertificateLoading(false)
                refetch()
            }
        },
        onError(error) {
            console.log("error")
        }
    })



    const uploadDocument = (docId, docUrl) => {
        uploadTaxExemptCertificate({
            variables: {
                input: {
                    document: docUrl,
                    documentType: docId,
                }
            },
        })
    }

    const [documentToDelete, setDocumentToDelete] = useState("")
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = React.useState(false);
    const onDeleteClick = () => {
        deleteTaxExemptCertificate({
            variables: {
                document: documentToDelete,
                user: user.id
            }
        })
        handleClose()
    }

    const handleClose = () => {
        setOpenDeleteConfirmation(false);
    };

    return (
        <>
            <Dialog
                // fullScreen={fullScreen}
                // maxWidth={'xs'}
                open={openDeleteConfirmation}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <div className="delete-confirmation">
                    <span className="delete-warning-text">
                        Are you sure you want to delete
                    </span>
                    <div onClick={() => onDeleteClick()} className="delete-button">
                        Delete
                    </div>
                    <div onClick={() => handleClose()} className="cancel">
                        Cancel
                    </div>
                </div>
            </Dialog>
            <div className="action-container">

                {user && user.documents.edges.map((doc, index) => (
                    <>
                        <div className="documents-title">
                            {doc.node.documentType.documentType}
                        </div>
                        {doc.node.documentState === "APPROVED" ?
                            <>
                                <div>
                                    APPROVED
                                </div>
                                <div className="documentName color-green" style={{ color: "#039855" }}>
                                    {doc.node.document && formatFileName(doc.node.document)}
                                </div>
                                <div className="documentName">
                                    {moment(doc.node.createdAt).format('MM/DD/YYYY')}
                                </div>
                            </>
                            :
                            doc.node.documentState === "NOT_UPLOADED" ?
                                <>
                                    <div className="tax-exemption-desc">
                                        No documents uploaded.
                                    </div>
                                    <button onClick={() => {
                                        elRefs[index].current.click()
                                    }} className="register"
                                        disabled={taxExemptCertificateLoading}>
                                        Upload
                                    </button>
                                    {taxExemptCertificateLoading &&
                                        <img className="loader-show" src={loader} alt="" />
                                    }
                                </> :
                                <>
                                    <div className="documentName color-green" style={{ color: "#DC6803" }}>
                                        {doc.node.document && formatFileName(doc.node.document)}
                                    </div>
                                    <div className="documentName">
                                        {moment(doc.node.createdAt).format('MM/DD/YYYY')}
                                    </div>
                                    <button
                                        disabled={taxExemptCertificateLoading}
                                        onClick={() => {
                                            elRefs[index].current.click()
                                        }} className="register">
                                        Change
                                    </button>
                                    {taxExemptCertificateLoading &&
                                        <img className="loader-show" src={loader} alt="" />
                                    }
                                    <div>
                                        <button
                                            onClick={() => {
                                                setDocumentToDelete(doc.node.id)
                                                setOpenDeleteConfirmation(true)
                                            }}
                                            className="delete-document">
                                            Delete
                                        </button>
                                    </div>
                                </>
                        }
                        <input type="file" id="file" ref={elRefs[index]} style={{ display: "none" }} onClick={(e) => e.target.value = ''} onChange={(e) =>
                            uploadAndSetURL(
                                e.target.files[0],
                                setTaxExemptCertificate,
                                setTaxExemptCertificateName,
                                setTaxExemptCertificateLoading,
                                uploadDocument,
                                doc.node.documentType.id
                            )
                        } />
                        <div className="divider-line"></div>
                    </>
                ))}
            </div>
        </>
    );
};

export default UploadW9;
