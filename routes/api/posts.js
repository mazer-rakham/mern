const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// bring in validator files
const validatePostInput = require('../../validation/post');

const Post = require('../../models/Post');
// @route      GET api/posts/test
// @desc       Tests post route
// @access     Public

router.get("/test", (req, res) => res.json({
    msg: "posts works"
}));

// @route       POST api/posts
// @desc        Create a post
// @access      Public
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {errors, isValid } = validatePostInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });
    newPost.save().then(post => res.json(post));
});



module.exports = router;3363332600