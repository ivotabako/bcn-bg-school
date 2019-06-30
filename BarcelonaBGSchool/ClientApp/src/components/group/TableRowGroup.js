import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config";

class TableRowGroup extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    axios
      .delete(`${config.domain}groups/delete/${this.props.obj.id}`)
      .then(res => {
        this.props.deleteGroup(res.data.id);
        console.log(`${res.data} deleted`);
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <tr>
        <td>{this.props.obj.group_name}</td>
        <td>{this.props.obj.year_started}</td>
        <td>
          <Link to={"/edit/" + this.props.obj.id} className="btn btn-primary">
            Редактирай
          </Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">
            Изтрий
          </button>
        </td>
      </tr>
    );
  }
}

export default TableRowGroup;
