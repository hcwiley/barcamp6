var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  ;

var SettingsSchema = new Schema({
  twitter: {
    hashtags: [String]
  }
});

SettingsSchema.methods.streamSettings = function () {
  return {
    'track': this.twitter.hashtags.join(',')
  };
};

SettingsSchema.methods.twitterQuery = function () {
  return this.twitter.hashtags.join(' OR ');
};

/**
 * This is a crappy singleton pattern
 */
SettingsSchema.statics.fetch = function (done) {
  var Settings = this;

  Settings.findOne({}, function (err, instance) {
    if (err) return done(err);

    Settings.instance = instance;
    done(null, instance);
  });
};

module.exports = mongoose.model('Settings', SettingsSchema);

