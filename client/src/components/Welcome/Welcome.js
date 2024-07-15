import React, { useState, useRef } from "react";
import { createConnection } from "../../utils/socket";
import { Container, Row, Col, Hidden } from "react-grid-system";
import styled from "styled-components";
import StartForm from "./StartForm";
import FeatureBox from "./FeatureBox";
import { Button } from "../common";
import { colors } from "../../config/colors";
import { getVideoId } from "../../utils/helper";

function Welcome(props) {
  // const [canRedirectToRoom, setRedirect] = useState(false);
  let isEnd = useRef(null);
  const [hostLoading, setHostLoading] = useState(false);

  const scrollToBottom = () => {
    if (isEnd && isEnd.current) {
      isEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  const onHost = async (username, videoUrl) => {
    // use socket id as room address
    setHostLoading(true);
    const videoId = getVideoId(videoUrl);
    const socket = await createConnection(username, null, videoId);
    setHostLoading(false);

    props.history.push({
      pathname: `/room/${socket.id}`,
      state: { hostId: socket.id, username, videoId },
      socket,
    });
  };

  const onJoin = (username, joinUrl) => {
    // TODO: Add verification for join url
    const splitUrl = joinUrl.split("/");
    const roomId = splitUrl[splitUrl.length - 1];
    props.history.push({
      pathname: `/room/${roomId}`,
      state: { username },
    });
  };

  return (
    <div style={{background: "#F0FFFF"}}>
      <Container fluid>
        <Row style={{ paddingTop: "80px" }} align="center">
          <Hidden xs>
            <Col xs={2}></Col>
          </Hidden>
          <Col xs={12} md={4}>
            <IntroMessage>
              Host <span style={{ color: colors.primaryColor }}>Youtube </span>
              Watch Party with Friends
            </IntroMessage>
            <Button
              style={styles.heroButton}
              onClick={scrollToBottom}
              primary="true"
            >
              {" "}
              Get Started
            </Button>
          </Col>
          <Col xs={12} md={5}>
            <img src="hero-banner.svg" alt="logo" />
          </Col>
          <Hidden xs>
            <Col xs={2}></Col>
          </Hidden>
        </Row>
      </Container>
      <FeatureBox />
      <Container fluid>
        <Row align="center" style={styles.formContainer}>
          <Col xs={12} md={2}></Col>
          <StartForm onHost={onHost} onJoin={onJoin} hostLoading={hostLoading} />
          <Col xs={12} md={2}></Col>
          <div className="dummy" ref={isEnd}></div>
        </Row>
      </Container>
    </div>
  );
};

const IntroMessage = styled.h1`
  font-weight: 500;
  margin: 0;
  padding: 0;
  font-size: 2.5em;
`;
const styles = {
  heroButton: {
    margin: "15px 0",
    minWidth: "200px",
    padding: "15px 10px",
  },
  formContainer: {
    background: "#F0FFFF",
    marginBottom: "40px",
    zIndex: 10,
    minHeight: "100vh",
  },
};
export default Welcome;
