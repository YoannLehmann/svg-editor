var express = require('express');
var router = express.Router();
var SVGElementModel = require('../models/SVGElement.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'SVG Editor',
    description: 'This is a nice description of the editor!' 
  });
});

module.exports = router;
