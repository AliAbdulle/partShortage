import React, { Component } from "react";
import LoginManager from "../../modules/LoginManager";
import "./login.css";

export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  render() {
    return (
      <div>
        <div className="card-body">
       <section className="card-title">
        <form onSubmit={this.checkLogin}>
          <h1 className="LoginEmail">Sign In</h1>
          <label>
            <input
              onChange={this.handleFieldChange}
              type="email"
              id="email"
              placeholder="email address"
              required=""
            />
          </label>
          <label>
            <input
              onChange={this.handleFieldChange}
              type="password"
              id="password"
              placeholder="password"
              required=""
            />
          </label>
            <div>
            <button type="button" onClick={this.checkLogin}>
              {" "}
              Sign In
            </button>

        <button
          type="button"
          onClick={() => {
              this.props.history.push("/register");
            }}
            >
          Register
        </button>
        </div>
            </form>
        </section>
          </div>
      </div>
    );
  }
}
