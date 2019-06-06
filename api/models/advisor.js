var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var Advisor = new Schema (
  {
  full_name: {type: String, required: true},
  msid: {type: String, required: true, unique: true},
  campaign: {type: Schema.Types.ObjectId, ref: 'Campaign'}, 
  insertion_orders: [{type: Schema.Types.ObjectId, ref: 'Insertion_Order'}]
  }
);

// Advisor.plugin(uniqueValidator);

module.exports = mongoose.model('Advisor', Advisor);


// var advisor = mongoose.model('Advisor', Advisor);


