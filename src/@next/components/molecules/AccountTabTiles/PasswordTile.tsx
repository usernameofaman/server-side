import React from "react";

import { Attribute, IconButton, Tile } from "@components/atoms";
import { useAlert } from "react-alert";
import { usePasswordChange } from "@sdk/react";
import { PasswordChangeForm } from "./PasswordChangeForm";
import * as S from "./styles";

export const PasswordTile: React.FC<{cancelClick:any}> = ({cancelClick}) => {
  const [isEditing, setIsEditing] = React.useState(true);
  const [setPasswordChange, { data, error }] = usePasswordChange();
  const alert = useAlert();

  React.useEffect(() => {
    if (data && !error) {
      setIsEditing(false);
    }
    if(error && error.extraInfo.userInputErrors)
      console.log(error.extraInfo.userInputErrors)

  }, [data, error]);

  const handleCancel =()=>{
    cancelClick();
    alert.show({title: "Password changed Successfully."},{ type: "success", timeout: 2000 });
  }
  
  return (
          <>
            {isEditing ? (
                <PasswordChangeForm
                  handleSubmit={data => {
                    setPasswordChange(data);
                  }}
                  hide={() => {
                    setIsEditing(false);
                  }}
                  cancelClick={cancelClick}
                  error={error ? error!.extraInfo!.userInputErrors : []}
                />
            ) : (<>
              <Attribute
                description="Password changed Successfully."
                attributeValue=""
              />
              {handleCancel()}
            </>)}
          </>
  );
};
