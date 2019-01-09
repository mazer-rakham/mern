const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateRegisterInput(data) {
    let errors = {};

    // this takes the data from the registration form name and it makes sure that the 
    // length is between 2 and 30 characters
    if(!Validator.isLength(data.name, {min:2, max: 30})){
        errors.name = 'Name must be between 2 and 30 characters';
    }
    return {
        errors,
        isValid: isEmpty(errors) // this is  function we made in is-empty.js and validates the input
    }
}