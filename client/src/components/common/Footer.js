import React from "react";
import styled from "styled-components";
import { colors } from "../../config/colors";

const Footer = (props) => (
  <StyledFooter>
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      Crafted with&nbsp;
      <ion-icon
        name="heart-outline"
        style={{ color: colors.tertiaryColor, fontSize: "1.3em" }}
      ></ion-icon>
      &nbsp;by&nbsp;
      <a href="https://github.com/krishanu7" style={{ color: "#BBE2EC" }}>
        Krishanu
      </a>{" "}
      &nbsp;Source Code&nbsp;{" "}
      <a href="https://github.com/krishanu7/watchparty">
        <ion-icon
          name="logo-github"
          style={{
            fontSize: "1.3em",
            padding: "2px",
            marginTop: "2.5px",
            color: "white",
          }}
        ></ion-icon>
      </a>
    </div>
  </StyledFooter>
);

const StyledFooter = styled.div`
  height: 8vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 0.9em;
  font-weight: 500;
  background-color: black;
  color: white;
  font-style: italic;
  flex-wrap: wrap;
  padding: 0 5%;
  text-align: center;
`;

export default Footer;
