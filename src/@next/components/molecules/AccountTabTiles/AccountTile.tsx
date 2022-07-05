import React from "react";

import { useAccountUpdate, useUserDetails } from "@sdk/react";

import { Attribute, IconButton, Tile } from "@components/atoms";



import Grid from '@material-ui/core/Grid';
import * as S from "./styles";
import { EMWAccountUpdate } from "./EMWAccountUpdate"
import { media, styled } from "@styles";


const emwStyle = {
  accountTitle: {
    marginBottom: "35px",
    fontSize: "24px",
    fontWeight: "300",
    color: "#425160",
    textTransform: "uppercase",
  }
}


export const AccountTile: React.FC<{ user: any }> = ({ user }) => {
  const [isEditing, setIsEditing] = React.useState(false);



  return (
    <>
          <S.MobileOptiongrid>
            <EMWAccountUpdate user={user} />
          </S.MobileOptiongrid>
    </>
  );
};
