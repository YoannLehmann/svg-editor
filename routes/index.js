var express = require('express');
var router = express.Router();
//var SVGElementModel = require('../models/SVGElement.model');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Éditeur SVG',
    description: 'This is a nice description of the editor!' ,
    canvasWidth: '1000',
    canvasHeight: '800'
  });
});

router.get('/svg', function(req, res, next){
  console.log("SVG TEST");
});

module.exports = router;
