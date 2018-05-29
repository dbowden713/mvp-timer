import React, { Component } from "react";

export default class MvpTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStart: this.props.mvpInfo.kill_time,
      currentTime: this.props.currentTime,
      spawnTimeMin: new Date(
        this.props.mvpInfo.kill_time + this.props.mvpInfo.time * 60 * 1000
      ),
      spawnTimeMax: new Date(
        this.props.mvpInfo.kill_time +
          (this.props.mvpInfo.time + this.props.mvpInfo.time_var) * 60 * 1000
      ),
      tombX: -1,
      tombY: -1
    };
    this.delete = this.delete.bind(this);
    this.tick = this.tick.bind(this);
    this.getCountdown = this.getCountdown.bind(this);
    this.placeMarker = this.placeMarker.bind(this);
    this.positionMarker = this.positionMarker.bind(this);
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
    this.setState({ currentTime: this.props.currentTime });
    if (
      this.state.spawnTimeMin - this.state.currentTime <
      -2 * this.props.mvpInfo.time * 60 * 1000
    ) {
      this.delete();
    }
  }

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
    var timeDifference = time.getTime() - this.state.currentTime;
    var seconds = Math.floor(Math.abs(timeDifference) / 1000);
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - hours * 3600) / 60);
    var secs = seconds - hours * 3600 - minutes * 60;
    var neg = "";
    if (timeDifference < 0) {
      neg = "-";
    }
    if (secs < 10) {
      secs = "0" + secs;
    }
    if (minutes < 10 && hours !== 0) {
      minutes = "0" + minutes;
    }
    if (hours === 0 || hours === "-0") {
      return neg + minutes + ":" + secs;
    }
    return neg + hours + ":" + minutes + ":" + secs;
  }

  render(props) {
    return (
      <div className="mvpTimer list-group-item">
        <div className="mvpTimerName mb-1">{this.props.mvpInfo.name}</div>
        <div className="mvpTimerControls">
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
