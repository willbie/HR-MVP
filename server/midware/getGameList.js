const db = require('../../database/index.js');
const axios = require('axios');

const getSteamAppList = (req, res) => {
  db.Steam.find({}, {_id:0, name:1, appid:1})
  .then((result) => {
    // var data = [];
    // for (var i = 4; i < result.length; i++) {
    //   data.push(result[i].name);
    // }
    res.send(result.slice(8, -1));
    }
  )
  .catch((err) => {
    console.log(err);
  })
}

const getSteamImage = (req, res) => {
  var id = req.query.id;
  var invalidImage = "https://media.istockphoto.com/vectors/missing-rubber-stamp-vector-vector-id1213374148?k=20&m=1213374148&s=612x612&w=0&h=A3_Ku27Jf_XRfsWCZYvwJWQGNR2hbHDh9ViLLaAdJ5w=";
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