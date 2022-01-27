import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Gallery from './gallery.jsx';

const Game = ({ data }) => {
  const [onXGP, setOnXGP] = useState( { result: false, id:"", name:""} );
  const [photos, setPhotos] = useState([]);

  useEffect(() =>{
    axios.get("http://localhost:3000/onxgp", {
      params: {
        name:data.name
      }
    })
    .then((res) => {
      var result = res.data
      setOnXGP(result);
    })
  }, [data])

  useEffect(() => {
    var screenshots = data.screenshots
    var newPhotos = [];
    screenshots.forEach((photo) => {
      var each = {
        image: photo.path_full
      }
      newPhotos.push(each);
    });
    setPhotos(newPhotos);
  }, [data])

  return (
    <div className="gamegrid" style={{"backgroundImage":`url(${data.background})`}}>
      <div className="steaminfo">
        <a href={"https://store.steampowered.com/app/" + data.steam_appid}><img src={data.header_image}></img></a>
        <h2 className="game-name">{data.name}</h2>
        <div className="detailinfo">Price: {data.is_free? "FREE" : data.price_overview? data.price_overview.final_formatted: "N/A"}</div>
        <a className="detailinfo" href={"https://steamdb.info/app/" + data.steam_appid}>Check History Low</a>
        <a className="detailinfo metacritic" href={data.metacritic? data.metacritic.url:null}>Metacritic: {data.metacritic? data.metacritic.score: "N/A"}</a>
        <div className="detailinfo">Publisher: {data.publishers[0]}</div>
        <div className="detailinfo">Platforms: {data.platforms.windows? <i class="fa fa-windows"> Windows</i> :null} {data.platforms.mac? <i class="fa fa-apple"> macOS</i>:null} {data.platforms.linux? <i class="fa fa-linux"> Linux</i>:null}</div>
        <div class="ui labeled button" tabindex="0">
        <div class="ui red button">
          <i class="heart icon"></i> Like
        </div>
          <a class="ui basic red left pointing label">
            {data.recommendations? data.recommendations.total:null}
          </a>
        </div>
      </div>
      <div className="xboxgamepass">
        {onXGP.result? <a href={"https://www.xbox.com/en-us/games/store/" + onXGP.name.toLowerCase().split(' ').join('-') + "/" + onXGP.id}><img className="xpgimage" src="https://www.apkmirror.com/wp-content/uploads/2021/06/42/60da2e3cbdb0d.png"/></a>:null}
      </div>
      <div className="description">
        <div className="gallery">
        {photos.length !== 0? <Gallery photos={photos}/>:null}
      </div>
      <div className="detail-description">
        <td dangerouslySetInnerHTML={{__html: data.detailed_description}} />
      </div>
      </div>
    </div>
  )
};

export default Game;