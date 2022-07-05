import { styled } from "@styles";

export const Wrapper = styled.div`
background: #FFFFFF;
border: 1px solid #ECECEE;
box-sizing: border-box;
border-radius: 4px;
padding: 10px 25px;
margin-right: 10px;
padding-bottom: calc(10px - 0.5rem) !important;
cursor:pointer;
`;

export const Indicator = styled.div<{ rotate: string }>`
  position: absolute;
  right: 1rem;
  transition-duration: 0.3s;
  transform: ${props =>
    props.rotate === "true" ? "rotate(180deg)" : "rotate(0deg)"};
`;
