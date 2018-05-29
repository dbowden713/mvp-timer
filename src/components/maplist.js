import React from "react";
import { mvps } from "../mvps";

export default class MapList extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.displayMapPicker = this.displayMapPicker.bind(this);
  }

  componentWillMount() {
    for (let i = 0; i < mvps.length; i++) {
      if (mvps[i].id === this.props.mvp.id) {
        this.setState({ mvp: mvps[i] });
      }
    }
  }

  displayMapPicker() {
    const mapList = this.state.mvp.respawn.map((map, i) => {
      return (
        <li
          className="mapPickerItem list-group-item"
          onClick={this.pickMap.bind(this, i)}
          key={i}
        >
          <div className="mapPickerImg">
            <img
              src={"../img/map/" + map.map + ".gif"}
              alt={map.map + " (" + map.map_name + ")"}
            />
          </div>
          {map.map_name}
        </li>
      );
    });
    return (
      <div id="mapPicker">
        <ul className="mapPickerList list-group">{mapList}</ul>
      </div>
    );
  }

  pickMap(index) {
    var map = this.state.mvp.respawn[index];
    map.time = parseInt(map.time, 10);
    map.time_var = parseInt(map.time_var, 10);
    this.props.addNewTimerInfo(map);
  }

  render() {
    return <div>{this.displayMapPicker()}</div>;
  }
}
