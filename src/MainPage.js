import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Companies from "./Companies";
import Jobs from "./Jobs";
import Questions from "./Questions";
import Recruiters from "./Recruiters";
import LoginScreen from "./LoginScreen";

import "./MainPage.css";

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = { redirect: false, logOutParent: "" };
  }

  logOut = () => {
    sessionStorage.removeItem("session");
    this.setState({
      redirect: true,
      logOutParent: this.props.appContext
    });
  };

  render() {
    if (this.state.redirect === true) {
      return (
        <Router>
          <div>
            <Route path="/logout" component={LoginScreen} />
            <Redirect
              to={{
                pathname: "/logout",
                state: { aaaa: "this.state.logOutParent" }
              }}
            />
          </div>
        </Router>
      );
    }
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li>
                <Link className="link" to="/companies">
                  Companies
                </Link>
              </li>
              <li>
                <Link className="link" to="/jobs">
                  Jobs
                </Link>
              </li>
              <li>
                <Link className="link" to="/questions">
                  Questions
                </Link>
              </li>
              <li>
                <Link className="link" to="/recruiters">
                  Recruiters
                </Link>
              </li>
              <li>
                <button onClick={this.logOut}>Log Out</button>
              </li>
            </ul>
            <Switch>
              <Route path="/companies" component={Companies} />
              <Route path="/jobs" component={Jobs} />
              <Route path="/questions" component={Questions} />
              <Route path="/recruiters" component={Recruiters} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default MainPage;
