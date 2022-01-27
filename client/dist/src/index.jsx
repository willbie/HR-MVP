import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <h2>TEST</h2>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));