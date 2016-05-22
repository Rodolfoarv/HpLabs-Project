'use strict'



$(document).ready(() =>{
  $('#form_file_name').submit(create_chart);
  google.charts.load("current", {packages:["corechart"]});
  // $('#btn_create_chart').click(create_chart);

  $.notify({
      icon: 'pe-7s-file',
      message: "Welcome to <b>HpLabs Chart Project</b> to get started write the name of the textfile"

    },{
        type: 'info',
        timer: 4000
    });




//------------------------------------------------------------------------------
  function create_chart(event){
    event.preventDefault();
    console.log("test");
    var filename = $('#tf_filename').val().trim();
    console.log(filename);
    $.ajax({
      url: '/hplabs/',
      type: 'POST',
      dataType: 'json',
      data: {filename: filename},
      success: result => {
        if (result.exists){
          console.log("Generating chart");
          generate_chart(result.name, result.data);
        }
      }
    });
  }



});

//------------------------------------------------------------------------------

function generate_chart(file_title, chart_data){
  $('chart_title').text(file_title);
  google.charts.setOnLoadCallback(function(){
    var data = google.visualization.arrayToDataTable(chart_data);

    var options = {
      title: "Histogram",
      legend: { position: 'none' },
      animation:{
        startup: true,
        easing: 'in',
      },
      colors: ['green'],
    };
    var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
    chart.draw(data, options);
  });
}
