import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">
            <Link to="/">githubstars<sup>&#10026;</sup></Link>
          </h1>
        </header>
        <main className="app-main" role="main">
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default App;
