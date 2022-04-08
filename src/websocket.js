function JsonObj(eventType, data, end){
    return {
        event: eventType,
        meetCode: initMsg.meetCode,
        uid: initMsg.uid,
        role: initMsg.role,
        data: data,
        end: end
    };
}

function closeConnection() {
    if (ws)
        ws.close();
}

function openConnection() {
    closeConnection();
    // var url = "ws://localhost:8001/";
    var url = "wss://4cf6-203-110-242-40.ngrok.io";
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
    // console.log(msg.data);
    reply = JSON.parse(msg.data);
    // console.log(reply);
    switch(reply.event){
        case "Add new":
            appendChart(document.getElementById("Charts"), reply.name, reply.uid);
            break;
        case "Update":
            makeChart(reply.uid, parseInt(reply.presence));
            break;
        case "Request Frames":
            sendFrames();
            break;
        case "Add Row":
            table = document.getElementById("Table1");
            addRow(table, [reply.time, reply.score, reply.aggregate], false);
            break;
    }
}

function sendRequestToServer(){
    if(ws){
        ws.send(JSON.stringify(JsonObj("request", "", false)));
    }
    else{
        console.log("error sending request to server");
    }
}

function sendSnapshotToServer(img, endFrame) {
    if (ws){
        ws.send(JSON.stringify(JsonObj("reply", img, endFrame)));
    }
    else{
        console.log("error");
    }
}
