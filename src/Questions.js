import React, { Component } from "react";
import axios from "axios";
import url from "./url";

import "./Records.css";

class Questions extends Component {
  constructor() {
    super();
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
  }

  state = {
    company: "0",
    title: "0",
    question: "",
    answer: "",
    questionAddingResponse: "",
    errors: {},
    companies: [],
    titles: [],
    questions: []
  };

  handleCompanyChange(event) {
    this.setState({ company: event.target.value });
    this.loadTitles(event.target.value);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleQuestionChange(event) {
    this.setState({ question: event.target.value });
  }

  handleAnswerChange(event) {
    this.setState({ answer: event.target.value });
  }

  loadTitles(selectedCompany) {
    var arrTitles = [];
    var serverResponse = { msg: "", titleList: [] };

    var inputCompany = {
      id: selectedCompany
    };

    axios.post(url.getTitles, inputCompany).then(response => {
      serverResponse = response.data.titleList;

      arrTitles.push(
        <option key={"0"} value={"0"}>
          {" "}
          {"Please select a title"}{" "}
        </option>
      );

      for (var k = 0; k < serverResponse.length; k++) {
        arrTitles.push(
          <option key={serverResponse[k].id} value={serverResponse[k].id}>
            {" "}
            {serverResponse[k].title}{" "}
          </option>
        );
      }

      this.setState({
        titles: arrTitles
      });
    });
  }

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
    this.loadQuestions();
  }

  handleValidation() {
    let formIsValid = true;
    let errors = {};

    this.setState({ errors: errors });

    if (!this.state.company || this.state.company === "0") {
      formIsValid = false;
      errors["company"] = "Company can not be empty";
    }

    if (!this.state.title || this.state.title === "0") {
      formIsValid = false;
      errors["title"] = "Title can not be empty";
    }

    if (!this.state.question) {
      formIsValid = false;
      errors["question"] = "Question can not be empty";
    }

    if (!this.state.answer) {
      formIsValid = false;
      errors["answer"] = "Answer can not be empty";
    }

    if (!formIsValid) {
      this.setState({
        company: "0",
        title: "0",
        question: "",
        answer: ""
      });
    }

    return formIsValid;
  }

  handleAddQuestion(event) {
    event.preventDefault();

    if (!this.handleValidation()) {
      return false;
    }

    var serverResponse = { msg: "" };

    var question = {
      company: this.state.company,
      title: this.state.title,
      question: this.state.question,
      answer: this.state.answer
    };

    axios.post(url.addQuestion, question).then(response => {
      serverResponse = response.data;
      this.setState({
        questionAddingResponse: serverResponse.msg
      });

      this.loadQuestions();
      this.setState({ company: "", title: "", question: "", answer: "" });
    });
  }

  loadQuestions() {
    var arrQuestions = [];

    axios.post(url.getQuestions).then(response => {
      arrQuestions = response.data.questionList;

      this.setState({
        questions: arrQuestions
      });
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddQuestion} className="form">
          <div>
            <header>
              <p>Add a job interview question </p>
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
                  <td>Title : </td>
                  <td>
                    <select
                      name="title"
                      value={this.state.title}
                      onChange={this.handleTitleChange.bind(this)}
                    >
                      {this.state.titles}
                    </select>
                  </td>
                  <td>
                    <span style={{ color: "red" }}>
                      {this.state.errors["title"]}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Question:</td>
                  <td>
                    <textarea
                      className="field"
                      type="text"
                      name="question"
                      value={this.state.question}
                      onChange={this.handleQuestionChange.bind(this)}
                    />
                  </td>
                  <td>
                    <span style={{ color: "red" }}>
                      {this.state.errors["question"]}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Answer:</td>
                  <td>
                    <textarea
                      className="field"
                      type="text"
                      name="answer"
                      value={this.state.answer}
                      onChange={this.handleAnswerChange.bind(this)}
                    />
                  </td>
                  <td>
                    <span style={{ color: "red" }}>
                      {this.state.errors["answer"]}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <button>Add New Question</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 className="success_msg">{this.state.questionAddingResponse}</h4>
          </div>
        </form>
        <div>
          <header>
            <p>Questions </p>
          </header>
          <table id="records">
            <tr>
              <th>Question</th>
              <th>Answer</th>
            </tr>
            <tbody>
              {this.state.questions.map(function(item, key) {
                return (
                  <tr key={key}>
                    <td hidden={true}>{item.id}</td>
                    <td hidden={true}>{item.company}</td>
                    <td hidden={true}>{item.title}</td>
                    <td>{item.question}</td>
                    <td>{item.answer}</td>
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

export default Questions;
