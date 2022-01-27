import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Auto from './auto.jsx'
import SteamTimer from './SteamTimer.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="App">
        <div id="leftHalf"></div>
        <div id="rightHalf"></div>
        <div className="title">Steam XGP</div>
        <SteamTimer />
        <Auto />
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('app'));