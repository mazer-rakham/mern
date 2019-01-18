const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";
  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters.";
  }
  // if NOT valid, you want to check for a falsy falue to activate this statement
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required.";
  }
  return {
    errors,
    isValid: isEmpty(errors) // this is  function we made in is-empty.js and validates the input
  };
};
