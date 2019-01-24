import React, { Component } from "react";
import PropTypes from "prop-types";

import classnames from "classnames";
import { registerUser } from "../../actions/authActions";
import { connect } from "react-redux";
// each form field has to have its own state in the component
// this is component state NOT application state

class Register extends Component {
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
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // get roors from redux state, put into props, then if errors are included in the properties
    // pass it to the component state errors pbject above in the constructor
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    // set the value to the name attributes
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser);
  }

  render() {
    // errors are still coming from the component state with the componentWillRecieveProps function above
    const { errors } = this.state;    
    return (
      <div className="register">
        {user ? user.name : null}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              {/* forms do not need an action in react */}
              <form onSubmit={this.onSubmit} noValidate>
                <div className="form-group">
                  <input
                    type="text"
                    // this classnames property is from the library classnames
                    className={classnames("form-control form-control-lg", {
                      //only add this class if there is a value in the errors name in the state which comes from validator
                      "is-invalid": errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    // this is linking the input to the state value in the component above
                    value={this.state.name}
                    // since the value is set by the state you have to call a function to
                    // handle typing in the input
                    onChange={this.onChange}
                  />
                  {/* below is a javascript expression to dynamically display this div only if there is an error */}
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    // this is linking the input to the state value in the component above
                    value={this.state.email}
                    // since the value is set by the state you have to call a function to
                    // handle typing in the input
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    // this is linking the input to the state value in the component above
                    value={this.state.password}
                    // since the value is set by the state you have to call a function to
                    // handle typing in the input
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    // this is linking the input to the state value in the component above
                    value={this.state.password2}
                    // since the value is set by the state you have to call a function to
                    // handle typing in the input
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
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
// map the property types, it is a react thing i guess i don't know
Register.propTvpes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

// this function gets any of the auth state into the component
const mapStateToProps = state => ({
  // and now you can access the application state of auth
  // the last auth comes from the root reducer
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
