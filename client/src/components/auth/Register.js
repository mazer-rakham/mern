import React, { Component } from "react";
import PropTypes from "prop-types";
// bleow is used to route from the actions
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { registerUser } from "../../actions/authActions";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
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
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    // get errors from redux state, put into props, then if errors are included in the properties
    // pass it to the component state errors object above in the constructor
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
    // the this.props.history is from wrapping the export in withRouter and passes
    // the history to the action
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    // errors are still coming from the component state with the componentWillRecieveProps function above
    const { errors } = this.state;
    return (
      <div className="register">
        s
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              {/* forms do not need an action in react */}
              <form onSubmit={this.onSubmit} noValidate>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info=" This site uses Gravatar so if you want a profile image, use a
                  Gravatar email"
                />              
                <TextFieldGroup
                  error={errors.password}
                  placeholder="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  error={errors.password2}
                  placeholder="password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
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
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
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
)(withRouter(Register));
