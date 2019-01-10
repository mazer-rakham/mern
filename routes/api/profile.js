// server
const express = require("express");
// server routes
const router = express.Router();
// talk to database
const mongoose = require("mongoose");
// use protected routes
const passport = require("passport");

// bring in the models to use
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route      GET api/profile/test
// @desc       Tests profile route
// @access     Public

router.get("/test", (req, res) => res.json({ msg: "profile works" }));

// @route      GET api/profile
// @desc       Get current users profile
// @access     Private

// grab the api/profile route, use jwt to make sure you are logged in and shoe the protected route if they are
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
