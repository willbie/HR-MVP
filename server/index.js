const express = require('express');
const app = express();
const update = require('./midware/updateSteam.js');
const getSteam = require('./midware/getGameList.js');
const getSteamDetail = require('./midware/getGameDetail.js');
const getOnXGP = require('./midware/getOnXGP.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

let port = 3000;

app.get('/updatesteam', (req, res) => {
  update.updateSteam();
  res.send('Success!')
})

app.get('/updatexgp', (req, res) => {
  update.updateXPG();
  res.send('Success!')
})

app.get('/steam', (req, res) => {
  getSteam.getSteamAppList(req, res);
})

app.get('/steamimage', (req, res) => {
  getSteam.getSteamImage(req, res);
})

app.get('/onxgp', (req, res) => {
  getOnXGP(req, res);
})

app.get('/steamDetail', (req, res) => {
  getSteamDetail(req, res);
})

app.get('/steamtimer', (req, res) => {
  var day1 = new Date();
  var day2 = new Date("2/21/2022");
  var difference = day2.getTime()-day1.getTime();
  res.send(String(difference));
})

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});