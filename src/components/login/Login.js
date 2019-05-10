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
  handleLogin = evt => {
    evt.preventDefault();
    LoginManager.getAllUser().then(users => {
      let loginUser = users.find(user =>
        user.email.toLowerCase() === this.state.email.toLowerCase() &&
          user.password.toLowerCase() === this.state.password.toLowerCase()
      );
      if(loginUser){
        sessionStorage.setItem("userId", loginUser.id)
        sessionStorage.setItem("userTypeId",loginUser.userTypeId)
        this.props.history.push("/products")
      }
       if (loginUser) {
        sessionStorage.setItem("userId", loginUser.id)
        this.props.history.push("/invetory")
      }
      else{
        window.alert("Login information not found. Please try again or register an account.")
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
                <button type="button" onClick={this.handleLogin}>
                  {" "}
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() => {
                    this.props.history.push("/register/new");
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
