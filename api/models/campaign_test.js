var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Campaign_Test = new Schema (
  {
    name: {type: String},
    startMonth: {type: String},
    endMonth: {type: String},
    budget: {type: String},
    landingPage: {type: String},
    zipCode: {type: Number},
    segments: []
  }  
);

module.exports = mongoose.model('Campaign_Test', Campaign_Test);