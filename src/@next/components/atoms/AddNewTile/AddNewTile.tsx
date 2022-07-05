import React from "react";

import { Icon } from "../Icon";
import { IProps } from "./types";
import Grid from '@material-ui/core/Grid';

const emwStyle = {
  emwTile: {
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      width:" 100%",
      margin: "0px",
  },
  emwTileHead: {
    background: "#E5E5E5",
    textAlign:"center",
  },
  emwTileContent:{
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

export const AddNewTile: React.FC<IProps> = ({ type, ...props }: IProps) => {
  return (
    // <Tile header={<p><Icon size={24} name="plus" /></p>} tileType="addNew" {...props}>
    //   <S.Content>        
    //     <p> {type}</p>
    //   </S.Content>
    // </Tile>
    <Grid style={emwStyle.emwTile} container spacing={3}>
      <Grid style={emwStyle.emwTileHead} item xs={12}>
        <p><Icon size={24} name="plus" /></p>
      </Grid>
      <Grid style={emwStyle.emwTileContent} {...props} item xs={12}>
        <p style={{cursor:"pointer"}}> {type}</p>
      </Grid>
    </Grid>
  );
};
