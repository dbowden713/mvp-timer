import React, { Component } from "react";
import MvpList from "./mvplist";

export default class MvpTimer extends Component {
  constructor(props) {
    super(props);
    var now = this.props.startTime.getTime();
    this.state = {
      edit: false,
      timerStart: this.props.startTime,
      elapsed: 0,
      spawnTimeMin: new Date(now + this.props.mvpInfo.time * 60 * 1000),
      spawnTimeMax: new Date(
        now +
          (this.props.mvpInfo.time + this.props.mvpInfo.time_var) * 60 * 1000
      ),
      tombX: -1,
      tombY: -1,
      showMvpList: false
    };
    this.delete = this.delete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.tick = this.tick.bind(this);
    this.getElapsed = this.getElapsed.bind(this);
    this.getCountdown = this.getCountdown.bind(this);
    this.placeMarker = this.placeMarker.bind(this);
    this.positionMarker = this.positionMarker.bind(this);
    this.showMvpList = this.showMvpList.bind(this);
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  delete() {
    this.props.delete(this.props.index);
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({ elapsed: this.state.elapsed + 1000 });
  }

  getElapsed() {
    return Math.round(this.state.elapsed / 1000);
  }

  setKillTime() {}

  positionMarker(e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left + e.target.offsetLeft - 7;
    var y = e.clientY - rect.top + e.target.offsetTop - 7;
    this.setState({ tombX: x, tombY: y });
  }

  placeMarker() {
    if (this.state.tombX > 0 && this.state.tombY > 0) {
      return (
        <img
          src={"../img/tomb_solid.png"}
          alt=""
          style={{
            position: "absolute",
            top: this.state.tombY,
            left: this.state.tombX,
            width: "15px",
            height: "15px"
          }}
        />
      );
    }
  }

  getCountdown(time) {
    var currentTime = this.state.timerStart.getTime() + this.state.elapsed;
    var targetTime = time.getTime();
    var seconds = Math.floor((targetTime - currentTime) / 1000);
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - hours * 3600) / 60);
    var secs = seconds - hours * 3600 - minutes * 60;
    if (secs < 10) {
      secs = "0" + secs;
    }
    if (minutes < 10 && hours > 0) {
      minutes = "0" + minutes;
    }
    if (hours < 1) {
      return minutes + ":" + secs;
    }
    return hours + ":" + minutes + ":" + secs;
  }

  showMvpList() {
    if (this.state.edit)
      this.setState({ showMvpList: !this.state.showMvpList });
  }

  render(props) {
    var editStyle = this.state.edit ? { border: "1px solid #aaf" } : null;
    return (
      <div className="mvpTimer list-group-item" style={editStyle}>
        <div className="mvpTimerName mb-1">{this.props.mvpInfo.name}</div>
        <div className="mvpTimerControls">
          <a className="" onClick={this.toggleEdit}>
            <img src={"../img/edit.png"} alt="?" />
          </a>
          <a className="" onClick={this.delete}>
            <img src={"../img/delete.png"} alt="-" />
          </a>
        </div>
        <div className="mvpImg">
          <img
            src={"../img/mvp/" + this.props.mvpInfo.id + ".gif"}
            alt={this.props.mvpInfo.name + " (" + this.state.id + ")"}
            onClick={this.showMvpList}
          />
          {this.state.edit && this.state.showMvpList ? <MvpList /> : null}
        </div>
        <div className="mapImg">
          {this.placeMarker()}
          <img
            src={"../img/map/" + this.props.mvpInfo.map + ".gif"}
            alt={"No map (" + this.props.mvpInfo.map + ")"}
            onClick={e => this.positionMarker(e)}
          />
        </div>
        <div className="mvpTimerClock">
          {this.getCountdown(this.state.spawnTimeMin)}
          <br />~<br />
          {this.getCountdown(this.state.spawnTimeMax)}
        </div>
      </div>
    );
  }
}
