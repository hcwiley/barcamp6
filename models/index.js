var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/barcamp6');

module.exports = {
    Tweet    : require('./tweet')
  , Settings : require('./settings')
};
