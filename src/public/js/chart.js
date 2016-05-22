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
          generate_chart();
        }
      }
    });
  }



});

//------------------------------------------------------------------------------

function generate_chart(){

  google.charts.setOnLoadCallback(function(){
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
  });
}
