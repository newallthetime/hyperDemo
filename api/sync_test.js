var async = require('async');
var mongoose = require('mongoose');

var advisor = require('./models/Advisor')
var campaign = require('./models/Campaign')
var insertion_order = require('./models/insertion_order')
var line_item = require('./models/line_item')
var monthly_stat = require('./models/monthly_stat')

var helper = require('./helper_functions')


var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('./test_csv.csv');
  

var mongoDB = 'mongodb+srv://brianoconnell:lookup@cluster0-u02yz.mongodb.net/csv_test?retryWrites=true';
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

    csv_campaign.save(function (err) {
      if (err) {console.log(err.errmsg)}
      campaign.findOne({full_name: sline[5]}, function (err, doc) {
        // console.log(doc._id)
        var campid = doc._id
        var csv_advisor = new advisor ({
          full_name: sline[7].split('_')[3], 
          msid: sline[7].split('_')[1],
          campaign: campid
        })
        csv_advisor.save(function (err) {
          if (err) {console.log(err.errmsg)}
          advisor.findOne({full_name: sline[7].split('_')[3]}, function (err, doc) {
            // console.log(doc)
            var advid = doc._id
            campaign.findOne({full_name: sline[5]}, function (err, fcamp, cb) {
              if (err) {console.log(err)}
              var advlist = fcamp.advisors.toString();
              var advstring = advid.toString();
              if (advlist.includes(advstring) !== true) {
                fcamp.advisors.push(advid)
                fcamp.save(cb)
              }
              var csv_io = new insertion_order ({
                full_name: sline[7],
                iorder_id: sline[8],
                advisor: advid
              })
              csv_io.save(function (err) {
                if (err) {console.log(err.errmsg)}
                insertion_order.findOne({iorder_id: sline[8]}, function (err, result){
                  if (err) {console.log(err)}
                  // console.log(result)
                  var io_id = result._id
                  advisor.findOne({full_name: sline[7].split('_')[3]}, function (err, fadv, cb) {
                    if (err) {console.log(err)}
                    var io_list = fadv.insertion_orders.toString();
                    var iostring = io_id.toString();
                    if (io_list.includes(iostring) !== true) {
                      fadv.insertion_orders.push(io_id)
                      fadv.save(cb)
                      }
                      var csv_li = new line_item ({
                        full_name: sline[11],
                        line_item_id: sline[12],
                        insertion_order: io_id
                      })
                      csv_li.save(function (err) {
                        if (err) {console.log(err.errmsg)}
                        line_item.findOne({line_item_id: sline[12]}, function (err, doc2) {
                          if (err) {console.log(err)}
                          // console.log(doc2)
                          var li_id = doc2._id
                          insertion_order.findOne({iorder_id: sline[8]}, function (err, fio, cb) {
                            if (err) {console.log(err)}
                            var li_list = fio.line_items.toString();
                            var listring = li_id.toString();
                            if (li_list.includes(listring) !== true) {
                              fio.line_items.push(li_id)
                              fio.save(cb)
                            }
                            var helper_list = helper.getSegmentsLocations(sline[11], sline[19])
                            // console.log(helper_list)
                            csv_ms_id = sline[0].concat(linenum.toString());
                            var csv_ms = new monthly_stat ({
                              line_item: li_id,
                              ms_id: csv_ms_id,
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
                            csv_ms.save(function (err) {
                              if (err) {console.log(err)}
                              monthly_stat.findOne({ms_id: csv_ms_id}, function (err, doc3) {
                                if (err) {console.log(err)}
                                var monthly_id = doc3._id
                                line_item.findOne({line_item_id: sline[12]}, function (err, fli, cb1, cb2) {
                                  if (err) {console.log(err)}
                                  var ms_list = fli.monthly_stats.toString();
                                  var monthlyidstring = monthly_id.toString();
                                  if (ms_list.includes(monthlyidstring) !== true) {
                                    fli.monthly_stats.push(monthly_id)
                                    fli.save(cb1)
                                    }
                                  lr.resume(cb2);
                                    // campaign.findOne({full_name: "West_Display"}, function (err, doc) {
                                    //   // console.log(doc)
                                    //   lr.resume(cb2)
                                    //   })  
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      });
  }
});




// process.on('unhandledRejection', (reason) => {
//   console.log('Something Exists')
// })