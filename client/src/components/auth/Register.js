import React, { Component } from "react";

class Register extends Component {
  // each form field has to have its own state in the component
  // this is component state NOT application state
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    // you have to use this when you are working with functions
    // because the function does not know what this refers to in it
    this.onChange = this.onChange.bind(this);
  }
  onChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form action="create-profile.html">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    // this is linking the input to the state value in the component above
                    value={this.state.name}
                    // since the value is set by the state you have to call a function to
                    // handle typing in the input
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    // this is linking the input to the state value in the component above
                    value={this.state.email}
                    // since the value is set by the state you have to call a function to
                    // handle typing in the input
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    // this is linking the input to the state value in the component above
                    value={this.state.password}
                    // since the value is set by the state you have to call a function to
                    // handle typing in the input
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="password2"
                    // this is linking the input to the state value in the component above
                    value={this.state.password2}
                    // since the value is set by the state you have to call a function to
                    // handle typing in the input
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
