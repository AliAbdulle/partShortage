import React, { Component } from "react";
import LoginManager from "../../modules/LoginManager";
import "./login.css";

export default class Login extends Component {
  //set the state
  state = {
    email: "",
    password: ""
  };
  handleFieldChange = evt => {
    //this function will handle user input value and set the state to value
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };
  // this fuction checks usertype and direct to associate task
  checkUserType = typeId => {
    if (typeId=== 1){
      return this.props.history.push("/products")
    }
    else if (typeId=== 2){
      return this.props.history.push("/inventory")
    }
    else if (typeId=== 3){
      return this.props.history.push("/shipping")
    }
  }
  handleLogin = evt => {
    //this function will varaified user information if is matching
    //and alert if the enter wrong information
    evt.preventDefault();
    LoginManager.getAllUser().then(users => {
      let loginUser = users.find(user =>
        user.email.toLowerCase() === this.state.email.toLowerCase() &&
          user.password.toLowerCase() === this.state.password.toLowerCase()
      )

      if(loginUser){
        sessionStorage.setItem("userId", loginUser.id)
        sessionStorage.setItem("userTypeId",loginUser.userTypeId)
        this.checkUserType(loginUser.userTypeId)
      }
      else{
        window.alert("Login information not found. Please try again or register an account.")
      }
    })
  };

  render() {
    //clear session storage from last user
    sessionStorage.clear()
    return (
      <div className="main-page">
      <h1 className="lookup">Welcome to Ali Abdulle PartShortage page! Please sign up to navigate the pages!!! </h1>
        <div className="card-body">
          <section className="card-title">
            <form onSubmit={this.checkLogin}>
              <h3 className="LoginEmail">Sign In</h3>
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
