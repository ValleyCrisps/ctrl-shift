import React, { Component } from 'react';

import accountPlus from '../../images/account-plus.svg';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

class AddAvailability extends Component {
  state = {
    hidden: true,
    agents: [],
    shifts: [],
    agentId: '',
  };

  toggle = () => {
    this.setState(prevState => ({ hidden: !prevState.hidden }));
  };

  submitAvailability = event => {
    event.preventDefault();
    const av = {
      agentId: document.getElementById('agent-id').value,
    };
    ipc.send('availabilities:add', av);
    ipc.send('availabilities:get-all');
    this.setState({
      agentId: '',
    });
  };

  componentDidMount() {
    ipc.send('agents:get-all');
    ipc.on('agents:sent-all', (event, data) => {
      this.setState({ agents: data });
    });
    ipc.send('shifts:get-all');
    ipc.on('shifts:sent-all', (event, data) => {
      this.setState({ shifts: data });
      console.log(this.state.shifts);
    });
  }

  render() {
    const addButton = (
      <div>
        <img className="icon-custom" src={accountPlus} alt="icon-plus" />
        Add availabilities
      </div>
    );

    const options = this.state.agents.map(agent => {
      return (
        <option key={agent.agent_id} value={agent.agent_id}>
          {`${agent.name} ${agent.surname}`}
        </option>
      );
    });

    const checkboxes = this.state.shifts.map(shift => {
      return (
        <label className="checkbox" key={shift.shift_id}>
          <input type="checkbox" key={shift.shift_id} value={shift.shift_id} />
          {`${shift.shift_date}, ${shift.shift_start}-${shift.shift_end}`}
        </label>
      );
    });

    return (
      <div>
        <div className={this.state.hidden ? 'hidden' : ''}>
          <form>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <div className="select">
                  <select
                    id="agent-id"
                    value={this.state.agentId}
                    onChange={e => {
                      this.setState({ agentId: e.target.value });
                    }}
                  >
                    <option>Select agent</option>
                    {options}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Shifts</label>
              <div className="control">{checkboxes}</div>
            </div>
            <div className="field">
              <div className="control has-addons buttons">
                <button
                  className="button is-outlined is-info"
                  type="button"
                  name="submit"
                  onClick={this.submitAvailability}
                >
                  {addButton}
                </button>
                <button
                  className={
                    !this.state.hidden ? 'button is-outlined is-info' : 'hidden'
                  }
                  onClick={e => {
                    e.preventDefault();
                    this.toggle();
                  }}
                >
                  Collapse
                </button>
              </div>
            </div>
          </form>
        </div>

        <button
          className={
            this.state.hidden ? 'button is-outlined is-info' : 'hidden'
          }
          onClick={this.toggle}
        >
          <img className="icon-custom" src={accountPlus} alt="icon-plus" />
          Add availabilities
        </button>
      </div>
    );
  }
}

export default AddAvailability;
