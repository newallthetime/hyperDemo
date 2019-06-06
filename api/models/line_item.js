var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Line_Item = new Schema (
  {
  full_name: {type: String},
  line_item_id: {type: String, unique: true},
  insertion_order: {type: Schema.Types.ObjectId, ref: 'Insertion_Order'},
  monthly_stats: [{type: Schema.Types.ObjectId, ref: 'Monthly_Stat', sparse: true}]
  }
);

module.exports = mongoose.model('Line_Item', Line_Item);