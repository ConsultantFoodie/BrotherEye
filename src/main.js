const port = chrome.runtime.connect({name: "BrotherEye"});
const captureTime = 5000 // in milliseconds
const FPS = 10;
const videoInterval = 15000;

var canvas = null;
var intervalId = 0;
var startTime = null;
var frameNum = 0;
var typeUser = null;

chrome.runtime.onConnect.addListener(function(port){
  console.assert(port.name === "backToContent");
  port.onMessage.addListener(function(msg, sender){
    switch(msg.event){
      case "Add new":
        appendChart(document.getElementById("Charts"), msg.name);
        break;
      case "Update":
        var chartId = null;
        if(typeUser == "Host"){
          chartId = msg.name;
        }
        else if(typeUser == "Audi"){
          chartId = "You";
        }
        console.log(chartId, msg.dataGreen);
        makeChart(chartId, msg.dataGreen);
        break;
    }
  })
});

function createPanel() {
  var displayer = document.getElementsByClassName("R3Gmyc qwU8Me qdulke")[0];

  var panel = document.createElement("div");
  var heading = document.createElement("div");
  heading.setAttribute("class", "CYZUZd");
  heading.innerHTML = '<div class="J8vCN zHGix" role="heading" aria-level="2" tabindex="-1" jsname="rQC7Ie" id="c10">Student Engagement</div>';
  panel.appendChild(heading);

  var closeButton = document.createElement("div");
  closeButton.setAttribute("class", "VUk8eb");
  closeButton.innerHTML = '<div jsaction="JIbuQc:hR1TY;rcuQ6b:npT2md" jscontroller="AXYg3e"><span data-is-tooltip-wrapper="true"><button class="VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ IWtuld wBYOYb" jscontroller="soHxf" jsaction="click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc; touchcancel:JMtRjd; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef" data-disable-idom="true" aria-label="Close" data-tooltip-enabled="true" data-tooltip-id="tt-c17"><div class="VfPpkd-Bz112c-Jh9lGc"></div><i class="google-material-icons VfPpkd-kBDsod" aria-hidden="true">close</i></button><div class="EY8ABd-OWXEXe-TAWMXe" role="tooltip" aria-hidden="true" id="tt-c17">Close</div></span></div>';
  heading.appendChild(closeButton);

  panel.id = "MyPanel";
  panel.setAttribute("class", "WUFI9b qdulke");
  panel.setAttribute("data-tab-id","7");
  panel.setAttribute("jsname", "b0t70b");
  panel.setAttribute("jscontroller","dkJU2d");
  panel.setAttribute("jsaction","VOcP9c:QPhnyd;ntQuZe:EuYDs");

  var chartDiv = document.createElement("div");
  chartDiv.id = "Charts";
  
  if(typeUser==="Host"){
    appendChart(chartDiv, "Presentation Score");
    panel.append(chartDiv);
    
    var tableDiv1 = document.createElement("div");
    tableDiv1.className = "TableDiv";
    var tableSchema1 = {
      columns: ["Slide Number", "Presentation Score", "Aggregated Audience Score"]
    };

    appendTable(tableDiv1, "Table2", tableSchema1);
    panel.append(tableDiv1);
  }
  else if(typeUser==="Audi"){
    appendChart(chartDiv, "You");
    panel.append(chartDiv) 
  }
  displayer.insertBefore(panel, displayer.childNodes[0]);
}

function bgUpdate(){
  startTime = Date.now();
  console.log("Starting Sending Frames.");
  intervalId = window.setInterval(updatePanel, 1000/FPS);
}

function viewPanel() {
  var displayer = document.getElementsByClassName("R3Gmyc qwU8Me qdulke")[0];
  if(!!displayer){
      displayer.setAttribute("class", "R3Gmyc qwU8Me");
  }

  var oldPanel = document.getElementsByClassName("WUFI9b");
  Array.from(oldPanel).forEach(element => {
      element.setAttribute("class","WUFI9b qdulke");
  });

  document.getElementById("MyPanel").setAttribute("class", "WUFI9b");
}

function updatePanel(){
  let ctx = canvas.getContext('2d');
  let video = document.getElementById("cam_input");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  let data = canvas.toDataURL("image/png");
  frameNum += 1;
  port.postMessage({event: "process", payload: data, endFrame: false});
  
  if(intervalId!=0 && Date.now()-startTime > captureTime){
    console.log(frameNum);
    frameNum = 0;
    clearInterval(intervalId);
    port.postMessage({event: "process", payload: "END", endFrame: true});
    intervalId = 0;
  }
}

function getInput(){
  let video = document.getElementById("cam_input"); // video is the id of video tag
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(function(stream) {
      video.srcObject = stream;
      video.play();
  })
  .catch(function(err) {
      console.log("An error occurred! " + err);
  });
}

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
  const targetNode = document.getElementsByClassName("SGP0hd kunNie")[0];
  if (targetNode){
    console.log(window.location.pathname)
    setTimeout(callbackHost, 2000);
    observer.disconnect();
    return;
  }
};

// Options for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: true };

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(document, config);

const callbackHost = function() {
  const targetNode = document.getElementsByClassName("SGP0hd kunNie")[0];
  var button = document.createElement("button");
  button.addEventListener("click", viewPanel);
  var mainDiv = document.createElement("div");
  mainDiv.id = "EngagementDiv";
  mainDiv.setAttribute("class", "r6xAKc");
  button.setAttribute("class", "VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc");
  button.setAttribute("jscontroller", "soHxf");
  button.setAttribute("jsaction","click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc; touchcancel:JMtRjd; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef");
  button.setAttribute("aria-label","Engagement Metrics");
  button.setAttribute("data-panel-id","7");
  button.innerHTML = "SE";
  mainDiv.appendChild(button);

  targetNode.insertBefore(mainDiv, targetNode.childNodes[0]);
  let vid = document.createElement("video");
  vid.id = "cam_input";
  vid.height="480";
  vid.width="640";
  document.body.append(vid);
  canvas = document.createElement('canvas');

  var hostCheck = document.querySelectorAll('[aria-label="Host controls"]')[0];
  if(hostCheck){
    console.log("Host");
    typeUser = "Host";
  }
  else{
    console.log("Audi");
    typeUser = "Audi";
  }
  getInput();
  createPanel();
  setInterval(bgUpdate, videoInterval);
  
  port.postMessage({
    event: "init",
    meetCode: window.location.pathname,
    role: typeUser 
  });
}