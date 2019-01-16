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
// @access     Public

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

// @route      POST api/profile
// @desc       Create or edit user profile
// @access     Private

// grab the api/profile route, use jwt to make sure you are logged in and shoe the protected route if they are
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   // get fields
   const profileFields = {};
   // get the user id and set it to profileFields.id
   profileFields.user = req.user.id;
   // if the data is in the body assign it to the profileFields object
   if(req.body.handle) profileFields.handle = req.body.handle;
   if(req.body.company) profileFields.company = req.body.company;
   if(req.body.website) profileFields.website = req.body.website;
   if(req.body.location) profileFields.location = req.body.location;
   if(req.body.bio) profileFields.bio = req.body.bio;
   if(req.body.status) profileFields.status = req.body.status;
   if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
   // Skills - split into an array
   if(typeof req.body.skills !== 'undefined')  {
     profileFields.skills = req.body.skills.split(',');
   }
   // social
   profileFields.social = {};
   if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
   if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
   if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
   if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
   if(req.body.facebook) profileFields.social.facebook = req.body.facebook;

   Profile.findOne({user: req.user.id})
   .then(profile) {
     // if there is a profile, find it and update it
     if(profile) {
       Profile.findOneAndUpdate();
     } else {
       
     }
   }
  }
);
module.exports = router;
