// bring in the express server from npm
const express = require("express");
// set the express router up
const router = express.Router();
// bring in gravatar from npm, it is the wordpress gravatar
const gravatar = require("gravatar");
// this is for incrypting passwords
const bcrypt = require("bcryptjs");
// json web token for making access tokens
//to get to authorized areas
const jwt = require("jsonwebtoken");
// bring in the keys to use in the application
const keys = require("../../config/keys");
// bring in passport to create the protected route
const passport = require("passport");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load user model
const User = require("../../models/User");
// @route      GET api/users/test
// @desc       Tests user route
// @access     Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Uers works"
  })
);

// @route GET api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // the below code checks the input on the register route to the function we created in the register.js
  // file and the validate package and uses es6 destructuring to have 2 values
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    // if the input fields are not valid
    return res.status(400).json(errors); // then send the errors to the user
  }
  User.findOne({
    // no errors in the validation so check to see if the email is in use
    email: req.body.email // grabbing the email value in register and assigning it to email
  }).then(user => {
    // returning a promise from the database
    if (user) {
      // oh no if findOne returns a value it is truthy and there is an email in the database
      errors.email = "Email already exists"; // push the error to the validate errors
      return res.status(400).json(errors); // send the error back as a json template
    } else {
      // looks like everything worked out lets put this new user in
      // this is the avatar that you are grabbing from the gravatar library
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });
      // this is all the info rom the new user form in register js
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      // take the password and run it through a salt
      bcrypt.genSalt(10, (err, salt) => {
        // salt will hash the password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          // if no errors it will store the hash as the password in the
          //database
          newUser.password = hash;
          // then save the new user
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
// @route api/users/login
// @desc  Login user / return JWT token
// @access Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    // if the input fields are not valid
    return res.status(400).json(errors); // then send the errors to the user
  }
  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({
    email
  }).then(user => {
    // check for user
    if (!user) {
      errors.email = "USer not found";
      return res.status(404).json({
        email: errors
      });
    }

    //check password
    // use bcrypt to compare the hashed pw to the entered
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user matched
        //create jwt payload this makes a token/cookie that allows user to access the private pages
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        //sign the token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json({
          password: errors
        });
      }
    });
  });
});
// @route api/users/current
// @desc  Return current user
// @access Private

// below sets the route, has passport as the authentication with jw web tokens to pass the token
// to passport to allow the access to the private area we are also not using session

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }), // this is the logic on the top or passport.js
  (req, res) => {
    //congrats the user is allowed to see the private stuff
    res.json(req.user);
  }
);

module.exports = router;
