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
    <div className="count-down">
      <div>The next Steam sale is on Feb 21, 2022</div>
      <Countdown date={Date.now() + Number(time)} renderer={renderer}/>
    </div>
  )
}

export default SteamTimer;