import React, { Component } from "react";

import Header from "./components/header";
import MvpTimer from "./components/mvptimer";
import "./bootstrap.css";
import { timers } from "./timers";
import MvpList from "./components/mvplist";
import MapList from "./components/maplist";
import TimeSelect from "./components/timeselect";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      addingTimer: false,
      currentTimers: [],
      serverTime: 0,
      newTimer: {}
    };

    this.toggleNewTimer = this.toggleNewTimer.bind(this);
    this.deleteTimer = this.deleteTimer.bind(this);
    this.clearTimers = this.clearTimers.bind(this);
    this.listTimers = this.listTimers.bind(this);
    this.getServerTime = this.getServerTime.bind(this);
    this.tick = this.tick.bind(this);
    this.newTimerForm = this.newTimerForm.bind(this);
    this.createNewTimer = this.createNewTimer.bind(this);
  }
  toggleNewTimer() {
    // if we were in the process of adding a new mvp, clear it out
    if (this.state.addingTimer) {
      this.setState({ newTimer: {} });
    }
    this.setState({ addingTimer: !this.state.addingTimer });
  }
  newTimerForm() {
    if (this.state.addingTimer) {
      if (!("id" in this.state.newTimer)) {
        return <MvpList addNewTimerInfo={info => this.addNewTimerInfo(info)} />;
      } else if (!("map" in this.state.newTimer)) {
        return (
          <MapList
            addNewTimerInfo={info => this.addNewTimerInfo(info)}
            mvp={this.state.newTimer}
          />
        );
      } else if (!("kill_time" in this.state.newTimer)) {
        return (
          <TimeSelect
            addNewTimerInfo={info => this.addNewTimerInfo(info)}
            currentTime={this.getServerTime(true)}
          />
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  addNewTimerInfo(info) {
    var newTimerObj = Object.assign(info, this.state.newTimer);
    this.setState({ newTimer: newTimerObj });
  }

  deleteTimer(i) {
    let arr = this.state.currentTimers;
    arr.splice(i, 1);
    this.setState({ currentTimers: arr });
  }
  clearTimers() {
    this.setState({ currentTimers: [] });
  }
  createNewTimer() {
    if (
      "id" in this.state.newTimer &&
      "map" in this.state.newTimer &&
      "kill_time" in this.state.newTimer
    ) {
      let newTimers = this.state.currentTimers;
      newTimers.push(this.state.newTimer);
      this.setState({
        currentTimers: newTimers,
        newTimer: {},
        addingTimer: false
      });
    }
  }
  componentDidUpdate() {
    this.createNewTimer();
  }
  componentDidMount() {
    this.setState({ currentTimers: timers });
    this.timer = setInterval(this.tick, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  tick() {
    this.setState({ serverTime: this.getServerTime() });
  }
  getServerTime(obj = false) {
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
        currentTime={this.getServerTime}
      />
    );
  }
  render() {
    return (
      <div id="appContainer">
        <div style={{ textAlign: "center" }}>
          <h3>{this.getServerTime()}</h3>
        </div>
        <Header newTimer={this.toggleNewTimer} clearTimers={this.clearTimers} />
        {this.newTimerForm()}
        <ul className="mvpTimerList list-group">
          {this.state.currentTimers.map(this.listTimers)}
        </ul>
      </div>
    );
  }
}
