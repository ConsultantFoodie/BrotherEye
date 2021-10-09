chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === "BrotherEye");
  port.onMessage.addListener(function(msg) {
    if (msg.request === "Send Value"){
      console.log(msg.request);
      port.postMessage({
        doughnuts: [
                      {id: "Attentiveness", dataGreen: Math.floor(Math.random() * 101)},
                      {id: "Engagement", dataGreen: Math.floor(Math.random() * 101)},
                      {id: "Value3", dataGreen: Math.floor(Math.random() * 101)},
                      {id: "Value4", dataGreen: Math.floor(Math.random() * 101)},
                    ]
      });
    }
  });
});