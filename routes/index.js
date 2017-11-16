var express = require('express');
var router = express.Router();
var Challenge = require ("../models/challenge");
var User = require ("../models/user");
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
    
    var password = req.body.password;
    var password2 = req.body.password2;
    
    //express validator
    req.checkBody("password2").equals(req.body.password);
    var errors = req.validationErrors();
    
    if(errors) {
        req.flash("info", "passwords do not match");
        res.redirect("/register");
    } else {
        User.create (req.body, function (err, newUser) {
            if (err) {
                if (err.errors.username !== undefined) { //from uniqueValidator mongoose plugin
                    req.flash("info", err.errors.username.message);
                    res.redirect("/register");
                } else if (err.errors.email !== undefined) {
                    req.flash("info", err.errors.email.message);
                    res.redirect("/register");
                }            
            } else {
                passport.authenticate ("local")(req, res, function() {
                    req.flash ("info", "welcome on board :)");
                    res.redirect("/");
                });
            }            
        });
    }    
});

//login form
router.get ("/login", function (req, res) {
    res.render ("login");
});

//handling login
router.post('/login',
passport.authenticate('local', { successRedirect: '/',
                                 failureRedirect: '/login',
                                 failureFlash: true  })
);

//logout route
router.get ("/logout", function(req, res) {
    req.logout();
    res.redirect ("/");
});

module.exports = router;