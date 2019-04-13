import React, { Component } from "react";
import axios from "axios";
import url from "./url";

import "./Records.css";

class Companies extends Component {
  constructor() {
    super();
    this.handleAddCompany = this.handleAddCompany.bind(this);
  }
  state = {
    company: "",
    companyAddingResponse: "",
    errors: {},
    companies: []
  };

  handleCompanyChange(event) {
    this.setState({ company: event.target.value });
  }

  handleValidation() {
    let formIsValid = true;
    let errors = {};

    if (!this.state.company) {
      formIsValid = false;
      errors["company"] = "Company can not be empty";
    }

    this.setState({ errors: errors });

    if (!formIsValid) {
      this.setState({
        company: ""
      });
    }

    return formIsValid;
  }

  handleAddCompany(event) {
    event.preventDefault();

    if (!this.handleValidation()) {
      return false;
    }

    var serverResponse = { msg: "" };

    var firm = {
      company: this.state.company
    };

    axios.post(url.addCompany, firm).then(response => {
      serverResponse = response.data;
      this.setState({
        companyAddingResponse: serverResponse.msg
      });
    });
    this.loadCompanies();
    this.setState({ company: "" });
  }

  loadCompanies() {
    var arrCompanies = [];

    axios.post(url.getCompanies).then(response => {
      arrCompanies = response.data.companyList;

      this.setState({
        companies: arrCompanies
      });
    });
  }

  componentWillMount() {
    this.loadCompanies();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddCompany} className="form">
          <div>
            <header>
              <p>Add a new company</p>
            </header>
            <table>
              <tbody>
                <tr>
                  <td>Company:</td>
                  <td>
                    <input
                      className="field"
                      type="text"
                      name="title"
                      value={this.state.company}
                      onChange={this.handleCompanyChange.bind(this)}
                    />
                  </td>
                  <td>
                    <span style={{ color: "red" }}>
                      {this.state.errors["company"]}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <button>Add New Company</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 className="success_msg">{this.state.companyAddingResponse}</h4>
          </div>
        </form>
        <div>
          <header>
            <p>Companies </p>
          </header>
          <table id="records">
            <tr>
              <th>Name</th>
            </tr>
            <tbody>
              {this.state.companies.map(function(item, key) {
                return (
                  <tr key={key}>
                    <td hidden={true}>{item.id}</td>
                    <td>{item.company}</td>
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

export default Companies;
