var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Segment = new Schema (
  {
  name: {type: String, unique: true},
  line_item: {type: Schema.Types.ObjectId, ref: 'Line_Item'}
  }
);

module.exports = mongoose.model('Segment', Segment);