import React, { Component } from "react";

class ShiftTile extends Component {
  render() {
    const shift = this.props;
    const day = new Date(shift.date);
    return (
      <div
        id={`shift-${shift.id}`}
        className={`tile is-child box shift type-${shift.type}`}
      >
        <h2>{`${shift.type}`}</h2>
        <p className="note">{`${shift.notes}`}</p>
        <p className="required">
          Required: <span className="needed-span">{`${shift.needed}`}</span>
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
