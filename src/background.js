var presenceValue = 0;
var lenPayload = 0;
var payloadList = [];

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === "BrotherEye");
  port.onMessage.addListener(function(msg) {
    if(msg.open){
      openConnection();
    }
    else{
      if(msg.endFrame){
        console.log("End Frame");
        sendSnapshotToServer();
        payloadList = [];
        console.log("Presence: ", presenceValue);
        console.log("Total: ", lenPayload);
        port.postMessage({
          doughnuts: [
                        {id: "Attentiveness", dataGreen: Math.floor((presenceValue/lenPayload)*100)},
                        // {id: "Engagement", dataGreen: Math.floor(Math.random() * 101)},
                        // {id: "Value3", dataGreen: Math.floor(Math.random() * 101)},
                        // {id: "Value4", dataGreen: Math.floor(Math.random() * 101)}
                      ]
        });
        presenceValue = 0;
        lenPayload = 0;
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
  presenceValue += parseInt(event.data);
  lenPayload += 1;
  console.log("Received ", presenceValue, " ", lenPayload);
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
  }
  else{
    console.log("error")
  }
}
