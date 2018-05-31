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
    this.placeTomb = this.placeTomb.bind(this);
    this.sortTimers = this.sortTimers.bind(this);
  }
  componentDidMount() {
    this.setState({ currentTimers: timers });
    this.timer = setInterval(this.tick, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  componentDidUpdate() {
    this.createNewTimer();
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
      let newTimerList = this.state.currentTimers;
      let newTimer = this.state.newTimer;
      newTimer.spawnTimeMin = new Date(
        newTimer.kill_time + newTimer.time * 60 * 1000);
      newTimer.spawnTimeMax= new Date(
        newTimer.kill_time +
        (newTimer.time + newTimer.time_var) * 60 * 1000);
      newTimer.tombX = -1;
      newTimer.tombY = -1;
      newTimerList.push(newTimer);
      this.sortTimers(newTimerList);
      this.setState({
        currentTimers: newTimerList,
        newTimer: {},
        addingTimer: false
      });
    }
  }
  sortTimers(timers) {
    timers.sort((timer1, timer2) => {
      return timer1.spawnTimeMin - timer2.spawnTimeMin;
    })
  }
  placeTomb(coords, index) {
    console.log(coords);
    let newTimers = this.state.currentTimers;
    newTimers[index].tombX = coords.X;
    newTimers[index].tombY = coords.Y;
    this.setState({ currentTimers: newTimers});
  }
  listTimers(timer, i) {
    return (
      <MvpTimer
        key={i}
        index={i}
        delete={this.deleteTimer}
        mvpInfo={timer}
        currentTime={this.getServerTime(true)}
        placeTomb={(coords)=>this.placeTomb(coords, i)}
      />
    );
  }
  render() {
    return (
      <div id="appContainer">
        <Header newTimer={this.toggleNewTimer} addingTimer={this.state.addingTimer} clearTimers={this.clearTimers} time={this.getServerTime()} />
        {this.newTimerForm()}
        <ul id="timerList" className="list-group">
          {this.state.currentTimers.map(this.listTimers)}
        </ul>
      </div>
    );
  }
}
