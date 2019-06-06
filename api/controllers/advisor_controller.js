var monthly_stat = require('../models/monthly_stat');
var advisor = require('../models/advisor');
var campaign_test = require('../models/campaign_test');

exports.monthly_stat = function (req, res, next) {

  monthly_stat
    .aggregate([
      {
      $group: {
        _id: '$advisor',
        impressionsTotal: {$sum: '$impressions'},
        clicksTotal: {$sum: '$clicks'}
        }
      }
    ])
    .exec(function (err, doc) {
      if (err) { return next(err) }
      res.json(doc);
    });
}

exports.monthly_stat2 = function (req, res, next) {

  monthly_stat
    .aggregate([
      {
      $group: {
        _id: '$advisor',
        impressionsTotal: {$sum: '$impressions'},
        clicksTotal: {$sum: '$clicks'}
        }
      }
    ])
    .exec(function (err, doc) {
      if (err) {return next(err)}
      advisor.populate(doc, {path: '_id', select: 'full_name'}, function (err, doc2) {
        if (err) { return next(err) }
        res.json(doc2);
      }) 
    });
}

exports.post_campaign_test = function (req, res, next) {

  const campaign_test_form = new campaign_test(req.body)

  campaign_test_form.save(function (err) {
    if (err) { res.send(err) }
    else { res.send('Campaign Created')};
  });

}

exports.get_campaigns = function (req, res, next) {
  campaign_test.find({})
  .exec(function (err, doc) {
    if (err) {return next(err)}
    res.json(doc)
  })
}