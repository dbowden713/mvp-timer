import React, { Component } from "react";

export default class Header extends Component {
  render(props) {
    return (
      <div id="header">
        <div style={{ textAlign: "center" }}>
          <h3>{this.props.time}</h3>
        </div>
        <div
          id="newTimerBtn"
          className="btn btn-primary btn-lg"
          onClick={this.props.newTimer}
        >
          {this.props.addingTimer ? "Cancel" : "New Timer"}
        </div>
        <div
          id="clearTimersBtn"
          className="btn btn-danger btn-lg"
          onClick={this.props.clearTimers}
        >
          Clear All
        </div>
      </div>
    );
  }
}
