let payload = null
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === "BrotherEye");
  port.onMessage.addListener(function(msg) {
    // if (msg.request === "Send Value"){
    //   console.log(msg.request);
    //   port.postMessage({
    //     doughnuts: [
    //                   {id: "Attentiveness", dataGreen: Math.floor(Math.random() * 101)},
    //                   {id: "Engagement", dataGreen: Math.floor(Math.random() * 101)},
    //                   {id: "Value3", dataGreen: Math.floor(Math.random() * 101)},
    //                   {id: "Value4", dataGreen: Math.floor(Math.random() * 101)},
    //                 ]
    //   });
    // }
    payload = msg.payload;
    sendSnapshotToServer();
  });
});

var ws = null;

function closeConnection() {
  if (ws)
      ws.close();
}

function openConnection() {
  closeConnection();
  var url = "ws://localhost:8000";
  console.log("Attempting connection");
  ws = new WebSocket(url);
  ws.onopen = onOpen;
  ws.onclose = onClose;
  ws.onmessage = onMessage;
  ws.onerror = onError;
}

function onOpen() {
  console.log("Websocket connected.");
}

function onClose() {
  console.log("Websocket disconnected.");
  ws = null;
}

function onMessage(event) {
  console.log(event.data);
  // routeMessage(event.data);
}

function onError(event) {
  console.log("Websocket error.");
}

function sendSnapshotToServer() {
  console.log(payload)
    if (ws)
        ws.send(payload);
    else{
      console.log("error")
    }
}

openConnection();
