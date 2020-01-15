# chatSocketNodeJS
Chat en NodeJS con Socket.io
<a href="https://github.com/cesarazocar/chatSocketNodeJS/tree/master/public">Socket.io client</a> preview:

<img src="https://github.com/cesarazocar/chatSocketNodeJS/blob/master/socketio%20preview.png" width="350" title="Socketio client example" alt="Socket.io client example">

Compatible Esp8266 client <a href="https://github.com/cesarazocar/Socket.ioChatEsp8266">here</a>

<a href="https://github.com/cesarazocar/Socket.ioChatEsp8266">
  <img src="https://github.com/cesarazocar/Socket.ioChatEsp8266/blob/master/output%20serial%20example.png" width="350" title="Esp8266 example" alt="Esp8266 example">
</a>


Compatible Android app client <a href="https://github.com/cesarazocar/chatSocketIo">here</a>

<a href="https://github.com/cesarazocar/chatSocketIo">
  <img src="https://github.com/cesarazocar/chatSocketIo/blob/master/socketio%20android.png" width="350" title="Android app client" alt="Android app client">
</a>

Compatible Flutter app client <a href="https://github.com/cesarazocar/flutterchatsocketio">here</a>

<a href="https://github.com/cesarazocar/flutterchatsocketio">
  <img src="https://github.com/cesarazocar/flutterchatsocketio/blob/master/chat.png" width="350" title="Flutter app client" alt="Flutter app client">
</a>

**Support events (defined on index.js):**

| Event            | Emits         |
| -------------    |:-------------:| 
|`'chat:newuser'`  | the `'username'` & `'uniqueId'`, both of them to every client, except the new client |
| `'chat:typing'`  | the `'username'` & `'typing'`, both of them to every client, except the new client|
| `'chat:message'` | the `'username'` & `'message'`, both of them to every client|
| `'chat:closing'` | the `'username'` to every client, except the new client|
