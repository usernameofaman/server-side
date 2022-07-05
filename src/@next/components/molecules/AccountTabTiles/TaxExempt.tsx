import React from "react";
import Grid from '@material-ui/core/Grid';

import EMWAccountTypeModal from "../../../../components/EMWAccountTypeModal"
const emwStyle = {
  emwTile: {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    width: " 100%",
    margin: "0px",
  },
  emwTileHead: {
    background: "#E5E5E5",
    textAlign: "center",
    color: " #425160",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  emwTileContent: {
    color: "#425160",
    height: "100px",
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
    contentEMWTile: {
      cursor: "pointer",
      textDecorationLine: "underline",
      fontWeight: "normal",
    }
  },
}

export const TaxExempt: React.FC<{ typeId: any, isTaxExempt:any, refetch:any }> = ({ typeId, isTaxExempt, refetch }) => {

  const [viewQuote, setviewQuote] = React.useState(false)
  return (
    <React.Fragment>
    <Grid style={emwStyle.emwTile} container spacing={3}>
      <Grid style={emwStyle.emwTileHead} item xs={12}>
        <p>Tax Exempt status</p>
      </Grid>
      <Grid style={emwStyle.emwTileContent} item xs={12}>
        <p> {isTaxExempt ? "Tax Exempt" : "Not Tax Exempt"}</p>
        <p style={emwStyle.emwTileContent.contentEMWTile} onClick={() => setviewQuote(true)}> Update Tax Exempt Status</p>
      </Grid>
    </Grid>
    <EMWAccountTypeModal refetch={refetch} type={typeId} TaxExempt={isTaxExempt} Mopen={viewQuote} hide={() => setviewQuote(false)} />
    </React.Fragment>
    
  );
};
