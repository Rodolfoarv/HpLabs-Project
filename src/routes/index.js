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
  res.render('index', { title: 'Express'
                        });
});


router.post('/hplabs/', (req,res) => {
  let filename = req.body.filename;
  let result = {};
  var chart_data = chart.generate_chart(generator.get_chart_data(filename));
  if (chart_data == ""){
    result = {exists : false, name: filename};
  }else{
    result = {exists: true, data : chart_data, name : filename};
  }
  res.json(result);

});
