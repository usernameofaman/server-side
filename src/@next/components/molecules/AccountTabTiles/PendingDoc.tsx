import React, { useEffect, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from "../../../../components/Button";
import { useMutation } from '@apollo/react-hooks';

import { usertaxExemptCertificateUpload } from '../../../../@sdk/mutations/user';
import { UploadPendingDoc } from "./UploadPendingDoc";
import uploadIcon from '../../../../images/upload.png';
import fileType from '../../../../images/icon-file-types.png';
import "./scss/index.scss";

const headerToken = process.env.REACT_APP_S3_HEADER_TOKEN

import * as S from "./styles";

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


const emwStyle = {
  emwTile: {
    // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    // backgroundColor: "white",
    // width: " 100%",
    // margin: "0px",
    tileButton: {
      background: "linear-gradient(135deg, #637895 25%, #435160 100%)",
      borderRadius: "5px",
      transform: "none",
      padding: "10px",
      span: {
        fontSize: "14px",
        transform: "none",
      }
    },
    tileButtonDisable: {
      background: "#F3F3F3",
      borderRadius: "5px",
      transform: "none",
      padding: "10px",
      span: {
        fontSize: "14px",
        transform: "none",
      }
    },
  },
  emwTileHead: {
    background: "#E5E5E5",
    textAlign: "center",
    color: " #425160",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  emwTileHeadColor: {
    background: "linear-gradient(135deg, #F6BF52 25%, #F3A738 100%)",
    textAlign: "center",
    color: " #425160",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  emwTileContent: {
    color: "#425160",
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
    contentEMWTile: {
      cursor: "pointer",
      fontWeight: "normal"
    },
    contentEMWTileUnderline: {
      cursor: "pointer",
      textDecorationLine: "underline",
      fontWeight: "normal",
    }
  },
  emwFileName: {
    width: "150px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  }
}

export const PendingDoc: React.FC<{ user: any, isTaxExempt: any, refetch: any }> = ({ user, isTaxExempt, refetch }) => {
  const taxFileUploader = useRef<HTMLInputElement | null>(null)
  const [taxExemptCertificate, setTaxExemptCertificate] = useState<string | null>(null)
  const [taxExemptCertificateName, setTaxExemptCertificateName] = useState<string | null>(null)
  const [taxExemptCertificateLoading, setTaxExemptCertificateLoading] = useState<boolean>(false)
  const [taxExemptCertificateUrl, settaxExemptCertificateUrl] = useState<boolean>(false)

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
        refetch()
      }
    },
    onError(error) {
      console.log("error")
    }
  });

  const checkAllDocStatus = () => {
    if (user && user.taxExemptDocumentState === "APPROVED") {
      if (user && user.documents && user.documents.edges.length) {
        let doc_approve = true
        user.documents.edges.map((doc, index) => {
          if (doc.node.documentState !== "APPROVED") {
            doc_approve = false
          }
        })
        return doc_approve ? false : true
      } else {
        return false
      }
    } else {
      if (user && !isTaxExempt && user.documents && user.documents.edges.length) {
        let doc_approve = true
        user.documents.edges.map((doc, index) => {
          if (doc.node.documentState !== "APPROVED") {
            doc_approve = false
          }
        })
        return doc_approve ? false : true
      } else {
        return true
      }
    }
  }
  return (
    <Grid style={emwStyle.emwTile} container spacing={3} className="bnakjsdbakjsjbdk">
      {/*<Grid style={checkAllDocStatus() ? emwStyle.emwTileHeadColor : emwStyle.emwTileHead} item xs={12}>
      {checkAllDocStatus() ? <p>Pending Documents</p> : <p>Documents Approved</p> }
      </Grid>*/}
      {isTaxExempt ?
        <Grid style={emwStyle.emwTileContent} item xs={12}>
          <p> Tax Exempt Certificate</p>
          <p style={emwStyle.emwTileContent.contentEMWTile}>
            {user && user.taxExemptDocumentState === "NOT_UPLOADED" ?
              <div className="upload__section__button-container">
                <p className="uploadFileName">
                  <input type="file" id="file" ref={taxFileUploader} style={{ display: "none" }} onChange={(e) =>
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
                  } />
                  <span className="fileItem" onClick={() => {
                    taxFileUploader.current.click()
                  }}>
                    <img src={fileType} alt="" />
                    File Required
                  </span>
                  <p style={emwStyle.emwFileName}>{taxExemptCertificateName ? taxExemptCertificateName : null}</p>
                </p>
                <p style={emwStyle.emwTileContent.contentEMWTileUnderline}>
                  <S.MobileDocButton>
                    <Button disabled={!taxExemptCertificateLoading} onClick={() => uploadTaxExemptCertificate({
                      variables: {
                        taxExemptCertificate: taxExemptCertificateUrl,
                      },
                    })} style={taxExemptCertificateLoading ? emwStyle.emwTile.tileButton : emwStyle.emwTile.tileButtonDisable} >
                      {"UPLOAD"}
                    </Button>
                  </S.MobileDocButton>
                </p>
              </div> :
              user && user.taxExemptDocumentState.replace(/_/g, ' ')}
          </p>
        </Grid>
        : null}
      {
        user && user.documents.edges.map((doc, index) => {
          return <Grid key={index} style={emwStyle.emwTileContent} item xs={12} className="asasas">
            <p>{doc.node.document != "" ?
              <a style={emwStyle.emwTileContent} href={doc.node.document}>
                {doc.node.documentType.documentType}
              </a>
              : doc.node.documentType.documentType}
            </p>
            {doc.node.documentState === "APPROVED" ?
              <p style={emwStyle.emwTileContent.contentEMWTile}>
                APPROVED
              </p> :
              doc.node.documentState === "NOT_UPLOADED" ?
                <UploadPendingDoc refetch={refetch} doc={doc.node} />
                : <p style={emwStyle.emwTileContent.contentEMWTile}>
                  {doc.node.documentState.replace(/_/g, ' ')}</p>}``
          </Grid>
        })
      }

    </Grid>
  );
};
