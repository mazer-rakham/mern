const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  // take the data from the input and send to isEmpty function and see if it returns a not empty
  // if it is not empty or invalid then let the data be data, if it is, assign an empty string
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  // this takes the data from the registration form name and it makes sure that the
  // length is between 2 and 30 characters
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  // testing if the name input is empty
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  // if NOT valid, you want to check for a falsy falue to activate this statement
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  
  if (!Validator.isLength(data.password, {min:6, max: 30})) {
    errors.password = "Password must be between 6 and 30 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password confirm is required";
  }
  // if NOT is equal
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors) // this is  function we made in is-empty.js and validates the input
  };
};
