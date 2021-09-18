// Select the node that will be observed for mutations
// import * as listeners from "./listeners.js";

function viewPanel() {
  var displayer = document.getElementsByClassName("R3Gmyc qwU8Me qdulke")[0];
  if(!!displayer){
      displayer.setAttribute("class", "R3Gmyc qwU8Me");
  }
  var oldPanel = document.getElementsByClassName("WUFI9b");
  Array.from(oldPanel).forEach(element => {
      element.setAttribute("class","WUFI9b qdulke");
  });
  if(!!!document.getElementById("MyPanel")){
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
      panel.setAttribute("class", "WUFI9b");
      panel.setAttribute("data-tab-id","7");
      panel.setAttribute("jsname", "b0t70b");
      panel.setAttribute("jscontroller","dkJU2d");
      panel.setAttribute("jsaction","VOcP9c:QPhnyd;ntQuZe:EuYDs");
      var panelLocation = document.querySelector("#ow3 > div.T4LgNb > div > div:nth-child(9) > div.crqnQb > div.R3Gmyc.qwU8Me");
      panelLocation.insertBefore(panel, panelLocation.childNodes[1]);
  }
  else{
      document.getElementById("MyPanel").setAttribute("class", "WUFI9b");
  }
}

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
  const targetNode = document.getElementsByClassName("SGP0hd kunNie")[0];
  if (targetNode){
    alert("NEW")
    var button = document.createElement("button");
    button.addEventListener("click", viewPanel);
    var mainDiv = document.createElement("div");
    mainDiv.id = "MyDiv";
    button.setAttribute("class", "VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc");
    button.setAttribute("jscontroller", "soHxf");
    button.setAttribute("jsaction","click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc; touchcancel:JMtRjd; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef");
    button.setAttribute("aria-label","My Button");
    button.setAttribute("data-panel-id","7");
    button.innerHTML = "BE";
    mainDiv.appendChild(button);
    var panelButtons = document.getElementsByClassName("SGP0hd kunNie")[0];
    panelButtons.insertBefore(mainDiv, panelButtons.childNodes[0]);
    observer.disconnect();
    return;
  }
    // // Use traditional 'for loops' for IE 11
    // for(const mutation of mutationsList) {
    //     if (mutation.type === 'childList') {
    //         console.log('A child node has been added or removed.');
    //     }
    //     else if (mutation.type === 'attributes') {
    //         console.log('The ' + mutation.attributeName + ' attribute was modified.');
    //     }
    // }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(document, config);

// Later, you can stop observing
// observer.disconnect();