import React, { Component } from 'react';

import AddShift from './AddShift';
import ShiftsTable from './ShiftsTable';

class Agents extends Component {
  state = {};

  render() {
    return (
      <div className="container">
        <h1 className="title has-text-centered">Shifts</h1>

        <AddShift />

        <div className="columns is-centered">
          <div className="column">
            <ShiftsTable />
          </div>
        </div>
      </div>
    );
  }
}

export default Agents;
