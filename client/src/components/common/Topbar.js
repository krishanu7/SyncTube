import React from "react";
import styled from "styled-components";
import { colors } from "../../config/colors";

const Topbar = () => {
  return (
    <StyledBar>
      <img
        src="/watchparty-logo.svg"
        alt="logo"
        width="auto"
        height="25px"
        style={{ marginRight: "8px" }}
      ></img>
      <span style={{ color: colors.secondaryColor }}>WATCH</span>
      <span style={{color:"#F5F7F8"}}>&nbsp;PARTY</span>
    </StyledBar>
  );
};
const StyledBar = styled.div`
  display: flex;
  height: 10vh;
  box-shadow: 2px 2px 10px #ddd;
  align-items: center;
  justify-content: center;
  font-size: 1.8em;
  font-weight: 800;
  background-color: #22092c;
`;
export default Topbar;
