'use strict'

$(document).ready(() =>{
  $('#form_file_name').submit(create_chart);
  $('#form_compare').submit(compare_charts);
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


function compare_charts(event){
  event.preventDefault();
  var filename1 = $('#tf_compare1').val().trim();
  var filename2 = $('#tf_compare2').val().trim();
  $.ajax({
    url: '/hplabs/submit_compare/',
    type: 'POST',
    dataType: 'json',
    data: {filename1: filename1,
           filename2: filename2},
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



//------------------------------------------------------------------------------
  function create_chart(event){
    event.preventDefault();
    var filename = $('#tf_filename').val().trim();
    $.ajax({
      url: '/hplabs/submit_single/',
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


//------------------------------------------------------------------------------

function generate_chart(file_title, chart_data){
  $('#chart_title').text(file_title);
  google.charts.setOnLoadCallback(function(){
    var data = google.visualization.arrayToDataTable(chart_data);
    var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard_div'));
    var rangeSlider = new google.visualization.ControlWrapper({
      'controlType': 'NumberRangeFilter',
      'containerId': 'filter_div',
      'options': {
        'filterColumnLabel': 'Value',
        },
      'state': {'lowValue': -2.0, 'highValue': 2.0}
      });


    // Create the histogram with the data provided
    var histogram = new google.visualization.ChartWrapper({
      'chartType': 'Histogram',
      'containerId': 'chart_div',
      'options': {
        'legend': 'right'
      },
      'view': {'columns': [0,1]}
    });

    // Wait for the chart to finish drawing before calling the getImageURI() method.
    google.visualization.events.addListener(histogram, 'ready', function() {
        console.log(histogram.getChart().getImageURI());
            document.getElementById('png').innerHTML = '<a href="' + histogram.getChart().getImageURI() + '" target="_blank download">Download as PNG</a>';
    });

    dashboard.bind(rangeSlider, histogram);
    // Draw the dashboard.
    dashboard.draw(data);

  });

}
});
