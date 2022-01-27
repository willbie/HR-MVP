const db = require('../../database/index.js');

const getOnXGP = (req, res) => {
  var gamename = req.query.name;
  db.XGP.find({
    'name': new RegExp(gamename)
  })
  .then((result) => {
    if (result.length === 0) {
      var data = {};
      data.result = false;
      data.id = "";
      data.name = "";
      res.send(data);
    } else {
      var data = {};
      data.result = true;
      data.name = result[0].name;
      data.id = result[0].id;
      res.send(data);
    }
  })
}

module.exports = getOnXGP;