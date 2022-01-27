const db = require('../../database/index.js');
const axios = require('axios');

const getSteamDetail = (req, res) => {
  var gamename = req.query.name;
  db.Steam.find({
    'name': gamename
  })
  .then((result) => {
    axios.get('http://store.steampowered.com/api/appdetails', {
      params: {
        appids: result[0].appid
      }
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err)=> {
      console.log(err);
    })
  })
  .catch((err) => {
    console.log(err);
  })

}

module.exports = getSteamDetail;