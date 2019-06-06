var async = require('async');
var mongoose = require('mongoose');

var advisor = require('./models/Advisor')
var campaign = require('./models/Campaign')
var insertion_order = require('./models/insertion_order')
var line_item = require('./models/line_item')
var monthly_stat = require('./models/monthly_stat')

var helper = require('./helper_functions')


var LineByLineReader = require('line-by-line'),
    // lr = new LineByLineReader('./test_csv.csv');
    lr = new LineByLineReader('./February_data2.csv');
  

// var mongoDB = 'mongodb+srv://brianoconnell:lookup@cluster0-u02yz.mongodb.net/csv_test?retryWrites=true';
var mongoDB = 'mongodb+srv://brianoconnell:lookup@cluster0-u02yz.mongodb.net/FebMonthData?retryWrites=true';
mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true });

var linenum = 0
lr.on("line", function(line) {
  if (linenum == 0) {
    linenum += 1
  } else {
    linenum +=1
    lr.pause()
    console.log("LINE" + linenum)

    var sline = line.split(',');

    var csv_campaign = new campaign ({
            full_name: sline[5],
            campaign_id: sline[6]
          });

    var helper_list = helper.getSegmentsLocations(sline[11], sline[19])

    let campid;
    let advid;

    function save_campaign() {
      return new Promise(function (resolve) {
        csv_campaign.save(function (err) {
          // if (err) {resolve(console.log(err.errmsg))}
          // if (!err) {resolve(console.log('campaign saved'))}
          resolve()
        })
      })
    }

    function find_campaign_id() {
      return new Promise(function (resolve, reject){
        campaign.findOne({full_name: sline[5]}, function (err, doc){
          if (err) {resolve(console.log(err))}
          campid = doc._id
          resolve()
          // resolve(console.log(campid))
        })
      })
    }

    function save_advisor(campaign_id) {
      return new Promise(function (resolve, reject){
        var csv_advisor = new advisor ({
          full_name: sline[7].split('_')[3], 
          msid: sline[7].split('_')[1],
          campaign: campaign_id
        })
        csv_advisor.save(function (err) {
          // if (err) {resolve(console.log(err.errmsg))}
          // if (!err) {resolve(console.log("advisor saved"))}
          resolve()
        })
      })
    }

    function find_advisor_id() {
      return new Promise(function (resolve, reject){
        advisor.findOne({msid: sline[7].split('_')[1]}, function (err, doc) {
          // if (err) {resolve(console.log(err.errmsg))}
          advid = doc._id
          // resolve(console.log(advid))
          resolve()
        })
      })
    }

    function save_monthly_stat(advisorid, campaignid) {
      return new Promise(function (resolve, reject){
        var csv_monthly_stat = new monthly_stat ({
          advisor: advisorid,
          campaign: campaignid,
          segment: helper_list[0],
          impressions: sline[20],
          city: helper_list[1],
          state: helper_list[2],
          clicks: sline[21],
          site_url: sline[16],
          year: sline[0].split('/')[0],
          month: sline[0].split('/')[1],
          creative: sline[19]
          })
        csv_monthly_stat.save(function (err){
          // if (err) {resolve(console.log(err.errmsg))}
          // if (!err) {resolve(console.log("monthly stat saved"))} 
          resolve()
        }) 
      })
    }

    function resume () {
      return new Promise(function (resolve, reject) {
        resolve(lr.resume())
      })
    }

    async function main() {
      await save_campaign()
      await find_campaign_id()
      await save_advisor(campid)
      await find_advisor_id()
      await save_monthly_stat(advid, campid)
      await resume()
    }
    
    main()
  }
});




// process.on('unhandledRejection', (reason) => {
//   console.log('Something Exists')
// })