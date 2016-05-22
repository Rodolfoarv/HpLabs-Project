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
  var generated_chart = chart.generate_chart(generator.get_chart_data("9.txt"));
  res.render('index', { title: 'Express',
                        chart: generated_chart});
});


router.post('/hplabs/', (req,res) => {
  let filename = req.body.filename;
  let result = {exists: true};
  res.json(result);

});
