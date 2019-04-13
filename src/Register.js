import React, { Component } from "react";
import axios from "axios";
import url from "./url";
import Login from "./Login";

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }

  handleRegister(event) {
    event.preventDefault();

    var self = this;
    var payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post(url.register, payload)
      .then(function(response) {
        if (response.status === 200) {
          var loginScreen = [];
          loginScreen.push(
            <Login parentContext={this} appContext={self.props.appContext} />
          );
          var loginMessage = "Not Registered yet.Go to registration";
          self.props.parentContext.setState({
            loginScreen: loginScreen,
            loginMessage: loginMessage,
            buttonLabel: "Register",
            isLogin: true
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleFirstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }

  handleLastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div>
        <h3>Register</h3>
        <table>
          <tbody>
            <tr>
              <td>First Name : </td>
              <td>
                <input
                  className="field"
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleFirstNameChange.bind(this)}
                />
              </td>
            </tr>
            <tr>
              <td>Last Name : </td>
              <td>
                <input
                  className="field"
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleLastNameChange.bind(this)}
                />
              </td>
            </tr>
            <tr>
              <td>Email : </td>
              <td>
                <input
                  className="field"
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleEmailChange.bind(this)}
                />
              </td>
            </tr>
            <tr>
              <td>Password : </td>
              <td>
                <input
                  className="field"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange.bind(this)}
                />
              </td>
            </tr>
            <tr>
              <td />
              <td>
                <button onClick={event => this.handleRegister(event)}>
                  Register
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Register;
