import React from "react";
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors/';
import { customerUpdateMutation, EMWchangeUserTier } from '../../../../@sdk/mutations/user';
import { getEMWTiers } from "../../../../components/OverlayManager/Login/queries";
import { useAlert } from "react-alert";
import './scss/index.scss';


const theme = createMuiTheme({
  palette: {
    primary: { main: blueGrey[700] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

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
}

export const AccountType: React.FC<{ type: any, typeId: any, isTaxExempt: any, refetch: any, user: any }> = ({ type, typeId, isTaxExempt, refetch, user }) => {

  const alert = useAlert();
  const [viewQuote, setviewQuote] = React.useState(false);
  const [userType, setuserType] = React.useState(typeId);
  const [taxExempt, setTaxExempt] = React.useState(isTaxExempt ? true : false);
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (type: any) => {
    // setSelectedValue(event.target.value);
    console.log(type)
    onAccountTypeChange(type)
  };

  const controlProps = (item: any) => ({
    checked: item.emwTiertypeName === type,
    onChange: () => handleChange(item),
    value: item,
    inputProps: { 'aria-label': item },
  });

  const { data } = useQuery(getEMWTiers, {
    variables: { first: 50 }, fetchPolicy: "no-cache"
  });
  let accountTypes = []

  if (data) {
    accountTypes = data.emwTierTypes.edges.map(edge => edge.node)
  }

  const [updateCustomerAccountType] = useMutation(EMWchangeUserTier, {
    onCompleted({ changeUserTier }) {
      if (changeUserTier.errors.length === 0) {
        alert.show(
          {
            title: "Updated Successfully",
          },
          { type: "success", timeout: 2000 }
        );
        refetch()
        setviewQuote(false);
      } else {
        alert.show(
          {
            title: "Something Went Wrong.",
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

  const [updateCustomerAccount] = useMutation(customerUpdateMutation, {
    onCompleted({ customerUpdate }) {
      if (customerUpdate.errors.length === 0) {
        alert.show(
          {
            title: "Updated Successfully",
          },
          { type: "success", timeout: 2000 }
        );
        refetch()
      } else {
        alert.show(
          {
            title: "Something Went Wrong.",
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

  const requestHandler = (e) => {
    setTaxExempt(e.target.checked)
    updateCustomerAccount({
      variables: {
        id: localStorage.getItem("emwUserId"),
        input: {
          isTaxExempt: e.target.checked
        },
      }
    })
  }

  const onAccountTypeChange = (type) => {
    setuserType(type.emwTiertypeId);
    updateCustomerAccountType({
      variables: {
        user: localStorage.getItem("emwUserId"),
        tiertype: parseInt(type.emwTiertypeId)
      }
    })
  }

  return (
    <React.Fragment>
      <Grid style={emwStyle.emwTile} container spacing={3}>
        <Grid style={emwStyle.emwTileHead} item xs={12}>
          <p>Account Settings</p>
        </Grid>
        <Grid style={emwStyle.emwTileContent} item xs={12}>
          <p style={emwStyle.emwTileContent.heading} >Business Type</p>
          <p> Your business type is currently set as <span style={{ textTransform: "uppercase", fontWeight: "600" }}> {type}</span> </p>
          <p className="accounttype"></p>
          {!viewQuote && <p className="account-update-button" onClick={() => setviewQuote(true)}> Change Business Type</p>}
          {viewQuote && accountTypes.map((type) => {
            return (
              (type.emwTiertypeIsActive) ?
                <div>
                  <MuiThemeProvider theme={theme}>
                    <Radio
                      {...controlProps(type)}
                      color="primary"
                    />
                  </MuiThemeProvider>
                  <span>{type.emwTiertypeName}</span>
                </div>
                :
                null
            )
          })}
        </Grid>
      </Grid>
    </React.Fragment>

  );
};
