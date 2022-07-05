import React, { useEffect, useState, useRef } from 'react';
import { Checkbox } from '@material-ui/core';
import { TypedUploadUserDocuments, TypedTaxExemptCertificateUpload, TypedDocumentUploadLater, TypedTierDocumentTypes } from './queries';
import TierDocumentUploader from './TierDocumentUploader';

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


interface UploadDocumentsProps {
  nextStep: () => void,
  accountType: string,
  isTaxExempt: boolean,
  tierData: any
}

const UploadDocuments: React.FC<UploadDocumentsProps> = (props: UploadDocumentsProps) => {

  const [uploadLater, setUploadLater] = useState<boolean>(false)
  const [uploadNow, setUploadNow] = useState<boolean>(false)
  const [taxExemptCertificate, setTaxExemptCertificate] = useState<string | null>(null)
  const [resellerCertificate, setResellerCertificate] = useState<string | null>(null)
  const [taxExemptCertificateName, setTaxExemptCertificateName] = useState<string | null>(null)
  const [resellerCertificateName, setResellerCertificateName] = useState<string | null>(null)
  const [taxExemptCertificateLoading, setTaxExemptCertificateLoading] = useState<boolean>(false)
  const [resellerCertificateLoading, setResellerCertificateLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [dataToShow, setDataToShow] = useState<any | null>(null)

  const taxFileUploader = useRef<HTMLInputElement | null>(null)
  const resellerFileUploader = useRef<HTMLInputElement | null>(null)
  
  const uploadAndSetURL = async (file, updater, nameUpdater, loadingUpdater, uploadUrl) => {
    if (!file) {
      return
    } 
    nameUpdater(file.name)
    loadingUpdater(true)

    const { saveUrl } = await uploadFile(file)
    updater(saveUrl)
    uploadUrl(saveUrl)
    loadingUpdater(false)
  }

  const onCompleted = data => {
    props.nextStep()
  }


  const onError = error => {
    const { graphQLErrors = [] } = error

    if (graphQLErrors.length) {
      setError(graphQLErrors[0].message)
    }
  }  

    useEffect(() => {
        let tierType = dataToShow

        if (props.tierData.tierDocumentTypes.edges.length && !dataToShow) {
            tierType = props.tierData.tierDocumentTypes.edges[0].node
            setDataToShow(tierType)
        }

        if (!tierType && !props.isTaxExempt) {
            props.nextStep()
        }
    }, [props.tierData, dataToShow, props.isTaxExempt])

    const tierDocuments = props.tierData.tierDocumentTypes.edges.map(edge => edge.node)

    return (
      <>
        <p className="account__heading">UPLOAD DOCUMENTS</p>
        <span className="account__info__text">In order to receive the best pricing we can offer, upload the documents listed below.</span>
        <div className="upload__checkbox">
          <Checkbox
            onChange={(_, checked) => {
              setUploadNow(checked)
            }}
          />
          <p className="account__info__small__label">
            Upload Documents
          </p>
        </div>
        {
          uploadNow ?
            <>
              {props.isTaxExempt && 
                <TypedTaxExemptCertificateUpload 
                  onError={onError}
                >
                  {(uploadTaxExemptCertificate, { loading }) => {
                    return (
                      <div className="upload__section__container">
                        <p className="upload__section__heading">Tax Exempt Certificate</p>
                        <p className="upload__section__description">To receive Tax Exempt Status, you must upload a Tax Exempt Certificate.</p>
                        <div className="upload__section__button-container">
                          <input type="file" id="file" ref={taxFileUploader} style={{ display: "none" }} onChange={(e) =>
                            uploadAndSetURL(
                              e.target.files[0],
                              setTaxExemptCertificate,
                              setTaxExemptCertificateName,
                              setTaxExemptCertificateLoading,
                              (url)=>{
                                uploadTaxExemptCertificate({
                                  variables: {
                                    taxExemptCertificate: url,
                                  },
                                })
                              }
                            )
                          } />
                          <p className="upload__section__description">
                            {taxExemptCertificateName || "Choose File"}
                          </p>
                          <button
                            onClick={() => {
                              taxFileUploader.current.click() 
                            }}
                            className="upload__section__button">
                            {taxExemptCertificateLoading ? "Loading" : "UPLOAD"}
                          </button>
                        </div>
                      </div>
                    )
                  }}
                </TypedTaxExemptCertificateUpload>
              }
              {
                tierDocuments.map(
                  tierDocument => <TierDocumentUploader onError={onError} document={tierDocument} />
                )
              }
            </> :
          null
        }
        <p className="upload__section__heading upload__or">OR</p>
        <div className="upload__section__hurry">
          <p className="upload__section__heading">In a hurry?</p>
          <p className="upload__section__description">Upload documents later from my account.</p>
        </div>
        <div className="error_text">
          {error ? error : ""}
        </div>
        <TypedDocumentUploadLater
          onCompleted={onCompleted}
          onError={onError}
        >
          {(uploadDocumentsLater, { loading }) => {
            return (
              <div className="upload__continue">
                <button
                  disabled={resellerCertificateLoading || taxExemptCertificateLoading}
                  onClick={() => {
                    const later = !(taxExemptCertificate || resellerCertificate)
                    uploadDocumentsLater({
                      variables: { 
                        uplaodLater: later,
                      }
                    })
                  }}
                  className="upload__continue__button upload__continue__button--big">
                  {loading ? "Loading..." : "Continue"}
                </button>
              </div>
            )
          }}
        </TypedDocumentUploadLater>
      </>
    )
}

export default UploadDocuments
