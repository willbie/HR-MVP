const db = require('../../database/index.js');
const axios = require('axios');

const getSteamAppList = (req, res) => {
  db.Steam.find({}, {_id:0, name:1, appid:1})
  .then((result) => {
    // var data = [];
    // for (var i = 4; i < result.length; i++) {
    //   data.push(result[i].name);
    // }
    let data = result.slice(14, -1);
    res.send(data);
    // console.log(data);
    }
  )
  .catch((err) => {
    console.log(err);
  })
}

const getSteamImage = (req, res) => {
  var id = req.query.id;
  var invalidImage = "https://catalog.gamepass.com/sigls/v2?id=fdd9e2a7-0fee-49f6-ad69-4354098401ff&language=en-us&market=US";
  db.Steam.find({"appid":id})
  .then((result) => {
    if (result[0].header_image.length === 0) {
      axios.get('http://store.steampowered.com/api/appdetails', {
        params: {
          appids: id
        }
      })
      .then((response) => {
        if (response.data) {
          var data = response.data[Object.keys(response.data)[0]];
          if (data.data !== undefined) {
            res.send(data.data.header_image)
            db.Steam.updateOne({"appid":id}, {"$set" : {"header_image":data.data.header_image}})
            .catch((err) => {
              console.log(err);
            })
          } else {
            res.send(invalidImage);
            db.Steam.updateOne({"appid":id}, {$set : {"header_image":invalidImage}})
            .catch((err) => {
              console.log(err);
            })
          }
        } else {
          res.send(invalidImage);
          db.Steam.updateOne({"appid":id}, {$set : {"header_image":invalidImage}})
          .catch((err) => {
            console.log(err);
          })
        }
      })
      .catch((err)=> {
        console.log(err);
      })
    } else {
      res.send(result[0].header_image)
    }
  });


}

module.exports.getSteamAppList = getSteamAppList;
module.exports.getSteamImage = getSteamImage;