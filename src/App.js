import React, { Component } from "react";

import Header from "./components/header";
import MvpTimer from "./components/mvptimer";
import "./bootstrap.css";
import { timers } from "./timers";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      newMvp: false,
      currentTimers: timers,
      serverTime: 0
    };

    this.addMvp = this.addMvp.bind(this);
    this.deleteTimer = this.deleteTimer.bind(this);
    this.listTimers = this.listTimers.bind(this);
    this.getTime = this.getTime.bind(this);
    this.tick = this.tick.bind(this);
  }
  addMvp() {
    this.setState({ newMvp: !this.state.newMvp });
    this.createNewTimer(timers[0]);
  }
  deleteTimer(i) {
    let arr = this.state.currentTimers;
    arr.splice(i, 1);
    this.setState({ currentTimers: arr });
  }
  clearTimers() {
    this.setState({ currentTimers: [] });
  }
  createNewTimer(newMvp) {
    let newTimers = this.state.currentTimers;
    newTimers.push(newMvp);
    this.setState({ currentTimers: newTimers });
  }
  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }
  tick() {
    this.setState({ serverTime: this.getTime() });
  }
  getTime(obj = false) {
    var time = new Date();
    var timeOffset = time.getTimezoneOffset();
    time.setMinutes(time.getMinutes() + timeOffset - 240);
    return obj
      ? time
      : "Server Time: " + time.toLocaleTimeString("en-US", { hour12: false });
  }
  listTimers(timer, i) {
    return (
      <MvpTimer
        key={i}
        index={i}
        delete={this.deleteTimer}
        mvpInfo={timer}
        startTime={this.getTime(true)}
      />
    );
  }
  render() {
    var currentTime = this.getTime();
    return (
      <div id="appContainer">
        <div style={{ textAlign: "center" }}>
          <h3>{currentTime}</h3>
        </div>
        <Header
          newTimer={this.addMvp.bind(this)}
          clearTimers={this.clearTimers.bind(this)}
        />
        <ul className="mvpTimerList list-group">
          {this.state.currentTimers.map(this.listTimers)}
        </ul>
      </div>
    );
  }
}
