const axios = require('axios');
const Steam = require('../../database/index.js');
const XPG = require('../../database/index.js');

const updateSteam = async () => {
  let api = "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json"
  axios.get(api)
  .then((response) => {
    console.log("updated!")
    var data = response.data.applist.apps;
    Steam.Steam.remove()
    .catch((err) => {
      console.log(err);
    });
    for (var i = 0; i < data.length; i++) {
      var currentApp = data[i];
      let steamApp = new Steam.Steam({
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
      XPG.XPG.remove();
      let data = res.data.Products;
      for (var key in data) {
        let newXPGAPP = new XPG.XPG ({
          name: data[key].ProductTitle
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
