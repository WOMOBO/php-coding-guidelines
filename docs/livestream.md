
Livestream playback
===================
You need to provide a livestream URL in `MediaDataSource` and indicates `isLive: true`.

Sample HTTP FLV source:

```js
{
    // HTTP FLV
    "type": "flv",
    "isLive": true,
    "url": "http://127.0.0.1:8080/live/livestream.flv"
}
```

Or a WebSocket source:

```js
{
    // FLV over WebSocket
    "type": "flv",
    "isLive": true,
    "url": "ws://127.0.0.1:9090/live/livestream.flv"
}
```

## HTTP FLV live stream

### CORS
You must configure `Access-Control-Allow-Origin` header correctly on your stream server.

See [cors.md](../docs/cors.md) for details.

### Compatibility
Due to IO restrictions, flv.js can support HTTP FLV live stream on `Chrome 43+