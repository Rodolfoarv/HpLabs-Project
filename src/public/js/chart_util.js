module.exports = {
  generate_chart: function(data) {
    if (data == ""){
      return "";
    }
    var chart_array = [];
    var chart_array = data.split(",").map(function(value) {
      return [parseFloat(value)];
    });
    chart_array.unshift(['name']);
    return chart_array;
  }


}