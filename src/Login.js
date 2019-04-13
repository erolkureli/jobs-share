import React, { Component } from "react";
import axios from "axios";
import url from "./url";
import MainPage from "./MainPage";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleValidation() {
    let formIsValid = true;
    let errors = {};

    if (!this.state.username) {
      formIsValid = false;
      errors["username"] = "User name can not be empty";
    }

    if (!this.state.password) {
      formIsValid = false;
      errors["password"] = "Password can not be empty";
    }

    this.setState({ errors: errors });

    if (!formIsValid) {
      this.setState({
        username: "",
        password: ""
      });
    }

    return formIsValid;
  }

  handleLogin(event) {
    event.preventDefault();

    if (!this.handleValidation()) {
      return false;
    }

    var self = this;
    var payload = {
      email: this.state.username,
      password: this.state.password
    };

    axios
      .post(url.login, payload)
      .then(response => {
        if (response.status === 200) {
          sessionStorage.setItem("session", this.state.username);
          var jobScreen = [];

          jobScreen.push(
            <MainPage
              parentContext={self.props.appContext}
              appContext={self.props.appContext}
            />
          );
          self.props.appContext.setState({
            loginPage: [],
            jobScreen: jobScreen
          });
        } else if (response.status === 204) {
          alert("Username password do not match");
        } else {
          alert("Username does not exists");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h2>Login Form</h2>

        <label>
          <b>Username</b>
        </label>

        <input
          className="field"
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleUsernameChange.bind(this)}
        />
        <label style={{ color: "red" }}>{this.state.errors["username"]}</label>
        <br />
        <label>
          <b>Password</b>
        </label>

        <input
          className="field"
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handlePasswordChange.bind(this)}
        />
        <label style={{ color: "red" }}>{this.state.errors["password"]}</label>
        <br />
        <button onClick={event => this.handleLogin(event)}>Login</button>
      </div>
    );
  }
}

export default Login;
