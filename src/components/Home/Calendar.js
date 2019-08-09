import React, { Component } from 'react';

import ShiftTile from './ShiftTile';

import 'datejs';
const electron = window.require('electron');
const ipc = electron.ipcRenderer;

class Calendar extends Component {
  state = {
    shifts: [],
  };

  generateTitle = date => {
    return <h1 className="title has-text-centered">{`${date.toString('yyyy-MM-dd')}`}</h1>;
  };

  generateWeekHTML = date => {
    // generates the html code for the row containing the dates of the current week
    const vector = [1, 2, 3, 4, 5, 6, 7];
    let day = new Date(date);
    day.prev().monday();
    let calendar = vector.map(i => {
      let dailyShifts = this.state.shifts.filter(
        shift => shift.shift_date === day.toString('yyyy-MM-dd')
      );
      // create column for weekday
      let column = (
        <div
          key={`${day.toString('yyyyMMdd')}`}
          className={`tile is-parent is-vertical day-${i} column`}
        >
          <h2>{`${day.toString('dddd')}`}</h2>
          {!day.today() ? (
            <div className="tile is-child date has-background-primary">
              <p>{`${day.getDate()}`}</p>
            </div>
          ) : (
            <div className="tile is-child date has-background-link">
              <p>{`${day.getDate()}`}</p>
            </div>
          )}
          {/* add any shifts for the day as separate tiles */}
          {dailyShifts.map(shift => {
            return <ShiftTile shift={shift} key={shift.shift_id} />;
          })}
        </div>
      );
      day.add(1).day();
      return column;
    });
    return calendar;
  };

  componentDidMount() {
    ipc.send('shifts:get-week', this.props.date);
    ipc.on('shifts:sent-week', (event, data) => {
      this.setState({ shifts: data });
    });
  }

  componentWillUnmount() {
    ipc.removeListener('shifts:sent-week', this.handleSitesSuccess);
  }

  render() {

    //
    // ipc.on('shifts:sent', function(event, shifts) {
    //   shifts.forEach(shift => {
    //     ipc.send('availabilities:get', shift);
    //   });
    // });
    //
    // ipc.on('availabilities:sent', (event, shift, agents) => {
    //   displayShift(shift, agents);
    // });
    //
    // ipc.on('busy:sent', (event, busy) => {
    //   // console.log(busy);
    //   setTimeout(function() {}, 100);
    //   busy.forEach(row => {
    //     let column = document.getElementById(row.date.replace(/-/g, ''));
    //     let checkboxes = Array.from(
    //       column.getElementsByClassName(`agent-${row.agentId}`)
    //     );
    //     checkboxes.forEach(checkbox => {
    //       if (row.busy && !checkbox.checked) {
    //         checkbox.disabled = true;
    //         checkbox.nextElementSibling.classList.add('text-red');
    //       }
    //     });
    //   });
    // });
    //
    // const saveButton = document.getElementById('save-assigned');
    //
    // saveButton.addEventListener('click', () => {
    //   let inputs = Array.from(document.getElementsByTagName('input'));
    //   let assignments = [];
    //   inputs.forEach(input => {
    //     const className = input.className;
    //     const shiftId = className.match(/shift-(\d+)/)[1];
    //     const agentId = className.match(/agent-(\d+)/)[1];
    //     assignments.push([shiftId, agentId, input.checked]);
    //   });
    //   ipc.send('assignments:save', assignments);
    // });
    //

    //
    // function createAgentsDiv(shift, agents) {
    //   console.log(agents);
    //   let agentsDiv = document.createElement('div');
    //   agentsDiv.className = 'agents';
    //   agents.forEach(agent => {
    //     let container = document.createElement('div');
    //     agentsDiv.appendChild(container);
    //     let checkbox = append.newElement({
    //       tag: 'input',
    //       classList: `agent-${agent.id} shift-${shift.id}`
    //     });
    //     checkbox.type = 'checkbox';
    //     checkbox.name = 'name';
    //     checkbox.value = 'value';
    //     checkbox.checked = agent.assigned;
    //     if (!agent.assigned) {
    //       checkbox.className += ' unchecked';
    //     }
    //     container.appendChild(checkbox);
    //     let label = document.createElement('label');
    //     label.appendChild(
    //       document.createTextNode(`${agent.name} ${agent.surname[0]}.`)
    //     );
    //     container.appendChild(label);
    //     checkbox.addEventListener('click', () => {
    //       checkbox.classList.toggle('unchecked');
    //       updateCheckedCount(agentsDiv.parentNode);
    //       if (checkbox.checked === true) {
    //         disable(agentsDiv.parentNode.parentNode, agent);
    //       } else {
    //         reEnable(agentsDiv.parentNode.parentNode, agent);
    //       }
    //     });
    //   });
    //   ipc.send('busy:get', date);
    //   return agentsDiv;
    // }
    //
    // // #######################
    // // Dyanamically change counter of assigned agents and colour of the relative box
    // function updateCheckedCount(shiftTile) {
    //   let requiredEl = shiftTile.getElementsByClassName('needed-span')[0];
    //   let requiredNum = parseInt(requiredEl.innerText);
    //   let assignedEl = shiftTile.getElementsByClassName('assigned-span')[0];
    //   let assignedNum = countChecked(shiftTile);
    //   // update assigned counter
    //   assignedEl.innerHTML = assignedNum;
    //   // update colour class of the container
    //   updateClass(shiftTile, requiredNum, assignedNum);
    // }
    //
    // function disable(column, agent) {
    //   let uncheckedBoxes = Array.from(
    //     column.getElementsByClassName(`agent-${agent.id} unchecked`)
    //   );
    //   uncheckedBoxes.forEach(checkbox => {
    //     checkbox.disabled = true;
    //     checkbox.nextElementSibling.className += 'text-red';
    //   });
    // }
    //
    // function reEnable(column, agent) {
    //   let uncheckedBoxes = Array.from(
    //     column.getElementsByClassName(`agent-${agent.id} unchecked`)
    //   );
    //   uncheckedBoxes.forEach(checkbox => {
    //     checkbox.disabled = false;
    //     checkbox.nextElementSibling.className = '';
    //   });
    // }
    //
    // function countChecked(box) {
    //   let array = Array.from(box.getElementsByTagName('input'));
    //   let checked = array.filter(el => el.checked === true).length;
    //   return checked;
    // }
    //
    // function updateClass(box, required, assigned) {
    //   // required == assigned => assignes green class
    //   // required < assigned => assignes red class
    //   // checks if class already exists and removes other colours (if any)
    //   if (required === assigned && !box.classList.contains('green')) {
    //     if (box.classList.contains('red')) box.classList.replace('red', 'green');
    //     else box.classList.add('green');
    //   } else if (required < assigned && !box.classList.contains('red')) {
    //     if (box.classList.contains('green')) box.classList.replace('green', 'red');
    //     else box.classList.add('red');
    //   } else {
    //     if (box.classList.contains('green')) box.classList.toggle('green');
    //     if (box.classList.contains('red')) box.classList.toggle('red');
    //   }
    // }
    //

    return (
      <div>
        <div className="calendar">
          {this.generateTitle(this.props.date)}
          <div className="columns">{this.generateWeekHTML(this.props.date)}</div>
        </div>
      </div>
    );
  }
}

export default Calendar;
