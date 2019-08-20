import React, { Component } from 'react';

import AddAgent from './AddAgent';
import AgentsTable from './AgentsTable';

class Agents extends Component {
  state = {};

  render() {
    return (
      <div className="container">
        <h1 className="title has-text-centered">Agents</h1>

        <AddAgent />

        <div className="columns is-centered">
          <div className="column">
            <AgentsTable />
          </div>
        </div>
      </div>
    );
  }
}

export default Agents;
