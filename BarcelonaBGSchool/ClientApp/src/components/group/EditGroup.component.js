import React, { Component } from "react";
import axios from "axios";
import config from "../../config";
import { Redirect } from "react-router-dom";

export default class EditGroup extends Component {
  constructor(props) {
    super(props);
    this.onChangeGroupName = this.onChangeGroupName.bind(this);
    this.onChangeYearStarted = this.onChangeYearStarted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: "",
      group_name: "",
      year_started: "",
      was_edited: false
    };
  }

  componentDidMount() {
    axios
      .get(`${config.domain}groups/edit/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          id: response.data.id,
          group_name: response.data.group_name,
          year_started: response.data.year_started
        });
      })
      .catch(function(error) {
        console.log(error);
      });
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
    bodyFormData.set("id", this.state.id);
    bodyFormData.set("group_name", this.state.group_name);
    bodyFormData.set("year_started", this.state.year_started);

    axios({
      method: "put",
      url: `${config.domain}groups/update/${this.props.match.params.id}`,
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(res => {
        this.setState({
          group_name: "",
          year_started: "",
          was_edited: true
        });
        console.log(`${res.data} edited`);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.was_edited) {
      return <Redirect to="/index" />;
    }
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Редактирай класа</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Име на класа: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.group_name}
              onChange={this.onChangeGroupName}
            />
          </div>
          <div className="form-group">
            <label>Година на първи/зимен срок: </label>
            <input
              type="date"
              className="form-control"
              value={this.state.year_started}
              onChange={this.onChangeYearStarted}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Промени" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
