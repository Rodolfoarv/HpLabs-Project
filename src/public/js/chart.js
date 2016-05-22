'use strict'



$(document).ready(() =>{
  $('#form_file_name').submit(create_chart);

  // google.charts.load("current", {packages:["controls"]});
  google.charts.load('current', {'packages':['corechart', 'controls']});
  notify_user("Welcome to <b>HpLabs Chart Project</b> to get started write the name of the textfile", 'info');

  function notify_user(notification_message, notification_type){
    $.notify({
        icon: 'pe-7s-file',
        message: notification_message

      },{
          type: notification_type,
          timer: 4000
      });
  }




//------------------------------------------------------------------------------
  function create_chart(event){
    event.preventDefault();
    var filename = $('#tf_filename').val().trim();
    $.ajax({
      url: '/hplabs/',
      type: 'POST',
      dataType: 'json',
      data: {filename: filename},
      success: result => {
        console.log(result);
        if (result.exists){
          notify_user("The file <b>" + result.name + "</b> has been found successfully", 'success')
          generate_chart(result.name, result.data);
        }else{
          notify_user("The file <b>" + result.name + "</b> does not exist", 'danger')
        }
      }
    });
  }



});

//------------------------------------------------------------------------------




// function generate_chart(file_title, chart_data){
//   $('#chart_title').text(file_title);
//   google.charts.setOnLoadCallback(function(){
//     var data = google.visualization.arrayToDataTable(chart_data);
//
//
//     var options = {
//       title: "Histogram",
//       legend: { position: 'none' },
//       animation:{
//         startup: true,
//         easing: 'in',
//       },
//
//     };
//     var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
//     chart.draw(data, options);
//   });
//
// }
function generate_chart(file_title, chart_data){
  $('#chart_title').text(file_title);
  // google.charts.load("current", {packages:["controls"]});
  google.charts.setOnLoadCallback(function(){
    var data = google.visualization.arrayToDataTable(chart_data);



    var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard_div'));


        var donutRangeSlider = new google.visualization.ControlWrapper({
          'controlType': 'NumberRangeFilter',
          'containerId': 'filter_div',
          'options': {
            'filterColumnLabel': 'Value',
          },
          'state': {'lowValue': 0.0, 'highValue': 0.5}
        });

        // Create a pie chart, passing some options
        var histogram = new google.visualization.ChartWrapper({
          'chartType': 'Histogram',
          'containerId': 'chart_div',
          'options': {
            'legend': 'right'
          },
          'view': {'columns': [0,1]}
        });

        // Establish dependencies, declaring that 'filter' drives 'histogram',
        // so that the pie chart will only display entries that are let through
        // given the chosen slider range.
        dashboard.bind(donutRangeSlider, histogram);

        // Draw the dashboard.
        dashboard.draw(data);

  });

}
