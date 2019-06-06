var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Monthly_Stat = new Schema (
  {
  // line_item: {type: Schema.Types.ObjectId, ref: 'Line_item'},
  // ms_id: {type: String},
  advisor: {type: Schema.Types.ObjectId, ref: 'Advisor'},
  campaign: {type: Schema.Types.ObjectId, ref: 'Campaign'},
  segment: {type: String},
  impressions: {type: Number},
  city: {type: String},
  state: {type: String},
  clicks: {type: Number},
  site_url: {type: String},
  year: {type: Number},
  month: {type: Number},
  creative: {type: String}
  }
);

module.exports = mongoose.model('Monthly_Stat', Monthly_Stat);