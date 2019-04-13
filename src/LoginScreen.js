import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import "./LoginScreen.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.gotoReset = this.gotoReset.bind(this);
    this.state = {
      userName: "",
      password: "",
      loginScreen: [],
      loginMessage: "",
      buttonLabel: "Register",
      isLogin: true,
      isReset: false
    };
  }

  handleRegister(event) {
    event.preventDefault();
    var loginMessage;
    var loginScreen = [];
    if (this.state.isLogin) {
      //Register sayfasina gidis
      loginScreen.push(
        <Register parentContext={this} appContext={this.props.parentContext} />
      );
      loginMessage = "Already registered.Go to Login";
      this.setState({
        loginScreen: loginScreen,
        loginMessage: loginMessage,
        buttonLabel: "Login",
        isLogin: false,
        isReset: false
      });
    } else {
      //Login sayfasina gidis
      loginScreen.push(
        <Login parentContext={this} appContext={this.props.parentContext} />
      );
      loginMessage = "Not Registered yet.Go to registration";
      this.setState({
        loginScreen: loginScreen,
        loginMessage: loginMessage,
        buttonLabel: "Register",
        isLogin: true,
        isReset: false
      });
    }
  }

  componentWillMount() {
    var loginScreen = [];
    if (this.props.parentContext !== null) {
      alert("DDDDD");
      loginScreen.push(
        <Login parentContext={this} appContext={this.props.parentContext} />
      );
    } else {
      alert("EEEE");
      loginScreen.push(
        <Login
          parentContext={this}
          appContext={this.props.location.state.aaaa}
        />
      );
    }
    var loginMessage = "Not registered yet, Register Now";
    this.setState({
      loginScreen: loginScreen,
      loginMessage: loginMessage
    });
  }

  gotoReset(event) {
    event.preventDefault();
    var loginScreen = [];
    loginScreen.push(
      <ResetPassword
        parentContext={this}
        appContext={this.props.parentContext}
      />
    );
    this.setState({
      loginScreen: loginScreen,
      buttonLabel: "Reset",
      isLogin: false,
      isReset: true
    });
  }

  render() {
    return (
      <React.Fragment>
        <div class="container">{this.state.loginScreen}</div>

        <div
          hidden={this.state.isReset}
          class="container"
          style={{ backgroundColor: "#f1f1f1" }}
        >
          <button
            class="generalbtn"
            onClick={event => this.handleRegister(event)}
          >
            {this.state.buttonLabel}
          </button>
          <span class="psw">
            <Router>
              <div>
                <span>Forgot </span>
                <Link to="/reset" onClick={event => this.gotoReset(event)}>
                  password?
                </Link>
              </div>
            </Router>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginScreen;
