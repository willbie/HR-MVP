const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const steamSchema = mongoose.Schema({
  appid:Number,
  name:String,
  header_image:String
});

const Steam = mongoose.model('Steam', steamSchema);

const xgpSchema = mongoose.Schema({
  name:String
})

const XPG =mongoose.model('XPG', xgpSchema);

module.exports.Steam = Steam;
module.exports.XPG = XPG;