const axios = require('axios');
const db = require('../../database/index.js');

const updateSteam = async () => {
  let api = "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json"
  axios.get(api)
  .then((response) => {
    var data = response.data.applist.apps;
    db.Steam.remove()
    .catch((err) => {
      console.log(err);
    });
    for (var i = 0; i < data.length; i++) {
      var currentApp = data[i];
      let steamApp = new db.Steam({
        appid: currentApp.appid,
        name: currentApp.name,
        header_image:""
      })
      steamApp.save()
      .catch((err) => {
        console.log(err);
      })
    }
  })
  .catch((err) => {
    console.log(err);
  })
};

const updateXPG = async () => {
  let listAPI = "https://catalog.gamepass.com/sigls/v2?id=29a81209-df6f-41fd-a528-2ae6b91f719c&language=en-us&market=US";
  let individualAPI = "https://catalog.gamepass.com/products?market=US&language=en-US&hydration=MobileDetailsForConsole";
  axios.get(listAPI)
  .then((response) => {
    var data = response.data;
    var listedAppId = [];
    for (var i = 1; i < data.length; i++) {
      listedAppId.push(data[i].id)
    };
    let body = {
      Products:listedAppId
    };
    let newBody = JSON.stringify(body);
    axios.post(individualAPI, newBody)
    .then((res) => {
      db.XGP.remove()
      .catch((err) => {
        console.log(err)
      });
      let data = res.data.Products;
      for (var key in data) {
        let newXPGAPP = new db.XGP ({
          name: data[key].ProductTitle,
          id:key
        })
        newXPGAPP.save()
        .catch((err)=> {
          console.log(err);
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  })
  .catch((err) => {
    console.log(err);
  })
}


module.exports.updateSteam = updateSteam;
module.exports.updateXPG = updateXPG;
