import React, { Component } from "react";

export default class Header extends Component {
  render(props) {
    return (
      <div id="header">
        <div
          id="newTimerBtn"
          className="btn btn-primary btn-lg"
          onClick={this.props.newTimer}
        >
          New Timer
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
