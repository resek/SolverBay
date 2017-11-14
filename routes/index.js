var express = require('express');
var router = express.Router();
var Challenge = require ("../models/challenge");
var passport = require ("passport");

//homepage
router.get('/', function (req, res) {
    Challenge.find({}).sort("date").exec(function(err, challenges) {
        if(err) {
            console.log(err);
        } else {
            res.render("homepage", {challenges: challenges});
        }
    });
});

//sign-up form
router.get ("/register", function(req, res) {
    res.render ("register");
});

//handling user sign-up
router.post ("/register", function(req, res) {
    User.create (req.body, function (err, newUser) {
        if (err) {
            console.log(err);
            return res.render("register");
        } else {
        passport.authenticate ("local")(req, res, function() {
            res.redirect("/");
        });
        }
    });
});

//login form
router.get ("/login", function (req, res) {
    res.render ("login");
});

//login logic
router.post ("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"})
);

//logout route
router.get ("/logout", function(req, res) {
    req.logout();
    res.redirect ("/");
});

module.exports = router;