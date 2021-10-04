chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === "knockknock");
  port.onMessage.addListener(function(msg) {
    if (msg.request === "Send Value"){
      console.log(msg.request);
      port.postMessage({id: "Attentiveness", dataGreen: 10});
    }
  });
});