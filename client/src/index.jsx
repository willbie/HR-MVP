import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Auto from './auto.jsx'
import SteamTimer from './SteamTimer.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steamTimer:false,
      XGPPrice:false
    }
  }

  steamTimerOnclick () {
    this.state.steamTimer? this.setState({
      steamTimer:false
    }): this.setState({
      steamTimer:true
    });
  }

  XGPPriceOnclick () {
    this.state.XGPPrice? this.setState({
      XGPPrice:false
    }) : this.setState({
      XGPPrice:true
    })
  }

  render() {
    return (
      <div className="App">
      <div id="leftHalf"></div>
      <div id="rightHalf"></div>
        <div className="title"><span id="steam-title" onClick={this.steamTimerOnclick.bind(this)}>Steam</span> <span id="XGP-title" onClick={this.XGPPriceOnclick.bind(this)}>XGP</span></div>
        {/* {this.state.steamTimer? <SteamTimer /> : null}
        {this.state.XGPPrice? <div id="xgp-price">$9.99 per month for PC</div>:null} */}
        <Auto />
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('app'));