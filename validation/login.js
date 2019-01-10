const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";


 

  // if NOT valid, you want to check for a falsy falue to activate this statement
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // want required to be last
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  
  return {
    errors,
    isValid: isEmpty(errors) // this is  function we made in is-empty.js and validates the input
  };
};
