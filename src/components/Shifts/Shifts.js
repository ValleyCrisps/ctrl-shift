import React, { Component } from 'react';

import ShiftsTable from './ShiftsTable';

class Agents extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1 className="title has-text-centered">Shifts</h1>
        <section className="container">
          <button id="add-shift-button" className="button is-info">
            Add new shift
          </button>
        </section>

        <section className="section">
          <div className="container">
            <div className="columns is-centered">
              <div className="column">
                <ShiftsTable />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Agents;
