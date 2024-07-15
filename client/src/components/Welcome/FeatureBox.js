import React from "react";
import { Row, Col, Hidden } from "react-grid-system";
import styled from "styled-components";
import { colors } from "../../config/colors";

const FeatureBox = (props) => (
  <Row style={{ marginTop: "80px" }}>
    <Hidden xs>
      <Col xs={2.1}></Col>
    </Hidden>

    {/* --------- Feature box -------- */}
    <Col xs={12} md={2.6}>
      <Box icon="tv-outline">Host Video in a room</Box>
    </Col>
    <Col xs={12} md={2.6}>
      <Box icon="sync-outline">Sync video with each other</Box>
    </Col>
    <Col xs={12} md={2.6}>
      <Box icon="chatbox-ellipses-outline">Live chat with friends</Box>
    </Col>

    <Hidden xs>
      <Col xs={2.1}></Col>
    </Hidden>
  </Row>
);

const Box = (props) => (
  <StyledBox>
    <ion-icon
      name={props.icon}
      style={{
        fontSize: "2em",
        color: colors.secondaryColor,
      }}
    ></ion-icon>
    <div>{props.children}</div>
  </StyledBox>
);

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  height: 160px;
  margin: 5%;
  padding: 5%;
  border-radius: 10px;
  margin-bottom: 18px;
  font-size: 0.9em;
  font-weight: 480;
  box-sizing: border-box;
  box-shadow: 0px 1px 5px #ddd;
  background-color: #fff5e4;
`;

export default FeatureBox;
