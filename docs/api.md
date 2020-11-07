

flv.js API
==========
This document use TypeScript-like definitions to describe interfaces.

## Interfaces

flv.js exports all the interfaces through `flvjs` object which exposed in global context `window`.

`flvjs` object can also be accessed by require or ES6 import.


Functions:
- [flvjs.createPlayer()](#flvjscreateplayer)
- [flvjs.isSupported()](#flvjsissupported)
- [flvjs.getFeatureList()](#flvjsgetfeaturelist)

Classes:
- [flvjs.FlvPlayer](#flvjsflvplayer)
- [flvjs.NativePlayer](#flvjsnativeplayer)
- [flvjs.LoggingControl](#flvjsloggingcontrol)

Enums:
- [flvjs.Events](#flvjsevents)
- [flvjs.ErrorTypes](#flvjserrortypes)
- [flvjs.ErrorDetails](#flvjserrordetails)




### flvjs.createPlayer()
```js
function createPlayer(mediaDataSource: MediaDataSource, config?: Config): Player;
```

Create a player instance according to `type` field indicated in `mediaDataSource`, with optional `config`.


### MediaDataSource

| Field              | Type                  | Description                              |
| ------------------ | --------------------- | ---------------------------------------- |
| `type`             | `string`              | Indicates media type, `'flv'` or `'mp4'` |
| `isLive?`          | `boolean`             | Indicates whether the data source is a **live stream** |
| `cors?`            | `boolean`             | Indicates whether to enable CORS for http fetching |
| `withCredentials?` | `boolean`             | Indicates whether to do http fetching with cookies |
| `hasAudio?`        | `boolean`             | Indicates whether the stream has audio track |
| `hasVideo?`        | `boolean`             | Indicates whether the stream has video track |
| `duration?`        | `number`              | Indicates total media duration, in **milliseconds** |
| `filesize?`        | `number`              | Indicates total file size of media file, in bytes |
| `url?`             | `string`              | Indicates media URL, can be starts with `'https(s)'` or `'ws(s)'` (WebSocket) |
| `segments?`        | `Array<MediaSegment>` | Optional field for multipart playback, see **MediaSegment** |

If `segments` field exists, transmuxer will treat this `MediaDataSource` as a **multipart** source.