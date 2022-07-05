import React from "react";
import "./scss/index.scss";
import { Box } from "@material-ui/core";
import { AddressFormModal, AddressGrid } from "@components/organisms";
import { getShippingAddress } from '@sdk/queries/emwShipping';
import { addNewShippingAddMutation, updateNewShippingAddMutation } from '@sdk/mutations/emwShipping';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import EMWAddressModal from "../../components/EMWModal/EMWAddressModal"
import { AlertManager, useAlert } from "react-alert";
import ReactGA from 'react-ga';
import  AddressListComponent  from './AddressList'
import {setDefaultShippingAddressMutation , deleteAddressMutation } from "@sdk/mutations/emwShipping"
import { defaultAddressRequiredMessage } from '../../constants';
import Box from '@material-ui/core/Box';
import InfoIcon from '../../images/info-icon.svg';

const AddressBook: React.FC<{
  user: any;
}> = ({ user }) => {
  const alert = useAlert();
  const [displayNewModal, setDisplayNewModal] = React.useState(false);
  const [displayEditModal, setDisplayEditModal] = React.useState(false);
  const [showDefaultAddressMessage, setShowDefaultAddressMessage] = React.useState(true);
  const [addressData, setAddressData] = React.useState(null);
  const [addressList, setAddressList] = React.useState([]);
  const impersonatedCustomerEmail = localStorage.getItem('ImpersonatedCustomerEmail');

  const [fetchShippingAdd] = useLazyQuery(getShippingAddress, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      if (data) {
        setAddressList(data.emwAddresses.edges)
      }
    },
    onError(error) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });

  React.useEffect(() => {
    if (impersonatedCustomerEmail && impersonatedCustomerEmail.length) {
      fetchShippingAdd({
        variables: {
          email: impersonatedCustomerEmail,
        },
      })
    } else {
      fetchShippingAdd()
    }
  }, [user]);

  React.useEffect(() => {
    if (addressList && addressList.findIndex(address => address.node.isDefaultAddress) != -1) {
      setShowDefaultAddressMessage(false)
    }
  }, [addressList])

  React.useEffect(() => {
    // Page Load Timings 
    if (window.performance) {
      const start = window.performance.getEntriesByName(`${location.pathname}_START`, "mark");
      if (start && start.length > 0) {
        const end = window.performance.mark(`${location.pathname}_END`);
        window.performance.measure('myMeasure', `${location.pathname}_START`, `${location.pathname}_END`);
        const entries = window.performance.getEntriesByType('measure');

        if (entries && entries.length > 0 && entries[0].duration) {
          // Sends the timing hit to Google Analytics.
          ReactGA.timing({
            category: 'Account Page Load Time',
            variable: `${location.pathname}`,
            value: Math.round(entries[0].duration), // in milliseconds
            label: window.location.pathname
          });
        }
        // Finally, clean up the entries.
        performance.clearMarks();
        performance.clearMeasures();
      } else {
        const timeSincePageLoad = Math.round(performance.now());
        ReactGA.timing({
          category: 'Account Page Load Time',
          variable: `${location.pathname}`,
          value: timeSincePageLoad, // in milliseconds
          label: window.location.pathname
        });
      }
    }
  }, []);

  const [addNewShipping] = useMutation(addNewShippingAddMutation, {
    onCompleted({ emwAddressCreate }) {
      if (emwAddressCreate.errors.length === 0) {
        if (impersonatedCustomerEmail && impersonatedCustomerEmail.length) {
          fetchShippingAdd({
            variables: {
              email: impersonatedCustomerEmail,
            },
          })
        } else {
          fetchShippingAdd()
        }
        setDisplayNewModal(false)
      }
    },
    onError(errors) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });

  const [setDefaultAddress] = useMutation(setDefaultShippingAddressMutation, {
    onCompleted({ setDefaultAddress }) {
      if (setDefaultAddress.errors.length === 0) {
        fetchShippingAdd({
          variables: {
            email: impersonatedCustomerEmail,
          },
        })
        alert.show(
          {
            title: "Updated Successfully",
          },
          { type: "success", timeout: 2000 }
        );
      }
    },
    onError(errors) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });

  const [deleteSelectedAddress] = useMutation(deleteAddressMutation, {
    onCompleted({ emwAddressDelete }) {
      if (emwAddressDelete.errors.length === 0) {
        fetchShippingAdd({
          variables: {
            email: impersonatedCustomerEmail,
          },
        })
        alert.show(
          {
            title: "Deleted Successfully",
          },
          { type: "success", timeout: 2000 }
        );
      }
    },
    onError(errors) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });

  const [updateNewShipping] = useMutation(updateNewShippingAddMutation, {
    onCompleted({ emwAddressUpdate }) {
      if (emwAddressUpdate.errors.length === 0) {
        if (impersonatedCustomerEmail && impersonatedCustomerEmail.length) {
          fetchShippingAdd({
            variables: {
              email: impersonatedCustomerEmail,
            },
          })
        } else {
          fetchShippingAdd()
        }
        setDisplayEditModal(false)
      } else {
        alert.show(
          {
            title: emwAddressUpdate.errors[0].field + ": " + emwAddressUpdate.errors[0].message,
          },
          { type: "error", timeout: 5000 }
        );
      }

    },
    onError(errors) {
      alert.show({ title: "Something went wrong!" }, { type: "error" });
    },
  });

  const handleAddressSubmit = (data) => {
    if (impersonatedCustomerEmail && impersonatedCustomerEmail.length) {
      addNewShipping({
        variables: { ...data, userEmail: impersonatedCustomerEmail }
      })
    } else {
      addNewShipping({
        variables: data,
      })
    }
  }


  const handleAddressEditSubmit = (data, id) => {
    if (impersonatedCustomerEmail && impersonatedCustomerEmail.length) {
      updateNewShipping({
        variables: {
          id,
          userEmail: impersonatedCustomerEmail,
          input: data.input,
        },
      })
    } else {
      updateNewShipping({
        variables: {
          id,
          input: data.input,
        },
      })
    }
  }

  const onEditClick = (data) => {
    setDisplayEditModal(true)
    setAddressData(data)
  }


  return (
    <>
      {/* The old Implementation */}
      {/* <div className="address-book-container">

      <div className="addressBook-header">
        <span>
        Address Book
        </span>
        <button className="addAddress" onClick={()=>  setDisplayNewModal(true)}>
        ADD ADDRESS
        </button>
      </div>
      <AddressGrid
        addresses={AddressList}
        addNewAddress={() => {
          setDisplayNewModal(true);
        }}
        onEditClick={onEditClick}
      /> */}
      {
      showDefaultAddressMessage &&
      <Box display="flex" className="supply-chain-msg">
            <Box className="supply-chain-msg-icon">
              <img src={InfoIcon} />
            </Box>
            <Box className="supply-chain-msg-text">
              <p>{defaultAddressRequiredMessage}</p>
            </Box>
          </Box>
      }
      <div className="address-book-wrapper">
        <div className="address-book-header">
          Address Book
        </div>
        <div className="address-book-sub-head">
          Save your addresses here to speed up online checkout.
        </div>
        <div className="address-container">
          <div className="header-controls">
            <h3>Saved Addresses</h3>
            <button className="register" onClick={() => setDisplayNewModal(true)}>
              ADD ADDRESS
            </button>
          </div>
          <AddressListComponent deleteSelectedAddress={deleteSelectedAddress} onEditClick={onEditClick} setDefaultAddress={setDefaultAddress} addressList={addressList}/>
        </div>
      </div>



      {displayNewModal && (
        <EMWAddressModal addressData={null} handleAddressEditSubmit={handleAddressEditSubmit} handleAddressSubmit={handleAddressSubmit} Mopen={displayNewModal} hide={() => setDisplayNewModal(false)} />
      )}
      {displayEditModal && (
        <EMWAddressModal addressData={addressData} handleAddressEditSubmit={handleAddressEditSubmit} handleAddressSubmit={handleAddressSubmit} Mopen={displayEditModal} hide={() => setDisplayEditModal(false)} />
      )}
    </>
  );
};

export default AddressBook;
