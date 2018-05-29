import React from "react";
import { mvps } from "../mvps";

export default class MvpList extends React.Component {
  constructor() {
    super();
    this.state = {
      editing: true,
      searchText: ""
    };
    this.setSearchText = this.setSearchText.bind(this);
  }
  filterMvp(mvp, i) {
    //if (this.state.searchText.length < 2) return null;
    if (
      this.state.searchText &&
      mvp.name.toUpperCase().indexOf(this.state.searchText) > -1
    ) {
      return (
        <li
          className="mvpPickerItem list-group-item"
          onClick={this.pickMvp.bind(this, i)}
          key={i}
        >
          <div className="mvpPickerImg">
            <img
              src={"../img/mvp/" + mvp.id + ".gif"}
              alt={mvp.name + " (" + mvp.id + ")"}
            />
          </div>
          {mvp.name}
        </li>
      );
    }
  }
  setSearchText(e) {
    this.setState({ searchText: e.target.value.toUpperCase() });
  }

  componentDidMount() {
    document.getElementById("mvpSearch").focus();
  }
  displayMvpPicker() {
    const mvpList = mvps.map((mvp, i) => this.filterMvp(mvp, i));
    return (
      <div id="mvpPicker">
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
        <ul className="mvpPickerList list-group">{mvpList}</ul>
      </div>
    );
  }
  pickMvp(index) {
    var mvp = {};
    mvp.id = mvps[index].id;
    mvp.name = mvps[index].name;
    this.props.addNewTimerInfo(mvp);
  }
  render(props) {
    return this.displayMvpPicker();
  }
}

/* MVP JSON Structure
{
    "id":"1059",
    "name":"Mistress",
    "respawn": [
        {
            "map":"mjolnir_04",
            "map_name":"Mt. Mjolnir",
            "time":"120",
            "time_var":"10"
        }
    ]
}
*/
