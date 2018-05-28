import React, { Component } from "react";
import MvpList from "./mvplist";

export default class NewMvpTimer extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render(props) {
    if (this.props.active) {
      return (
        <div class="list-group-item">
          <MvpList />;
        </div>
      );
    } else return null;
  }
}
