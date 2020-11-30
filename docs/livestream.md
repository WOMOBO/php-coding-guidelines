
Livestream playback
===================
You need to provide a livestream URL in `MediaDataSource` and indicates `isLive: true`.

Sample HTTP FLV source:

```js
{
    // HTTP FLV
    "type": "flv",
    "isLive": true,
    "url": "http://127.0.0.1:8080/live/livestream.f