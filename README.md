# WatchParty
WatchParty is a React-based web application that allows users to host YouTube watch parties with friends. With real-time video syncing and instant messaging capabilities, it offers an immersive experience for users to enjoy their favorite videos together while interacting in real-time.
## Live Demo
You can access the live demo of WatchParty at [here](https://watchtogether-live.netlify.app)
## Features

- **Host YouTube videos in a room:** Users can create a room and host YouTube videos within it.
- **Sync videos in real-time:** WatchParty synchronizes the playback of YouTube videos across all users in the same room.
- **Instant messaging with friends:** Users can chat with friends in real-time while watching videos together.

## Technologies Used

- **React:** The client-side of WatchParty is built using React, providing a dynamic and interactive user interface.
- **Socket.io:** WatchParty utilizes Socket.io for handling real-time connections between users, enabling synchronized video playback and instant messaging.
- **react-youtube:** Simple React component acting as a thin layer over the YouTube IFrame Player API.
- **Context API:** Context API is used to handle play/pause actions for synchronization with other users, ensuring seamless playback experience across all connected devices.
- **Netlify:** The client-side of the application is deployed on Netlify for easy accessibility.
- **Render:** The server-side of the application is deployed on Render, ensuring reliable hosting and performance.

## Deployment

This repository contains both the client and server-side code. The client-side code is deployed on Netlify, while the server-side code is deployed on Render.

### Client Deployment

The client-side of WatchParty is deployed on Netlify. Any changes pushed to the main branch of this repository will trigger an automatic deployment to Netlify.

### Server Deployment

The server-side of WatchParty is deployed on Render. Similarly, any changes pushed to the main branch of this repository will automatically deploy the server-side code to Render.

## Local Development

To run WatchParty locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the `client` directory and run `npm install` to install the dependencies.
3. After the installation is complete, run `npm start` to start the client-side development server.
4. Navigate to the `server` directory and run `npm install` to install the server dependencies.
5. Once the dependencies are installed, run `npm start` to start the server.
6. You can now access WatchParty locally by visiting `http://localhost:3000` in your web browser.

## Contributing

Contributions to WatchParty are welcome! If you have any suggestions, bug reports, or feature requests, please feel free to open an issue or submit a pull request.
# SyncTube
