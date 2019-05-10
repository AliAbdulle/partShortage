import React, { Component } from "react";

export default class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    userTypeId: ""
  };
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };
  handleRegister = evt => {
    if (this.state.name === "") {
      alert("Please enter a user name")
  } else if (this.state.email === "") {
      alert("Please enter an email address")
  } else if (this.state.password === "") {
      alert("Please enter a password")
  } else if (this.props.users.find(user => {return user.name.toLowerCase() === this.state.name.toLowerCase()})) {
      alert("User name is already taken")
  } else if (this.props.users.find(user => {return user.email.toLowerCase() === this.state.email.toLowerCase()})){
      alert("this email address already exists")
  }else{
          let newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            userTypeId: Number(this.state.userTypeId)
          }
            this.props.postUser(newUser)
              .then(() => this.props.history.push("/"));
        }
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
              onChange={this.handleFieldChange}
              id="name"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="userType">user Type</label>
            <select
              defaultValue=""
              name="userType"
              className="form-control"
              id="userTypeId"
              onChange={this.handleFieldChange}
              value={this.state.userTypeId}
            >
              <option value="">Select</option>
              {this.props.userTypes.map(user => {
                //console.log(product);
                return <option key={user.id} id={user.id} value={user.id}>
                    {user.name}
                  </option>
              })}
            </select>
          </div>
          <div>
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
