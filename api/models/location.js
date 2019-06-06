var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Location = new Schema (
  {
  state: {type: Schema.ObjectId, ref: 'State'},
  city: {type: Schema.ObjectId, ref: 'City', unique: true}
  }
);

module.exports = mongoose.model('Location', Location);