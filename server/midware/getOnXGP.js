const Steam = require('../../database/index.js');
const XPG = require('../../database/index.js');

const getOnXGP = (req, res) => {
  var gamename = req.query.name;
  XPG.XPG.find({
    'name': new RegExp(gamename)
  })
  .then((result) => {
    if (result.length === 0) {
      var data = false;
      res.send(data);
    } else {
      res.send(true);
    }
  })
}

module.exports = getOnXGP;