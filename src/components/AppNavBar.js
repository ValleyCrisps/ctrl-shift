import React, { Component } from "react";

class AppNavBar extends Component {
  state = {
    isActive: false
  };

  toggleNav = () => {
    this.setState(prevState => ({ isActive: !prevState.isActive }));
  };

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="./index.html">
            logo
          </a>
          <button
            className="button navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar"
            onClick={this.toggleNav}
          >
            <span aria-hidden="true" /> <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        <div
          id="navbar"
          className={
            this.state.isActive ? "navbar-menu is-active" : "navbar-menu"
          }
        >
          <div className="navbar-start">
            <a className="navbar-item is-active" href="./index.html">
              Calendar
            </a>
            <a className="navbar-item" href="./agents.html">
              Agents
            </a>
            <a className="navbar-item" href="./shifts.html">
              Shifts
            </a>
            <a className="navbar-item" href="./availabilities.html">
              Availabilities
            </a>
          </div>
          <div className="navbar-end" />
        </div>
      </nav>
    );
  }
}

export default AppNavBar;
