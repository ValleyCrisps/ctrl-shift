import React, { Component } from 'react';

class CalendarNav extends Component {
  state = {};

  updateDate = event => {
    const date = new Date(this.props.date);
    this.props.sendDate(date.add(parseInt(event.target.value)).day());
  };

  goToToday = () => {
    const today = new Date();
    this.props.sendDate(today);
  };

  render() {
    return (
      <div className="navigation is-right">
        <button
          id="prev"
          className="button is-info"
          onClick={this.updateDate}
          value="-7"
        >
          Prev
        </button>
        <button id="today" className="button is-info" onClick={this.goToToday}>
          Today
        </button>
        <button
          id="next"
          className="button is-info"
          onClick={this.updateDate}
          value="7"
        >
          Next
        </button>
      </div>
    );
  }
}

export default CalendarNav;
