import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Detail from './Detail.jsx';

const Auto = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [detailInfo, setdetailInfo] = useState("");
  const wrapperRef = useRef(null);

  useEffect(()=> {
    axios.get("http://localhost:3000/steam")
    .then((res) => {
      setOptions(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updateGameDex = Game => {
    setSearch(Game);
    setDisplay(false);
    setdetailInfo(Game);
  };

  const getHeaderImage = appid => {
    axios.get('http://localhost:3000/steamimage', {
      params: {
        id:appid
      }
    })
    .then((res)=> {
      var myImg = document.getElementById(appid);
      myImg.src = res.data;
    })
    .catch((err) => {
      console.log(err);
    })

  }

  return (
    <div className="container">
      <div className="search">
        <input
          id="auto"
          onClick={() => setDisplay(!display)}
          placeholder="To be honest, nobody plays PC game now, right?"
          onChange={event => setSearch(event.target.value)}
        /><button onClick={() => updateGameDex(search)} id="search-button">search</button>
        {display && (
          <div className="autoContainer">
            {options
              .filter((game) => game.name.indexOf(search) > -1)
              .slice(0, 10)
              .map((game) => {
                return (
                  <div
                    onClick={() => updateGameDex(game.name)}
                    className="option"
                    tabIndex="0"
                  >
                    {getHeaderImage(game.appid)}
                    {<img className="auto-image" id={game.appid}/>}
                    <span>{game.name}</span>
                  </div>
                )
              })
            }
          </div>
        )}


      </div>
      <Detail detail={detailInfo}/>
    </div>
  )
}

export default Auto;