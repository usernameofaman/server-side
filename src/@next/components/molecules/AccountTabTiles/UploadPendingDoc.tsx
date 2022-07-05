import React, { useEffect, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from "../../../../components/Button";
import { useMutation } from '@apollo/react-hooks';
import uploadIcon from '../../../../images/upload.png';
import fileType from '../../../../images/icon-file-types.png';
import { emwuploadUserDocuments } from '../../../../@sdk/mutations/user';
import * as S from "./styles";
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


const emwStyle = {
  emwTile: {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    width: " 100%",
    margin: "0px",
    tileButton: {
      background: "linear-gradient(135deg, #637895 25%, #435160 100%)",
      borderRadius: "5px",
      transform: "none",
      padding: "10px",
      ">span": {
        fontSize: "14px",
        transform: "none",
      }
    },
    tileButtonDisable:{
      background: "#F3F3F3",
      borderRadius: "5px",
      transform: "none",
      padding: "10px",
      ">span": {
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
    display: "flex",
    justifyContent: "space-between",
    contentEMWTile: {
      cursor: "pointer",
      fontWeight: "normal",
    },
    contentEMWTileUnderline: {
      cursor: "pointer",
      textDecorationLine: "underline",
      fontWeight: "normal",
    }
  },
  emwFileName:{
    width: "150px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  }
}

export const UploadPendingDoc: React.FC<{ doc: any, refetch: any }> = ({ doc, refetch }) => {
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

    const { saveUrl } = await uploadFile(file)
    updater(saveUrl)
    uploadUrl(saveUrl)
    loadingUpdater(true)
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

  return (
    <Grid style={emwStyle.emwTileContent} item xs={12}>
      <div className="upload__section__button-container">
      <p className="uploadFileName" style={emwStyle.emwTileContent.contentEMWTile}><div>
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
        }}><img src={fileType} alt="" /> Choose File</span>
        <p style={emwStyle.emwFileName}>{taxExemptCertificateName ? taxExemptCertificateName : null}</p>

      </div></p>
      <p style={emwStyle.emwTileContent.contentEMWTileUnderline}>
      <S.MobileDocButton><Button disabled={!taxExemptCertificateLoading} onClick={() => uploadTaxExemptCertificate({
          variables: {
            input: {
              document: taxExemptCertificateUrl,
              documentType: doc.documentType.id,
            }
          },
        })} style={taxExemptCertificateLoading ? emwStyle.emwTile.tileButton : emwStyle.emwTile.tileButtonDisable} >{"UPLOAD"}</Button></S.MobileDocButton> </p>

      </div>
    </Grid>
  );
};
