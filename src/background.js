var presenceValue = 0;
var lenPayload = 0;
var payloadList = [];
var contentID = 0;

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === "BrotherEye");
  port.onMessage.addListener(function(msg, sender) {
    if(msg.open){
      openConnection();
    }
    else{
      if(msg.endFrame){
        contentID = sender.sender.tab.id;
        console.log("End Frame");
        sendSnapshotToServer();
      }
      else{
        console.log("Adding");
        payloadList.push(msg.payload);
      }
    }
  });
});

var ws = null;

function closeConnection() {
  if (ws)
      ws.close();
}

function openConnection() {
  closeConnection();
  // var url = "ws://localhost:8000/";
  var url = "ws://4009-203-110-242-40.ngrok.io";
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
  presenceValue = parseInt(event.data);
  console.log(presenceValue)
  chrome.tabs.sendMessage(contentID, {
      doughnuts: [
                    {id: "Presentation Score", dataGreen: presenceValue},
                    {id: "Parth Rajiv Mall", dataGreen: presenceValue},
                    {id: "Sudhanshu Shankar", dataGreen: presenceValue},
                    {id: "Aditya Kumar Mundada", dataGreen: presenceValue}
                  ]
    });
}

function onError(event) {
  console.log("Websocket error.");
}

function sendSnapshotToServer() {
  if (ws){
    for(let i=0;i<payloadList.length;i++){
      console.log("Sending");
      ws.send(payloadList[i]);
    }
    payloadList = [];
    ws.send("END");
  }
  else{
    console.log("error")
  }
}
