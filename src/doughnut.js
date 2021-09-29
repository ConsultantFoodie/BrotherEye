function appendChart(chartDiv, chartText){
  var div = document.createElement("div");
  div.className = "indiChart";

  var chartLabel = document.createElement("text");
  chartLabel.className = "chartTitle"
  chartLabel.innerText = chartText;
  div.append(chartLabel);

  var chartContainer = document.createElement("div");
  chartContainer.className = "chartContainer";

  var middleDiv = document.createElement("div");
  middleDiv.className = "chartText " + chartText;
  var middleText = document.createElement("text")
  middleDiv.append(middleText)
  chartContainer.append(middleDiv)

  var ctx = document.createElement("canvas");
  ctx.id = chartText;
  chartContainer.append(ctx);

  div.append(chartContainer)
  chartDiv.append(div);
  myCharts[chartText] = null;
}

function makeChart(chartId, dataGreen){
  middleText = document.getElementsByClassName(chartId)[0].children[0];
  middleText.innerText = dataGreen.toString(); 
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
        },
        events: []
      }
  });
}