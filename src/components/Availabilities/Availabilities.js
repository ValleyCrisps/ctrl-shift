import React, { Component } from 'react';

import AddAvailability from './AddAvailability';
import AvailabilitiesTable from './AvailabilitiesTable';

class Agents extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1 className="title has-text-centered">Availabilities</h1>

        <AddAvailability />

        <div className="columns is-centered">
          <div className="column">
            <AvailabilitiesTable />
          </div>
        </div>
      </div>
    );
  }
}

export default Agents;
