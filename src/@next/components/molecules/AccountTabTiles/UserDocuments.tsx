import React from "react";
import Grid from '@material-ui/core/Grid';

import { Attribute, IconButton, Tile } from "@components/atoms";
import * as S from "./styles";

import { AccountType } from "./AccountType"
import { TaxExempt } from "./TaxExempt"
import { PendingDoc } from "./PendingDoc"
import { PasswordChange } from './PasswordChange'

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
  },
  emwTileContent: {
    color: "#425160",
    height: "220px",
    textAlign: "center",
    textDecorationLine: "underline",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}

export const UserDocuments: React.FC<{ user: any, refetch: any}> = ({ user, refetch }) => {

  return (
    <>
      <AccountType refetch={refetch} isTaxExempt={user && user.isTaxExempt} user={user && user} typeId={user && user.tier && user.tier.emwUsertierTierid.emwTierdefType.emwTiertypeId} type={user && user.tier && user.tier.emwUsertierTierid.emwTierdefType.emwTiertypeName} />
      <PasswordChange user={user && user} refetch={refetch}/>
      </>
  );
};
