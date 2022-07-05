import { IAddressWithAddressType } from "@types";

export interface IProps {
  onEditClick: (data) => void;
  onRemove: () => void;
  setDefault: (arg0: string) => void;
  address: IAddressWithAddressType;
}
