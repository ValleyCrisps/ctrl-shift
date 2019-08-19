import React, { Component } from 'react';

import CalendarNav from './CalendarNav';
import Calendar from './Calendar';

class Home extends Component {
  state = {
    date: new Date().toString('yyyy-MM-dd'),
    buttonPressed: false,
  };

  getDate = date => {
    this.setState({ date: date });
  };

  getButtonState = (state) =>
    this.setState({ buttonPressed: state });

  render() {
    return (
      <div className="App">
        <h1 className="title has-text-centered">Calendar</h1>
        <div className="container">
          <button id="save-assigned" className="button save is-info">
            Save
          </button>
          <CalendarNav
            date={this.state.date}
            sendDate={this.getDate}
            sendButtonState={this.getButtonState}
          />
          <Calendar
            date={this.state.date}
            buttonPressed={this.state.buttonPressed}
            sendButtonState={this.getButtonState}
          />
        </div>
      </div>
    );
  }
}

export default Home;
