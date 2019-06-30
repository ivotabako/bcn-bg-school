import React, { Component } from "react";
import axios from "axios";
import config from "../../config";
import { Redirect } from "react-router-dom";

export default class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.onChangeGroupName = this.onChangeGroupName.bind(this);
    this.onChangeYearStarted = this.onChangeYearStarted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      group_name: "",
      year_started: "",
      was_created: false
    };
  }
  onChangeGroupName(e) {
    this.setState({
      group_name: e.target.value
    });
  }
  onChangeYearStarted(e) {
    this.setState({
      year_started: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    var bodyFormData = new FormData();
    bodyFormData.set("group_name", this.state.group_name);
    bodyFormData.set("year_started", this.state.year_started);

    axios({
      method: "post",
      url: `${config.domain}groups/add`,
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(res => {
        this.setState({
          group_name: "",
          year_started: "",
          was_created: true
        });
        console.log(`${res.data} inserted`);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.was_created) {
      return <Redirect to="/index" />;
    }
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Добави нов клас</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Име на класа: </label>
            <input
              type="text"
              name="group_name"
              className="form-control"
              value={this.state.group_name}
              onChange={this.onChangeGroupName}
            />
          </div>
          <div className="form-group">
            <label>Година на първи/зимен срок: </label>
            <input
              type="date"
              name="year_started"
              className="form-control"
              value={this.state.year_started}
              onChange={this.onChangeYearStarted}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Добави" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
