var mongoose = require('mongoose');

var advisor = require('../models/Advisor');
// var campaign = require('./models/Campaign')
// var insertion_order = require('./models/insertion_order')
// var line_item = require('./models/line_item')
var monthly_stat = require('../models/monthly_stat');

var mongoDB = 'mongodb+srv://brianoconnell:lookup@cluster0-u02yz.mongodb.net/FebMonthData?retryWrites=true';
mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true });

// a list of all advisors names

// advisor.
//   find({}, 'full_name -_id').
//   // select('full_name').
//   exec(function (err, doc){
//     console.log(doc)
//   })

// advisor.find({}).populate('campaign')
//   .exec(function (err, doc){
//     console.log(doc[0].campaign.full_name)
//   })

// monthly_stat
//   .aggregate([
//     {
//     $group: {
//       // _id: {advisor: '$advisor'},
//       _id: '$advisor',
//       impressionsTotal: {$sum: '$impressions'},
//       clicksTotal: {$sum: '$clicks'}
//       }
//     }
//   ])
//   .exec(function (err, doc) {
//     console.log(doc)
//   })

monthly_stat
  .aggregate([
    {
    $group: {
      // _id: {advisor: '$advisor'},
      _id: '$advisor',
      impressionsTotal: {$sum: '$impressions'},
      clicksTotal: {$sum: '$clicks'}
      }
    }
  ])
  .exec(function (err, doc) {
      advisor.populate(doc, {path: '_id', select: 'full_name'}, function (err, doc2) {
        console.log(doc2)
      }) 
  })

