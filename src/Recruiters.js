import React, { Component } from "react";
import axios from "axios";
import url from "./url";

import "./Recruiters.css";
import "./Records.css";

class Recruiters extends Component {
  constructor() {
    super();
    this.handleAddRecruiter = this.handleAddRecruiter.bind(this);
  }

  state = {
    recruiter: "",
    comment: "",
    recruiterAddingResponse: "",
    errors: {},
    recruiters: []
  };

  handleRecruiterChange(event) {
    this.setState({ recruiter: event.target.value });
  }

  handleCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  handleValidation() {
    let formIsValid = true;
    let errors = {};

    this.setState({ errors: errors });

    if (!this.state.recruiter) {
      formIsValid = false;
      errors["recruiter"] = "Recruiter can not be empty";
    }

    if (!this.state.comment) {
      formIsValid = false;
      errors["comment"] = "Comment can not be empty";
    }

    if (!formIsValid) {
      this.setState({
        recruiter: "",
        comment: ""
      });
    }

    return formIsValid;
  }

  loadRecruiters() {
    var arrRecruiters = [];

    axios.post(url.getRecruiters).then(response => {
      arrRecruiters = response.data.recruiterList;

      this.setState({
        recruiters: arrRecruiters
      });
    });
  }

  componentWillMount() {
    this.loadRecruiters();
  }

  handleAddRecruiter(event) {
    event.preventDefault();

    if (!this.handleValidation()) {
      return false;
    }

    var serverResponse = { msg: "" };

    var recruiter = {
      recruiter: this.state.recruiter,
      comment: this.state.comment
    };

    axios.post(url.addRecruiter, recruiter).then(response => {
      serverResponse = response.data;
      this.setState({
        recruiterAddingResponse: serverResponse.msg
      });

      this.loadRecruiters();
      this.setState({ recruiter: "", comment: "" });
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddRecruiter} className="form">
          <div>
            <header>
              <p>Add a recruiter </p>
            </header>
            <table>
              <tbody>
                <tr>
                  <td>Recruiter : </td>
                  <td>
                    <input
                      className="field"
                      type="text"
                      name="recruiter"
                      value={this.state.recruiter}
                      onChange={this.handleRecruiterChange.bind(this)}
                    />
                  </td>
                  <td>
                    <span style={{ color: "red" }}>
                      {this.state.errors["recruiter"]}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Comment : </td>
                  <td>
                    <textarea
                      className="field"
                      type="text"
                      name="comment"
                      value={this.state.comment}
                      onChange={this.handleCommentChange.bind(this)}
                    />
                  </td>
                  <td>
                    <span style={{ color: "red" }}>
                      {this.state.errors["comment"]}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <button>Add New Recruiter</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 className="success_msg">
              {this.state.recruiterAddingResponse}
            </h4>
          </div>
        </form>

        <div>
          <header>
            <p>Recruiters </p>
          </header>
          <table id="records">
            <tr>
              <th>Recruiter</th>
              <th>Comment</th>
            </tr>
            <tbody>
              {this.state.recruiters.map(function(item, key) {
                return (
                  <tr key={key}>
                    <td hidden={true}>{item.id}</td>
                    <td>{item.recruiter}</td>
                    <td>{item.comment}</td>
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

export default Recruiters;
