import React, { Component } from "react";

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
  handleRegister = () => {
      const newState = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          type: this.state.type
      }
      this.props.postUser(newState)
      .then(this.props.history.push("/"))
  }
  render() {
      return(
          <React.Fragment>
              <form>
                  <div>
                      <label htmlFor="name">Name</label>
                      <input type="text"
                      required className="form-control"
                      onClick={this.handleFieldChange}
                      id="name">
                      </input>
                  </div>
                  <div>
                      <label htmlFor="email">Email</label>
                      <input type="text"
                      required className="form-control"
                      onClick={this.handleFieldChange}
                      id="email">
                      </input>
                  </div>
                  <div>
                      <label htmlFor="password">Password</label>
                      <input type="text"
                      required className="form-control"
                      onClick={this.handleFieldChange}
                      id="password">
                      </input>
                  </div>
                  <div>
                      <label htmlFor="type">Type</label>
                      <input type="text"
                      required className="form-control"
                      onClick={this.handleFieldChange}
                      id="type">
                      </input>
                      <button type="button"
                      onClick={this.handleRegister}
                      className="btn btn-primary">Register</button>
                  </div>
              </form>
          </React.Fragment>
      )
  }
}
