var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Insertion_Order = new Schema (
  {
    full_name: {type: String},
    advisor: {type: Schema.Types.ObjectId, ref: 'Advisor'},
    // location = {type: Schema.ObjectId, ref: 'Location', required: true},
    iorder_id: {type: String, unique: true},
    // campaign_id: {type: Schema.ObjectId, ref: 'Campaign'},
    // live_date = {type: Date},
    // months = {type: Number},
    // purchased_impressions = {type: Number},
    // pr_code = {type: String}
    line_items: [{type: Schema.Types.ObjectId, ref: 'Line_Item', sparse: true}]
  }
);

module.exports = mongoose.model('Insertion_Order', Insertion_Order);

// REGION insted of location?