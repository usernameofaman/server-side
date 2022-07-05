import React, { useState } from "react";
// import "./scss/index.scss";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import EMWOrderInvoice from "../../components/EMWOrderInvoice";
import EMWOrderInvoiceModal from "../../components/EMWModal/EMWOrderInvoiceModal";
import { history } from "../../history";

interface ViewProps {
  match: any;
}
const View: React.FC<ViewProps> = ({ match }) => {
  const [open, setOpen] = useState(true);
  const [openModal, setModal] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const orderNum = match.params.id;
  const orderEmail = match.params.email ? window.atob(match.params.email) : "";


  const closeModalHandler = () => {
    setModal(false);
    history.push("/");
  };

  return (
    <>
      <EMWOrderInvoiceModal Mopen={openModal} hide={() => closeModalHandler()}>
        <Container maxWidth="lg" className={"orderConfirmSection"}>
          <Grid container spacing={3}>
            <EMWOrderInvoice
              open={open}
              handleClose={handleClose}
              orderNum={orderNum}
              orderEmail={orderEmail}
              typeModal={false}
            />
          </Grid>
        </Container>
      </EMWOrderInvoiceModal>
    </>
  );
};

export default View;
