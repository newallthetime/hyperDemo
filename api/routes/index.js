var express = require('express');
var router = express.Router();

var book_controller = require('../controllers/book_controller'); 
var advisor_controller = require('../controllers/advisor_controller');

const Books = require('../models/book')
const advisor = require('../models/advisor')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get('/', advisor_controller.monthly_stat)

router.get('/', advisor_controller.monthly_stat2);

router.post('/create', advisor_controller.post_campaign_test);

router.get('/create', function (req, res, next) {
  res.send('this is the create campaign url');
});

router.get('/campaigns', advisor_controller.get_campaigns);
//router.get('/', function(req, res, next) {
//  Books.find(function (err, books) {
//    if(err){
//      console.log(err);
//    }
//    else {
//      res.json(books);
//    }
//  });
//});

router.get('/testAPI', function(req, res, next) {
  res.send('API is working properly');
});

module.exports = router;
