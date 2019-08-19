import React, { Component } from 'react';

class Agents extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1 class="title has-text-centered">Availabilities</h1>
        <section class="container">
          <button id="save-availabilities" class="button is-info">
            Save availabilities
          </button>
        </section>

        <section class="section">
          <div class="container">
            <div class="columns is-centered">
              <div id="availabilities"></div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Agents;
