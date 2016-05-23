'use strict';
var express = require('express');
var generator = require("../cpp/build/Release/generator");
var chart = require("../public/js/chart_util")
var router = express.Router();
module.exports = router;

function promisify(fun) {
  return function (/* ... */) {
    return new Promise((resolve, reject) => {
      let args = Array.prototype.slice.call(arguments);
      args.push((err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
      fun.apply(null, args);
    });
  };
}

/* GET home page. */
router.get('/', function(req, res, next) {
  generator.generate_files();
  res.render('index', { title: 'Express',
                        page_name: 'index'});
});

router.get('/student_information', function(req, res, next) {
  generator.generate_files();
  res.render('student_information', {page_name: 'student_information'});
});

router.get('/combine_charts', function(req, res, next) {
  generator.generate_files();
  res.render('combine_charts', {page_name: 'combine_charts'});
});

router.get('/documentation', function(req, res, next) {
  generator.generate_files();
  res.render('documentation', {page_name: 'documentation'});
});

router.post('/hplabs/submit_single/', (req,res) => {
  let filename = req.body.filename + '.txt';
  let result = {};
  console.log(generator.get_chart_data(filename));
  var chart_data = chart.generate_chart(generator.get_chart_data(filename));
  if (chart_data == ""){

    result = {exists : false, name: filename};
  }else{
    result = {exists: true, data : chart_data, name : filename};
  }
  res.json(result);

});

router.post('/hplabs/submit_compare/', (req,res) => {
  let filename1 = req.body.filename1 + '.txt';
  let filename2 = req.body.filename2 + '.txt';
  let result = {};
  console.log(filename1);
  var combined_data = generator.get_combined_chart(filename1, filename2);
  var chart_data = chart.generate_chart(combined_data);
  if (chart_data == ""){
    result = {exists : false, name: filename1};
  }else{
    result = {exists: true, data : chart_data, name : filename1 + " & " + filename2 };
  }
  res.json(result);

});
