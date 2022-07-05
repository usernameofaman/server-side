import React from "react";

import { IProps } from "./types";

// import NoPhoto from "images/no-photo.svg";
import NoPhoto from "images/reference-image-placeholder.svg";

export const PlaceholderImage: React.FC<IProps> = ({
  alt = "placeholder",
}: IProps) => {
  return <img src={NoPhoto} alt={alt} />;
};
