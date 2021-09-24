var myCharts = {};

function appendChart(chartDiv, chartText){
  var div = document.createElement("div");
  div.className = "indiChart";

  var chartLabel = document.createElement("text");
  chartLabel.className = "chartTitle"
  chartLabel.innerText = chartText;
  div.append(chartLabel);

  var chartContainer = document.createElement("div");
  chartContainer.className = "chartContainer";
  var ctx = document.createElement("canvas");
  ctx.id = chartText;
  chartContainer.append(ctx);

  div.append(chartContainer)
  chartDiv.append(div);
  myCharts[chartText] = null;
}

function makeChart(chartId, dataGreen){
  ctx = document.getElementById(chartId);
  if(myCharts[chartId]){
    myCharts[chartId].destroy();
  }
  myCharts[chartId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: ['Green', 'Red'],
          datasets: [{
              label: 'Attentiveness',
              data: [dataGreen, 100-dataGreen],
              backgroundColor: [
                  'rgba(10, 200, 10, 0.5)',
                  'rgba(255, 0, 0, 0.3)'
              ],
              borderColor: [
                'rgba(10, 200, 10, 1)',
                'rgba(255, 0, 0, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          }
        }
      }
  });
}

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
    displayer.insertBefore(panel, displayer.childNodes[0]);
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
  
  makeChart("Attentiveness", 60);
  makeChart("Engagement", 80);
  makeChart("Value3", 40);
  makeChart("Value4", 50);

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
    createPanel();
    observer.disconnect();
    return;
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(document, config);
