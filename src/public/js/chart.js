// Author: Rodolfo Andrés Ramírez Valenzuela


'use strict'

$(document).ready(() =>{
  $('#form_file_name').submit(create_chart);
  $('#form_compare').submit(compare_charts);
  google.charts.load('current', {'packages':['corechart', 'controls']});
  notify_user("Welcome to <b>HpLabs Chart Project</b> to get started write the name of the textfile", 'info');
//------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------

// Function that receives the 2 files and mix them
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
        var bucketSize = $('#tf_bucketsize').val();
        var bucketNumber = $('#tf_bucket_number').val();
        var min = $('#tf_min').val();
        var max = $('#tf_max').val();
        notify_user("The file <b>" + result.name + "</b> has been found successfully", 'success')
        generate_chart(result.name, result.data, bucketSize, bucketNumber, min, max);
      }else{
        notify_user("Could not generate chart, either missing an argument or file does not exist", 'danger')
      }
    }
  });
}

//------------------------------------------------------------------------------

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
          var bucketSize = $('#tf_bucketsize').val();
          var bucketNumber = $('#tf_bucket_number').val();
          var min = $('#tf_min').val();
          var max = $('#tf_max').val();
          if (min == '' && max == ''){
          generate_chart(result.name, result.data, bucketSize, bucketNumber);
          }else{
            generate_chart(result.name, result.data, bucketSize, bucketNumber,min,max);
          }

        }else{
          notify_user("The file <b>" + result.name + "</b> does not exist", 'danger')
        }
      }
    });
  }

//------------------------------------------------------------------------------

//------------------------------------------------------------------------------

// Function that will generate the chart and a dashboard which will have all the specifications
// the user gave on the html
function generate_chart(file_title, chart_data, bucketSize = 0, bucketNumber, min = -2.0, max = 2.0){
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
      'state': {'lowValue': min, 'highValue': max}
      });


    // Create the histogram with the data provided
    var histogram = new google.visualization.ChartWrapper({
      'chartType': 'Histogram',
      'containerId': 'chart_div',
      'options': {
        'legend': 'right',
        'histogram': { 'bucketSize': bucketSize,
                       'maxNumBuckets': bucketNumber,
                       'minValue': min,
                       'maxValue': max}
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
//------------------------------------------------------------------------------
