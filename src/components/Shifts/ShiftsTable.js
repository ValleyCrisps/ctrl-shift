import React, { Component } from 'react';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

class ShiftsTable extends Component {
  state = {
    shifts: [],
  };

  handleDelete = id => {
    console.log(id);
    ipc.send('shifts:delete', id);
    ipc.send('shifts:get-all');
  };

  componentDidMount() {
    ipc.send('shifts:get-all');
    ipc.on('shifts:sent-all', (event, data) => {
      this.setState({ shifts: data });
      console.log(this.state.shifts);
    });
  }

  componentWillUnmount() {
    ipc.removeListener('shifts:sent-all', this.handleSitesSuccess);
  }

  render() {
    const rows = this.state.shifts.map(shift => {
      return (
        <tr key={shift.shift_id}>
          <td>{shift.shift_date}</td>
          <td>{shift.shift_start}</td>
          <td>{shift.shift_end}</td>
          <td>{shift.needed}</td>
          <td>0</td>
          <td>{shift.shift_notes}</td>
          <td className="has-text-centered">
            <button
              className="delete"
              onClick={() => this.handleDelete(shift.shift_id)}
            ></button>
          </td>
        </tr>
      );
    });

    return (
      <table className="table is-striped is-hoverable is-centered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Shift start</th>
            <th>Shift end</th>
            <th>Agents/clerks needed</th>
            <th>Assigned</th>
            <th>Notes</th>
            <th className="has-text-centered">Delete</th>
          </tr>
        </thead>
        <tbody id="shifts-list">{rows}</tbody>
      </table>
    );
  }
}

export default ShiftsTable;
