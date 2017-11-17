var express = require('express');
var router = express.Router();
var Challenge = require ("../models/challenge");
var middleware = require ("../middleware");

//index
router.get("/challenges", function (req, res) {
    Challenge.find({}, function(err, challenges) {
        if(err) {
            console.log(err);
        } else {
            res.render("challenge/index", {challenges: challenges});
        }
    });  
});
  
//new
router.get("/challenges/new", middleware.isLoggedIn, function(req, res) {
    res.render("challenge/new");
});
  
//create
router.post("/challenges", function(req, res) {
    Challenge.create(req.body, function(err, newChallenge) {
        if(err) {
            console.log(err);
        } else {
            newChallenge.author.username = req.user.username;
            newChallenge.author.id = req.user._id;
            newChallenge.save();
            res.redirect ("/challenges");
        }
    });
});
  
//show
router.get("/challenges/:id", function (req, res) {
    var id = req.params.id;
    Challenge.findById(id).populate({path: "solutions"}).exec(function(err, foundChallenge) {
        if(err) {
            console.log(err)
        } else {
            res.render("challenge/show", {foundChallenge: foundChallenge});
        }
    });
});

module.exports = router;