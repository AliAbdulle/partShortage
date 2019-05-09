import React, { Component } from "react";
import LoginManager from "../../modules/LoginManager";
import "./login.css";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    type: ""
  };
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };
  handleLogin = evt => {
    evt.preventDefault();
    return LoginManager.getAllUsers().then(allListUser => {
      let foundUser = allListUser.find(user =>
        user.email.toLowerCase() === this.state.email.toLowerCase() &&
          user.password.toLowerCase() === this.state.password &&
          user.type.toLowerCase() === this.state.type
      );
      return foundUser;
    }).then(matchUser => {
      if(matchUser){
        sessionStorage.setItem("userID", Number(matchUser.id))
        this.props.history.push("/products")
      }
      else{
        window.alert("you enter wrong email and password")
      }
    })
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
                <button type="button" onClick={this.handleFieldChange}>
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
