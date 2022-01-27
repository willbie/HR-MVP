const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const steamSchema = mongoose.Schema({
  appid:Number,
  name:String,
  header_image:String
});

const Steam = mongoose.model('Steam', steamSchema);

const xgpSchema = mongoose.Schema({
  name:String,
  id:String
})

const XGP = mongoose.model('XGP', xgpSchema);

module.exports.Steam = Steam;
module.exports.XGP = XGP;