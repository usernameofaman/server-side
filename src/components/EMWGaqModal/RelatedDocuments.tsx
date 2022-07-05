import "./scss/index.scss";

import React, { useState, useEffect, useRef} from "react";
import { TextField, Button} from "..";
import { useAlert } from "react-alert";
interface IRelatedDocuments {
  files:[];
  quoteFileCreate:any;
  quoteFileDelete: any;
}


const RelatedDocuments: React.FC<IRelatedDocuments> = ({ files, quoteFileCreate, quoteFileDelete}) => {

  const [uploadFileDetails,setUploadFileDetails]=useState(false);
  const [uploadFileUrl,setuploadFileUrl]=useState("");
  const [allowUpload,setallowUpload]=useState(false);
  const [maxUpload,setmaxUpload]=useState(false);
  const [gaqFiles,setgaqFiles]=useState([]);
  const fileUploader = useRef(null);
  const alert = useAlert();
  React.useEffect(() => {
    setgaqFiles(files)
    if(files.length === 2){
      setallowUpload(false)
      setmaxUpload(true)
    } else {
      setmaxUpload(false)
    }
     
  }, [files]);

  const fileChange=(fileArray)=>{
    if(fileArray.length>0)
    {
      setUploadFileDetails(fileArray[0]);
      setallowUpload(true)
    }
  }

  const addFileHandler=()=>{
    fileUploader.current.click();
  }

  const deleteFileHandler=(id)=>{
    quoteFileDelete({
      variables: {
        id: id,
      },
    })     
  }

  const uploadFileHandler=()=>{
    if(uploadFileDetails){
      sendData().then((value) => {     
        const isQuoteExist=JSON.parse(localStorage.getItem('EMWQuote'));  
        quoteFileCreate({
          variables: {
            quote: isQuoteExist.id,
            input: {
              title: uploadFileDetails.name,
              fileurl: encodeURIComponent("files/" + uploadFileDetails.name),
            },
          },
        })      
        setallowUpload(false)
        setUploadFileDetails(false)       
      })
      .catch((error)=> { 
        alert.show({ title: "Something went wrong while uploading file!" }, { type: "error" });
      });
    }   else {
      alert.show({ title: "Please select a file." }, { type: "error" });
    } 
  }
  async function sendData() {
    const url=process.env.REACT_APP_S3_PRESIGNED_URL + encodeURIComponent("files/" + uploadFileDetails.name);
    setuploadFileUrl(url)
    const formData  = new FormData();
    let file=uploadFileDetails;
    formData.append('file', file);
    const fileHeaderToken=process.env.REACT_APP_S3_HEADER_TOKEN;

    const response = await fetch(url, {
      method: 'PUT',
      body: formData,
      headers: {'X-API-Key': fileHeaderToken },
      // headers: new Headers({
      //         'Access-Control-Request-Headers': 'X-Requested-With',
      //         'X-API-Key': process.env.REACT_APP_S3_HEADER_TOKEN,
      // }),

    });
    return response;
  }

  
return (<div className="emw-width-40">
   <p className="product-title">Upload related documents</p>

   <div className="gaq-doc">
     {gaqFiles.map((file, index) => {
      return <div key={index} className="gaq-doc-item">
                <div><span className="doc-span">{file.title}</span></div>
                <div><Button onClick={() => deleteFileHandler(file.id)}>Remove</Button></div>
              </div>
     })}
     
     <div className="gaq-doc-item">
        <div>{maxUpload ? null :<span className="doc-span" onClick={()=> addFileHandler() } >Choose File</span>}
    {uploadFileDetails ? <React.Fragment><br></br><span className="doc-span">{uploadFileDetails.name}</span></React.Fragment> : null}
        <input type="file" id="file" ref={fileUploader} style={{display: "none"}} onChange={(e) => fileChange(e.target.files) } onClick={(e)=> e.target.value=null} />
        </div>
        <div><Button className={allowUpload ? "" : "inactive"} onClick={allowUpload ? () => uploadFileHandler() : null}>Upload</Button></div>
     </div>
   </div>
  </div>
  );
};

export default RelatedDocuments;
