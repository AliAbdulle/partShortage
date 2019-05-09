import React, { Component } from "react";
import LoginManager from "../../modules/ProductManager";

export default class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    type: ""
  };
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };
  handleRegister = evt => {
    evt.preventDefault();
    LoginManager.getAllUser()
      .then(newUser => {
        return newUser.find(
          user => user.email.toLowerCase() === this.state.email
        );
      })
      .then(matchUser => {
        if (matchUser) {
          return window.alert("the account email is exists");
        } else {
          let userObject = {
            email: this.state.email,
            password: this.state.password,
            type: this.state.type
          };
          this.props
            .saveRegister(userObject)
            .then(() => LoginManager.getAllUser())
            .then(newUser => {
              return newUser.find(
                user =>
                  user.email.toLowerCase() ===
                  this.state.email.toLocaleLowerCase()
              );
            })
            .then(matchUser => sessionStorage.setItem("userID", matchUser.id))
            .then(() => this.props.history.push("/products"));
        }
      });
  };
  render() {
    return (
      <React.Fragment>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              required
              className="form-control"
              onClick={this.handleFieldChange}
              id="name"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              required
              className="form-control"
              onClick={this.handleFieldChange}
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              required
              className="form-control"
              onClick={this.handleFieldChange}
              id="password"
            />
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <input
              type="text"
              required
              className="form-control"
              onClick={this.handleFieldChange}
              id="type"
            />
            <button
              type="button"
              onClick={this.handleRegister}
              className="btn btn-primary"
            >
              Register
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
