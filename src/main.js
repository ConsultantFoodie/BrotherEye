var myCharts = {};
var id = null;
var port = chrome.runtime.connect({name: "BrotherEye"});
var canvas = null;

function createPanel() {
  var displayer = document.getElementsByClassName("R3Gmyc qwU8Me qdulke")[0];

  var panel = document.createElement("div");
    var heading = document.createElement("div");
    var closeButton = document.createElement("div");
    heading.setAttribute("class", "CYZUZd");
    heading.innerHTML = '<div class="J8vCN zHGix" role="heading" aria-level="2" tabindex="-1" jsname="rQC7Ie" id="c10">BrotherEye</div>';
    panel.appendChild(heading);
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
    appendChart(chartDiv, "Attentiveness");
    appendChart(chartDiv, "Engagement");
    appendChart(chartDiv, "Value3");
    appendChart(chartDiv, "Value4");
    panel.append(chartDiv);

    var tableDiv0 = document.createElement("div");
    tableDiv0.className = "TableDiv";
    var tableSchema0 = {
      columns: ["Col0", "Col1", "Col2", "Col3"],
      data: [["Val0", "Val1", "Val2", "Val3"]]
    };
    appendTable(tableDiv0, "Table1", tableSchema0);
    panel.append(tableDiv0);

    var tableDiv1 = document.createElement("div");
    tableDiv1.className = "TableDiv";
    var tableSchema1 = {
      columns: ["Col0", "Col1", "Col2", "Col3"],
      data: [
        ["Val00", "Val01", "Val02", "Val03"],
        ["Val10", "Val11", "Val12", "Val13"],
        ["Val20", "Val21", "Val22", "Val23"],
        ["Val30", "Val31", "Val32", "Val33"],
        ["Val40", "Val41", "Val42", "Val43"],
        ["Val50", "Val51", "Val52", "Val53"],
        ["Val60", "Val61", "Val62", "Val63"]
      ]
    };
    appendTable(tableDiv1, "Table2", tableSchema1);
    panel.append(tableDiv1);

    displayer.insertBefore(panel, displayer.childNodes[0]);
}

async function bgUpdate(){
  // window.setInterval(function(){
  //   if(document.getElementById("MyPanel").offsetParent){
  //     updatePanel();
  //   }
  // }, 5000);
  window.setInterval(updatePanel, 10000);
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

  // makeChart("Attentiveness", 60);
  // makeChart("Engagement", 80);
  // makeChart("Value3", 40);
  // makeChart("Value4", 50);

}

function updatePanel(){
  let ctx = canvas.getContext('2d');
  let video = document.getElementById("cam_input");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  let data = canvas.toDataURL("image/png");
  console.log("Sending");
  port.postMessage({payload: data});
  // port.onMessage.addListener(function(msg) {
  //   Array.from(msg.doughnuts).forEach(element => {
  //     makeChart(element.id, element.dataGreen);
  //   });
  // });
  
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

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
  const targetNode = document.getElementsByClassName("SGP0hd kunNie")[0];
  if (targetNode){
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
    button.innerHTML = "BE";
    mainDiv.appendChild(button);

    targetNode.insertBefore(mainDiv, targetNode.childNodes[0]);
    let vid = document.createElement("video");
    vid.id = "cam_input";
    vid.height="480";
    vid.width="640";
    document.body.append(vid);
    canvas = document.createElement('canvas');
    getInput();
    createPanel();
    // updatePanel();
    bgUpdate();
    observer.disconnect();

    return;
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(document, config);
