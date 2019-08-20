import React, { Component } from 'react';

import accountPlus from '../../images/account-plus.svg';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

class AddAgent extends Component {
  state = {
    hidden: true,
    name: '',
    surname: '',
    visaExpiration: '',
    neverOn: '',
    notes: '',
  };

  toggle = () => {
    this.setState(prevState => ({ hidden: !prevState.hidden }));
  };

  submitAgent = event => {
    event.preventDefault();
    const agent = {
      name: document.getElementById('agent-name').value,
      surname: document.getElementById('agent-surname').value,
      visaExpiration: document.getElementById('visa-expiration').value,
      neverOn: document.getElementById('never-on').value,
      notes: document.getElementById('agent-notes').value,
    };
    ipc.send('agents:add', agent);
    ipc.send('agents:get-all', agent);
    this.setState({
      name: '',
      surname: '',
      visaExpiration: '',
      neverOn: '',
      notes: '',
    });
  };

  render() {
    const addButton = (
      <div>
        <img className="icon-custom" src={accountPlus} alt="icon-plus" />
        Add agent
      </div>
    );
    return (
      <div>
        <div className={this.state.hidden ? 'hidden' : ''}>
          <form>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  id="agent-name"
                  className="input"
                  type="text"
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Surname</label>
              <div className="control">
                <input
                  id="agent-surname"
                  className="input"
                  type="text"
                  value={this.state.surname}
                  onChange={e => {
                    this.setState({ surname: e.target.value });
                  }}
                />
              </div>
              <div className="field">
                <label className="label">Visa expiration date</label>
                <div className="control">
                  <input
                    id="visa-expiration"
                    type="date"
                    value={this.state.visaExpiration}
                    onChange={e => {
                      this.setState({ visaExpiration: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Never available on</label>
              <div className="control">
                <input
                  id="never-on"
                  className="input"
                  type="text"
                  value={this.state.neverOn}
                  onChange={e => {
                    this.setState({ neverOn: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Notes</label>
              <div className="control">
                <textarea
                  id="agent-notes"
                  className="input is-exapanded"
                  type="text"
                  name="agent-notes"
                  value={this.state.notes}
                  onChange={e => {
                    this.setState({ notes: e.target.value });
                  }}
                ></textarea>
              </div>
            </div>
            <div className="field">
              <div className="control has-addons buttons">
                <button
                  id="add-shift"
                  className="button is-outlined is-info"
                  type="button"
                  name="submit"
                  onClick={this.submitAgent}
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
          Add agent
        </button>
      </div>
    );
  }
}

export default AddAgent;
