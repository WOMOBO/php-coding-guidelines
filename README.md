

flv.js  [![npm](https://img.shields.io/npm/v/flv.js.svg?style=flat)](https://www.npmjs.com/package/flv.js)
======
An HTML5 Flash Video (FLV) Player written in pure JavaScript without Flash. LONG LIVE FLV!

This project relies on [Media Source Extensions][] to work.

**For FLV live stream playback, please consider [mpegts.js][] which is under active development.**

**This project will become rarely maintained.**

[mpegts.js]: https://github.com/xqq/mpegts.js
## Overview
flv.js works by transmuxing FLV file stream into ISO BMFF (Fragmented MP4) segments, followed by feeding mp4 segments into an HTML5 `<video>` element through [Media Source Extensions][] API.

[Media Source Extensions]: https://w3c.github.io/media-source/

## Demo
[http://bilibili.github.io/flv.js/demo/](http://bilibili.github.io/flv.js/demo/)

## Features
- FLV container with H.264 + AAC / MP3 codec playback
- Multipart segmented video playback
- HTTP FLV low latency live stream playback
- FLV over WebSocket live stream playback
- Compatible with Chrome, FireFox, Safari 10, IE11 and Edge
- Extremely low overhead, and hardware accelerated by your browser!

## Installation
```bash
npm install --save flv.js
```

## Build
```bash
npm ci                 # install dependencies / dev-dependences
npm run build:debug    # debug version flv.js will be emitted to /dist
npm run build          # minimized release version flv.min.js will be emitted to /dist
```

[cnpm](https://github.com/cnpm/cnpm) mirror is recommended if you are in Mainland China.

## CORS
If you use standalone video server for FLV stream, `Access-Control-Allow-Origin` header must be configured correctly on video server for cross-origin resource fetching.