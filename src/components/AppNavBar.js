import React, { Component } from 'react';

class AppNavBar extends Component {
  state = {
    isActive: false,
  };

  toggleNav = () => {
    this.setState(prevState => ({ isActive: !prevState.isActive }));
  };

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="./">
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
            this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'
          }
        >
          <div className="navbar-start">
            <a className="navbar-item is-active" href="./">
              Calendar
            </a>
            <a className="navbar-item" href="./shifts">
              Shifts
            </a>
            <a className="navbar-item" href="./availabilities">
              Availabilities
            </a>
            <a className="navbar-item" href="./agents">
              Agents
            </a>
          </div>
          <div className="navbar-end" />
        </div>
      </nav>
    );
  }
}

export default AppNavBar;
