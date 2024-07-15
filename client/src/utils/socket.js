import io from "socket.io-client";
import { showToast } from "../utils/helper";

export const createConnection = (name, roomId = null, videoId = null) => {
  return new Promise((resolve) => {
    const socket = io("https://synctube-y4gh.onrender.com", {
      path: "/socket",
      withCredentials: true,
    });
    socket.on("connect", () => {
      socket.emit("join", {
        roomId: roomId || socket.id,
        name,
        userId: socket.id,
        videoId,
      });
      resolve(socket);
    });
  });
};

export const bindSocketEvents = async (socket, dispatchFunc) => {
  if (!socket) return;
  const { userDispatch, signalDispatch } = dispatchFunc;

  const dispatchAdminMessage = (id, text) => {
    userDispatch({
      type: "UPDATE_MESSAGES",
      data: {
        from: null,
        text,
        id,
      },
    });
  };

  socket.on("newMessage", (data) => {
    const name = data.payload && data.payload.name;

    switch (data.type) {
      case "userJoin":
        showToast("success", `${data.payload.name} has joined the room`);
        dispatchAdminMessage(data.id, `${name} has joined`);
        break;

      case "userLeft":
        showToast("info", `${data.payload.name} has left the room`);
        dispatchAdminMessage(data.id, `${name} has left`);
        break;

      case "userMessage":
        userDispatch({ type: "UPDATE_MESSAGES", data });
        break;

      case "changeVideo":
        userDispatch({
          type: "UPDATE_VIDEO_ID",
          videoId: data.payload.videoId,
        });
        break;

      case "updateVideoId":
        // initiated when video is changed in the middle of playing
        // everyone is informed of the newly selected video
        signalDispatch({ type: "RESET_SIGNAL_STATE" });
        signalDispatch({ type: "VIDEO_CHANGING", videoChanging: true });
        userDispatch({
          type: "UPDATE_VIDEO_ID",
          videoId: data.payload.videoId,
        });
        showToast(
          "info",
          `${data.payload.user.name} has changed the video`,
          "bottom-start"
        );
        dispatchAdminMessage(
          data.id,
          `The video has been changed by ${data.payload.user.name}`
        );
        break;

      case "updateVideoState":
        signalDispatch({
          type: "SET_TRANSITION",
          transition: true,
        });
        console.log("update video state triggered =", data.payload.type);
        switch (data.payload.type) {
          case "PLAY":
            signalDispatch({
              type: "PLAY_VIDEO",
              currentTime: data.payload.currentTime,
            });
            showToast(
              "info",
              `${data.payload.user.name} has started playing the video`,
              "bottom-start"
            );
            break;

          case "PAUSE":
            signalDispatch({
              type: "PAUSE_VIDEO",
              timestamp: Date.now(),
            });
            showToast(
              "info",
              `${data.payload.user.name} has paused the video`,
              "bottom-start"
            );
            break;
          case "SET_SPEED":
            signalDispatch({
              type: "SET_SPEED",
              speed: data.payload.speed,
            });
            showToast(
              "info",
              `${data.payload.user.name} has changed the playback speed`,
              "bottom-start"
            );
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }
  });

  socket.on("updateUserList", (userList) => {
    //console.log("new user list", userList);
    userDispatch({ type: "UPDATE_USER_LIST", users: userList });
  });
};
