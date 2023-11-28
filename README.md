# Global view of real-time events
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

Repository contains Node.js server and React client app.
- WebSocket server that periodically sends events, including a random location (latitude and longitude).
- Web page that displays the sent events on a 3D globe and deletes them after a few seconds.
- List of the top 3 countries in descending order with events for the last 1 minute in the top right corner of the globe, updated every 15 seconds.

![ezgif com-optimize](https://github.com/m-wrzosk/real-time-events/assets/18627402/faef44f9-0906-408a-93a7-453b75786426)

## Deploy
[https://real-time-events.netlify.app/](https://real-time-events.netlify.app/) \
\
Client app deployed with [netlify](https://www.netlify.com/). \
Server deployed with [render](https://render.com/). \
\
[![Netlify Status](https://api.netlify.com/api/v1/badges/5155289d-704e-4734-89c8-788920b91cbd/deploy-status)](https://app.netlify.com/sites/enchanting-selkie-196c0c/deploys) 

## Used libraries:
- [coordinate_to_country](https://www.npmjs.com/package/coordinate_to_country)
- [uuid](https://www.npmjs.com/package/uuid)
- [ws](https://www.npmjs.com/package/ws)
- [react-use-websocket](https://www.npmjs.com/package/react-use-websocket)
- [react-globe.gl](https://github.com/vasturiano/react-globe.gl)

# 
_Project inspired by one of the recrutation tasks._
