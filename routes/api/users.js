const express = require("express");
const router = express.Router();
const gravatar = require('gravatar');
// this is for incrypting passwords
const bcrypt = require('bcryptjs');
// json web token for making access tokens
//to get to authorized areas
const jwt = require('jsonwebtoken');
// bring in the keys to use on jwt
const keys = require('../../config/keys');
// Load user model 
const User = require('../../models/User');
// @route      GET api/users/test
// @desc       Tests user route
// @access     Public
router.get("/test", (req, res) => res.json({
    msg: "Uers works"
}));

// @route GET api/users/register
//@desc Register user
// @access Public
router.post('/register', (req, res) => {
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    email: 'Email Already Exists'
                });
            } else {
                // this is the avatar that you are grabbing from the gravatar library
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', //rating
                    d: 'mm' //default
                })
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
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        });
});
// @route api/users/login
// @desc  Login user / return JWT token
// @access Public

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    User.findOne({
            email
        })
        .then(user => {
            // check for user
            if (!user) {
                return res.status(404).json({
                    email: 'User not found'
                });
            }

            //check password
            // use bcrypt to compare the hashed pw to the entered
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // user matched
                        //create jwt payload
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }
                        //sign the token 
                    jwt.sign(payload, keys.secretOrKey, {expiresIn:3600}, (err,token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    });
                    } else {
                        return res.status(400).json({
                            password: 'Password Incorrect'
                        });
                    }
                })
        })
})


module.exports = router;