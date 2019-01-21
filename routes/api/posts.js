const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// bring in validator files
const validatePostInput = require('../../validation/post');
// bring in the models to work with
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
// @route      GET api/posts/test
// @desc       Tests post route
// @access     Public

router.get("/test", (req, res) => res.json({
    msg: "posts works"
}));
// @route       POST api/posts
// @desc        Get posts
// @access      Public
router.get('/', (req, res) => {
    Post.find()
        .sort({
            date: -1
        })
        .then(posts => res.json(posts))
        // send a 404 error to the browser with a message
        .catch(err => res.status(404).json({
            nopostsfound: 'No posts found...'
        }));
});
// @route       POST api/posts/:id
// @desc        Get post by ID
// @access      Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        // send a 404 error to the browser with a message
        .catch(err => res.status(404).json({
            nopostfound: 'no post found with that id'
        }));
});
// @route       POST api/posts
// @desc        Create a post
// @access      Public
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validatePostInput(req.body);

    if (!isValid) {
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

// @route       Post api/posts/like/:id
// @desc        Like a post
// @access      Private
router.post('/like/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // find the profile that is logged on
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            // find the id of the post we are looking at in the browser
            Post.findById(req.params.id)
                .then(post => {
                    // check if the person has already liked the post
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({
                            alreadyliked: 'User already liked this post'
                        });
                    }
                    // add the user id to the likes array, can also use push here it doesn't matter
                    post.likes.unshift({
                        user: req.user.id
                    });
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({
                    postnotfound: 'No post found'
                }));
        })
});

// @route       Post api/posts/unlike/:id
// @desc        Unlike a post
// @access      Private
router.post('/unlike/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // find the profile that is logged on
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            // find the id of the post we are looking at in the browser
            Post.findById(req.params.id)
                .then(post => {
                    // check if the person has liked the post
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({
                            notliked: 'You have not yet liked this post'
                        });
                    }
                    // get the user id of the person in the browser and 
                    // look for their like and set it to a variable then remove that from the 
                    // array of likes object
                    const removeIndex = post.likes.map(item => item.user.toString())
                        .indexOf(req.user.id);

                    // splice the like out of the array
                    post.likes.splice(removeIndex, 1);
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({
                    postnotfound: 'No post found'
                }));
        })
});



// @route       DELETE api/posts/:id
// @desc        Delete a post
// @access      Private
router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // find the profile that is logged on
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            // find the id of the post we are looking at in the browser
            Post.findById(req.params.id)
                .then(post => {
                    // check for the post owner, this method is compairing the user 
                    // logged in to the user of the post
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({
                            notauthorized: 'User not authorized'
                        });
                    }
                    // Delete
                    post.remove().then(() => res.json({
                        success: true
                    }))
                })
                .catch(err => res.status(404).json({
                    postnotfound: 'No post found'
                }));
        })
});

// @route       POST api/posts/comment/:id
// @desc        Add comment to post
// @access      Private
router.post('/comment/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // check the input for errors in the post 
    const {
        errors,
        isValid
    } = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    //find the post by the id in the url that you are looking at in the browser
    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }
            // add to comments array
            post.comments.unshift(newComment);
            // save the post comment
            post.save().then(post => res.json(post))
                .catch(err => res.status(404).json({
                    postnotfound: 'No post found'
                }));
        })
});

// @route       DELETE api/posts/comment/:id/:comment_id
// @desc        Remove a comment from a post 
// @access      Private
router.delete(
    '/comment/:id/:comment_id',
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                // Check to see if comment exists
                if (
                    post.comments.filter(
                        comment => comment._id.toString() === req.params.comment_id
                    ).length === 0
                ) {
                    return res
                        .status(404)
                        .json({
                            commentnotexists: 'Comment does not exist'
                        });
                }

                // Get remove index
                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                // Splice comment out of array
                post.comments.splice(removeIndex, 1);

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({
                postnotfound: 'No post found'
            }));
    }
);
module.exports = router;