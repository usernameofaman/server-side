import React from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";
import { IProps } from "./types";

export const AccountMenu: React.FC<IProps> = ({ links, active }: IProps) => {
  return (
    <S.Wrapper className='myAccountSection'>
      <S.MenuHeader className='myAccountHeading'>MY ACCOUNT</S.MenuHeader>
      {links.map(link => {
        const menuItem = link
          .replace(/\//g, "")
          .replace("-", " ")
          .split(" ")
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
        return (
          <Link to={link} key={link} className="myAccountOptions">
            <S.MenuItem active={active === link}>{menuItem}</S.MenuItem>
          </Link>
        );
      })}
    </S.Wrapper>
  );
};
