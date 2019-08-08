import React, { Component } from "react";

class ShiftTile extends Component {
  render() {
    const {
      shift_id,
      shift_date,
      shift_start,
      shift_end,
      needed,
      shift_notes
    } = this.props.shift;
    return (
      <div id={`shift-${shift_id}`} className={`tile is-child box shift`}>
        <h2>{`${shift_start}-${shift_end}`}</h2>
        <p className="note">{`${shift_notes}`}</p>
        <p className="required">
          Required: <span className="needed-span">{`${needed}`}</span>
        </p>

        <p className="assigned">
          Assigned: <span className="assigned-span">0</span>
        </p>
      </div>
    );
  }
  //shiftTile.appendChild(createAgentsDiv(shift, agents));
  //updateCheckedCount(shiftTile);
}

export default ShiftTile;
