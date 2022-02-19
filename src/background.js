var ws = null;
var payloadList = [];
var contentPort = null;
var initMsg = null;

// initMsg Format
// {
//   event: "init",
//   meetCode: window.location.pathname,
//   role: typeUser,
//   email: userEmail
// }

function JsonObj(data, end){
  return {
    event: "process",
    meetCode: initMsg.meetCode,
    email: initMsg.email,
    role: initMsg.role,
    data: data,
    end: end
  };
}

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === "BrotherEye");
  port.onMessage.addListener(function(msg, sender) {
    switch(msg.event) {
      case "init":
        initMsg = msg;
        chrome.identity.getProfileUserInfo(function(userInfo){
          initMsg["email"] = userInfo.email;
        });
        contentPort = chrome.tabs.connect(sender.sender.tab.id, {name: "backToContent"});
        openConnection();
        break;
      case "process":
        if(msg.endFrame){
          contentID = sender.sender.tab.id;
          console.log("End Frame");
          sendSnapshotToServer();
        }
        else{
          payloadList.push(msg.payload);
        }
        break;
    }
  });
});


function closeConnection() {
  if (ws)
      ws.close();
}

function openConnection() {
  closeConnection();
  var url = "ws://localhost:8000/";
  console.log("Attempting connection");
  ws = new WebSocket(url);
  ws.onopen = onOpen;
  ws.onclose = onClose;
  ws.onmessage = onMessage;
  ws.onerror = onError;
}

function onOpen() {
  console.log("Websocket connected.");
  ws.send(JSON.stringify(initMsg));
}

function onClose() {
  console.log("Websocket disconnected.");
  ws = null;
}

function onError(event) {
  console.log("Websocket error.");
}

function onMessage(msg) {
  console.log(msg.data);
  reply = JSON.parse(msg.data);
  console.log(reply);
  switch(reply.event){
    case "Add new":
      contentPort.postMessage({
        event: "Add new",
        name: reply.name
      });
      break;
    case "Update":
      contentPort.postMessage({
        event: "Update",
        name: reply.name,
        dataGreen: parseInt(reply.presence)
      });
      break;
  }
}

function sendSnapshotToServer() {
  if (ws){
    for(let i=0;i<payloadList.length;i++){
      console.log("Sending");
      ws.send(JSON.stringify(JsonObj(payloadList[i], false)));
    }
    payloadList = [];
    ws.send(JSON.stringify(JsonObj("", true)));
  }
  else{
    console.log("error")
  }
}
