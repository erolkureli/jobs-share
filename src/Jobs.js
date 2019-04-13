import React, { Component } from "react";

import axios from "axios";
import url from "./url";

import "./Jobs.css";
import "./Records.css";

class Jobs extends Component {
  constructor() {
    super();
    this.handleAddJob = this.handleAddJob.bind(this);
  }

  state = {
    company: "0",
    title: "",
    jobAddingResponse: "",
    errors: {},
    companies: [],
    jobs: []
  };

  loadCompanies() {
    var arrCompanies = [];
    var serverResponse = { msg: "", companyList: [] };

    axios.post(url.getCompanies).then(response => {
      serverResponse = response.data.companyList;

      arrCompanies.push(
        <option key={"0"} value={"0"}>
          {" "}
          {"Please select a company"}{" "}
        </option>
      );

      for (var k = 0; k < serverResponse.length; k++) {
        arrCompanies.push(
          <option key={serverResponse[k].id} value={serverResponse[k].id}>
            {" "}
            {serverResponse[k].company}{" "}
          </option>
        );
      }

      this.setState({
        companies: arrCompanies
      });
    });
  }

  componentWillMount() {
    this.loadCompanies();
    this.loadJobs();
  }

  handleValidation() {
    let formIsValid = true;
    let errors = {};

    if (!this.state.company || this.state.company === "0") {
      formIsValid = false;
      errors["company"] = "Company can not be empty";
    }

    if (!this.state.title) {
      formIsValid = false;
      errors["title"] = "Job title can not be empty";
    }

    this.setState({ errors: errors });

    if (!formIsValid) {
      this.setState({
        company: "0",
        title: ""
      });
    }
    return formIsValid;
  }

  handleAddJob(event) {
    event.preventDefault();

    if (!this.handleValidation()) {
      return false;
    }

    var serverResponse = { msg: "" };

    var job = {
      company: this.state.company,
      title: this.state.title
    };
    axios.post(url.addJob, job).then(response => {
      serverResponse = response.data;
      this.setState({
        jobAddingResponse: serverResponse.msg
      });

      this.loadJobs();
      this.setState({ company: "", title: "" });
    });
  }

  handleCompanyChange(event) {
    this.setState({ company: event.target.value });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  loadJobs() {
    var arrJobs = [];

    axios.post(url.getJobs).then(response => {
      arrJobs = response.data.jobList;

      this.setState({
        jobs: arrJobs
      });
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddJob} className="form">
          <div>
            <header>
              <p>Add a new job </p>
            </header>
            <table>
              <tbody>
                <tr>
                  <td>Company : </td>
                  <td>
                    <select
                      name="company"
                      value={this.state.company}
                      onChange={this.handleCompanyChange.bind(this)}
                    >
                      {this.state.companies}
                    </select>
                  </td>
                  <td>
                    <span style={{ color: "red" }}>
                      {this.state.errors["company"]}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Job Title : </td>
                  <td>
                    <input
                      className="field"
                      type="text"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleTitleChange.bind(this)}
                    />
                  </td>
                  <td>
                    <span style={{ color: "red" }}>
                      {this.state.errors["title"]}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <button>Add New Job</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 className="success_msg">{this.state.jobAddingResponse}</h4>
          </div>
        </form>
        <div>
          <header>
            <p>Jobs </p>
          </header>
          <table id="records">
            <tr>
              <th>Name</th>
            </tr>
            <tbody>
              {this.state.jobs.map(function(item, key) {
                return (
                  <tr key={key}>
                    <td hidden={true}>{item.id}</td>
                    <td hidden={true}>{item.company}</td>
                    <td>{item.title}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Jobs;
