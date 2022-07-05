import React from "react";
import Grid from '@material-ui/core/Grid';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { Button, TextField } from "../../../../components/";
import EMWAccountPasswordModal from "../../../../components/EMWAccountPasswordModal"

import { customerUpdateMutation } from '../../../../@sdk/mutations/user';
import { AlertManager, useAlert } from "react-alert";
import EMWPhoneNumber from "../../../../components/EMWPhoneNumber";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  theme => ({
    emwPhoneTopGap: {
      marginTop: 5,
      '& .emw-phone-container': {
        '& .emw-phone-num': {
          border: "0.5px solid rgb(204, 206, 208) !important",
        },
        '& .flag-dropdown': {
          border: "0.5px solid rgb(204, 206, 208) !important",
        },
        '&:hover': {
          '& .emw-phone-num': {
            border: "0.5px solid #21125e !important",
          },
          '& .flag-dropdown': {
            border: "0.5px solid #21125e !important",
          }
        }
      }
    }
  }),
  { name: "PageList" }
);

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
    fontWeight: "normal",
    alignItems: "center",
    justifyContent: "center",
    contentEMWTile: {
      cursor: "pointer",
      textDecorationLine: "underline",
      fontWeight: "normal",
    }
  },
  emwLabel: {
    fontSize: "12px"
  },
  emwtextboxInput: {
    border: "0.5px solid #CCCED0",
    boxSizing: "border-box",
    borderRadius: "5px",
    marginTop: "5px"
  },

}

export const EMWAccountUpdate: React.FC<{ user: any }> = (props) => {
  const { user } = props;
  const [viewQuote, setviewQuote] = React.useState(false)
  const alert = useAlert();
  const classes = useStyles(props);
  const [createValues, setcreateValues] = React.useState({
    firstName: "",
    lastName: "",
    organizationName: "",
    email: "",
    phoneNumber: "",
    password: "",
    branchId: "",
  });
  const [initialValues, setinitialValues] = React.useState({
    firstName: "",
    lastName: "",
    organizationName: "",
    email: "",
    phoneNumber: "",
    password: "",
    branchId: "",
  });
  const [phoneNum, setPhoneNum] = React.useState("");

  const [updateCustomerAccount] = useMutation(customerUpdateMutation, {
    onCompleted({ customerUpdate }) {
      if (customerUpdate.errors.length === 0) {
        alert.show(
          {
            title: "Updated Successfully",
          },
          { type: "success", timeout: 2000 }
        );
      } else {
        alert.show(
          {
            title: customerUpdate.errors[0].message,
          },
          { type: "error", timeout: 2000 }
        );
      }
    },
    onError(error) {
      alert.show(
        {
          title: "Something Went Wrong.",
        },
        { type: "error", timeout: 2000 }
      );
    }
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setcreateValues({ ...createValues, [name]: value });
  };

  const handleOnChangeNum = (value) => {
    setPhoneNum(value);
    setcreateValues({ ...createValues, "phoneNumber": (value == undefined) ? "" : value });
  }

  const handleOnBlur = (event) => {
    const { name, value } = event.target;
    if (initialValues[name] !== value) {
      setinitialValues({ ...initialValues, [name]: value });
      updateCustomerAccount({
        variables: {
          id: localStorage.getItem("emwUserId"),
          input: {
            [name]: value
          },
        }
      })
    }
  }
  React.useEffect(() => {
    if (user) {
      setcreateValues({
        firstName: user.firstName,
        lastName: user.lastName,
        organizationName: user.organizationName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        branchId: user.branchId,
        password: "",
      })
      setinitialValues({
        firstName: user.firstName,
        lastName: user.lastName,
        organizationName: user.organizationName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        branchId: user.branchId,
        password: "",
      })
      setPhoneNum(user.phoneNumber);
    }
  }, [user]);

  return (
    <React.Fragment>
      <div className="address-book-header">
           Account Information
        </div>
        <div className="address-book-sub-head">
        Contact information, Account type, and Password
        </div>
      <Grid style={emwStyle.emwTile} container spacing={3}>
        <Grid style={emwStyle.emwTileHead} item xs={12}>
          <p>Contact Information</p>
        </Grid>
        <Grid style={emwStyle.emwTileContent} item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} className="columnItem" >
              <label style={emwStyle.emwLabel}>First Name</label>
              <TextField
                name="firstName"
                autoComplete="firstname"
                placeholder="First Name"
                type="text"
                style={emwStyle.emwtextboxInput}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                value={createValues.firstName}
              />
            </Grid>
            <Grid item xs={12} className="columnItem">
              <label style={emwStyle.emwLabel}>Last Name</label>
              <TextField
                name="lastName"
                autoComplete="lastName"
                placeholder="Last Name"
                type="text"
                style={emwStyle.emwtextboxInput}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                value={createValues.lastName}
                required
              />
            </Grid>
            <Grid item xs={12} className="columnItem">
              <label style={emwStyle.emwLabel}>Organization Name</label>
              <TextField
                name="organizationName"
                autoComplete="organizationName"
                placeholder="Organization Name"
                type="text"
                style={emwStyle.emwtextboxInput}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                value={createValues.organizationName}
                required
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid style={emwStyle.emwTileContent} item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} className="columnItem">
              <label style={emwStyle.emwLabel}>Branch Identifier</label>
              <TextField
                name="branchId"
                autoComplete="branchId"
                placeholder="Branch"
                type="text"
                style={emwStyle.emwtextboxInput}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                value={createValues.branchId}
                required
              />
            </Grid>
            <Grid item xs={12} className="columnItem">
              <label style={emwStyle.emwLabel}>Account Holder Email</label>
              <TextField
                name="email"
                autoComplete="email"
                placeholder="Email"
                type="text"
                style={emwStyle.emwtextboxInput}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                value={createValues.email}
                required
              />
            </Grid>
            <Grid item xs={12} className="columnItem">
              <label style={emwStyle.emwLabel}>CC Email</label>
              <TextField
                name="ccemail"
                autoComplete="email"
                placeholder="Email"
                type="text"
                style={emwStyle.emwtextboxInput}
              />
            </Grid>
            <Grid item xs={12} className="columnItem">
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <label style={emwStyle.emwLabel}>Primary Phone Number</label>
                  <div className={classes.emwPhoneTopGap}>
                    <EMWPhoneNumber
                      defaultCountry="us"
                      name="phoneNumber"
                      required={true}
                      phoneNum={phoneNum}
                      handleOnChangeNum={handleOnChangeNum}
                      handleOnBlur={handleOnBlur}
                    />
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <label style={emwStyle.emwLabel}>Extension</label>
                  <TextField
                    name="extension"
                    autoComplete="Extension"
                    placeholder="Extension"
                    type="text"
                    style={emwStyle.emwtextboxInput}
                  />
                </Grid>

              </Grid>
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4}>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <EMWAccountPasswordModal Mopen={viewQuote} hide={() => setviewQuote(false)} />
    </React.Fragment>
  );
};
