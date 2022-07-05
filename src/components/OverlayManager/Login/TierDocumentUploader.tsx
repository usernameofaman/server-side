import React, { useRef, useState } from "react";
import { TypedUploadUserDocuments } from "./queries";
import { uploadFile } from "./UploadDocuments"

const TierDocumentUploader = ({
    onError,
    document,
}) => {

    const [loading, setLoading] = useState(false)
    const [documentName, setDocumentName] = useState<string | null>(null)
    const uploaderRef = useRef(null)

    const uploadAndSetURL = async (file, cb) => {
        if (!file) {
          return
        }

        setDocumentName(file.name)
        setLoading(true)
        const { saveUrl } = await uploadFile(file)
        setLoading(false)
        cb(saveUrl)
    }

    return (
        <TypedUploadUserDocuments 
            onError={onError}
        >
            {(uploadDocuments) => {
                return (
                    <div className="upload__section__container"> 
                        <p className="upload__section__heading"> {document.documentType} Document </p>
                        <p className="upload__section__description">Verify your {document.documentType} certificate.</p>
                        <div className="upload__section__button-container">
                            <input type="file" id="file" ref={uploaderRef} style={{ display: "none" }} onChange={
                                (e) => {
                                    const file = e.target.files[0]
                                    uploadAndSetURL(file, url => {
                                        uploadDocuments({
                                            variables: {
                                                input: {
                                                    document: url, 
                                                    documentType: document.id,
                                                }
                                            }
                                        })
                                    })
                                }
                            } />
                            <p className="upload__section__description">
                                {documentName || "Choose File"}
                            </p>
                            <button
                                onClick={() => {
                                    uploaderRef.current.click() 
                                }}
                                className="upload__section__button">
                                {loading ? "Uploading" : "UPLOAD"}
                            </button>
                        </div>
                    </div>
                )
            }}
        </TypedUploadUserDocuments> 
    )
}

export default TierDocumentUploader
