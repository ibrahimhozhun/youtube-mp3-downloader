### Try this project [here](https://mp3-downloader.web.app/)

> Server might be slow at first requests. I use free version of [Heroku](https://www.heroku.com/) for server and it sleeps when there's no requests. So restarting server takes time.

# Description

This project is a Youtube MP3 downloader. It gets audio from Youtube via ['ytdl-core' package](https://www.npmjs.com/package/ytdl-core).
Then it converts the audio to mp3 format with ['fluent-ffmpeg' package](https://www.npmjs.com/package/fluent-ffmpeg) and saves it to an mp3 file.
After that it writes the metadata to the mp3 file with ['node-id3' package](https://www.npmjs.com/package/node-id3).
Finally it sends the mp3 file to the browser and browser downloads it client's device.

## Table of Contents

- [Description](#description)
- [Used Tech Stack for This Project](#used-tech-stack-for-this-project)
  - [Server Side](#server-side)
  - [Client Side](#client-side)
  - [Dependencies Used in Development](#dependencies-used-in-development)
- [How to run this project locally?](#how-to-run-this-project-locally)
- [Hosting](#hosting)

# Used Tech Stack for This Project

## Server Side

- [Node.js](https://nodejs.org/)

- [TypeScript](https://www.typescriptlang.org/)

- [axios](https://www.npmjs.com/package/axios) for http requests

- [cors](https://www.npmjs.com/package/cors) for fixing CORS errors

- [dotenv](https://www.npmjs.com/package/dotenv) for using environment variables

- [Express](https://www.npmjs.com/package/express) for handling requests

- [fluent-ffmpeg](https://www.npmjs.com/package/fluent-ffmpeg) for converting audio to mp3 format

- [node-id3](https://www.npmjs.com/package/node-id3) for writing metadata to mp3 files
- [ytdl-core](https://www.npmjs.com/package/ytdl-core) for downloading audio from Youtube

## Client Side

- [React.js](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner)

## Dependencies Used in Development

- [Nodemon](https://www.npmjs.com/package/nodemon) for auto-restarting server

- [Ts-Node](https://www.npmjs.com/package/ts-node) for 'nodemon' to compile the typescript code

- [Create-React-App](https://create-react-app.dev/) for creating React app with TypeScript

# How to run this project locally?

1. Firstly clone this repository or download zip files to your computer.
2. Then be sure you have downloaded [Node.js](https://nodejs.org/en/download/) for your OS.
3. You should download ffmpeg for your OS. Then add ffmpeg to your environment variables.
   > I had some issues while downlaoding ffmpeg so I'm leaving a link for windows users. You can downlaod [ffmpeg](https://github.com/BtbN/FFmpeg-Builds/releases/download/autobuild-2021-03-20-12-32/ffmpeg-n4.3.2-160-gfbb9368226-win64-gpl-shared-4.3.zip) from this link. Then just add `ffmpeg/bin` folder to your environment variables.
4. After that open project files in any terminal.
5. And run these commands to start server:

```bash
cd server
yarn install
yarn start
```

6. Finally open project files in a new terminal run these commands to start client:

```bash
cd client
yarn install
yarn start
```

# Hosting

For client I use [Firebase Hosting](https://firebase.google.com/products/hosting)\
For server I use [Heroku](https://www.heroku.com/)\
I recommend both of them. They're free for little projects and using them is very simple.
