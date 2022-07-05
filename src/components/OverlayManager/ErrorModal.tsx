import * as React from "react";
import Modal from '@material-ui/core/Modal';
import { EMWCartContext } from "../EMWCartProvider/context";
import { OverlayContext } from "../index";

interface ModalProps {
    open: boolean,
    handleClose: any,
    setErrorModalOpen:any,
    body:string,
}

const ErrorModal: React.FC<ModalProps>= ({open,handleClose, setErrorModalOpen, body}) =>{
    const emwCartContext = React.useContext(EMWCartContext);
    const overlayContext = React.useContext(OverlayContext);

    const resetCartState=()=>{
        setErrorModalOpen(false);
        emwCartContext.setLines([], 0);
        overlayContext.hide();
        localStorage.setItem("EMWClearCart", "false");
        setTimeout(() => {
          localStorage.removeItem("EMWCart");
        }, 500);
        localStorage.removeItem("shippingtemp");
        localStorage.removeItem("contactInfoTemp");
    }
    return(
        <div >
      <Modal
        open={open}
        onClose={handleClose}
        className="main_error_modal"
      >
      
      <div className="errormodal_wrapper">
      <p>
       {body}
      </p>
      <div className="error__modal_button">
       <button onClick={()=>resetCartState()}>OK</button>
       </div>
    </div>
      </Modal>
    </div>)
}

export default ErrorModal;