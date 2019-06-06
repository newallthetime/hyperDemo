var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Campaign = new Schema (
  {
  full_name: {type: String, unique: true},
  campaign_id: {type: String, unique: true},
  advisors: [{type: Schema.Types.ObjectId, sparse: true, ref: 'Advisor'}]
  }
);

module.exports = mongoose.model('Campaign', Campaign);