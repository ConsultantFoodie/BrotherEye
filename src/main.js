const captureTime = 5000 // in milliseconds
const FPS = 23;

var userName = null;
var ws = null;
var videoInterval = 15000;
var canvas = null;
var intervalId = 0;
var bgUpdateId = 0;
var startTime = null;
var frameNum = 0;
var typeUser = null;

function sendFrames(){
  getInput();
  startTime = Date.now();
  console.log("Starting Sending Frames.");
  intervalId = window.setInterval(updatePanel, 1000/FPS);
}

function updatePanel(){
  let ctx = canvas.getContext('2d');
  let video = document.getElementById("cam_input");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  let data = canvas.toDataURL("image/png");
  frameNum += 1;
  sendSnapshotToServer(data, false);

  if(intervalId!=0 && Date.now()-startTime > captureTime){
    console.log(frameNum);
    frameNum = 0;
    clearInterval(intervalId);
    sendSnapshotToServer("END", true);
    intervalId = 0;
    video.pause();
    video.srcObject.getTracks()[0].stop();
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
    attendees = document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc")[1];
    setTimeout(function(){attendees.click();}, 500);
    setTimeout(function(){attendees.click();}, 2000);
    setTimeout(callbackHost, 3000);
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
  addButtonCanvas();

  var hostCheck = document.querySelectorAll('[aria-label="Host controls"]')[0];
  if(hostCheck){
    console.log("Host");
    typeUser = "Host";
  }
  else{
    console.log("Audi");
    typeUser = "Audi";
  }

  initMsg = {
    event: "init",
    meetCode: window.location.pathname,
    role: typeUser,
    uid: "",
    name: userName
  };
  chrome.runtime.sendMessage({event: "ID needed"}, function(response){
    console.log(response);
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var hostCheck = document.querySelectorAll('[aria-label="Host controls"]')[0];
    initMsg["uid"] = request.uid;
    console.log("initMsg", initMsg);
    createPanel();
    if(hostCheck){
      autoControls();
      let controlSwitch = document.getElementById("controlSwitch");
      controlSwitch.addEventListener("change", function(){
        if(this.checked){
          console.log("Manual");
          clearInterval(bgUpdateId);
          var autoDiv = document.getElementById("autoControls");
          autoDiv.remove();
          manualControls();
          var manualSubmit = document.getElementById("manualMetrics");
          manualSubmit.addEventListener("click", sendRequestToServer);
        }
        else{
          console.log("Auto");
          bgUpdateId = setInterval(sendRequestToServer, videoInterval);
          var manualDiv = document.getElementById("manualControls");
          manualDiv.remove();
          autoControls();
          var vidIntField = document.getElementById("vidInt");
          vidIntField.addEventListener("keypress", function(e){
            if(e.key==="Enter"){
              this.blur();
            }
          });
          vidIntField.addEventListener("blur", function(){
            console.log(this.value);
            if(parseInt(this.value)>0){
              videoInterval = parseInt(this.value)*1000;
              clearInterval(bgUpdateId);
              bgUpdateId = setInterval(sendRequestToServer, videoInterval);
            }
          });
        }
      });
      bgUpdateId = setInterval(sendRequestToServer, videoInterval);
    }
    openConnection();
    sendResponse({event:"Done"});
  }
);

