import { Trans } from "@lingui/react";
import React from "react";

import { Address, DropdownMenu, IconButton, Tile } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";
import ReactSVG from "react-svg";
import edit from "../../../../images/pencil.svg";
import trashIcon from "../../../../images/delete.svg";
import save from "../../../../images/save.svg";
import Grid from '@material-ui/core/Grid';

const defaultShippingAddress = (
  <S.MenuItem>
    <Trans id="Set as default shipping address" />
  </S.MenuItem>
);
const defaultBillingAddress = (
  <S.MenuItem>
    <Trans id="Set as default billing address" />
  </S.MenuItem>
);

const emwStyle = {
  emwTile: {
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      textAlign: "left",
      backgroundColor: "white",
      width:" 100%",
      margin: "0px",
  },
}
export const AddressTile: React.FC<IProps> = ({
  onEditClick,
  onRemove,
  setDefault,
  address,
}: IProps) => {
  const header = (
    <div>
      <div style={{cursor:"pointer"}} className="actionIconWrp">
        {/*<ReactSVG path={save} />*/}
        <ReactSVG path={edit} onClick={() => onEditClick(address.node)} />
        {/*<ReactSVG path={trashIcon} />*/}
      </div>
      {/* <div>
       <ReactSVG path={edit} onClick={onEdit} />
      </div> */}
    </div>
  );

  const content = <Address {...address.node} setDefault={setDefault}/>;
  return (
    <Grid style={emwStyle.emwTile} container spacing={3}>
      <Grid item xs={10}>
        {content}
      </Grid>
      <Grid item xs={2}>
        {header}
      </Grid>
    </Grid>
  );
};
