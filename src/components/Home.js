import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AppNavBar from './AppNavBar';
import Calendar from './Calendar';

class Home extends Component {
  state = {};

  render() {
    return (
      <div className="App">
        <AppNavBar />

        <div className="container">
          <button id="save-assigned" className="button save is-info">
            Save
          </button>
          <div className="navigation">
            <button id="prev" className="button is-info" />
            <button id="today" className="button is-info">
              Today
            </button>
            <button id="next" className="button is-info" />
          </div>

          <Calendar />
        </div>
      </div>
    );
  }
}

export default Home;
