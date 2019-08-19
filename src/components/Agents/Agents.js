import React, { Component } from 'react';

import AgentsTable from './AgentsTable';

class Agents extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1 class="title has-text-centered">Agents</h1>
        <section class="container">
          <button id="add-button" class="button is-info">
            Add a new agent
          </button>
        </section>

        <section class="section">
          <div class="container">
            <div class="columns is-centered">
              <div class="column">
                <AgentsTable />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Agents;
