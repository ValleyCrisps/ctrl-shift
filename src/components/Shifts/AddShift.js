import React, { Component } from 'react';

import calendarPlus from '../../images/calendar-plus.svg';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

class AddShift extends Component {
  state = { hidden: true };

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
    console.log(shift);
    ipc.send('shift:add', shift);
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
        <button className="button" onClick={this.toggle}>
          {this.state.hidden ? addButton : 'Hide'}
        </button>

        <div id="add-form" className={this.state.hidden ? 'hidden' : ''}>
          <form id="new-shift">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Date</label>
              </div>
              <div className="field-body">
                <input
                  id="shift-date"
                  className="input"
                  type="date"
                  name="shift-date"
                />
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label">
                <label className="label">Shift start</label>
              </div>
              <div className="field-body">
                <input id="shift-start" type="time" />
              </div>
              <div className="field is-horizontal">
                <div className="field-label">
                  <label className="label">Shift end</label>
                </div>
                <div className="field-body">
                  <input id="shift-end" type="time" />
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Agents/clerks needed</label>
              </div>
              <div className="field-body">
                <input
                  id="shift-needed"
                  className="input"
                  type="number"
                  name="shift-needed"
                  defaultValue="0"
                />
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Notes</label>
              </div>
              <div className="field-body">
                <textarea
                  id="shift-notes"
                  className="input is-exapanded"
                  type="text"
                  name="shift-notes"
                ></textarea>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label"></div>
              <div className="field-body">
                <div className="control">
                  <button
                    id="add-shift"
                    className="button is-info"
                    type="button"
                    name="submit"
                    onClick={this.submitShift}
                  >
                    Add shift
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddShift;
