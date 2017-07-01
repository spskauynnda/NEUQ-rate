import React, {Component} from 'react';

import "whatwg-fetch";
import "fetch-ie8/fetch.js";

require('console-polyfill');
require('es6-promise');

import Login from './login'
import List from './list'

import './app.less'
class App extends Component {
  state = {
    isLogin : window.localStorage.getItem('is_login') || 0
  }
  render() {
    return (
      <div className="App">
        { this.state.isLogin === 0 ? <Login /> : <List/> }
      </div>
    )
  }
}

export default App;