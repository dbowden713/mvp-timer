import React from "react";

export default class TimeSelect extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.pickTime = this.pickTime.bind(this);
    this.displayTimePicker = this.displayTimePicker.bind(this);
  }
  componentWillMount() {
    this.setState({
      currentTime: this.props.currentTime.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "numeric",
        minute: "2-digit"
      })
    });
  }
  componentDidMount() {
    document.getElementById("tombTime").focus();
  }
  componentWillReceiveProps() {
    this.setState({
      currentTime: this.props.currentTime.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "numeric",
        minute: "2-digit"
      })
    });
  }
  displayTimePicker() {
    return (
      <div id="timePicker">
        <ul className="timePickerList list-group">
          <li className="timePickerItem list-group-item">
            <div className="timePickerImg">
              <img src={"../img/tomb.png"} alt="tomb" />
            </div>
            <form
              className="form-inline my-2 my-lg-0"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  this.pickTime();
                }
              }}
              onSubmit={e => {
                e.preventDefault();
                e.stopPropagation();
                this.pickTime();
              }}
            >
              <input
                className="form-control mr-sm-2"
                id="tombTime"
                placeholder={this.state.currentTime}
                type="text"
              />
            </form>
          </li>
        </ul>
      </div>
    );
  }
  pickTime() {
    var formValue = document.getElementById("tombTime").value;
    var timeTest = new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
    if (!timeTest.test(formValue) && formValue !== "") {
      document.getElementById("tombTime").classList.add("is-invalid");
    } else {
      if (formValue === "") {
        this.props.addNewTimerInfo({
          kill_time: this.props.currentTime.getTime()
        });
      } else {
        var kill_hour = formValue.split(":")[0];
        var kill_minute = formValue.split(":")[1];

        var kill = new Date(this.props.currentTime.getTime());
        if (kill_hour > kill.getHours()) {
          kill.setDate(kill.getDate() - 1);
        }
        kill.setHours(kill_hour);
        kill.setMinutes(kill_minute);

        this.props.addNewTimerInfo({
          kill_time: kill.getTime()
        });
      }
    }
  }
  render() {
    return this.displayTimePicker();
  }
}

/*
          <div className="form-group list-group-item">
            <label htmlFor="mvpSearch">New MVP</label>
            <input
              className="form-control"
              id="mvpSearch"
              placeholder="Search List"
              type="text"
              onKeyUp={e => this.setSearchText(e)}
            />
          </div>
          */
