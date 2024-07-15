const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const ioUtils = require("./utils/io");

const app = express();
const server = http.createServer(app);

// Set up CORS for Express
app.use(cors({
  origin: "https://watchtogether-live.netlify.app",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

// Set up Socket.IO with CORS
const io = new Server(server, {
  path: "/socket",
  serveClient: false,
  cors: {
    origin: "https://watchtogether-live.netlify.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }
});

const PORT = process.env.PORT || 8080;

ioUtils.setupIO(io);

server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
