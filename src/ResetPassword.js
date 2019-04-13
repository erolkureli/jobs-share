import React, { Component } from "react";
import Login from "./Login";
import axios from "axios";
import url from "./url";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./ResetPassword.css";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      username: ""
    };
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handleReset(event) {
    var self = this;
    event.preventDefault();
    var payload = {
      email: this.state.username
    };

    axios
      .post(url.resetPassword, payload)
      .then(response => {
        if (response.status === 200) {
          alert("Your new password has been sent to your email.");
          var loginScreen = [];
          loginScreen.push(
            <Login parentContext={this} appContext={self.props.appContext} />
          );
          var loginMessage = "Not Registered yet.Go to registration";
          self.props.parentContext.setState({
            loginScreen: loginScreen,
            loginMessage: loginMessage,
            buttonLabel: "Register",
            isLogin: true,
            isReset: false
          });
        } else if (response.status === 404) {
          alert("Username does not exists");
        } else {
          alert("Error in reset password");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  gotoLogin(event) {
    var self = this;
    event.preventDefault();
    var loginScreen = [];
    loginScreen.push(
      <Login
        parentContext={self.props.appContext}
        appContext={self.props.appContext}
      />
    );
    var loginMessage = "Not Registered yet.Go to registration";
    self.props.parentContext.setState({
      loginScreen: loginScreen,
      loginMessage: loginMessage,
      buttonLabel: "Register",
      isLogin: true,
      isReset: false
    });
  }

  render() {
    return (
      <div>
        <h2>Reset Password</h2>
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
        <button onClick={event => this.handleReset(event)}>
          Reset Password
        </button>
        <span>
          <Router>
            <div>
              <Link to="/login" onClick={event => this.gotoLogin(event)}>
                Login
              </Link>
            </div>
          </Router>
        </span>
      </div>
    );
  }
}

export default ResetPassword;
