import React from "react";
import * as S from "./styles";
import { IProps } from "./types";

export const TileGrid: React.FC<IProps> = ({
  elements,
  columns = 3,
}: IProps) => {
  return (
    <S.Wrapper style={{margin:"0 -7.5px"}}>
      {elements.map((element: React.ReactNode, index) => (
        <S.Tile className="addreshtileRowWrp" style={{marginBottom:"35px", padding:"0 7.5px"}} key={index} 
        columns={columns}>
          {element}
        </S.Tile>
      ))}
    </S.Wrapper>
  );
};
