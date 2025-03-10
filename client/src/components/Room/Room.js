import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import { Container, Row, Col } from "react-grid-system";
import Swal from "sweetalert2";
import Player from "./Player";
import Chat from "./Chat/Chat";
import Options from "./Options";
import styled from "styled-components";
import { Spinner } from "../common/Spinner";
import { createConnection, bindSocketEvents } from "../../utils/socket";
import { getVideoId } from "../../utils/helper";
import { UserContext } from "../../contexts/UserContext";
import { SignalContext } from "../../contexts/SignalContext";

function Room(props) {
  const [isHost, setHost] = useState(false);
  const [socket, setSocket] = useState(null);
  const [roomLoading, setRoomLoading] = useState(true);

  const { dispatch: userDispatch, userData } = useContext(UserContext);
  const { dispatch: signalDispatch } = useContext(SignalContext);

  const _isHost = useRef(false);
  const _socket = useRef(null);

  const init = useCallback(async () => {
    const hostId = props.location.state?.hostId;
    const videoId = props.location.state?.videoId;
    let username = props.location.state?.username;

    if (!hostId) {
      _isHost.current = false;

      if (!username) {
        const usernamePrompt = await Swal.fire({
          title: "Enter your display name",
          input: "text",
          allowOutsideClick: false,
        });
        username = usernamePrompt.value;
      }

      const roomId = props.match.params.id;
      _socket.current = await createConnection(username, roomId);
    } else {
      _isHost.current = true;
      _socket.current = props.location.socket;

      userDispatch({ type: "UPDATE_VIDEO_ID", videoId });
      showInviteModal();
    }

    userDispatch({ type: "UPDATE_USERNAME", username });
    setHost(_isHost.current);
    setSocket(_socket.current);
    bindSocketEvents(_socket.current, {
      userDispatch,
      signalDispatch,
    });

    console.log("is host", isHost);
    setRoomLoading(false);
  }, [
    props.location.state,
    props.match.params.id,
    userDispatch,
    signalDispatch,
    props.location.socket,
    isHost,
  ]);

  useEffect(() => {
    init();
  }, [init]);

  const showInviteModal = async () => {
    await Swal.fire({
      title: "Invite friends with this link",
      input: "text",
      inputValue: window.location.href,
      confirmButtonText: "Copy",
      inputAttributes: {
        readOnly: true,
      },
      width: "40%",
      onClose: () => {
        document.getElementsByClassName("swal2-input")[0].select();
        document.execCommand("copy");
      },
    });
  };

  const askVideoURL = async () => {
    const { value: url } = await Swal.fire({
      title: "YouTube Video URL",
      input: "url",
      inputPlaceholder: "https://www.youtube.com/watch?v=BTYAsjAVa3I",
    });

    return url;
  };

  const onVideoChange = async () => {
    const newURL = await askVideoURL();

    if (newURL && socket) {
      //console.log(_socket);
      const videoId = getVideoId(newURL);
      socket.emit("changeVideo", { videoId });
    }
  };

  const alertNotImplemented = () => {
    alert("Not implemented");
  };

  return (
    <Component>
      {roomLoading ? (
        <Spinner />
      ) : (
        <Container fluid style={{ padding: "4% 3%" }}>
          <Row>
            <Col md={8}>
              <Player socket={socket} videoId={userData.videoId} />
            </Col>
            <Col md={4}>
              <Options
                onInvite={showInviteModal}
                alertNotImplemented={alertNotImplemented}
                onVideoChange={onVideoChange}
              />
              <Chat socket={socket} />
            </Col>
          </Row>
        </Container>
      )}
    </Component>
  );
}
const Component = styled.div`
  height: 100vh;
  background-color: #f0ffff;
  width: 100vw;
  overflow: scroll;
  overflow-y: scroll;
`;
export default Room;
