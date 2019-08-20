import React, { Component } from 'react';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

class AgentsTable extends Component {
  state = {
    agents: [],
  };

  handleDelete = id => {
    console.log(id);
    ipc.send('agents:delete', id);
    ipc.send('agents:get-all');
  };

  componentDidMount() {
    ipc.send('agents:get-all');
    ipc.on('agents:sent-all', (event, data) => {
      this.setState({ agents: data });
      console.log(this.state.agents);
    });
  }

  componentWillUnmount() {
    ipc.removeListener('agents:sent-all', this.handleSitesSuccess);
  }

  render() {
    const rows = this.state.agents.map(agent => {
      return (
        <tr key={agent.agent_id}>
          <td>{agent.name}</td>
          <td>{agent.surname}</td>
          <td>{agent.monthly_hours}</td>
          <td>{agent.visa_expiration}</td>
          <td>{agent.never_on}</td>
          <td>{agent.agent_notes}</td>
          <td className="has-text-centered">
            <button
              className="delete icon-custom"
              onClick={() => this.handleDelete(agent.agent_id)}
            ></button>
          </td>
        </tr>
      );
    });

    return (
      <table className="table is-striped is-hoverable is-centered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Hours this month</th>
            <th>Visa expiration date</th>
            <th>Never available on</th>
            <th>Notes</th>
            <th className="has-text-centered">Delete</th>
          </tr>
        </thead>
        <tbody id="agents-list">{rows}</tbody>
      </table>
    );
  }
}

export default AgentsTable;
