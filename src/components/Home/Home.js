import React, { Component } from 'react';

import CalendarNav from './CalendarNav';
import Calendar from './Calendar';

class Home extends Component {
  state = {
    date: new Date().toString('yyyy-MM-dd'),
  };

  getDate = date => {
    this.setState({ date: date });
  };

  render() {
    return (
      <div className="App">
        <h1 className="title has-text-centered">Calendar</h1>
        <div className="container">
          <button id="save-assigned" className="button save is-info">
            Save
          </button>
          <CalendarNav date={this.state.date} sendDate={this.getDate} />
          <Calendar date={this.state.date} />
        </div>
      </div>
    );
  }
}

export default Home;
