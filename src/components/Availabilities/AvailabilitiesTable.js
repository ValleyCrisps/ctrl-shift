import React, { Component } from 'react';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

class AvailabilitiesTable extends Component {
  state = {
    av: [],
  };

  // handleDelete = id => {
  //   console.log(id);
  //   ipc.send('agents:delete', id);
  //   ipc.send('agents:get-all');
  // };
  //
  componentDidMount() {
    ipc.send('availabilities:get-all');
    ipc.on('availabilities:sent-all', (event, data) => {
      this.setState({ av: data });
      console.log(this.state.av);
    });
  }

  // componentWillUnmount() {
  //   ipc.removeListener('availabilities:sent-all', this.handleSitesSuccess);
  // }

  render() {
    const rows = this.state.av.map(av => {
      return (
        <tr key={av.av_id}>
          <td>{av.agent_id}</td>
          <td>{av.shift_id}</td>
          <td>{av.assigned}</td>
        </tr>
      );
    });

    return (
      <table className="table is-striped is-hoverable is-centered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Shift</th>
            <th>Assigned</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default AvailabilitiesTable;
