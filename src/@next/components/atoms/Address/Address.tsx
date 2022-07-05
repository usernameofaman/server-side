import { Trans } from "@lingui/react";
import React from "react";

import { IAddress } from "@types";

import * as S from "./styles";

export const Address: React.FC<IAddress> = ({
  firstName,
  lastName,
  companyName,
  streetAddress1,
  streetAddress2,
  city,
  postalCode,
  countryArea,
  country,
  phone,
  email,
  setDefault
}: IAddress) => (
  <div style={{fontWeight:"300"}}>
    <S.Name>{`${firstName} ${lastName}`}</S.Name>
    {companyName && (
      <>
       <S.Name>{companyName}</S.Name>
      </>
    )}
    {streetAddress1}
    <br />
    {streetAddress2 && (
      <>
        {streetAddress2} <br />
      </>
    )}
    {city} , {countryArea && <>{countryArea}, </>} {postalCode && `${postalCode}`} 
    <br />
    {/* {country!.country} */}
    <br />
    {phone && (
      <>
        <Trans id="Phone number" />: {phone} <br />
      </>
    )}
    {email && (
      <>
      {email} 
      </>
    )}
    <div style={{marginTop:"20px"}}>
    <input type="checkbox" onChange={() => setDefault()}/> Set as default address
    </div>
  </div>
);
