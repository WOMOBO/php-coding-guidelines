
Multipart playback
==================
When you create FlvPlayer instance, the `MediaDataSource` structure is passing through the constructor.

You need to provide a playlist for `MediaDataSource` in following format:

```js
{
    // Required
    "type": "flv",  // Only flv type supports multipart playback

    // Optional
    "duration": 12345678,  // total duration, in milliseconds
    "cors": true,
    "withCredentials": false,

    // Optional
    // true by default, do not indicate unless you have to deal with audio-only or video-only stream
    "hasAudio": true,
    "hasVideo": true,

    // Required
    "segments": [
        {
            "duration": 1234,  // in milliseconds
            "filesize": 5678,  // in bytes
            "url": "http://cdn.flvplayback.com/segments-1.flv"
        },
        {
            "duration": 2345,
            "filesize": 6789,
  