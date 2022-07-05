import React from "react";
import Grid from '@material-ui/core/Grid';
import { Button, TextField } from "../../../../components/";
import EMWAccountPasswordModal from "../../../../components/EMWAccountPasswordModal"
import { PasswordTile } from './PasswordTile';
import "./scss/index.scss"

const emwStyle = {
  emwTile: {
        // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    // backgroundColor: 'rgb(249, 250, 250)',
    width: " 100%",
    margin: "20px 0 5px 0",
    border: "1px solid #e5e4e4",
    borderRadius: "5px",
    padding: "0 10px 0 10px"
  },
  emwTileHead: {
    // background: "#E5E5E5",
    display: "flex",
    fontSize: "20px",
    textAlign: "left",
    color: " #425160",
    fontWeight: "600",
    margin: "11px 11px 11px 11px",
    borderBottom: "1px solid #e5e6e7",
    paddingBottom: "20px",
    paddingLeft: "8px"
  },
  emwTileContent: {
    color: "#425160",
    fontWeight: "400",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: 'left',
    marginBottom: 15,
    contentEMWTile: {
      background: '#F2F2F2',
      border: '1px solid #CCCED0',
      borderRadius: 5,
      color: '#4D4D4D',
      fontSize: 14,
      maxWidth: 300,
      textAlign: 'left',
      padding: '7px 10px',
      cursor: 'pointer'
    },
    heading: {
      color: '#425160',
      fontSize: '1.125rem',
      marginBottom: '2em',
      fontWeight: '600',
    }
  },
  emwLabel: {
    fontSize: "12px"
  },
  emwtextboxInput: {
    border: "0.5px solid #CCCED0",
    boxSizing: "border-box",
    borderRadius: "5px",
    marginTop: "5px",
    maxWidth : "300px"
  },
  
}

export const PasswordChange: React.FC<{ user: any }> = (props) => {
  const [viewQuote, setviewQuote] = React.useState(false)

  return (
    <React.Fragment>
      <Grid style={emwStyle.emwTile} container spacing={3}>
        <Grid style={emwStyle.emwTileHead} item xs={12}>
          <p>Account Password</p>
        </Grid>
        {!viewQuote && <Grid style={emwStyle.emwTileContent} item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} className="columnItem">
              <label style={emwStyle.emwLabel}>Password</label>
              <TextField
                disabled={true}
                name="Password"
                autoComplete="Password"
                placeholder="**********"
                type="text"
                style={emwStyle.emwtextboxInput}
                required
              />
              <p className="account-update-button" onClick={() => setviewQuote(true)} > Change Password</p>
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4}>
            </Grid>
          </Grid>
        </Grid>}
        {viewQuote &&  
                <PasswordTile cancelClick={()=> setviewQuote(false)}/>
          }

      </Grid>
      {/*<EMWAccountPasswordModal Mopen={viewQuote} hide={() => setviewQuote(false)} />*/}
    </React.Fragment>
  );
};
