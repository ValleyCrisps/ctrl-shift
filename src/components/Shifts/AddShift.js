import React, { Component } from 'react';

import calendarPlus from '../../images/calendar-plus.svg';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

class AddShift extends Component {
  state = { hidden: true, date: '', start: '', end: '', needed: 0, notes: '' };

  toggle = () => {
    this.setState(prevState => ({ hidden: !prevState.hidden }));
  };

  submitShift = event => {
    event.preventDefault();
    const shift = {
      date: document.getElementById('shift-date').value,
      start: document.getElementById('shift-start').value,
      end: document.getElementById('shift-end').value,
      needed: document.getElementById('shift-needed').value,
      notes: document.getElementById('shift-notes').value,
    };
    ipc.send('shifts:add', shift);
    ipc.send('shifts:get-all');
    this.setState({ date: '', start: '', end: '', needed: 0, notes: '' });
  };

  render() {
    const addButton = (
      <div>
        <img className="icon-custom" src={calendarPlus} alt="icon-plus" />
        Add shift
      </div>
    );
    return (
      <div>
        <div id="add-form" className={this.state.hidden ? 'hidden' : ''}>
          <form id="new-shift">
            <div className="field">
              <label className="label">Date</label>
              <div className="control">
                <input
                  id="shift-date"
                  className="input"
                  type="date"
                  name="shift-date"
                  value={this.state.date}
                  onChange={e => this.setState({ date: e.target.value })}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Shift start</label>
              <div className="control">
                <input
                  id="shift-start"
                  type="time"
                  value={this.state.start}
                  onChange={e => this.setState({ start: e.target.value })}
                />
              </div>
              <div className="field">
                <label className="label">Shift end</label>
                <div className="control">
                  <input
                    id="shift-end"
                    type="time"
                    value={this.state.end}
                    onChange={e => this.setState({ end: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Agents/clerks needed</label>
              <div className="control">
                <input
                  id="shift-needed"
                  className="input"
                  type="number"
                  name="shift-needed"
                  value={this.state.needed}
                  onChange={e => this.setState({ needed: e.target.value })}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Notes</label>
              <div className="control">
                <textarea
                  id="shift-notes"
                  className="input is-exapanded"
                  type="text"
                  name="shift-notes"
                  value={this.state.notes}
                  onChange={e => this.setState({ notes: e.target.value })}
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
                  onClick={this.submitShift}
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
          <img className="icon-custom" src={calendarPlus} alt="icon-plus" />
          Add shift
        </button>
      </div>
    );
  }
}

export default AddShift;
