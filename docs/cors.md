
CORS Configuration
==================
Anytime you want to play an FLV stream from another `Origin`, the server must response with a CORS header:

```
Access-Control-Allow-Origin: <your-origin> | *
```

For example, if an html on your site `http://flvplayback.com` want's to play an FLV from another `Origin` like `http