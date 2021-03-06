import React from "react";
import { components } from "react-select";
import { ThemeContext } from "styled-components";

import { Label } from "../Label";
import { Select } from "../Select";

import { useHandlerWhenClickedOutside } from "../../../hooks";
import { Icon } from "../Icon";
import Toggleicon from "../../../../images/toggleDown.svg"
import * as S from "./styles";
import { IProps } from "./types";

export const DropdownSelect: React.FC<IProps> = ({
  options,
  name,
  value,
  onChange,
  dropdownClass,
}: IProps) => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setMenuIsOpen(false);
  });

  const customComponents = {
    Control: () => (
      <S.SortLine onClick={() => setMenuIsOpen(!menuIsOpen)}>
        {/* <Label>Sort by:</Label> */}
        <S.Value>{` ${value ? value.label : ""}`}</S.Value>
        <S.Indicator rotate={String(menuIsOpen)}>
          {/* <Icon name="select_arrow" size={10} /> */}
          <img src={Toggleicon} alt="icon"/>
        </S.Indicator>
      </S.SortLine>
    ),
    IndicatorSeparator: () => null,
    IndicatorsContainer: () => null,
    Option: (props: any) => {
      const customTheme = React.useContext(ThemeContext);
      return <components.Option {...{ customTheme, ...props }} />;
    },
  };

  return (
    <S.Wrapper ref={setElementRef()} className={dropdownClass}>
      <Select
        options={options}
        value={value}
        onChange={value => {
          setMenuIsOpen(false);
          onChange(value);
        }}
        name={name}
        menuIsOpen={menuIsOpen}
        customComponents={customComponents}
      />
    </S.Wrapper>
  );
};
