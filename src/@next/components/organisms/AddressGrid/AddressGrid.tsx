import React from "react";

import { AddNewTile, TileGrid } from "@components/atoms";
import { AddressTile } from "@components/molecules";

import { IProps } from "./types";

export const AddressGrid: React.FC<IProps> = ({
  addresses,
  addNewAddress,
  onEditClick,
}: IProps) => {
  // const addNewTile = (
  //           <AddNewTile key="0" type="Add a new address" onClick={addNewAddress} />
  // );

  const addressTiles = addresses.reduce(
    (elements, address) => {
      elements.push(<AddressTile onEditClick={onEditClick} key={address.node.id} address={address}/>);
      return elements;
    },
    []
  );

  return <TileGrid columns={3} elements={addressTiles} />;
};
