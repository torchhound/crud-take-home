import React, { Component } from 'react';
import Users from './Users';
import Articles from './Articles';

class App extends Component {
  render() {
    return (
      <div className="App uk-container uk-vertical-align">
        <Users/>
        <Articles/>
      </div>
    );
  }
}

export default App;
