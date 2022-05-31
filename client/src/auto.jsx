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

  const initialData = [{name: "Among Us", appid:945360}, {name: "The Elder Scrolls V: Skyrim", appid:72850}, {name: "Counter-Strike: Global Offensive", appid:730}, {name: "Dota 2", appid:570},{name: "Forza Horizon 5", appid:1551360},{name: "Halo Infinite", appid:1240440}]

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
        <div className="searchBar">
          <input
            id="auto"
            onClick={() => setDisplay(!display)}
            placeholder="Who still plays PC games now days? Do you guys not have phones?"
            onChange={event => setSearch(event.target.value)}
          />

        {/* <button onClick={() => updateGameDex(search)} id="search-button">search</button> */}
        {display && (
          <div className="autoContainer">
            {search? options
              .filter((game) => game.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
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
            : initialData.map((game) => {
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
            })}
          </div>
        )}
        </div>
      </div>

      <Detail detail={detailInfo}/>
    </div>
  )
}

export default Auto;