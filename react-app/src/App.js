import React, { Component } from 'react';
import {NavLink, Route} from 'react-router-dom';

import Login from './Login.js';
import SignUp from './SignUp.js';
import Jokes from './Jokes.js';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div className="nav">
          <NavLink to="/jokes">Jokes</NavLink>
          <NavLink to="/sign-up">Sign Up</NavLink>
          <NavLink to="/login">Login</NavLink>
          <button onClick={this.logOut} >Logout</button>
          </div>
        </header>

        <main>
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/jokes" component={Jokes} />
        </main>
      </div>
    );
  }
  logOut = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    console.log('logged out');
  }
}

export default App;
