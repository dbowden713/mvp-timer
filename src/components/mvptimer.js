import React, { Component } from "react";

export default class MvpTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.delete = this.delete.bind(this);
    this.getCountdown = this.getCountdown.bind(this);
    this.drawTomb = this.drawTomb.bind(this);
    this.setTombPosition = this.setTombPosition.bind(this);
  }

  delete() {
    this.props.delete(this.props.index);
  }

  componentWillReceiveProps() {
    // if the timer is older than a "spawn cycle" for the mvp, delete it
    if (
      this.props.mvpInfo.spawnTimeMin - this.props.currentTime <
      -1 * this.props.mvpInfo.time * 60 * 1000
    ) {
      this.delete();
    }
  }

  componentWillMount() {
  }

  setTombPosition(e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left + e.target.offsetLeft - 7;
    var y = e.clientY - rect.top + e.target.offsetTop - 7;
    this.props.placeTomb({ X: x, Y: y });
  }

  drawTomb() {
    if (this.props.mvpInfo.tombX > 0 && this.props.mvpInfo.tombY > 0) {
      return (
        <img
          src={"./img/tomb_solid.png"}
          alt=""
          style={{
            position: "absolute",
            top: this.props.mvpInfo.tombY,
            left: this.props.mvpInfo.tombX,
            width: "15px",
            height: "15px",
            transform: "translate(-50%, -50%)"
          }}
        />
      );
    }
  }
  setTombPosition(e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left + e.target.offsetLeft;
    var y = e.clientY - rect.top + e.target.offsetTop;
    this.props.placeTomb({ X: x, Y: y });
  }

  getCountdown(time) {
    var timeDifference = time - this.props.currentTime;
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

  render() {
    return (
      <div className="mvpTimer list-group-item">
        <div className="mvpTimerName mb-1">{this.props.mvpInfo.name}</div>
        <div className="mvpTimerControls">
          <a className="" onClick={this.delete}>
            <img src={"./img/delete.png"} alt="-" />
          </a>
        </div>
        <div className="mvpImg">
          <img
            src={"./img/mvp/" + this.props.mvpInfo.id + ".gif"}
            alt={this.props.mvpInfo.name + " (" + this.props.mvpInfo.id + ")"}
            onClick={this.showMvpList}
          />
        </div>
        <div className="mapImg">
          <img
            src={"./img/map/" + this.props.mvpInfo.map + ".gif"}
            alt={"No map (" + this.props.mvpInfo.map + ")"}
            onClick={e => this.setTombPosition(e)}
          />
          {this.drawTomb()}
        </div>
        <div className="mvpTimerClock">
          {this.getCountdown(this.props.mvpInfo.spawnTimeMin)}
          <br />~<br />
          {this.getCountdown(this.props.mvpInfo.spawnTimeMax)}
        </div>
      </div>
    );
  }
}
