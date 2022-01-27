import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Game from './Game.jsx';

const Detail = ({ detail }) => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    axios.get('/steamDetail', {
      params: {
        name: detail
      }
    })
    .then((res) => {
      var data = res.data[Object.keys(res.data)[0]];
      setGame(data.data);
    })
    .catch((err) => {
      console.log(err);
    })

  }, [detail])

  return (
    <div className="detail">
      {game? <Game data={game}/>: null}
    </div>
  )
};

export default Detail;