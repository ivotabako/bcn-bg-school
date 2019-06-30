import React, { Component } from "react";
import axios from "axios";
import TableRowGroup from "./TableRowGroup";
import config from "../../config";

export default class IndexGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { groups: [] };
    this.tabRow = this.tabRow.bind(this);
    this.onDeleteGroup = this.onDeleteGroup.bind(this);
  }
  componentDidMount() {
    axios
      .get(`${config.domain}groups`)
      .then(response => {
        this.setState({ groups: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onDeleteGroup(id) {
    this.setState({ groups: this.state.groups.filter(g => g.id !== id) });
  }

  tabRow(deleteGroup) {
    return this.state.groups.map(function(object, i) {
      return <TableRowGroup obj={object} key={i} deleteGroup={deleteGroup} />;
    });
  }

  render() {
    return (
      <div>
        <h3 align="center">Всички класове</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Клас</th>
              <th>Година на първи/зимен срок</th>
              <th colSpan="2">Операция</th>
            </tr>
          </thead>
          <tbody>{this.tabRow(this.onDeleteGroup.bind(this))}</tbody>
        </table>
      </div>
    );
  }
}
