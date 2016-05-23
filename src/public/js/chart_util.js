module.exports = {
  generate_chart: function(data) {
    console.log(data);
    if (data == ""){
      return "";
    }
    var chart_array = [];
    var chart_array = data.split(",").map(function(value) {
      return ['', parseFloat(value)];
    });
    chart_array.unshift(['Concept', 'Value']);
    return chart_array;
  },

}
