import React, { Component } from 'react';

class CalendarNav extends Component {
  state = {};

  handleClick = event => {
    this.props.sendButtonState(true);
    this.updateDate(event);
  };

  updateDate = event => {
    const date = new Date(this.props.date);
    this.props.sendDate(date.add(parseInt(event.target.value)).day());
  };

  goToToday = () => {
    this.props.sendButtonState(true);
    const today = new Date();
    this.props.sendDate(today);
  };

  render() {
    return (
      <div className="navigation">
        <div className="buttons has-addons is-right">
          <button
            id="prev"
            className="button is-outlined is-info"
            onClick={this.handleClick}
            value="-7"
          >
            Prev
          </button>
          <button
            id="today"
            className="button is-outlined is-info"
            onClick={this.goToToday}
          >
            Today
          </button>
          <button
            id="next"
            className="button is-outlined is-info"
            onClick={this.handleClick}
            value="7"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default CalendarNav;
