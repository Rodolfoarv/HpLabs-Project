'use strict'

function generate_chart(){

}

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable(
    [ [ 'Value' ],
    [ -2.06106 ],
    [ -1.98222 ],
    [ 0.0281387 ],
    [ 0.160025 ],
    [ 1.55722 ],
    [ 0.462473 ],
    [ -1.51787 ],
    [ -0.25794 ],
    [ 0.0837762 ],
    [ 0.275901 ] ]);

  var options = {
    title: 'Lengths of dinosaurs, in meters',
    legend: { position: 'none' },
  };

  var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
  chart.draw(data, options);
}
