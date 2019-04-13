import React, { Component } from "react";
import LoginScreen from "./LoginScreen";
import MainPage from "./MainPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      jobScreen: []
    };
  }

  componentWillMount() {
    const sessionInfo = sessionStorage.getItem("session");
    var loginPage = [];

    if (!sessionInfo) {
      loginPage.push(<LoginScreen parentContext={this} />);
    } else {
      loginPage.push(<MainPage parentContext={this} />);
    }

    this.setState({
      loginPage: loginPage
    });
  }

  render() {
    return (
      <div>
        <div className="App">
          {this.state.loginPage}
          {this.state.jobScreen}
        </div>
      </div>
    );
  }
}

export default App;
