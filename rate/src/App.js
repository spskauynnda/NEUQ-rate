import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch'
import LoginForm from './components/user/login'

require('es6-promise')

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginForm />
      </div>
    );
  }
}

export default App;
