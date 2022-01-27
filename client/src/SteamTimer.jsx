import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
import axios from 'axios';

// Random component
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <span>{days}:{hours}:{minutes}:{seconds}</span>;
  }
};

const SteamTimer = () => {
  const[time, setTime] = useState("");

  useEffect(()=> {
    axios.get("/steamtimer")
    .then((res) => {
      setTime(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  })

  return (
    <div className="Steam-count-down">
      <span id="steam-count-down-title">Time until next Steam Sale on 2/21/2021</span>
      <div className="count-down">
        <Countdown date={Date.now() + Number(time)} renderer={renderer}/>
      </div>
      <img id="count-down-img" src="https://thumbs.gfycat.com/AromaticRemoteAlbino-size_restricted.gif" />
    </div>

  )
}

export default SteamTimer;