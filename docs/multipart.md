
Multipart playback
==================
When you create FlvPlayer instance, the `MediaDataSource` structure is passing through the constructor.

You need to provide a playlist for `MediaDataSource` in following format:

```js
{
    // Required
    "type": "flv",  // Only flv type supports multipart playback

    // Optional
    "du